import { Slider, theme } from 'antd'
import React from 'react'
import styles from './sliderComponent.module.scss';

const SliderComponent = ({ value, onChange, min, max, step }: any) => {
    const { token } = theme.useToken();

    return (
        <Slider
            min={min}
            max={max}
            className={styles.sliderComponentWrap}
            defaultValue={value}
            style={{ width: '92%', background: 'unset' }}
            railStyle={{ background: token.colorTextLabel }}
            trackStyle={{ background: token.colorPrimaryActive }}
            handleStyle={{ color: token.colorErrorActive }}
            onChange={onChange}
            value={value}
            step={step}
        // tooltip={{
        //     open: true,
        // }}
        />
    )
}

export default SliderComponent