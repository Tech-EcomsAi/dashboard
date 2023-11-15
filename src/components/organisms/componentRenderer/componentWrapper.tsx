import React, { useState } from 'react'
import styles from '@organismsCSS/componentRenderer/componentRenderer.module.scss';
import { theme } from 'antd';
import { getActiveEditorComponent } from '@reduxSlices/activeEditorComponent';
import { useAppSelector } from '@hook/useAppSelector';
import ComponentActions from './componentActions';
import { BUILDER_PAGE } from '@constant/common';
import { AnimatePresence, motion } from 'framer-motion';

type pageProps = {
    builderState: any,
    lastChild: any,
    index: any,
    uid: any,
    currentPage: any,
    parentId: any,
    children: any,
    deviceType: string
}
function ComponentWrapper({ deviceType, builderState, lastChild, index, uid, currentPage, parentId, children }: pageProps) {
    const activeComponent = useAppSelector(getActiveEditorComponent);
    const { token } = theme.useToken();
    const [hoverId, setHoverId] = useState(null)

    return (
        <div
            onMouseEnter={() => setHoverId(parentId)}
            onMouseLeave={() => setHoverId('')}
            className={`componentContentWrap ${styles.componentContentWrap} ${activeComponent.parentId === parentId ? styles.active : ''} ${lastChild ? styles.lastChild : ''} ${index == 0 ? styles.firstChild : ''}`}
            style={{
                outline: activeComponent.parentId === parentId ? `4px dashed ${token.colorPrimary}` : "unset",
                borderRadius: activeComponent.parentId === parentId ? `5px` : "inherit",
            }}>
            <AnimatePresence>
                {currentPage == BUILDER_PAGE && (activeComponent.parentId === parentId || hoverId === parentId) && <ComponentActions
                    deviceType={deviceType}
                    builderState={builderState}
                    index={index}
                    uid={uid}
                    parentId={parentId}
                    firstChild={index == 0}
                    lastChild={lastChild}
                />}
                {children}
            </AnimatePresence>
        </div >
    )
}

export default ComponentWrapper