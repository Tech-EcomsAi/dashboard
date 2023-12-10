import Meta from 'antd/es/card/Meta'
import React, { Fragment } from 'react'
import { Badge, Button, Card, Space, Tag, Tooltip, theme } from 'antd';
import { LuEye, LuPenSquare, LuMoreHorizontal } from 'react-icons/lu';
import templateActions from './templateActions';
import { TEMPLATE_DETAILS_TYPE } from '..';
import styles from '../websiteBuilderDashboard.module.scss'


const cardCoverRenderer = (templateDetails: TEMPLATE_DETAILS_TYPE, isPlatformTemplate: boolean) => {

    const coverContentRenderer = () => {
        return <div className={styles.cardCoverWrap}>
            <img alt={templateDetails.title} src={templateDetails.thumbnail} />
        </div>
    }

    return <Fragment>
        {(templateDetails.isPublished && !isPlatformTemplate) ? <>
            <Badge.Ribbon text={"Currently Live"} color={"green"}>
                {coverContentRenderer()}
            </Badge.Ribbon >
        </> : <>
            {coverContentRenderer()}
        </>}
    </Fragment >
}

function TemplateRenderer({ templateDetails, isPlatformTemplate }: { isPlatformTemplate: boolean, templateDetails: TEMPLATE_DETAILS_TYPE }) {
    const { token } = theme.useToken();
    const Tags_List = [];
    if (templateDetails.isTrending) {
        Tags_List.push(<Tag color='purple'>🔥 Trending Now</Tag>)
    }
    if (templateDetails.isForYou) {
        Tags_List.push(<Tag color='green'>💜 Made for you</Tag>)
    }
    if (templateDetails.isNew) {
        Tags_List.push(<Tag color='deepPink'>✨ New</Tag>)
    }
    return (
        <Card hoverable key={templateDetails.id}
            className={styles.templateDetailsWrap}
            bodyStyle={{ padding: 14 }}
            style={{
                width: 250,
                borderColor: templateDetails.isPublished ? token.colorSuccessActive : token.colorBorder,
                background: templateDetails.isPublished ? token.colorSuccessBg : token.colorBgBase
            }}
            cover={cardCoverRenderer(templateDetails, isPlatformTemplate)}
            actions={templateActions(isPlatformTemplate)}
        >
            <Space direction='vertical'>
                <Meta
                    className=''
                    title={templateDetails.title}
                    description={<Space direction='vertical' >
                        {templateDetails.publicUrl}
                    </Space>}
                />
                {Tags_List.length != 0 && <Space wrap align='start'>
                    {Tags_List.map((tag) => <>{tag}</>)}
                </Space>}
            </Space>
        </Card>
    )
}

export default TemplateRenderer