import { Select, theme } from 'antd'
import React, { useEffect, useState } from 'react'
import styles from './border.module.scss'
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import ColorPickerComponent from '../colorPicker';
import { BORDER } from '@constant/editorStylesProperties';
import { NO_COLOR_VALUE } from '@constant/common';
import TextElement from '@antdComponent/textElement';
import Saperator from '@atoms/Saperator';

const sizeList = [
    { label: '1', value: '1px' },
    { label: '3', value: '3px' },
    { label: '5', value: '5px' },
    { label: '6', value: '6px' },
    { label: '7', value: '7px' },
    { label: '8', value: '8px' },
    { label: '9', value: '9px' },
    { label: '10', value: '10px' }
]

const typeList = [
    { label: 'Solid', value: 'solid' },
    { label: 'Dashed', value: 'dashed' },
    { label: 'Dotted', value: 'dotted' }
]

function Border({ onChange, value }) {

    const [border, setBorder] = useState<any>();
    const { token } = theme.useToken();
    useEffect(() => {
        if (value) {
            const propertyValues = {
                size: value.split(' ')[0],
                type: value.split(' ')[1],
                color: value.split(' ')[2]
            };
            setBorder(propertyValues);
        }
    }, [value])

    const onChangeValue = (from, value) => {
        const borderCopy = { ...border };
        borderCopy[from] = value;
        onChange(BORDER, `${borderCopy.size || '1px'} ${borderCopy.type || 'solid'} ${borderCopy.color || NO_COLOR_VALUE}`)
    }

    const onReset = () => {
        onChange(BORDER, `${'0px'} ${border.type} ${border.color}`)
    }

    return (
        <div className={`${styleElementCSS.styleWrap} ${styles.borderWrap}`}>
            <TextElement text={'Border'} size={"medium"} />
            <div className={`${styleElementCSS.elementWrap} ${styles.elementWrap}`}>
                <div className={`${styleElementCSS.styleWrap} ${styles.borderItemWrap}`}>
                    <TextElement text={'Size'} />
                    <div className={styleElementCSS.elementWrap}>
                        <Select
                            showSearch
                            defaultValue={sizeList[0].value}
                            style={{ width: '100%' }}
                            onChange={(value) => onChangeValue('size', value)}
                            value={border?.size}
                            options={sizeList}
                        />
                    </div>
                </div>
                <div className={`${styleElementCSS.styleWrap} ${styles.borderItemWrap}`}>
                    <TextElement text={'Type'} />
                    <div className={styleElementCSS.elementWrap}>
                        <Select
                            defaultValue={typeList[0].value}
                            style={{ width: '100%' }}
                            onChange={(value) => onChangeValue('type', value)}
                            value={border?.type}
                            options={typeList}
                        />
                    </div>
                </div>
                <div className={`${styleElementCSS.styleWrap} ${styles.borderItemWrap}`}>
                    <TextElement text={'Color'} />
                    <div className={styleElementCSS.elementWrap}>
                        {border && <ColorPickerComponent parentStyles={{ margin: 'unset' }} hideColorString hideTransparency value={{ format: 'hex', color: border?.color }} onChange={(value) => onChangeValue('color', value.color)} />}
                    </div>
                </div>
                <div className={`${styleElementCSS.styleWrap} ${styles.borderItemWrap} ${styles.resetValuesWrap}`}>
                    <div className={`${styleElementCSS.label} ${styles.label}`}></div>
                    <div onClick={onReset} className={`${styleElementCSS.elementWrap}  ${styles.resetValues} ${border?.size == '0px' ? styles.active : ''}`}>
                        Unset
                    </div>
                </div>
            </div>
            <Saperator />
        </div>
    )
}

export default Border