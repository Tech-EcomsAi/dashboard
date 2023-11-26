"use client"
import React, { Fragment, ReactNode, useEffect, useState } from 'react'
import { Avatar, Badge, Button, Divider, Layout, Space, Tooltip, message, theme } from 'antd';
const { Header, Content } = Layout;
import styles from './headerComponent.module.scss'
import { LuBell, LuMessageSquare, LuPanelLeftClose, LuPanelLeftOpen, LuPanelRightClose, LuSearch, LuUser } from 'react-icons/lu';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import NotificationsModal from '@organisms/headerComponent/notificationsModal';
import MessagesModal from '@organisms/headerComponent/messagesModal';
import AppActionsModal from './appActionsModal';
import { TbApps } from 'react-icons/tb';
import { RiArrowLeftDoubleFill, RiArrowRightDoubleLine } from 'react-icons/ri';
import AppSearchModal from './appSearchModal';
import { useAppSelector } from '@hook/useAppSelector';
import { BreadcrumbType, getAppBreadcrumbsState, getDarkModeState, getHeaderBgBlurState, getHeaderPositionState, getShowDateInHeaderState, getShowUserDetailsInHeaderState, getSidebarState, toggleSidbar } from '@reduxSlices/clientThemeConfig';
import { useAppDispatch } from '@hook/useAppDispatch';
import TextElement from '@antdComponent/textElement';

const BadgeRenderer = ({ dotted, count, overflowCount, children }) => {
    return <Badge size="small" dot={dotted} count={count} overflowCount={overflowCount} style={{ top: "3px", right: "8px", background: "red" }}> {children}</Badge>
}

const HeaderComponent = () => {

    const { token } = theme.useToken();
    const session = useSession();
    const [userData, setUserData] = useState<any>(session?.data?.user)
    const [showSearchModal, setShowSearchModal] = useState(false)
    const fixedHeader = useAppSelector(getHeaderPositionState)
    const headerBgBlured = useAppSelector(getHeaderBgBlurState)
    const isDarkMode = useAppSelector(getDarkModeState);
    const isCollapsed = useAppSelector(getSidebarState);
    const showDateInHeader = useAppSelector(getShowDateInHeaderState);
    const showUserDetailsInHeader = useAppSelector(getShowUserDetailsInHeaderState);
    const breadcrumbs = useAppSelector(getAppBreadcrumbsState) || [];
    const dispatch = useAppDispatch();

    const onClickBreadCrumb = (e, nav) => {
        message.open({ content: `${nav} clicked` })
        e.stopPropagation()
        e.preventDefault()
    }

    const bbredcrumbsDummy = [
        // { key: 1, path: '', title: <LuHome />, onClick: (e) => onClickBreadCrumb(e, 1) },
        { key: 2, path: '', title: 'Dashboard', onClick: (e) => onClickBreadCrumb(e, 2) },
        { key: 3, path: '', title: 'Sales', onClick: (e) => onClickBreadCrumb(e, 3) },
    ]

    const [notifications, setNotifications] = useState([
        { type: "Order", description: "New Order Placed", isReaded: false, status: "success" },
        { type: "Order", description: "New Order Placed Failed", isReaded: false, status: "fail" }
    ])

    const [unreadMessages, setUnreadMessages] = useState([
        { type: "Order", description: "New Order Placed", isReaded: false, status: "success" },
        { type: "Order", description: "New Order Placed Failed", isReaded: false, status: "fail" }
    ])

    useEffect(() => {
        setUserData(session?.data?.user)
    }, [session])

    return (
        <div className={styles.headerComponentWrap}
            style={{
                background: headerBgBlured ? token.colorBgBlur : token.colorBgBase,
                color: token.colorTextBase,
                borderBottom: `1px solid ${token.colorBorder}`,
                position: fixedHeader ? "sticky" : "static",
                backdropFilter: headerBgBlured ? "blur(20px)" : "none"
            }}
        >
            <div className={styles.breadcrumbsWrap}>
                <Space align='center'>
                    <Button icon={isCollapsed ? <LuPanelLeftOpen /> : <LuPanelLeftClose />} type='text' style={{ padding: "0", fontSize: "20px" }} onClick={() => dispatch(toggleSidbar(!isCollapsed))} />
                    <Space >
                        {bbredcrumbsDummy.map((breadcrumb: BreadcrumbType, i: number) => {
                            return <Fragment key={i}>
                                {i != 0 && i !== breadcrumbs.length - 1 && <>/</>}
                                <Button style={{ padding: "0", fontWeight: 600, fontSize: 14, fontStyle: "" }} type='text' onClick={i !== (breadcrumbs.length - 1) ? breadcrumb.onClick : () => { }}>{breadcrumb.title}</Button>
                            </Fragment>
                        })}
                    </Space>
                </Space>
            </div>
            <div className={styles.rightActionsWrap}>
                <div className={styles.actionsWrap}>
                    <Button size='middle' type="text" icon={<LuSearch />} onClick={() => setShowSearchModal(!showSearchModal)} />
                    <AppSearchModal onClose={() => setShowSearchModal(!showSearchModal)} isModalOpen={showSearchModal}>
                    </AppSearchModal>

                    {/* Quick app actions */}
                    <AppActionsModal notifications={notifications}>
                        <Button size='middle' type="text" icon={<TbApps />} />
                    </AppActionsModal>

                    {/* Notofications */}
                    <BadgeRenderer dotted={true} count={notifications.length} overflowCount={9} >
                        <NotificationsModal notifications={notifications}>
                            <Button size='middle' type="text" icon={<LuBell />} />
                        </NotificationsModal>
                    </BadgeRenderer>

                    {/* Messages */}
                    <BadgeRenderer dotted={true} count={11} overflowCount={9} >
                        <MessagesModal unreadMessages={unreadMessages}>
                            <Button size='middle' type="text" icon={<LuMessageSquare />} />
                        </MessagesModal>
                    </BadgeRenderer>
                </div>

                {showDateInHeader && <div className={`${styles.actionsWrap} ${styles.dateWrap}`}>
                    <TextElement styles={{ margin: "7px 0 0 0", fontSize: "12px", lineHeight: "12px" }} text={'12-12-2023'} color={token.colorPrimary} size={"medium"} />
                    <TextElement styles={{ margin: "unset", fontSize: "10px" }} text={'Monday'} color={token.colorTextBase} />
                </div>}

                <Divider type='vertical' plain style={{ height: "32px", margin: "0", borderInlineStartWidth: "2px", top: "2px", }} />

                {/* Profile */}
                <div className={styles.profileWrap}>
                    {showUserDetailsInHeader && <div className={`${styles.actionsWrap} ${styles.dateWrap}`}>
                        <TextElement styles={{ margin: "7px 0 0 0", fontSize: "12px", lineHeight: "12px" }} text={`${userData.name}`} color={token.colorPrimary} size={"medium"} />
                        <TextElement styles={{ margin: "unset", fontSize: "10px" }} text={`${userData.email}`} color={token.colorTextBase} />
                    </div>}
                    {Boolean(userData)
                        ?
                        <Badge dot={true} style={{ top: "3px", right: "8px", background: "green" }}>
                            {userData?.image ? <Image src={userData?.image || ''} alt={''} height={32} width={32} /> : <Avatar >DG</Avatar>}
                        </Badge>
                        :
                        <Button size='middle' type="text" icon={<LuUser />} onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000/builder' })} />}
                </div>
            </div>
        </div >
    )
}

export default HeaderComponent