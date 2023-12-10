import { Button } from 'antd'
import React from 'react'

function ActionIconButton({ size = 15, icon }) {
    const Icon = icon
    return <Button icon={<Icon style={{ fontSize: size }} />} type='text' />
}

export default ActionIconButton