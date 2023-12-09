"use client"
import React, { Fragment, Suspense, useCallback, useEffect, useState } from 'react'
import { Avatar, Badge, Button, Divider, Dropdown, Space, theme } from 'antd';
import styles from './headerComponent.module.scss'
import { LuBell, LuHome, LuLoader, LuMessageSquare, LuPanelLeftClose, LuPanelLeftOpen, LuSearch, LuUser } from 'react-icons/lu';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import NotificationsModal from '@organisms/headerComponent/notificationsModal';
import MessagesModal from '@organisms/headerComponent/messagesModal';
import AppActionsModal from './appActionsModal';
import { TbApps, TbChevronRight } from 'react-icons/tb';
import AppSearchModal from './appSearchModal';
import { useAppSelector } from '@hook/useAppSelector';
import { BreadcrumbSubpathsType, BreadcrumbType, getHeaderBgBlurState, getHeaderPositionState, getShowDateInHeaderState, getShowUserDetailsInHeaderState, getSidebarState, toggleSidbar } from '@reduxSlices/clientThemeConfig';
import { useAppDispatch } from '@hook/useAppDispatch';
import TextElement from '@antdComponent/textElement';
import ProfileActionsModal from './profileActionsModal';
import { usePathname } from 'next/navigation';
import { removeObjRef } from '@util/utils';
import { FaChevronRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation'
import { AiOutlineRight } from 'react-icons/ai';
import { HOME_ROUTING } from '@constant/navigations';
import AppBreadcrumb from './appBreadcrumb/appBreadcrumb';

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
    const router = useRouter();

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
            <AppBreadcrumb />
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