import React, { Fragment, useCallback, useRef } from 'react'
import { Button, Card, Modal, Space, Tag, Typography } from 'antd'
import { LuAccessibility, LuArrowLeft, LuArrowLeftCircle, LuArrowRight, LuArrowRightCircle, LuExternalLink, LuNetwork, LuPenSquare, LuX } from 'react-icons/lu'
import { TEMPLATE_DETAILS_TYPE } from '../templateConstants'
import styles from './templatePreviewModal.module.scss'
const { Text, Title } = Typography
const { Meta } = Card;
import { Carousel } from 'antd';

function TemplatePreviewModal({ templateDetails, showModal, handleModalResponse }: { templateDetails: TEMPLATE_DETAILS_TYPE, showModal: boolean, handleModalResponse: any }) {

    const crouselRef = useRef<any>();

    const tagsList = useCallback(
        () => {
            const tags = [];
            if (templateDetails.isTrending) tags.push(<Tag style={{ fontSize: 13, padding: "7px 10px" }} color='purple'>🔥 Trending Now</Tag>);
            if (templateDetails.isForYou) tags.push(<Tag style={{ fontSize: 13, padding: "7px 10px" }} color='green'>💜 Made for you</Tag>);
            if (templateDetails.isNew) tags.push(<Tag style={{ fontSize: 13, padding: "7px 10px" }} color='deepPink'>✨ New</Tag>)
            return tags;
        },
        [templateDetails],
    )

    const renderTemplateCover = () => {

        return <>
            <div className={styles.cardCoverWrap}>
                {Boolean(crouselRef.current) && <>
                </>}
                <Button className={styles.prevButton} shape='circle' type='dashed' size='large' onClick={() => crouselRef.current.prev()} icon={<LuArrowLeft />} />
                <Button className={styles.nextButton} shape='circle' type='dashed' size='large' onClick={() => crouselRef.current.next()} icon={<LuArrowRight />} />
                <Carousel
                    ref={crouselRef}
                    className="center"
                    effect="fade"
                    infinite={true}
                    slidesToScroll={1}
                    autoplay
                    // centerMode={true}
                    centerPadding={"60px"}
                    slidesToShow={1}
                    // rtl={true}
                    autoplaySpeed={4000}
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
                    padding: "0 10px 10px",
                    // backdropFilter: 'blur(6px)'
                },
                mask: { backdropFilter: 'blur(6px)' }
            }}
            okText="Use for Free"
            okButtonProps={{ size: "large", icon: <LuPenSquare /> }}
            cancelText="Preview in new tab"
            cancelButtonProps={{ size: "large", icon: <LuExternalLink /> }}
            closeIcon={<Button shape='circle' icon={<LuX />} style={{ position: "sticky", top: '0', zIndex: "2" }} />}
            width={'max-content'}
            closable
        >
            <div className={styles.templatePreviewContent}>
                <Card
                    key={templateDetails.id}
                    className={styles.templateDetailsWrap}
                    bodyStyle={{
                        position: "sticky",
                        bottom: 0,
                        left: 0,
                        backdropFilter: 'blur(6px)',
                        background: '#dee1ec73',
                        padding: "0 15px 15px"
                    }}
                    style={{ width: '100%', maxWidth: "80vw" }}
                    cover={renderTemplateCover()}
                >
                    <Meta
                        title={<Space>
                            <Title level={3}>{templateDetails.title}</Title>
                            <Title level={3}> - {templateDetails.tagline}</Title>
                        </Space>}
                        description={<Space align='start' wrap size={10} direction='vertical'>
                            <Text style={{ fontSize: 16 }}>{templateDetails.description}</Text>
                            {tagsList().length != 0 && <Space wrap align='start'>
                                {tagsList().map((tag) => <Fragment key={tag}>{tag}</Fragment>)}
                            </Space>}
                        </Space>}
                    />
                </Card>

            </div>
        </Modal>
    )
}

export default TemplatePreviewModal