'use client'
import React, { Fragment } from 'react'
import styles from './websiteBuilderDashboard.module.scss';
import { Button, Card, Image, Space, theme } from 'antd';
import { LuBookOpen, LuEye, LuFileEdit, LuFileStack, LuFileText, LuFileVideo2, LuFlower2, LuFootprints, LuLayers, LuPlus, LuPlusSquare, LuVideo } from 'react-icons/lu';
import { LOGO_ANIMATED, LOGO_LARGE, LOGO_SMALL } from '@constant/common';
import { hexToRgbA } from '@util/utils';
const { Meta } = Card;

type SITE_DETAILS_TYPE = {
    id: string,
    title: string,
    preview: any,
    createdOn: any,
    isPublished: boolean,
    isDeleted: boolean,
    sharedWith: any,
    createdBy: any,
    publicUrl: string,
    templateId: string
}

const Dummy_templates_list: SITE_DETAILS_TYPE[] = [
    {
        id: '123',
        title: "My first site",
        preview: LOGO_ANIMATED,
        createdOn: "",
        isPublished: true,
        isDeleted: false,
        sharedWith: [],
        createdBy: { id: 123, name: "Yamnse" },
        publicUrl: "https://minimals.cc/dashboard/user",
        templateId: ''
    }, {
        id: '1234',
        title: "My second site",
        preview: LOGO_LARGE,
        createdOn: "",
        isPublished: true,
        isDeleted: false,
        sharedWith: [],
        createdBy: { id: 123, name: "Danny" },
        publicUrl: "https://minimals.cc/dashboard/user",
        templateId: '1726'
    }
]

const cardContentRenderer = (icon) => {
    return <Fragment>
        <Space style={{ width: "100%" }} align='center'>
            <Button icon={icon} type='text' />
        </Space>
    </Fragment >
}

const INFO_CARDS_LIST = [
    { key: 1, title: "Start the App Tour", icon: <LuFootprints />, colors: ['#C4DFDF', '#F5F0BB'], description: "Start the App Tour" },
    { key: 2, title: "Browse Templates", icon: <LuFileStack />, colors: ['#F5F0BB', '#E19898'], description: "Browse Templates" },
    { key: 3, title: "Watch Tutorials", icon: <LuFileVideo2 />, colors: ['#E19898', '#DDFFBB'], description: "Watch Tutorials" },
    { key: 4, title: "Read Docs", icon: <LuFileText />, colors: ['#DDFFBB', '#B9F3E4'], description: "Read Docs" },
    { key: 5, title: "Use Cases", icon: <LuFlower2 />, colors: ['#C4DFDF', '#B9F3E4'], description: "Use Cases" },
]
function WebsiteBuilderDashboard() {
    const { token } = theme.useToken();
    return (
        <Space className={styles.websiteBuilderDashboardWrap} direction='vertical'>
            <Card className={styles.templatesGroup} title="Get Started">
                <Space className={styles.templatesList} wrap align='start'>
                    {INFO_CARDS_LIST.map((cardDetails: any) => {

                        return <Card key={cardDetails.key} className={styles.infoCardBody}
                            bordered hoverable
                            bodyStyle={{
                                padding: "20px",
                                background: `linear-gradient(86deg, ${hexToRgbA(cardDetails.colors[0], 0.2)} 0%,${hexToRgbA(cardDetails.colors[1], 0.3)} 100%)`
                            }}
                            style={{
                                position: "relative",
                                overflow: "hidden",
                                background: token.colorBgBase,
                                backgroundImage: `radial-gradient(circle at 10px 10px, ${token.colorTextDisabled} 1px, transparent 0)`,
                            }}
                        >
                            {/* <div className={styles.bgWrap}></div> */}
                            <Meta
                                style={{ alignItems: "center" }}
                                avatar={cardContentRenderer(cardDetails.icon)}
                                title={cardDetails.title}
                            // description={cardDetails.description}
                            />
                        </Card>
                    })}

                </Space>
            </Card>

            <Card className={styles.templatesGroup} title="Your Creations">
                <Space className={styles.templatesList} wrap align='start'>
                    <Card bordered hoverable
                        style={{ width: 200, minHeight: 200 }}
                        cover={<>
                            <Card className={styles.createNewCard}>
                                <Button icon={<LuPlus />} />
                            </Card>
                        </>}
                    >
                        <Meta
                            title="Create New Blank"
                            description="Create "
                        />
                    </Card>
                    {Dummy_templates_list.map((siteDetails: SITE_DETAILS_TYPE) => {
                        return <Card bordered hoverable key={siteDetails.id}
                            style={{ width: 200, minHeight: 200 }}
                            cover={<Image alt="example" src={siteDetails.preview} />}
                            actions={[
                                <LuEye key="Preview" />,
                                <LuFileEdit key="Edit" />,
                                <LuBookOpen key="Publish" />,
                            ]}
                        >
                            <Meta
                                title={siteDetails.title}
                                description={siteDetails.publicUrl}
                            />
                        </Card>
                    })}
                </Space>
            </Card>
            <Card className={styles.templatesGroup} title="Trending templates" extra={<Button>View All</Button>}>
                <Space className={styles.templatesList} wrap align='start'>
                    {Dummy_templates_list.map((siteDetails: any) => {
                        return <Card bordered hoverable key={siteDetails.id}
                            style={{ width: 200, minHeight: 200 }}
                            cover={<Image alt="example" src={siteDetails.preview} />}
                            actions={[
                                <LuEye key="Preview" />,
                                <LuFileEdit key="Edit" />,
                                <LuBookOpen key="Publish" />,
                            ]}
                        >
                            <Meta
                                title={siteDetails.title}
                                description={siteDetails.publicUrl}
                            />
                        </Card>
                    })}
                </Space>
            </Card>
            <Card className={styles.templatesGroup} title="New templates" extra={<Button>View All</Button>}>
                <Space className={styles.templatesList} wrap align='start'>
                    {Dummy_templates_list.map((siteDetails: any) => {
                        return <Card bordered hoverable key={siteDetails.id}
                            style={{ width: 200, minHeight: 200 }}
                            cover={<Image alt="example" src={siteDetails.preview} />}
                            actions={[
                                <LuEye key="Preview" />,
                                <LuFileEdit key="Edit" />,
                                <LuBookOpen key="Publish" />,
                            ]}
                        >
                            <Meta
                                title={siteDetails.title}
                                description={siteDetails.publicUrl}
                            />
                        </Card>
                    })}
                </Space>
            </Card>
            <Card className={styles.templatesGroup} title="Made for you" extra={<Button>View All</Button>}>
                <Space className={styles.templatesList} wrap align='start'>
                    {Dummy_templates_list.map((siteDetails: any) => {
                        return <Card bordered hoverable key={siteDetails.id}
                            style={{ width: 200, minHeight: 200 }}
                            cover={<Image alt="example" src={siteDetails.preview} />}
                            actions={[
                                <LuEye key="Preview" />,
                                <LuFileEdit key="Edit" />,
                                <LuBookOpen key="Publish" />,
                            ]}
                        >
                            <Meta
                                title={siteDetails.title}
                                description={siteDetails.publicUrl}
                            />
                        </Card>
                    })}
                </Space>
            </Card>
        </Space>
    )
}

export default WebsiteBuilderDashboard