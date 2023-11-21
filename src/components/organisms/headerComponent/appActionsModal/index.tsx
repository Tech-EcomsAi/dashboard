import React, { Fragment, useState } from 'react'
import { Button, Card, Divider, Popconfirm, Space, message, theme } from 'antd'
import TextElement from '@antdComponent/textElement'
import { LuActivity, LuAlarmPlus, LuBanknote, LuCalendar, LuCheckCircle, LuImagePlus, LuPlus, LuSettings, LuUser, LuUserPlus, LuX } from 'react-icons/lu'
import { useRouter } from 'next/navigation'
import { HOME_ROUTING, NAVIGARIONS_ROUTINGS } from '@constant/navigations'
import styles from './appActionsModal.module.scss'
import IconButton from '@antdComponent/iconButton'
import { useAppDispatch } from '@hook/useAppDispatch'
import { toggleAppSettingsPanel } from '@reduxSlices/clientThemeConfig'

function AppActionsModal({ children, notifications }) {
    const [isLoading, setIsLoading] = useState(false)
    const { token } = theme.useToken();
    const router = useRouter();
    const [hoverId, setHoverId] = useState(null)
    const dispatch = useAppDispatch()

    const ACTIONS_LIST = [
        { title: "My Profile", icon: <LuUser />, onClick: () => { } },
        { title: "Image Editor", icon: <LuImagePlus />, onClick: () => { } },
        { title: "Settings", icon: <LuSettings />, onClick: () => dispatch(toggleAppSettingsPanel(true)) },
        { title: "Add User", icon: <LuUserPlus />, onClick: () => { } },
        { title: "Add Note", icon: <LuBanknote />, onClick: () => { } },
        { title: "Add Product", icon: <LuPlus />, onClick: () => { } },
        { title: "Add Reminder", icon: <LuAlarmPlus />, onClick: () => { } },
        { title: "Appointment", icon: <LuCalendar />, onClick: () => { } },
        { title: "Add Note", icon: <LuBanknote />, onClick: () => { } },
        { title: "Add Product", icon: <LuPlus />, onClick: () => { } },
        { title: "Add Reminder", icon: <LuAlarmPlus />, onClick: () => { } },
        { title: "Appointment", icon: <LuCalendar />, onClick: () => { } },
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

    const renderTitle = () => {
        return <Space direction='vertical' size={0}>
            <Space size={170} align='baseline'>
                <Space size={0} align='center'>
                    <TextElement size={"medium"} text={'Quick Actions Menu'} color={token.colorTextBase} />
                </Space>
                <Button icon={<LuX />} type='default' size='small' shape='circle' onClick={closeModalForceFully} />
            </Space>
            <Divider style={{ margin: "6px 0 10px" }} />
        </Space>
    }

    const renderAppActions = () => {
        return <div className={styles.appActionsWrap}>
            {ACTIONS_LIST.map((action, i) => {
                return <Card key={i} className={styles.actionCard}
                    onClick={() => onClickAction(action)}
                    bodyStyle={{ padding: "unset" }}
                    size='small'
                    type='inner'
                    hoverable
                    style={{ background: action.title == hoverId ? token.colorBgTextHover : token.colorBgBase }}
                    onMouseEnter={() => setHoverId(action.title)}
                    onMouseLeave={() => setHoverId('')}
                >
                    <Space direction='vertical' align='center'>
                        <Button icon={action.icon} size='large' shape='circle' type='dashed' style={{ fontSize: "18px", color: token.colorPrimary }} />
                        <TextElement text={action.title} color={token.colorTextLabel} styles={{ textAlign: "center", display: "block", marginBottom: "0px" }} />
                    </Space>
                </Card>
            })}
        </div>
    }

    return (
        <Fragment>
            <Popconfirm
                // title={"Unseen Notifications"}
                placement="bottomRight"
                destroyTooltipOnHide
                title={renderTitle()}
                description={renderAppActions()}
                // open={isOpen}
                icon={<></>}
                //ok button
                okText=""
                okType='text'

                overlayInnerStyle={{ padding: "5px 5px 5px 12px" }}
                // showCancel={false}
                okButtonProps={{ style: { height: "0" }, type: "text" }}
                cancelButtonProps={{ style: { height: "0" }, type: "text", id: "modal-close-btn" }}
                cancelText=""
            >
                {children}
            </Popconfirm>
        </Fragment>
    )
}

export default AppActionsModal