import { Typography } from 'antd';
import React from 'react'

type TextSize = "small" | "medium" | "large";

type TextElementProps = {
    text: string,
    color: string,
    size?: TextSize | number,
    weight?: number
}
function TextElement({ text, color, size = "medium", weight = 400 }: TextElementProps) {

    const { Text } = Typography;
    let fontSize = 14;
    let fontWeight = 400;
    switch (size) {
        case "small":
            fontSize = 12;
            fontWeight = 200;
            break;
        case "medium":
            fontSize = 14;
            fontWeight = 400;
            break;
        case "large":
            fontSize = 16;
            fontWeight = 600;
            break;
        default:
            fontSize = size;
            fontWeight = weight;
            break;
    }

    return (
        <Text style={{ color, fontSize: `${fontSize}px`, fontWeight, letterSpacing: 0.3 }}>
            {text}
        </Text>
    )
}

export default TextElement