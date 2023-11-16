import { Select, theme } from 'antd'
import React, { useEffect, useState } from 'react'
import styles from './fontSize.module.scss'
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import { Empty } from 'antd';
import TextElement from '@antdComponent/textElement';

function FontSize({ showLabel = true, value, onChange, style = {} }) {

    const [optionsList, setOptionsList] = useState([])
    const { token } = theme.useToken();
    useEffect(() => {
        const res = [];
        for (let i = 1; i <= 100; i++) {
            res.push({ label: i, value: i })
        }
        setOptionsList(res);
    }, [value])

    const onChangeValue = (value) => {
        onChange('fontSize', value)
    }

    return (
        <div className={`${styleElementCSS.styleWrap} ${styles.fontSizeElementWrap}`} style={style}>
            {showLabel && <TextElement text={"Font Size"} />}
            <div className={styleElementCSS.elementWrap}>
                <Select
                    // notFoundContent={<Empty description=""/>}
                    showSearch
                    defaultValue={value}
                    value={value}
                    style={{ width: '100%' }}
                    onChange={(value) => onChangeValue(value)}
                    options={optionsList}
                />
            </div>
        </div>
    )
}

export default FontSize;
