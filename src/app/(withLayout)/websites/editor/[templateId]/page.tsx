import AntdLayoutWrapper from '@antdComponent/layoutWrapper'
import { getTemplateWithConfigById } from '@database/collections/websiteTemplates'
import { getServerSideSessionUser } from '@lib/auth'
import ReduxMutationProvider, { mutationDataType } from '@providers/reduxMutationProvider'
import WebsiteBuilder from '@template/websiteBuilder'
import { removeObjRef } from '@util/utils'
import React, { Suspense } from 'react'
import Loading from 'src/app/loading'

export default async function Page({ params }: { params: { templateId: string } }) {
    const session: any = await getServerSideSessionUser();
    console.log("getServerSideSessionUser", session)
    const templateDetails: any = await getTemplateWithConfigById(session, params.templateId)
    console.log("templateDetails inside /(withLayout)/websites/editor/[templateId]/page : ", templateDetails)

    const mutationData: mutationDataType[] = [];
    let templateState = { [params.templateId]: [] };

    //update all redux states using data fetched from server
    if (templateDetails) {

        //active template action 
        const activeTemplate = removeObjRef(templateDetails);
        //template config  
        const templateConfig = templateDetails.templateConfig;
        //builder state 
        templateState = templateConfig.templateState || templateState;

        delete activeTemplate.templateConfig;
        mutationData.push({ action: "updateActiveTemplate", payload: activeTemplate })

        //active template config action 
        delete templateConfig.builderState;
        mutationData.push({ action: "updateActiveTemplateConfig", payload: templateConfig })

        //active builder state action 
        mutationData.push({ action: "updateBuilderState", payload: templateState })
    }

    return (
        <React.Fragment>
            <Suspense fallback={<Loading page="Website builder" />}>
                <AntdLayoutWrapper>
                    <ReduxMutationProvider mutationData={mutationData}>
                        <WebsiteBuilder templateState={templateState} />
                    </ReduxMutationProvider>
                </AntdLayoutWrapper>
            </Suspense>
        </React.Fragment>
    )
}