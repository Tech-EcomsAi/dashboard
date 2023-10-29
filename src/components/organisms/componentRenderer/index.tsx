import React, { useCallback, useState } from 'react'
import styles from '@organismsCSS/componentRenderer/componentRenderer.module.scss';
import ComponentWrapper from './componentWrapper';
import ComponentsList from '@organisms/sections';

function ComponentRenderer(props) {
    const getComponent = useCallback((componentConfig) => {
        if (typeof ComponentsList[componentConfig.uid] !== "undefined") {
            return React.createElement(ComponentsList[componentConfig.uid], {
                key: componentConfig.uid,
                config: componentConfig,
                currentPage: props.currentPage,
                parentId: props.parentId
            });
        }
        return null;
    }, [])

    return (
        <div className={styles.wrap}>
            <ComponentWrapper {...props}>
                {getComponent(props.componentConfig)}
            </ComponentWrapper>
        </div >
    )
}

export default ComponentRenderer