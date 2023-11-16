import React, { useEffect } from 'react'
import styles from '@templatesCSS/websiteBuilder/globalContainer.module.scss';
import { useAppSelector } from '@hook/useAppSelector';
import { useAppDispatch } from '@hook/useAppDispatch';
import deepMerge from '@util/deepMerge';
import defaultSiteConfig from 'src/data/defaultSiteConfig';
import BackgroundEditor from '@organisms/editor/backgroundEditor';
import { PADDING } from '@constant/editorStylesProperties';
import DirectionProperty from '@molecules/styleElement/directionProperty';
import ColorPresets from '@organisms/colorPresets';
import { removeObjRef } from '@util/utils';
import { ActiveTemplateConfigType, getActiveTemplateConfig, updateActiveTemplateConfig } from '@reduxSlices/siteBuilderState';

function GlobalContainer() {

    const activeTemplateConfig: ActiveTemplateConfigType = useAppSelector(getActiveTemplateConfig);
    const dispatch = useAppDispatch();
    const clientConfig = {};//fetch this from api wrt client

    useEffect(() => {
        //merge defaultSiteConfig from redux slice(src/data/defaultSiteConfig) and current saved state of activeTemplateConfig
        const defaultAndProvidedConfigMerged = deepMerge(activeTemplateConfig || defaultSiteConfig, clientConfig);
        dispatch(updateActiveTemplateConfig(defaultAndProvidedConfigMerged));
    }, [])

    const onBackgroundChange = (value) => {
        dispatch(updateActiveTemplateConfig(removeObjRef(value)));
    }

    const handleStyleChange = (property, value) => {
        const configCopy = removeObjRef(activeTemplateConfig);
        configCopy.style = { ...configCopy.style, [property]: value };
        dispatch(updateActiveTemplateConfig(configCopy));
    };

    const handleColorsChange = (value) => {
        const configCopy = removeObjRef(activeTemplateConfig);
        configCopy.colors = [...value];
        dispatch(updateActiveTemplateConfig(configCopy));
    };

    return (
        <div className={styles.globalContainer}>
            <div className={styles.propertyWrap}>
                <BackgroundEditor component={'GLOBAL_BG'} config={activeTemplateConfig} onConfigUpdate={(value) => onBackgroundChange(value)} />
            </div>

            <div className={styles.propertyWrap}>
                <DirectionProperty propertyType={PADDING} value={activeTemplateConfig?.style?.padding} onChange={(property, value) => handleStyleChange(property, value)} />
            </div>

            <div className={styles.propertyWrap}>
                <ColorPresets config={activeTemplateConfig.colors} onConfigUpdate={(value) => handleColorsChange(value)} />
            </div>
        </div>
    )
}

export default GlobalContainer