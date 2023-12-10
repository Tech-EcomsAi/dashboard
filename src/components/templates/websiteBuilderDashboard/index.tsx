'use client'
import React, { Fragment } from 'react'
import styles from './websiteBuilderDashboard.module.scss';
import { Button, Card, Space, theme } from 'antd';
import { LuFileStack, LuFileText, LuFileVideo2, LuFlower2, LuFootprints, LuMoreVertical, LuPlus } from 'react-icons/lu';
import { LOGO_ANIMATED, LOGO_LARGE, LOGO_SMALL } from '@constant/common';
import { hexToRgbA } from '@util/utils';
import TemplateRenderer from './templateRenderer';
import ActionIconButton from '@antdComponent/iconButton/actionIconButton';
const { Meta } = Card;

export type TEMPLATE_DETAILS_TYPE = {
    id: string,
    title: string,
    description?: string,
    thumbnail: any,
    createdOn: any,
    isPublished: boolean,
    isDeleted: boolean,
    sharedWith: any,
    createdBy: any,
    publicUrl: string,
    templateId: string,
    isNew: boolean,
    isTrending: boolean,
    isForYou: boolean,
}

type TEMPLATE_SECTION = {
    key: string;
    title: string;
    icon: React.JSX.Element;
    description: string;
    templatesList: TEMPLATE_DETAILS_TYPE[];
}


const Dummy_templates_list: TEMPLATE_DETAILS_TYPE[] = [
    {
        id: '123',
        title: "My first site",
        thumbnail: LOGO_ANIMATED,
        createdOn: "",
        isPublished: true,
        isDeleted: false,
        sharedWith: [],
        createdBy: { id: 123, name: "Yamnse" },
        publicUrl: "https://minimals.cc/dashboard/user",
        templateId: '',
        isNew: true,
        isTrending: true,
        isForYou: true,
    }, {
        id: '1234',
        title: "My second site",
        thumbnail: LOGO_LARGE,
        createdOn: "",
        isPublished: false,
        isDeleted: false,
        sharedWith: [],
        createdBy: { id: 123, name: "Danny" },
        publicUrl: "https://minimals.cc/dashboard/user",
        templateId: '1726',
        isNew: true,
        isTrending: false,
        isForYou: false,
    },
    {
        id: '12345',
        title: "My second site",
        thumbnail: LOGO_SMALL,
        createdOn: "",
        isPublished: false,
        isDeleted: false,
        sharedWith: [],
        createdBy: { id: 123, name: "Danny" },
        publicUrl: "https://minimals.cc/dashboard/user",
        templateId: '1726',
        isNew: false,
        isTrending: false,
        isForYou: true,
    }
]

const INFO_CARDS_LIST = [
    { key: 1, title: "Start the App Tour", icon: LuFootprints, colors: ['#C4DFDF', '#F5F0BB'], description: "Start the App Tour" },
    { key: 2, title: "Browse Templates", icon: LuFileStack, colors: ['#F5F0BB', '#E19898'], description: "Browse Templates" },
    { key: 3, title: "Watch Tutorials", icon: LuFileVideo2, colors: ['#E19898', '#DDFFBB'], description: "Watch Tutorials" },
    { key: 4, title: "Read Docs", icon: LuFileText, colors: ['#DDFFBB', '#B9F3E4'], description: "Read Docs" },
    { key: 5, title: "Use Cases", icon: LuFlower2, colors: ['#C4DFDF', '#B9F3E4'], description: "Use Cases" },
]

const TEMPLATES_SECTIONS: TEMPLATE_SECTION[] = [
    { key: 'trending', title: "Trending templates", icon: <LuFootprints />, description: "Start the App Tour", templatesList: Dummy_templates_list },
    { key: 'new', title: "New templates", icon: <LuFootprints />, description: "Start the App Tour", templatesList: Dummy_templates_list },
    { key: 'foryou', title: "Made for you", icon: <LuFootprints />, description: "Start the App Tour", templatesList: Dummy_templates_list },
]

const getStartedContentRenderer = (icon) => {
    return <Fragment>
        <Space style={{ width: "100%" }} align='center'>
            <ActionIconButton icon={icon} size={20} />
        </Space>
    </Fragment >
}

const templateSectionRenderer = (sectionDetails: TEMPLATE_SECTION) => {
    return <Card key={sectionDetails.key} className={styles.templatesGroup} title={sectionDetails.title} extra={<Button>View All</Button>}>
        <Space className={styles.templatesList} align='start' size={20}>
            {sectionDetails.templatesList.map((templateDetails: TEMPLATE_DETAILS_TYPE) => {
                return <TemplateRenderer templateDetails={templateDetails} isPlatformTemplate={true} />
            })}
        </Space>
    </Card>
}

function WebsiteBuilderDashboard() {
    const { token } = theme.useToken();
    return (
        <Space className={styles.websiteBuilderDashboardWrap} direction='vertical'>
            <Card className={styles.templatesGroup} title="Get Started">
                <Space className={`${styles.templatesList} ${styles.infoCardBodyWrap}`} wrap align='start'>
                    {INFO_CARDS_LIST.map((cardDetails: any) => {
                        return <Card key={cardDetails.key}
                            className={styles.infoCardBody}
                            bordered hoverable
                            bodyStyle={{
                                padding: "10px 20px 10px 10px",
                                background: `linear-gradient(86deg, ${hexToRgbA(cardDetails.colors[0], 0.2)} 0%,${hexToRgbA(cardDetails.colors[1], 0.3)} 100%)`
                            }}
                            style={{
                                position: "relative",
                                overflow: "hidden",
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

            <Card className={styles.templatesGroup} title="Your Creations">
                <Space className={`${styles.templatesList} ${styles.customeTemplates}`} align='start' size={20}>
                    <Card bordered hoverable
                        bodyStyle={{ padding: 14 }}
                        style={{
                            width: 200,
                            minHeight: 200,
                            borderColor: token.colorBorder,
                            background: token.colorBgBase
                        }}
                        cover={<>
                            <Space style={{ width: "100%", height: 200, display: "flex", justifyContent: "center" }} align='center'>
                                <Button type='dashed' size='large' icon={<LuPlus style={{ fontSize: 20 }} />} />
                            </Space>
                        </>}>
                        <Meta
                            title="Create New Blank"
                            description="Create your own design using our predesigned templates"
                        />
                    </Card>
                    {Dummy_templates_list.map((templateDetails: TEMPLATE_DETAILS_TYPE) => {
                        return <TemplateRenderer templateDetails={templateDetails} isPlatformTemplate={false} />
                    })}
                </Space>
            </Card>

            {TEMPLATES_SECTIONS.map((sectionDetails: TEMPLATE_SECTION) => {
                return templateSectionRenderer(sectionDetails)
            })}
        </Space>
    )
}

export default WebsiteBuilderDashboard