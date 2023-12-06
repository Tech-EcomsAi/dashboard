"use client"
import React, { Fragment, Suspense, useCallback, useEffect, useState } from 'react'
import { Avatar, Badge, Button, Divider, Dropdown, Space, theme } from 'antd';
import styles from './headerComponent.module.scss'
import { LuBell, LuLoader, LuMessageSquare, LuPanelLeftClose, LuPanelLeftOpen, LuSearch, LuUser } from 'react-icons/lu';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import NotificationsModal from '@organisms/headerComponent/notificationsModal';
import MessagesModal from '@organisms/headerComponent/messagesModal';
import AppActionsModal from './appActionsModal';
import { TbApps, TbChevronRight } from 'react-icons/tb';
import AppSearchModal from './appSearchModal';
import { useAppSelector } from '@hook/useAppSelector';
import { BreadcrumbSubpathsType, BreadcrumbType, getAppBreadcrumbsState, getHeaderBgBlurState, getHeaderPositionState, getShowDateInHeaderState, getShowUserDetailsInHeaderState, getSidebarState, toggleSidbar } from '@reduxSlices/clientThemeConfig';
import { useAppDispatch } from '@hook/useAppDispatch';
import TextElement from '@antdComponent/textElement';
import ProfileActionsModal from './profileActionsModal';
import { usePathname } from 'next/navigation';
import { NavItemType, SIDEBAR_NAV_MENUS } from '@organisms/sidebar';
import { removeObjRef } from '@util/utils';
import { FaChevronRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation'
import { AiOutlineRight } from 'react-icons/ai';

const BadgeRenderer = ({ dotted, count, overflowCount, children }) => {
    return <Badge size="small" dot={dotted} count={count} overflowCount={overflowCount} style={{ top: "3px", right: "8px", background: "red" }}> {children}</Badge>
}

const HeaderComponent = () => {

    const { token } = theme.useToken();
    const { data: session } = useSession()
    const [userData, setUserData] = useState<any>(Boolean(session?.user) ? session?.user : { name: "", email: "" })
    const [showSearchModal, setShowSearchModal] = useState(false)
    const fixedHeader = useAppSelector(getHeaderPositionState)
    const headerBgBlured = useAppSelector(getHeaderBgBlurState)
    const isCollapsed = useAppSelector(getSidebarState);
    const showDateInHeader = useAppSelector(getShowDateInHeaderState);
    const showUserDetailsInHeader = useAppSelector(getShowUserDetailsInHeaderState);
    const dispatch = useAppDispatch();
    const pathname = usePathname();
    const router = useRouter();

    const onClickBreadCrumb = (selectedKey, parentNav: any) => {
        const newNav: NavItemType = parentNav.subNav.find((nav: NavItemType) => nav.key == selectedKey.key);
        router.replace(newNav.route.split('/')[1])
    }

    const getBredcrumbs = (pathname) => {
        let breadcrumbArray: any = [];
        const navCopy = removeObjRef(SIDEBAR_NAV_MENUS)
        if (pathname.split("/").length > 2) { //reports/sales
            let activeParentNavIndex = -1;
            let activeSubParentnavIndex = -1;
            navCopy.map((navItem: NavItemType, pIndex: number) => {
                if (navItem.subNav) {
                    navItem.subNav.map((subNavItem: any, sIndex) => {
                        delete subNavItem.icon;
                        subNavItem.key = `${pIndex}${sIndex}`
                        if (pathname == `/${subNavItem.route}`) {
                            subNavItem.active = true;
                            activeParentNavIndex = pIndex;
                            activeSubParentnavIndex = sIndex;
                        } else subNavItem.active = false;
                    })
                }
            })
            if (activeParentNavIndex != -1 && activeSubParentnavIndex != -1) {
                let activeParentNav: NavItemType = navCopy[activeParentNavIndex];
                let activeSubParentnav: NavItemType = activeParentNav.subNav[activeSubParentnavIndex];
                breadcrumbArray.push({ key: 1, route: activeParentNav.route, label: activeParentNav.label, subNav: [] })
                breadcrumbArray.push({ key: 2, route: activeSubParentnav.route, label: activeSubParentnav.label, subNav: activeParentNav.subNav })
            }
        } else {
            let activeNav = navCopy.find((nav: NavItemType) => pathname == `/${nav.route}`);
            breadcrumbArray = [
                { key: 1, route: activeNav.route, label: activeNav.label, subNav: [] }
            ]
        }
        return breadcrumbArray;
    }

    const breadcrumbs = useCallback(() => getBredcrumbs(pathname), [pathname])

    const [notifications, setNotifications] = useState([
        { type: "Order", description: "New Order Placed", isReaded: false, status: "success" },
        { type: "Order", description: "New Order Placed Failed", isReaded: false, status: "fail" }
    ])

    const [unreadMessages, setUnreadMessages] = useState([
        { type: "Order", description: "New Order Placed", isReaded: false, status: "success" },
        { type: "Order", description: "New Order Placed Failed", isReaded: false, status: "fail" }
    ])

    useEffect(() => {
        setUserData(session?.user)
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
                    <Button icon={isCollapsed ? <LuPanelLeftOpen /> : <LuPanelLeftClose />} type='dashed' style={{ padding: "0", fontSize: "20px" }} onClick={() => dispatch(toggleSidbar(!isCollapsed))} />
                    <Space size={0}>
                        {breadcrumbs().map((breadcrumb: BreadcrumbType, i: number) => {
                            return <Fragment key={i}>
                                {i != 0 && i !== breadcrumbs.length - 1 && <><TbChevronRight /></>}
                                {breadcrumb.subNav.length != 0 ? <>
                                    <Dropdown menu={{
                                        items: breadcrumb.subNav, onClick: (selectedKey) => onClickBreadCrumb(selectedKey, breadcrumb), selectable: true, defaultSelectedKeys: [`${breadcrumb.subNav.find((breadcrumb: BreadcrumbSubpathsType) => breadcrumb.active)?.key || ''}`],
                                    }}>
                                        <Button style={{ fontSize: 12, border: "unset" }} size='middle' type='default'>
                                            {breadcrumb.subNav.find((breadcrumb: BreadcrumbSubpathsType) => breadcrumb.active).label}
                                        </Button>
                                    </Dropdown>
                                </> : <>
                                    <Button
                                        style={{ fontSize: 12, border: "unset", pointerEvents: "none" }} size='middle'
                                        type='default'
                                        onClick={i !== (breadcrumbs.length - 1) ? breadcrumb.onClick : () => { }}>
                                        {breadcrumb.label}</Button>
                                </>}
                            </Fragment>
                        })}
                    </Space>
                </Space>
            </div>
            <div className={styles.rightActionsWrap}>
                <div className={styles.actionsWrap}>
                    <Button type="text" icon={<LuSearch />} onClick={() => setShowSearchModal(!showSearchModal)} />
                    <AppSearchModal onClose={() => setShowSearchModal(!showSearchModal)} isModalOpen={showSearchModal}>
                    </AppSearchModal>

                    {/* Quick app actions */}
                    <AppActionsModal>
                        <Button type="text" icon={<TbApps />} />
                    </AppActionsModal>

                    {/* Notofications */}
                    <BadgeRenderer dotted={true} count={notifications.length} overflowCount={9} >
                        <NotificationsModal notifications={notifications}>
                            <Button type="text" icon={<LuBell />} />
                        </NotificationsModal>
                    </BadgeRenderer>

                    {/* Messages */}
                    <BadgeRenderer dotted={true} count={11} overflowCount={9} >
                        <MessagesModal unreadMessages={unreadMessages}>
                            <Button type="text" icon={<LuMessageSquare />} />
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
                    {Boolean(userData)
                        ?
                        <>
                            <ProfileActionsModal userData={userData}>
                                {showUserDetailsInHeader && <div className={`${styles.actionsWrap} ${styles.dateWrap}`}>
                                    <TextElement styles={{ margin: "7px 0 0 0", fontSize: "12px", lineHeight: "12px" }} text={`${userData?.name}`} color={token.colorPrimary} size={"medium"} />
                                    <TextElement styles={{ margin: "unset", fontSize: "10px" }} text={`${userData?.email}`} color={token.colorTextBase} />
                                </div>}
                                <Suspense fallback={<div><LuLoader /></div>}>
                                    <Badge dot={true} style={{ top: "3px", right: "8px", background: "green" }}>
                                        {userData?.image ? <Image src={userData?.image || ''} alt={''} height={32} width={32} /> : <Avatar >DG</Avatar>}
                                    </Badge>
                                </Suspense>
                            </ProfileActionsModal>
                        </>
                        :
                        <Button type="text" icon={<LuUser />} onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000/builder' })} />
                    }
                </div>

            </div>
        </div >
    )
}

export default HeaderComponent