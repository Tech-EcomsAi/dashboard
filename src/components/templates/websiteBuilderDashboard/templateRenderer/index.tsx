import Meta from 'antd/es/card/Meta'
import React, { Fragment, useCallback, useState } from 'react'
import { Badge, Button, Card, Space, Tag, Tooltip, theme } from 'antd';
import { LuEye, LuPenSquare, LuMoreHorizontal } from 'react-icons/lu';
import templateActions from './templateActions';
import styles from '../websiteBuilderDashboard.module.scss'
import { TEMPLATE_DETAILS_TYPE } from '../templateConstants';
import TemplatePreviewModal from '../templatePreviewModal';


const cardCoverRenderer = (templateDetails: TEMPLATE_DETAILS_TYPE) => {

    const coverContentRenderer = () => {
        return <div className={styles.cardCoverWrap}>
            <img alt={templateDetails.title} src={templateDetails.thumbnail} />
        </div>
    }

    return <Fragment>
        {(templateDetails.isPublished && !templateDetails.isPlatformTemplate) ? <>
            <Badge.Ribbon text={"Currently Live"} color={"green"}>
                {coverContentRenderer()}
            </Badge.Ribbon >
        </> : <>
            {coverContentRenderer()}
        </>}
    </Fragment >
}

function TemplateRenderer({ templateDetails }: { templateDetails: TEMPLATE_DETAILS_TYPE }) {
    const { token } = theme.useToken();
    const [showTemplatePreviewModal, setShowTemplatePreviewModal] = useState({ active: false, template: null })

    const tagsList = useCallback(
        () => {
            const tags = [];
            if (templateDetails.isTrending) tags.push(<Tag color='purple'>🔥 Trending Now</Tag>);
            if (templateDetails.isForYou) tags.push(<Tag color='green'>💜 Made for you</Tag>);
            if (templateDetails.isNew) tags.push(<Tag color='deepPink'>✨ New</Tag>)
            return tags;
        },
        [templateDetails],
    )

    const handleModalResponse = () => {
        setShowTemplatePreviewModal({ active: false, template: null })
    }

    return (
        <>
            <Card hoverable key={templateDetails.id}
                className={styles.templateDetailsWrap}
                bodyStyle={{ padding: 6 }}
                style={{
                    width: 200,
                    borderColor: templateDetails.isPublished ? token.colorSuccessActive : token.colorBorder,
                    background: templateDetails.isPublished ? token.colorSuccessBg : token.colorBgBase
                }}
                cover={cardCoverRenderer(templateDetails)}
                actions={templateActions(templateDetails.isPlatformTemplate)}
                onClick={() => setShowTemplatePreviewModal({ active: true, template: templateDetails })}
            >
                <Space direction='vertical'>
                    <Meta
                        className=''
                        title={<Space wrap style={{ fontSize: 13 }}>
                            {templateDetails.title}
                        </Space>}
                        description={<Space direction='vertical' >{templateDetails.tagline}</Space>}
                    />
                    {tagsList().length != 0 && <Space wrap align='start' size={5}>
                        {tagsList().map((tag) => <Fragment key={tag}>{tag}</Fragment>)}
                    </Space>}
                </Space>
            </Card>
            {showTemplatePreviewModal.active && <TemplatePreviewModal showModal={showTemplatePreviewModal.active} handleModalResponse={handleModalResponse} templateDetails={templateDetails} />}
        </>
    )
}

export default TemplateRenderer