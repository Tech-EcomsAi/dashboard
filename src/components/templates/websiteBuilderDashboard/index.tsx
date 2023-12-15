'use client'
import React, { Fragment, useState } from 'react'
import styles from './websiteBuilderDashboard.module.scss';
import { Button, Card, Space, Typography, message, theme } from 'antd';
import { LuFileStack, LuFileText, LuFileVideo2, LuFlower2, LuFootprints, LuPlus } from 'react-icons/lu';
import { hexToRgbA } from '@util/utils';
import TemplateRenderer from './templateRenderer';
import ActionIconButton from '@antdComponent/iconButton/actionIconButton';
import { TEMPLATE_DETAILS_TYPE, TEMPLATE_SECTION } from './templateConstants';
import TemplateCreationModal from './templateCreationModal';
import ViewAllTemplatesModal from './viewAllTemplatesModal';
import TempTemplateList from 'src/data/templates';
const { Meta } = Card;
const { Title } = Typography;
const CARD_HEADING_LEVEL = 3;

const INFO_CARDS_LIST = [
    { key: 1, title: "Start the App Tour", icon: LuFootprints, colors: ['#C4DFDF', '#F5F0BB'], description: "Start the App Tour" },
    { key: 2, title: "Browse Templates", icon: LuFileStack, colors: ['#F5F0BB', '#E19898'], description: "Browse Templates" },
    { key: 3, title: "Watch Tutorials", icon: LuFileVideo2, colors: ['#E19898', '#DDFFBB'], description: "Watch Tutorials" },
    { key: 4, title: "Read Docs", icon: LuFileText, colors: ['#DDFFBB', '#B9F3E4'], description: "Read Docs" },
    { key: 5, title: "Use Cases", icon: LuFlower2, colors: ['#C4DFDF', '#B9F3E4'], description: "Use Cases" },
]

const TEMPLATES_SECTIONS: TEMPLATE_SECTION[] = [
    { key: 'isTrending', title: "Trending templates", icon: <LuFootprints />, description: "Start the App Tour", templatesList: TempTemplateList.filter((t) => t['isTrending']) },
    { key: 'isNew', title: "New templates", icon: <LuFootprints />, description: "Start the App Tour", templatesList: TempTemplateList.filter((t) => t['isNew']) },
    { key: 'isForYou', title: "Made for you", icon: <LuFootprints />, description: "Start the App Tour", templatesList: TempTemplateList.filter((t) => t['isForYou']) },
]

const getStartedContentRenderer = (icon) => {
    return <Fragment>
        <Space style={{ width: "100%" }} align='center'>
            <ActionIconButton icon={icon} size={20} />
        </Space>
    </Fragment >
}

function WebsiteBuilderDashboard() {
    const { token } = theme.useToken();
    const [showCreationModal, setShowCreationModal] = useState(false);
    const [showViewAllTemplateModal, setShowViewAllTemplateModal] = useState(false);

    const onCreateNewTemplate = () => {
        setShowCreationModal(true)
    }

    const handleModalResponse = () => {
        message.open({ content: "Cretaion modal closed" })
        setShowCreationModal(false)
    }

    const templateSectionRenderer = (sectionDetails: TEMPLATE_SECTION) => {
        return <Card key={sectionDetails.key} className={styles.templatesGroup} title={<Title level={CARD_HEADING_LEVEL}> {sectionDetails.title}</Title>} extra={<Button onClick={() => setShowViewAllTemplateModal(true)}>View All</Button>}>
            <Space className={styles.templatesList} align='start' size={20}>
                {sectionDetails.templatesList.map((templateDetails: TEMPLATE_DETAILS_TYPE) => {
                    return <Fragment key={templateDetails.id}><TemplateRenderer templateDetails={templateDetails} /></Fragment>
                })}
            </Space>
        </Card>
    }

    return (
        <Space className={styles.websiteBuilderDashboardWrap} direction='vertical'>
            <Card className={styles.templatesGroup} title={<Title level={CARD_HEADING_LEVEL}>Get Started</Title>}>
                <Space className={`${styles.templatesList} ${styles.infoCardBodyWrap}`} wrap align='start'>
                    {INFO_CARDS_LIST.map((cardDetails: any) => {
                        return <Card key={cardDetails.key}
                            className={styles.infoCardBody}
                            bordered
                            hoverable
                            bodyStyle={{
                                padding: "10px 20px 10px 10px",
                                background: `linear-gradient(86deg, ${hexToRgbA(cardDetails.colors[0], 0.2)} 0%,${hexToRgbA(cardDetails.colors[1], 0.3)} 100%)`
                            }}
                            style={{
                                background: token.colorBgBase,
                                backgroundImage: `radial-gradient(circle at 10px 10px, ${token.colorTextDisabled} 1px, transparent 0)`,
                            }}
                        >
                            <Meta
                                style={{ alignItems: "center", fontWeight: 400 }}
                                avatar={getStartedContentRenderer(cardDetails.icon)}
                                title={cardDetails.title}
                            />
                        </Card>
                    })}
                </Space>
            </Card>

            <Card className={styles.templatesGroup} title={<Title level={CARD_HEADING_LEVEL}>Your Creations</Title>}>
                <Space className={`${styles.templatesList} ${styles.customeTemplates}`} align='start' size={20}>
                    <Card bordered hoverable
                        bodyStyle={{ padding: 14 }}
                        style={{
                            width: 200,
                            minHeight: 350,
                            borderColor: token.colorBorder,
                            background: token.colorBgBase
                        }}
                        cover={<>
                            <Space style={{ width: "100%", height: 350, display: "flex", padding: 10, justifyContent: "center" }} direction='vertical' align='center' wrap>
                                <Button type='dashed' size='large' icon={<LuPlus style={{ fontSize: 20 }} />} />
                                Create your own template
                            </Space>
                        </>}
                        onClick={onCreateNewTemplate}
                    >
                        {/* <Meta
                            title="Create New Blank"
                            description="Create your own design using our predesigned templates"
                        /> */}
                    </Card>
                    {TempTemplateList.map((templateDetails: TEMPLATE_DETAILS_TYPE) => {
                        return <Fragment key={templateDetails.id}><TemplateRenderer templateDetails={templateDetails} /></Fragment>
                    })}
                </Space>
            </Card>

            {/* platform templates  */}
            {TEMPLATES_SECTIONS.map((sectionDetails: TEMPLATE_SECTION) => {
                return templateSectionRenderer(sectionDetails)
            })}

            {/* template creation modal */}
            <TemplateCreationModal setShowViewAllTemplateModal={setShowViewAllTemplateModal} showModal={showCreationModal} handleModalResponse={handleModalResponse} />
            {/* template list modal */}
            <ViewAllTemplatesModal templateList={TempTemplateList} showModal={showViewAllTemplateModal} handleModalResponse={() => setShowViewAllTemplateModal(false)} />

        </Space>
    )
}

export default WebsiteBuilderDashboard