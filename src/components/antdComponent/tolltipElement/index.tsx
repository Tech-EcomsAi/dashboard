import { Tooltip, theme } from 'antd'
import React, { ReactNode } from 'react'

type TooltipPropsType = {
    title: string,
    children: any,
    styles?: any
}

function TolltipElement({ title = "", children }: TooltipPropsType) {
    return (
        <Tooltip title={title} key={Math.random()}>{children}</Tooltip>
    )
}

export default TolltipElement