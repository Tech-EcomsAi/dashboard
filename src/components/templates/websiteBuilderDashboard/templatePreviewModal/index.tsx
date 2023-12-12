import React, { useCallback } from 'react'
import { Button, Card, Modal, Space, Tag, Typography } from 'antd'
import { LuAccessibility, LuExternalLink, LuNetwork, LuPenSquare, LuX } from 'react-icons/lu'
import { TEMPLATE_DETAILS_TYPE } from '../templateConstants'
import styles from './templatePreviewModal.module.scss'
const { Text, Title } = Typography
const { Meta } = Card;
import { Carousel } from 'antd';

function TemplatePreviewModal({ templateDetails, showModal, handleModalResponse }: { templateDetails: TEMPLATE_DETAILS_TYPE, showModal: boolean, handleModalResponse: any }) {


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

    const renderTemplateCover = () => {

        return <>
            <div className={styles.cardCoverWrap}>
                <Carousel
                    effect="fade"
                    infinite={true}
                    slidesToShow={1}
                    slidesToScroll={1}
                    autoplay
                    // nextArrow={<LuNetwork />}
                    // prevArrow={<LuAccessibility />}
                    autoplaySpeed={3000}
                >
                    {templateDetails.images.map((image) => {
                        return <img key={image} alt={templateDetails.title} src={image} />
                    })}
                </Carousel>
            </div>
        </>
    }

    return (
        <Modal
            destroyOnClose
            centered
            title=""
            open={showModal}
            className={styles.templatePreviewModal}
            onCancel={() => handleModalResponse()}
            styles={{
                header: {
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    borderRadius: 0,
                    padding: 15,
                    backdropFilter: 'blur(6px)',
                },
                content: {
                    maxHeight: '95vh',
                    overflow: "auto",
                    padding: "0",
                    position: "relative"
                },
                footer: {
                    display: "flex",
                    justifyContent: "flex-end",
                    position: "sticky",
                    bottom: 0,
                    padding: 10,
                    backdropFilter: 'blur(6px)'
                },
                mask: { backdropFilter: 'blur(6px)' }
            }}
            // footer={null}
            okText="Use for Free"
            okButtonProps={{ size: "large", icon: <LuPenSquare /> }}
            cancelText="Preview"
            cancelButtonProps={{ size: "large", icon: <LuExternalLink /> }}
            closeIcon={<Button icon={<LuX />} style={{ position: "sticky", top: '0', zIndex: "2" }} />}
            width={'max-content'}
            closable
        >
            <div className={styles.templatePreviewContent}>
                <Card
                    key={templateDetails.id}
                    className={styles.templateDetailsWrap}
                    // bodyStyle={{ padding: 6 }}
                    style={{ width: 600 }}
                    cover={renderTemplateCover()}
                >
                    <Meta
                        title={<Space>
                            <Title level={4}>{templateDetails.title}</Title>
                            <Title level={5}> - {templateDetails.tagline}</Title>
                        </Space>}
                        description={<Space align='start' wrap size={20}>
                            <Text>{templateDetails.description}</Text>
                            {tagsList().length != 0 && <Space wrap align='start'>
                                {tagsList().map((tag) => <>{tag}</>)}
                            </Space>}
                        </Space>}
                    />
                </Card>

            </div>
        </Modal>
    )
}

export default TemplatePreviewModal