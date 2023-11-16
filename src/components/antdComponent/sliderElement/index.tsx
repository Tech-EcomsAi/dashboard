import { Slider, theme } from 'antd'
import React from 'react'
import styles from './sliderElement.module.scss'

type SliderComponentPropsType = {
    value: number,
    onChange: any,
    min: number,
    max: number,
    step: number
}

function SliderElement({ value, onChange, min, max, step }: SliderComponentPropsType) {
    const { token } = theme.useToken();
    return (
        <Slider
            min={min}
            max={max}
            className={styles.sliderElementWrap}
            defaultValue={value}
            onChange={onChange}
            value={value}
            step={step}
            styles={{
                track: {
                    background: token.colorPrimary
                },
                rail: {
                    background: token.colorTextDescription
                },
                handle: {
                    background: "red"
                }
            }}
        />
    )
}

export default SliderElement