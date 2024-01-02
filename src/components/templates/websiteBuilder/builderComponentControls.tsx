import { useAppDispatch } from '@hook/useAppDispatch';
import { useAppSelector } from '@hook/useAppSelector';
import { BuilderContextType, getBuilderContext, updateBuilderContext } from "@reduxSlices/siteBuilderState";
import styles from '@templatesCSS/websiteBuilder/builderWrapper.module.scss';
import { Button, Segmented, Tooltip, theme } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FiHelpCircle, FiMaximize, FiZoomIn, FiZoomOut } from 'react-icons/fi';
import { IoHandLeftOutline } from 'react-icons/io5';
import { LuMousePointer } from 'react-icons/lu';
import { TbFocusCentered } from 'react-icons/tb';
import { useControls } from "react-zoom-pan-pinch";

function BuilderComponentControls() {
    const { token } = theme.useToken();
    const { zoomIn, zoomOut, resetTransform, centerView } = useControls();
    const HANDLER_MODES = [{ key: 'Editor', name: 'Editor', icon: <LuMousePointer /> }, { key: "Grab", name: 'Grab', icon: <IoHandLeftOutline /> }]
    const dispatch = useAppDispatch()
    const builderContext: BuilderContextType = useAppSelector(getBuilderContext);
    const [activeHandlerMOde, setActiveHandlerMOde] = useState(builderContext.editorMode ? HANDLER_MODES[0] : HANDLER_MODES[1])

    const getSegmentOptions = () => {
        return HANDLER_MODES.map((option) => {
            const active = activeHandlerMOde.name == option.name;
            return {
                label:
                    <Tooltip title={`${option.name} Mode`}>
                        <div style={{ color: active ? token.colorPrimary : 'inherit' }}
                            className={`${styles.segmentItem} ${active ? styles.active : ''}`}>
                            <div className={styles.iconWrap}
                                style={{
                                    color: active ? token.colorPrimary : token.colorTextBase,
                                    // backgroundColor: active ? token.colorPrimary : token.colorBgBase
                                }}>
                                {option.icon}
                            </div>
                            {/* <div className={styles.name} style={{ color: activeHandlerMOde.name == option.name ? token.colorPrimary : token.colorBgBase }}>{option.name}</div> */}
                        </div>
                    </Tooltip>,
                value: option.name
            }
        })
    }

    const onChangeHndlerMode = (mode) => {
        setActiveHandlerMOde(mode);
        dispatch(updateBuilderContext({ ...builderContext, editorMode: !builderContext.editorMode }))
    }

    return (

        <div className={styles.controlsWrapper}>
            <div className={styles.segmentWrap} style={{
                border: `1px solid ${token.colorBorder}`,
                // background: token.colorTextLightSolid
            }}>
                <Segmented
                    style={{ background: token.colorBgContainerDisabled }}
                    size="middle"
                    block={true}
                    value={activeHandlerMOde.name}
                    defaultValue={HANDLER_MODES[0].name}
                    onChange={(tab: any) => onChangeHndlerMode(activeHandlerMOde.name == HANDLER_MODES[0].name ? HANDLER_MODES[1] : HANDLER_MODES[0])}
                    options={getSegmentOptions()}
                />
                <AnimatePresence>
                    {activeHandlerMOde.name == "Grab" && <motion.div
                        // style={{ background: token.colorBgContainerDisabled }}
                        initial={{ left: "0", opacity: 0 }}
                        animate={{ left: '123px', opacity: 1 }}
                        exit={{ left: "0", opacity: 0 }}
                        className={styles.subActions}
                    >
                        <Tooltip title="Zoom In">
                            <Button size='middle' type="default" onClick={() => zoomIn()} icon={<FiZoomIn />} />
                        </Tooltip>
                        <Tooltip title="Zoom Out">
                            <Button size='middle' type="default" onClick={() => zoomOut()} icon={<FiZoomOut />} />
                        </Tooltip>
                        <Tooltip title="Fit To Screen">
                            <Button size='middle' type="default" onClick={() => resetTransform()} icon={<FiMaximize />} />
                        </Tooltip>
                        <Tooltip title="Align Center">
                            <Button size='middle' type="default" onClick={() => centerView()} icon={<TbFocusCentered />} />
                        </Tooltip>
                        <Tooltip title="Design Help">
                            <Button size='middle' type="default" onClick={() => resetTransform()} icon={<FiHelpCircle />} />
                        </Tooltip>
                    </motion.div>}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default BuilderComponentControls