import React, { useEffect } from 'react';
import styles from './backgroundColor.module.scss'
import ColorPickerComponent from '../colorPicker';
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';

function BackgroundColor({ value, onChange }: any) {

    const valueSample = [{ color: '#000', format: 'hex' }];

    return (
        <ColorPickerComponent value={value} onChange={onChange} />
    )
}

export default BackgroundColor