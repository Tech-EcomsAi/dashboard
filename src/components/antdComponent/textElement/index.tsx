import { Typography, theme } from 'antd';
import React from 'react'

type TextSize = "small" | "medium" | "large";

type TextElementProps = {
    text: string,
    color?: string,
    size?: TextSize | number,
    styles?: any
}
function TextElement({ text, color = "", size = "small", styles = {} }: TextElementProps) {

    const { Text } = Typography;
    const { token } = theme.useToken();
    let fontSize = 14;
    let fontWeight = 400;
    let textColor = color || token.colorTextBase;
    let fontFamily = "poppins-regular";
    switch (size) {
        case "small":
            fontSize = 12;
            fontWeight = 400;
            textColor = token.colorTextSecondary;
            styles = { marginBottom: "5px", ...styles }
            break;
        case "medium":
            fontSize = 13;
            fontWeight = 600;
            textColor = token.colorTextBase;
            fontFamily = "poppins-regular"
            break;
        case "large":
            fontSize = 14;
            fontWeight = 600;
            textColor = token.colorTextBase;
            break;
        default:
            fontSize = size;
            fontWeight = 500;
            textColor = token.colorTextBase;
            break;
    }

    return (
        <Text
            style={{
                color: color || textColor,
                fontSize: `${fontSize}px`,
                fontWeight,
                letterSpacing: 0.1,
                width: "100%",
                marginBottom: "10px",
                fontFamily,
                ...styles
            }}>
            {text}
        </Text>
    )
}

export default TextElement