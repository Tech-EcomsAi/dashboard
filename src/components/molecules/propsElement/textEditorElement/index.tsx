import React, { useState } from 'react'
import styles from './textElement.module.scss';
import { Input, theme } from 'antd';
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import TextElement from '@antdComponent/textElement';
import Saperator from '@atoms/Saperator';

const { TextArea } = Input;

function TextEditorElement({ value, onChange, label = '', placeholder, minRows = 1, maxRows = 3 }: any) {
    const [activeValue, setActiveValue] = useState(value)
    const { token } = theme.useToken();
    const onChangeValue = (value: any) => {
        onChange(value);
        setActiveValue(value);
    }
    return (
        <div className={`${styleElementCSS.styleWrap}`}>
            {label && <TextElement text={label} color={token.colorTextBase} size={"medium"} />}
            <div className={`${styleElementCSS.elementWrap}`}>
                <TextArea
                    autoSize
                    value={activeValue}
                    onChange={(e) => onChangeValue(e.target.value)}
                    placeholder={placeholder}
                // autoSize={{ minRows, maxRows }}
                />
            </div>
            <Saperator />
        </div>
    )
}

export default TextEditorElement