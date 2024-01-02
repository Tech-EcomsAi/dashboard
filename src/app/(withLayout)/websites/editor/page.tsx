import AntdLayoutWrapper from '@antdComponent/layoutWrapper'
import WebsiteBuilder from '@template/websiteBuilder'
import React, { Suspense } from 'react'
import Loading from 'src/app/loading'

function page({ props }) {
    console.log("editor props:", props)
    return (
        <React.Fragment>
            <Suspense fallback={<Loading page="Website builder" />}>
                <AntdLayoutWrapper>
                    <WebsiteBuilder templateState={{ ["editorRootPage"]: [] }} />
                </AntdLayoutWrapper>
            </Suspense>
        </React.Fragment>
    )
}

export default page