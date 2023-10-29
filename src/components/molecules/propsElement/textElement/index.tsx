import React, { useState } from 'react'
import styles from './textElement.module.scss';
import { Input } from 'antd';
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';

const { TextArea } = Input;

function TextElement({ value, onChange, label = '', placeholder, minRows = 1, maxRows = 3 }: any) {
    const [activeValue, setActiveValue] = useState(value)

    const onChangeValue = (value: any) => {
        onChange(value);
        setActiveValue(value);
    }
    return (
        <div className={`${styleElementCSS.styleWrap}`}>
            {label && <div className={styleElementCSS.label}>{label}</div>}
            <div className={`${styleElementCSS.elementWrap}`}>
                <TextArea
                    value={activeValue}
                    onChange={(e) => onChangeValue(e.target.value)}
                    placeholder={placeholder}
                    autoSize={{ minRows, maxRows }}
                />
            </div>
        </div>
    )
}

export default TextElement