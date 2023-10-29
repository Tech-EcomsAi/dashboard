import React, { useState } from 'react'
import styles from './boxShadow.module.scss';
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import { Select } from 'antd';

function BoxShadow({ onChange, value }) {

    const [shadow, setShadow] = useState(value);

    const optionsList = [
        { label: 'Soft Shadow', value: 'rgba(0, 0, 0, 0.2) 0px 1px 5px 0px' },
        { label: 'Mid Shadow', value: 'rgba(0, 0, 0, 0.4) 0px 1px 5px' },
        { label: 'Hard Shadow', value: 'rgba(0, 0, 0, 0.7) 0px 1px 5px' },
        { label: 'Far Shadow', value: 'rgba(0, 0, 0, 0.1) 0px 8px 1px' },
        { label: 'Blury Shadow', value: 'rgba(0, 0, 0, 0.2) 0px 0px 25px, rgba(0, 0, 0, 0.2) 0px 0px 15px, rgba(0, 0, 0, 0.4) 0px 0px 3px' },
        { label: 'Dark With Heighlight Shadow', value: 'rgba(0, 0, 0, 0.4) 0px 0px 25px, rgba(255, 255, 255, 0.2) 0px 0px 15px, rgba(255, 255, 255, 0.4) 0px 0px 3px' },
        { label: 'Soft Inner', value: 'rgba(0, 0, 0, 0.2) 0px 1px 5px inset' },
        { label: 'Mid Inner Shadow', value: 'rgba(0, 0, 0, 0.4) 0px 1px 5px inset' },
        { label: 'Hard Inner Shadow', value: 'rgba(0, 0, 0, 0.7) 0px 1px 5px inset' },
    ]

    const onChangeValue = (from, value) => {
        const shadowCopy = { ...shadow };
        shadowCopy[from] = value;
        setShadow(shadowCopy);
        onChange('boxShadow', value)
    }
    return (
        <div className={`${styleElementCSS.styleWrap}`}>
            <div className={styleElementCSS.label}>Box Shadow</div>
            <div className={`${styleElementCSS.elementWrap}`}>
                <Select
                    showSearch
                    defaultValue={optionsList[0].value}
                    style={{ width: '100%' }}
                    onChange={(value) => onChangeValue('size', value)}
                    options={optionsList}
                />
            </div>
        </div>
    )
}

export default BoxShadow