import React, { useEffect, useState } from 'react'
import { fabric } from "fabric";
import styles from '@objectPropertiesEditor/objectPropertiesEditor.module.scss';
import { Slider, theme } from 'antd';
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';

type pageProps = {
    onChange: any,
    value: any,
    max: number,
    label?: string
}

function Corner({ onChange, value, max, label = 'Corner' }: pageProps) {
    const { token } = theme.useToken();
    return (
        <div className={`${styleElementCSS.styleWrap} ${styles.imageBlurWrap}`} style={{ color: token.colorTextBase }}>
            <div className={`${styleElementCSS.label}  ${styles.imageBlurLabel}`}>{label}</div>
            <div className={`${styleElementCSS.elementWrap} ${styles.imageBlurContent}`}>
                <Slider
                    min={0}
                    max={max || 100}
                    className={styles.siderWrap}
                    defaultValue={value}
                    style={{ width: '100%' }}
                    railStyle={{ background: token.colorBgMask, }}
                    trackStyle={{ background: `black`, }}
                    onChange={(value) => onChange(value)}
                    value={value}
                    step={5}
                />
            </div>
        </div>
    )
}

export default Corner