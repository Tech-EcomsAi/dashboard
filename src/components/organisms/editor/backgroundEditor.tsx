import React from 'react'
import BackgroundElement from '@molecules/styleElement/backgroundElement';
import { removeObjRef } from '@util/utils';


function BackgroundEditor({ component = '', config, onConfigUpdate }) {

    const configSample = {
        background: {
            value: '#000',
            type: 'Color',
            colors: [{ color: '#000', format: 'hex' }]
        }
    }
    const handleBgChange = (value) => {
        const configCopy = removeObjRef(config);
        configCopy.background = value;
        onConfigUpdate(configCopy);
    };

    return (config ? <BackgroundElement component={component} value={config?.background} onChange={(value) => handleBgChange(value)} /> : null)
}

export default BackgroundEditor