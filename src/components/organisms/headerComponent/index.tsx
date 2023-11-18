"use client"
import React, { useEffect, useState } from 'react'
import { Avatar, Badge, Button, Divider, Layout, theme } from 'antd';
const { Header, Content } = Layout;
import styles from './headerComponent.module.scss'
import { LuBell, LuMessageSquare, LuPlusSquare, LuSearch, LuUser } from 'react-icons/lu';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const BadgeRenderer = ({ dotted, count, overflowCount, children }) => {
    return <Badge size="small" dot={dotted} count={count} overflowCount={overflowCount} style={{ top: "3px", right: "8px" }}> {children}</Badge>
}

function HeaderComponent() {

    const { token } = theme.useToken();
    const session = useSession();
    const [userData, setUserData] = useState<any>(session?.data?.user)
    const [notifications, setNotifications] = useState([{}])

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
                    <Button size='middle' type="text" icon={<LuPlusSquare />} onClick={() => { }} />
                    <Button size='middle' type="text" icon={<LuSearch />} onClick={() => { }} />
                    {/* Notofications */}
                    <BadgeRenderer dotted={true} count={notifications.length} overflowCount={9} >
                        <Button size='middle' type="text" icon={<LuBell />} onClick={() => { }} />
                    </BadgeRenderer>
                    {/* Messages */}
                    <BadgeRenderer dotted={true} count={11} overflowCount={9} >
                        <Button size='middle' type="text" icon={<LuMessageSquare />} onClick={() => { }} />
                    </BadgeRenderer>
                </div>

                <Divider type='vertical' plain style={{ height: "32px", margin: "0", borderInlineStartWidth: "2px", top: "2px", }} />

                {/* Profile */}
                <div className={styles.profileWrap}>
                    {Boolean(userData)
                        ?
                        <BadgeRenderer dotted={true} count={11} overflowCount={9} >{userData?.image ? <Image src={userData?.image || ''} alt={''} height={32} width={32} /> : <Avatar >DG</Avatar>}</BadgeRenderer>
                        :
                        <Button size='middle' type="text" icon={<LuUser />} onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000/builder' })} />}
                </div>
            </div>
        </div>
    )
}

export default HeaderComponent