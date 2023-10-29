import React, { useState } from 'react'
import { fabric } from "fabric";
import { endDragging, startDragging } from "../initDragging";
import styles from './canvasControls.module.scss'
import { Button, Segmented, Space, theme, Tooltip } from 'antd';
import { FiZoomIn, FiZoomOut, FiCornerUpLeft, FiCornerUpRight, FiMaximize, FiMousePointer, FiMove, FiHelpCircle } from 'react-icons/fi';
import { PiSubtractSquare, PiUniteSquare } from 'react-icons/pi'
const HANDLER_MODES = [{ id: 1, name: 'Selection', icon: <FiMousePointer /> }, { id: 2, name: 'Grab', icon: <FiMove /> }]


// enlarge
export const zoomInCanvas = (canvas) => {
    let zoomRatio = canvas.getZoom();
    zoomRatio += 0.05;
    const center = canvas.getCenter();
    canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoomRatio);
    canvas.renderAll();
}

// zoom out
export const zoomOutCanvas = (canvas) => {
    let zoomRatio = canvas.getZoom();
    zoomRatio -= 0.05;
    const center = canvas.getCenter();
    canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoomRatio < 0 ? 0.01 : zoomRatio);
    canvas.renderAll();
}

function CanvasControls({ updateCanvas, canvasHistory, canvasState, updateHistoryState, canvas, clipedCanvas, setAutoSizing }) {

    const [activeHandlerMOde, setActiveHandlerMOde] = useState(HANDLER_MODES[0])
    const [showGrid, setShowGrid] = useState(false);
    const { token } = theme.useToken();
    const [ousideFrameEnabled, setOusideFrameEnabled] = useState(true);

    const toggleGridView = () => {
        setShowGrid(!showGrid);
        const ctx = canvas.getContext();
        if (showGrid) {
            ctx.gridRendered = false;
            ctx.strokeStyle = '#ad393a';
            updateCanvas(canvas);
        } else {
            ctx.gridRendered = true;
            ctx.strokeStyle = token.colorPrimaryActive;
            ctx.stroke();
            updateCanvas(canvas);
        }
    }
    const getSegmentOptions = () => {
        return HANDLER_MODES.map((option) => {
            return {
                label:
                    <Tooltip title={`${option.name} Mode`}>
                        <div style={{ color: activeHandlerMOde.name == option.name ? token.colorPrimary : 'inherit' }}
                            className={`${styles.segmentItem} ${activeHandlerMOde.name == option.name ? styles.active : ''}`}>
                            <div className={styles.iconWrap} style={{ backgroundColor: activeHandlerMOde.name == option.name ? token.colorPrimary : token.colorBgBase }}>
                                {option.icon}
                            </div>
                            <div className={styles.name} style={{ color: activeHandlerMOde.name == option.name ? token.colorPrimary : token.colorBgBase }}>{option.name}</div>
                        </div>
                    </Tooltip>,
                value: option.name
            }
        })
    }

    const onChangeHndlerMode = (mode) => {
        setActiveHandlerMOde(mode);
        if (mode == HANDLER_MODES[0]) {
            endDragging(canvas)
        } else {
            startDragging(canvas)
        }
    }

    const onToggleOutsideFrame = (status) => {
        setOusideFrameEnabled(status);
        clipedCanvas(status)
    }

    return (
        <div className={styles.canvasControlsWrapper} style={{ background: token.colorBgBase }}>
            <Space direction="vertical">
                <Space wrap size={10} >
                    {/* <Tooltip title="Show Grid">
                        <Button className={styles.buttonElement} size='middle' type={`${showGrid ? "primary" : 'default'}`} onClick={toggleGridView} icon={<BsGrid3X3 />} />
                    </Tooltip> */}
                    <Tooltip title="Zoom In">
                        <Button className={styles.buttonElement} size='middle' type="primary" onClick={() => zoomInCanvas(canvas)} icon={<FiZoomIn />} />
                    </Tooltip>
                    <Tooltip title="Zoom Out">
                        <Button className={styles.buttonElement} size='middle' type="primary" onClick={() => zoomOutCanvas(canvas)} icon={<FiZoomOut />} />
                    </Tooltip>
                    <Tooltip title="Fit">
                        <Button className={styles.buttonElement} size='middle' type="primary" onClick={() => setAutoSizing()} icon={<FiMaximize />} />
                    </Tooltip>
                    <div className={styles.segmentWrap}>
                        <Segmented
                            style={{ background: token.colorBgTextActive }}
                            size="middle"
                            block={true}
                            value={activeHandlerMOde.name}
                            defaultValue={HANDLER_MODES[0].name}
                            onChange={(tab: any) => onChangeHndlerMode(activeHandlerMOde.name == HANDLER_MODES[0].name ? HANDLER_MODES[1] : HANDLER_MODES[0])}
                            options={getSegmentOptions()}
                        />
                    </div>
                    <Tooltip title="Undo">
                        <Button className={styles.buttonElement} size='middle' disabled={canvasHistory[0] === canvasState} type="primary" onClick={() => updateHistoryState('undo')} icon={<FiCornerUpLeft />} />
                    </Tooltip>
                    <Tooltip title="Redo">
                        <Button className={styles.buttonElement} size='middle' disabled={canvasHistory[canvasHistory.length - 1] === canvasState} type="primary" onClick={() => updateHistoryState('redo')} icon={<FiCornerUpRight />} />
                    </Tooltip>
                    <Tooltip title={`${ousideFrameEnabled ? 'Hide outside frame' : 'Show outside frame'}`}>
                        <Button className={styles.buttonElement} size='middle' disabled={canvasHistory[canvasHistory.length - 1] === canvasState} type={ousideFrameEnabled ? 'primary' : 'ghost'} onClick={() => onToggleOutsideFrame(!ousideFrameEnabled)} icon={ousideFrameEnabled ? <PiSubtractSquare /> : <PiUniteSquare />} />
                    </Tooltip>
                    <Tooltip title="Design Help">
                        <Button className={styles.buttonElement} size='middle' type="primary" onClick={() => { }} icon={<FiHelpCircle />} />
                    </Tooltip>
                </Space>
            </Space>
        </div>
    )
}

export default CanvasControls