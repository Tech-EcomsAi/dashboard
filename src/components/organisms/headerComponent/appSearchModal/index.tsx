import React, { Fragment, useState } from 'react'
import { Button, Card, Divider, Input, Modal, Popconfirm, Space, theme } from 'antd'
import TextElement from '@antdComponent/textElement'
import { LuCheckCircle, LuX } from 'react-icons/lu'
import { useRouter } from 'next/navigation'
import { HOME_ROUTING, NAVIGARIONS_ROUTINGS } from '@constant/navigations'
import Saperator from '@atoms/Saperator'
import { APPS_MENU, DASHBOARD_MENU } from '@organisms/sidebar'
import styles from './appSearchModal.module.scss'
import { MdOutlineNavigateNext } from 'react-icons/md'

const { Search } = Input;
function AppSearchModal({ isModalOpen, onClose, children }) {
    const { token } = theme.useToken();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [hoverId, setHoverId] = useState(null)

    const onClickSearch = () => {
        console.log("onclick search")
    }

    const handleClose = () => {
        console.log("messages close")
        onClose()
    }

    const renderTitle = () => {
        return <Space direction='vertical' size={0}>
            <Space align='baseline'>
                <Space size={0} align='center'>
                    <TextElement size={"medium"} text={'Search for anything'} color={token.colorTextBase} />
                </Space>
                <Button icon={<LuX />} type='default' size='small' shape='circle' onClick={handleClose} />
            </Space>
            <Divider style={{ margin: "6px 0" }} />
        </Space>
    }

    const onClickNav = (nav) => {

    }

    const renderSearchWrap = () => {
        return <Space direction='vertical' size={0} style={{ marginBottom: "10px" }} className={styles.appSearchModal}>
            <Search value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onSearch={onClickSearch}
                placeholder="Enter what you want to know"
                enterButton={false}
                allowClear
                size="middle"
                style={{ width: "100%" }}
                loading={isLoading} />
            <TextElement size={"medium"} text={'POPULAR SEARCHES'} color={token.colorPrimary} styles={{ margin: "20px 0 0", display: "block" }} />
            <Space size={"small"} direction='vertical' style={{ margin: "20px 0" }}>
                <TextElement text={'Dashboards'} color={token.colorTextDescription} size={"medium"} />
                <div className={`${styles.menuItemsWrap}`}>
                    {DASHBOARD_MENU[0].subNav.map((nav, i) => {
                        return <div className={`${styles.menuItemWrap}`}
                            onMouseEnter={() => setHoverId(nav.key)}
                            onMouseLeave={() => setHoverId('')}
                            onClick={() => onClickNav(nav)}
                            style={{
                                backgroundColor: `${nav.key == hoverId ? token.colorPrimaryBgHover : token.colorBgTextHover}`,
                                color: nav.key == hoverId ? token.colorTextBase : token.colorTextBase,
                                border: token.colorBorder,
                            }}
                        >
                            <div className={styles.navWrap}>
                                <div className={styles.labelIconWrap}>
                                    <div className={styles.iconWrap} style={{
                                        color: nav.key == hoverId ? token.colorTextBase : token.colorTextBase,
                                    }}>
                                        {nav.icon}
                                    </div>
                                    <div className={styles.label} >{nav.label}</div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </Space>
            <Space size={"small"} direction='vertical' style={{ margin: "20px 0" }}>
                <TextElement text={'Apps'} color={token.colorTextDescription} size={"medium"} />
                <div className={`${styles.menuItemsWrap}`}>
                    {APPS_MENU[0].subNav.map((nav, i) => {
                        return <div className={`${styles.menuItemWrap}`}
                            onMouseEnter={() => setHoverId(nav.key)}
                            onMouseLeave={() => setHoverId('')}
                            onClick={() => onClickNav(nav)}
                            style={{
                                backgroundColor: `${nav.key == hoverId ? token.colorPrimaryBgHover : token.colorBgTextHover}`,
                                color: nav.key == hoverId ? token.colorTextBase : token.colorTextBase,
                                border: token.colorBorder,
                            }}
                        >
                            <div className={styles.navWrap}>
                                <div className={styles.labelIconWrap}>
                                    <div className={styles.iconWrap} style={{
                                        color: nav.key == hoverId ? token.colorTextBase : token.colorTextBase,
                                    }}>
                                        {nav.icon}
                                    </div>
                                    <div className={styles.label} >{nav.label}</div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </Space>
        </Space>
    }

    return (
        <Fragment>

            <Modal
                destroyOnClose
                title={"Search for anything"}
                open={isModalOpen}
                footer={false}
                closeIcon={<LuX />}
                maskClosable={true}
                onCancel={handleClose}
                mask={true}
                width={"max-content"}
            // closable={false}
            >
                {renderSearchWrap()}
            </Modal>

            {/* <Popconfirm
                destroyTooltipOnHide
                title={renderTitle()}
                description={renderSearchWrap()}
                icon={<></>}

                //ok button
                onConfirm={viewAllClick}
                okType="link"
                okText=""
                showCancel={false}
                okButtonProps={{ style: { height: "0" }, type: "text" }}
            >
                {children}
            </Popconfirm> */}
        </Fragment>
    )
}

export default AppSearchModal