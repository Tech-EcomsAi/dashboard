import { Select, Spin } from 'antd'
import React, { useState } from 'react'
import styles from './fontFamily.module.scss'
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import { useAppDispatch } from '@hook/useAppDispatch';
import FontFaceObserver from 'fontfaceobserver';
import { IMAGE_EDITOR_PAGE } from '@constant/common';
const { Option } = Select;

export default function FontFamily({ size = 'middle', currentPage = '', showLabel = true, value, onChange, style = {} }) {

    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useAppDispatch()
    const optionsList = [
        { label: 'Poppins', value: 'Poppins' },
        { label: 'Abuget', value: 'Abuget' },
        { label: 'AlexisMarie', value: 'AlexisMarie' },
        { label: 'Allura', value: 'Allura' },
        { label: 'Antonio', value: 'Antonio' },
        { label: 'ArgoFlats', value: 'ArgoFlats' },
        { label: 'Bakery', value: 'Bakery' },
        { label: 'Blackjack', value: 'Blackjack' },
        { label: 'Claredon', value: 'Claredon' },
        { label: 'Domaine', value: 'Domaine' },
        { label: 'Enchanting', value: 'Enchanting' },
        { label: 'Fontspring', value: 'Fontspring' },
        { label: 'Gothic', value: 'Gothic' },
        { label: 'Lhandw', value: 'Lhandw' },
        { label: 'Manta', value: 'Manta' },
        { label: 'Mvboli', value: 'Mvboli' },
        { label: 'Philosopher', value: 'Philosopher' },
        { label: 'Thunder', value: 'Thunder' },
        { label: 'Wayfarer', value: 'Wayfarer' }
    ]

    const onChangeValue = (value) => {
        if (currentPage == IMAGE_EDITOR_PAGE) changeFontFamily(value)
        else onChange('fontFamily', value)
    }

    const changeFontFamily = (fontName) => {
        if (!fontName) return;
        setIsLoading(true)
        // font loading for canvas
        const font = new FontFaceObserver(fontName);
        font.load(null, 150000).then(() => {
            onChange('fontFamily', fontName)
            setIsLoading(false)
        }).catch((err) => {
            console.log(err);
            setIsLoading(false)
        });
    }

    return (
        <div className={`styleElement ${styleElementCSS.styleWrap} ${styles.fontFamilyElementWrap}`} style={style}>
            {showLabel && <div className={`${styleElementCSS.label} ${styles.label}`}>Font Family</div>}
            <div className={styleElementCSS.elementWrap}>
                <Select
                    size={size == 'middle' ? 'middle' : 'small'}
                    showSearch
                    defaultValue={value}
                    style={{ width: '100%' }}
                    onChange={(value) => onChangeValue(value)}
                    optionLabelProp="label"
                    value={value}
                >
                    {optionsList.map((option, i) => {
                        return <Option key={option.label} value={option.value} label={option.value}>
                            <span style={{ fontFamily: option.value }}>
                                {option.label}
                            </span>
                        </Option>
                    })}

                </Select>
            </div>
            {isLoading && <div className={styles.fontLoadingWrap}>
                <Spin tip="Loading Font" size="large">
                    <div className="content" />
                </Spin>
            </div>}
        </div>
    )
}
