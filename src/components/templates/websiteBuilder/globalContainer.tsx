import React, { useEffect } from 'react'
import styles from '@templatesCSS/websiteBuilder/globalContainer.module.scss';
import { useAppSelector } from '@hook/useAppSelector';
import { useAppDispatch } from '@hook/useAppDispatch';
import deepMerge from '@util/deepMerge';
import { getSiteConfig, updateSiteConfig } from '@reduxSlices/siteConfig';
import SiteConfig from '@type/siteConfig';
import defaultSiteConfig from 'src/data/defaultSiteConfig';
import BackgroundEditor from '@organisms/editor/backgroundEditor';
import { PADDING } from '@constant/editorStylesProperties';
import DirectionProperty from '@molecules/styleElement/directionProperty';
import ColorPresets from '@organisms/colorPresets';
import { removeObjRef } from '@util/utils';

function GlobalContainer() {

    const siteConfig: SiteConfig = useAppSelector(getSiteConfig);
    const dispatch = useAppDispatch();
    const clientConfig = {};//fetch this from api wrt client

    // useEffect(() => {
    //     console.log("siteConfig", siteConfig)
    // }, [siteConfig])


    useEffect(() => {
        //merge defaultSiteConfig from redux slice(src/data/defaultSiteConfig) and current saved state of siteConfig
        const defaultAndProvidedConfigMerged = deepMerge(siteConfig || defaultSiteConfig, clientConfig);
        dispatch(updateSiteConfig(defaultAndProvidedConfigMerged));
    }, [])

    const onBackgroundChange = (value) => {
        dispatch(updateSiteConfig(removeObjRef(value)));
    }

    const handleStyleChange = (property, value) => {
        const configCopy = removeObjRef(siteConfig);
        configCopy.style = { ...configCopy.style, [property]: value };
        dispatch(updateSiteConfig(configCopy));
    };

    const handleColorsChange = (value) => {
        const configCopy = removeObjRef(siteConfig);
        configCopy.colors = [...value];
        dispatch(updateSiteConfig(configCopy));
    };

    return (
        <div className={styles.globalContainer}>
            <div className={styles.propertyWrap}>
                <BackgroundEditor component={'GLOBAL_BG'} config={siteConfig} onConfigUpdate={(value) => onBackgroundChange(value)} />
            </div>

            <div className={styles.propertyWrap}>
                <DirectionProperty propertyType={PADDING} value={siteConfig?.style?.padding} onChange={(property, value) => handleStyleChange(property, value)} />
            </div>

            <div className={styles.propertyWrap}>
                <ColorPresets config={siteConfig.colors} onConfigUpdate={(value) => handleColorsChange(value)} />
            </div>
        </div>
    )
}

export default GlobalContainer