"use client"
import React, { useEffect, useState } from 'react'
import { Avatar, Badge, Button, Divider, Layout, theme } from 'antd';
const { Header, Content } = Layout;
import styles from './headerComponent.module.scss'
import { LuBell, LuGrid, LuMessageSquare, LuPlusSquare, LuSearch, LuUser } from 'react-icons/lu';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import NotificationsModal from '@organisms/headerComponent/notificationsModal';
import MessagesModal from '@organisms/headerComponent/messagesModal';
import AppActionsModal from './appActionsModal';
import { TbApps } from 'react-icons/tb';
import { RiAppsLine } from 'react-icons/ri';
import AppSearchModal from './appSearchModal';
import { BsUiChecksGrid } from 'react-icons/bs';
import { IoGridOutline } from 'react-icons/io5';

const BadgeRenderer = ({ dotted, count, overflowCount, children }) => {
    return <Badge size="small" dot={dotted} count={count} overflowCount={overflowCount} style={{ top: "3px", right: "8px", background: "red" }}> {children}</Badge>
}

function HeaderComponent() {

    const { token } = theme.useToken();
    const session = useSession();
    const [userData, setUserData] = useState<any>(session?.data?.user)
    const [showSearchModal, setShowSearchModal] = useState(false)
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
                background: token.colorBgBase,
                color: token.colorTextBase,
                borderBottom: `1px solid ${token.colorBorder}`
            }}
        >
            <div className={styles.breadcrumbsWrap}>
                Dashboard . Users
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

                <Divider type='vertical' plain style={{ height: "32px", margin: "0", borderInlineStartWidth: "2px", top: "2px", }} />

                {/* Profile */}
                <div className={styles.profileWrap}>
                    {Boolean(userData)
                        ?
                        <Badge dot={true} style={{ top: "3px", right: "8px", background: "green" }}>
                            {userData?.image ? <Image src={userData?.image || ''} alt={''} height={32} width={32} /> : <Avatar >DG</Avatar>}
                        </Badge>
                        :
                        <Button size='middle' type="text" icon={<LuUser />} onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000/builder' })} />}
                </div>
            </div>
        </div>
    )
}

export default HeaderComponent