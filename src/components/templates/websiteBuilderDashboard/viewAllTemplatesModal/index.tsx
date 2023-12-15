import React, { Fragment, useEffect, useState } from 'react'
import styles from './viewAllTemplatesModal.module.scss'
import { Button, Card, Empty, FloatButton, Input, Modal, Segmented, Space, Tooltip, Typography, theme } from 'antd'
import { LuFootprints, LuX } from 'react-icons/lu'
import { TEMPLATE_CATEGORY, TEMPLATE_DETAILS_TYPE } from '../templateConstants'
import TemplateRenderer from '../templateRenderer'
import WrapperStyles from '../websiteBuilderDashboard.module.scss'
import ActionIconButton from '@antdComponent/iconButton/actionIconButton'
import { TEMPLATE_CATEGORIES } from 'src/data/templates'
import SegmentComponent, { SEGMENT_OPTIONS_TYPES } from '@atoms/segment'
import { AnimatePresence, motion } from 'framer-motion'
const { Search } = Input;
const { Title } = Typography;

const FILTER_TYPES = [
    { value: 'all', key: "All templates", icon: <>✨</> },
    { value: 'isTrending', key: "Trending Now", icon: <>🔥</> },
    { value: 'isNew', key: "New Launched", icon: <>⚡️</> },
    { value: 'isForYou', key: "Made for you", icon: <>💜</> },
]
function ViewAllTemplatesModal({ templateList, showModal, handleModalResponse, filterType = "all" }) {
    const [activeCategory, setActiveCategory] = useState<TEMPLATE_CATEGORY>(TEMPLATE_CATEGORIES[0]);
    const [filteredTemplates, setFilteredTemplates] = useState<TEMPLATE_DETAILS_TYPE[]>([]);
    const [searchQuery, setSearchQuery] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [activeFilter, setActiveFilter] = useState(FILTER_TYPES[0])
    const { token } = theme.useToken();

    useEffect(() => {
        let filteredTemplate: TEMPLATE_DETAILS_TYPE[] = [];

        //filter by active top filter
        filteredTemplate = templateList.filter((t: TEMPLATE_DETAILS_TYPE) => activeFilter.value == "all" || t[activeFilter.value])

        //filter by category
        filteredTemplate = filteredTemplate.filter((t: TEMPLATE_DETAILS_TYPE) => activeCategory.id == "all" || t.categoryId == activeCategory.id)

        //filter by search query
        filteredTemplate = filteredTemplate.filter((t: TEMPLATE_DETAILS_TYPE) =>
            t.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
            t.description.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
            t.tagline.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
            t.keywords.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()))

        setFilteredTemplates(filteredTemplate);
    }, [activeCategory, activeFilter, searchQuery])

    const onClickSearch = () => {
        console.log("onclick search")
    }

    const onChangeTopFilter = (tab) => {
        setActiveFilter(FILTER_TYPES.find((f) => f.key == tab))
    }

    const onChangeSearchQuery = (query: string) => {
        query = query ? query.toLowerCase() : '';
        setSearchQuery(query);
    }

    const getSegmentOptions = () => {
        return FILTER_TYPES.map((option: any) => {
            return {
                label:
                    <Tooltip title={`${option.key}`}>
                        <div
                            style={{ color: activeFilter.key == option.key ? token.colorBgBase : token.colorTextBase }}
                            className={`${styles.segmentItem} ${activeFilter.key == option.key ? styles.active : ''}`}>
                            <div className={styles.iconWrap}
                                style={{
                                    color: activeFilter.key == option.key ? token.colorPrimary : token.colorTextSecondary,
                                    background: activeFilter.key == option.key ? token.colorFillContent : "inherit"
                                }}>
                                {option.icon}
                            </div>
                            <div className={styles.name} style={{ color: token.colorTextBase }}>{option.key}</div>
                        </div>
                    </Tooltip>,
                value: option.key
            }
        })
    }


    return (
        <Modal
            destroyOnClose
            centered
            title="Explore extensive template library, just made for you"
            open={showModal}
            onCancel={() => handleModalResponse()}
            styles={{
                content: {
                    height: '95vh',
                    width: "95vw",
                    overflow: "auto",
                },
                body: {
                    paddingTop: 10
                },
                // header: { position: "sticky", top: '0', zIndex: "2" },
                mask: { backdropFilter: 'blur(6px)' }
            }}
            footer={null}
            className={`${WrapperStyles.websiteBuilderDashboardWrap} ${styles.viewAllTemplatesModalWrap}`}
            closeIcon={<LuX />}
            width={'max-content'}
        >
            <Space className={WrapperStyles.templatesGroup} direction='vertical' size={20}>
                <Space className={styles.topFilters} size={20} wrap>
                    <Search value={searchQuery}
                        onChange={(e) => onChangeSearchQuery(e.target.value)}
                        onSearch={onClickSearch}
                        placeholder="Enter what you want to know"
                        enterButton={false}
                        allowClear
                        size="large"
                        status={""}
                        style={{ width: "100%" }}
                        loading={isLoading} />

                    <div className={styles.segmentWrap} >
                        <Segmented
                            style={{ width: "100%" }}
                            value={activeFilter?.key}
                            // style={{ background: token.colortext }}
                            size={"large"}
                            block={true}
                            defaultValue={activeFilter?.key}
                            onChange={(tab: any) => onChangeTopFilter(tab)}
                            options={getSegmentOptions()}
                        />
                    </div>
                </Space>
                <Space className={styles.categoriesList}>
                    {TEMPLATE_CATEGORIES.map((category: TEMPLATE_CATEGORY) => {
                        return <Fragment key={category.id}>
                            <Button type={activeCategory.id == category.id ? "primary" : "default"} onClick={() => setActiveCategory(category)}>{category.title}</Button>
                        </Fragment>
                    })}
                </Space>
                <AnimatePresence>
                    <Space className={WrapperStyles.templatesList} align='start' wrap size={20}>
                        {filteredTemplates.length != 0 ? <>
                            {filteredTemplates.map((templateDetails: TEMPLATE_DETAILS_TYPE) => {
                                return <motion.div key={templateDetails.id}
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 'auto', opacity: 0 }}>
                                    <TemplateRenderer templateDetails={templateDetails} />
                                </motion.div>
                            })}
                        </> : <>
                            <Space align='center' direction='vertical' style={{ width: "90vw", paddingTop: 80 }}>
                                <Empty description={"Templates not available for your selections!"} />
                            </Space>
                        </>}
                    </Space>
                </AnimatePresence>
            </Space>
        </Modal>
    )
}

export default ViewAllTemplatesModal