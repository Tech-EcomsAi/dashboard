import React, { Fragment, useState } from 'react'
import { Avatar, Badge, Button, Card, Popconfirm, Space, message, theme } from 'antd'
import TextElement from '@antdComponent/textElement'
import { LuHelpCircle, LuLogOut, LuSettings, LuSettings2, LuUser } from 'react-icons/lu'
import { useRouter } from 'next/navigation'
import styles from './profileActionsModal.module.scss'
import { useAppDispatch } from '@hook/useAppDispatch'
import { toggleAppSettingsPanel } from '@reduxSlices/clientThemeConfig'
import Image from 'next/image';
import Saperator from '@atoms/Saperator'
import { signOut } from 'next-auth/react'
import { showSuccessToast } from '@reduxSlices/toast'

function ProfileActionsModal({ children, userData = { name: "", email: "", image: "" } }) {
    const [isLoading, setIsLoading] = useState(false)
    const { token } = theme.useToken();
    const router = useRouter();
    const [hoverId, setHoverId] = useState(null)
    const dispatch = useAppDispatch()

    const ACTIONS_LIST = [
        { title: "My Profile", icon: <LuUser />, onClick: () => { } },
        { title: "FAQ", icon: <LuHelpCircle />, onClick: () => { } },
        { title: "Business Settings", icon: <LuSettings />, onClick: () => { } },
        { title: "App Appearance", icon: <LuSettings2 />, onClick: () => dispatch(toggleAppSettingsPanel(true)) },
        { title: "Logout", icon: <LuLogOut />, onClick: () => logoutUser() },
    ]

    const closeModalForceFully = () => {
        const ele: any = document.getElementById("modal-close-btn");
        ele && ele.click();
    }

    const handleClose = () => {
        closeModalForceFully()
    }

    const onClickAction = (action) => {
        action.onClick();
        handleClose()
        message.open({ content: `${action.title} clicked` })
    }

    const logoutUser = () => {
        signOut();
        router.push('/login')
        dispatch(showSuccessToast("User logged out successfuly"))
    }

    const renderProfileActions = () => {
        return <div className={styles.profileActionsWrap}>
            <Space direction='vertical' >
                <Space className={styles.profileHeader} size={10} style={{ background: token.colorBgBlur }} align='start'>
                    <Space className={styles.profileImage}>
                        <Badge dot={true} style={{ top: "0px", right: "0", background: "green" }}>
                            {userData?.image ? <Image src={userData?.image || ''} alt={''} height={42} width={42} /> : <Avatar >DG</Avatar>}
                        </Badge>
                    </Space>
                    <Space direction='vertical' size={0}>
                        <TextElement text={userData.name} color={token.colorPrimaryActive} size={"medium"} />
                        <TextElement text={userData.email} color={token.colorTextLabel} />
                    </Space>
                </Space>
                <Saperator margin='0 0 0px' />
                <div className={styles.actionsWrap} style={{ width: "100%" }}>
                    {ACTIONS_LIST.map((action, i) => {
                        return <Card key={i} className={styles.actionCard}
                            onClick={() => onClickAction(action)}
                            bodyStyle={{ padding: "unset" }}
                            size='small'
                            type='inner'
                            // hoverable
                            style={{ background: action.title == hoverId ? token.colorBgTextHover : token.colorBgBase }}
                            // bordered={false}
                            onMouseEnter={() => setHoverId(action.title)}
                            onMouseLeave={() => setHoverId('')}
                        >
                            <Space align='center' size={0}>
                                <Button icon={action.icon} size='large' type='link' style={{ color: action.title == hoverId ? token.colorTextBase : token.colorTextLabel, fontSize: "16px" }} />
                                <TextElement text={action.title} color={action.title == hoverId ? token.colorTextBase : token.colorTextLabel} />
                            </Space>
                        </Card>
                    })}
                </div>
            </Space>
        </div>
    }

    return (
        <Fragment>
            <Popconfirm
                placement="bottomRight"
                destroyTooltipOnHide
                title={''}
                description={renderProfileActions()}
                icon={<></>}
                okText=""
                okType='text'
                okButtonProps={{ style: { height: "0" }, type: "text" }}
                cancelButtonProps={{ style: { height: "0" }, type: "text", id: "modal-close-btn" }}
                cancelText=""
            >
                {children}
            </Popconfirm>
        </Fragment>
    )
}

export default ProfileActionsModal