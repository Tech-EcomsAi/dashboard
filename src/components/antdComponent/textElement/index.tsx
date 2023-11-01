import { Typography } from 'antd';
import React from 'react'

type TextElementProps = {
    text: string,
    color: string
}
function TextElement({ text, color }: TextElementProps) {

    const { Text } = Typography;

    return (
        <Text style={{ color }}>
            {text}
        </Text>
    )
}

export default TextElement