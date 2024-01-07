import { useAppSelector } from '@hook/useAppSelector';
import styles from '@organismsCSS/componentRenderer/componentRenderer.module.scss';
import { getActiveEditorComponent } from '@reduxSlices/activeEditorComponent';
import { theme } from 'antd';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import ComponentActions from './componentActions';

type pageProps = {
    builderState: any,
    lastChild: any,
    index: any,
    uid: any,
    currentPage: any,
    id: any,
    children: any,
    deviceType: string
}
function ComponentWrapper({ deviceType, builderState, lastChild, index, uid, currentPage, id, children }: pageProps) {
    const activeComponent = useAppSelector(getActiveEditorComponent);
    const { token } = theme.useToken();
    const [hoverId, setHoverId] = useState(null)

    return (
        <div
            onMouseEnter={() => setHoverId(id)}
            onMouseLeave={() => setHoverId('')}
            className={`componentContentWrap ${styles.componentContentWrap} ${activeComponent.id === id ? styles.active : ''} ${lastChild ? styles.lastChild : ''} ${index == 0 ? styles.firstChild : ''}`}
            style={{
                outline: activeComponent.id === id ? `4px dashed ${token.colorPrimary}` : "unset",
                borderRadius: activeComponent.id === id ? `5px` : "inherit",
            }}>
            <AnimatePresence>
                {(activeComponent.id === id || hoverId === id) && <ComponentActions
                    deviceType={deviceType}
                    builderState={builderState}
                    index={index}
                    uid={uid}
                    id={id}
                    firstChild={index == 0}
                    lastChild={lastChild}
                />}
                {children}
            </AnimatePresence>
        </div >
    )
}

export default ComponentWrapper