import { Button, Space, Tooltip } from 'antd'
import React, { ReactNode } from 'react'
import styles from './iconButton.module.scss'

const circle = 'circle' // must be const, no annotation. let or var will not work
const round = 'round'
const square = 'square'

type ButtonType = typeof circle | typeof round

type IconButtonProps = {
    icon: ReactNode,
    active: Boolean,
    onClickButton: any,
    type?: ButtonType,
    disabled?: boolean,
    text?: string,
    tooltip?: string
}
function IconButton({ icon, active, onClickButton, type, disabled = false, text = '', tooltip = '' }: IconButtonProps) {
    return (
        <>
            {tooltip ? <>
                <Tooltip title={tooltip} color={'#8892b0'} key='3'>
                    <Button
                        className={`${styles.iconButtonWrap} ${styles[type || "square"]}`}
                        type={active ? "primary" : "default"}
                        onClick={onClickButton}
                        shape={type ? type : "default"}
                    >
                        <Space>{text}{icon}</Space>
                    </Button>
                </Tooltip>
            </> : <>
                <Button
                    className={`${styles.iconButtonWrap} ${styles[type]}`}
                    type={active ? "primary" : "default"}
                    onClick={onClickButton}
                    shape={type ? type : "default"}
                >
                    <Space>{text}{icon}</Space>
                </Button>
            </>}
        </>
    )
}

export default IconButton