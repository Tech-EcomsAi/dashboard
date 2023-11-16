import { Button, Space, Tooltip } from 'antd'
import React, { ReactNode } from 'react'
import styles from './iconButton.module.scss'

const circle = 'circle' // must be const, no annotation. let or var will not work
const round = 'round'
const defaultButton = "defaultButton"

type ButtonType = typeof circle | typeof round | typeof defaultButton
type IconButtonProps = {
    icon: ReactNode,
    active: Boolean,
    onClickButton: any,
    type?: ButtonType,
    disabled?: boolean,
    text?: string,
    tooltip?: string
}

export const WithTooltip = ({ tooltip, children }) => {
    return tooltip ? <Tooltip title={tooltip} color={'#8892b0'} key='3'>{children}</Tooltip> : <>{children}</>
}

function IconButton({ icon, active, onClickButton, type = "defaultButton", disabled = false, text = '', tooltip = '' }: IconButtonProps) {
    return (
        <>
            <WithTooltip tooltip={tooltip}>
                <Button
                    className={`${styles.iconButtonWrap} ${styles[type || "square"]}`}
                    type={active ? "primary" : "default"}
                    onClick={onClickButton}
                    shape={type == "defaultButton" ? "default" : type}
                    icon={icon}
                >
                    {text && <Space>{text}</Space>}
                </Button>
            </WithTooltip>
        </>
    )
}

export default IconButton