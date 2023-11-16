import React, { useEffect, useState } from 'react'
import { activeObjectsState } from '../types'
import { fabric } from "fabric";
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import styles from './objectPropertiesEditor.module.scss';
import { Segmented, theme, Tooltip } from 'antd';
import { LuAlignVerticalJustifyCenter, LuAlignCenter, LuAlignHorizontalJustifyCenter, LuAlignStartVertical, LuAlignEndVertical, LuAlignStartHorizontal, LuAlignEndHorizontal } from 'react-icons/lu'
import { groupAlignments } from '@constant/craftBuilder';
import { useAppDispatch } from '@hook/useAppDispatch';
import { showErrorToast } from '@reduxSlices/toast';
import TextElement from '@antdComponent/textElement';

type pageProps = {
    updateLocalCanvas: any,
    workspace: fabric.Rect,
    canvas: fabric.canvas,
    activeObjectsState: activeObjectsState
}

const alignments = [
    { id: 4, name: groupAlignments.left, icon: <LuAlignStartVertical />, tooltip: 'Left Align' },
    { id: 1, name: groupAlignments.centerX, icon: < LuAlignVerticalJustifyCenter />, tooltip: 'Center Horizontally' },
    { id: 5, name: groupAlignments.right, icon: <LuAlignEndVertical />, tooltip: 'Right Align' },
    { id: 2, name: groupAlignments.center, icon: <LuAlignCenter />, tooltip: 'Center Horizontally & Vertically' },
    { id: 6, name: groupAlignments.top, icon: <LuAlignStartHorizontal />, tooltip: 'Top Align' },
    { id: 3, name: groupAlignments.centerY, icon: <LuAlignHorizontalJustifyCenter />, tooltip: 'Center Vertically' },
    { id: 7, name: groupAlignments.bottom, icon: <LuAlignEndHorizontal />, tooltip: 'Bottom ALign' }
]


function CenterAlignment({ updateLocalCanvas, workspace, canvas, activeObjectsState }: pageProps) {

    const { token } = theme.useToken();
    const [activeAlignment, setactivePosition] = useState({ id: 0, name: '' });
    const [hoverId, setHoverId] = useState('');
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (activeObjectsState.isSelected && workspace) {
            let workspaceCenter = workspace?.getCenterPoint();
            let activeObject = canvas.getActiveObject();
            let objectCenter = activeObject.getCenterPoint();
            let currentPosition = '';
            if (workspaceCenter.x == objectCenter.x) currentPosition = 'centerX';
            if (workspaceCenter.y == objectCenter.y) currentPosition = 'centerY';
            if (activeObject.top == 0) currentPosition = 'top';
            if (activeObject.left == 0) currentPosition = 'left';
            if (activeObject.left == (workspace.width - activeObject.getScaledWidth())) currentPosition = 'right';
            if (activeObject.top == (workspace.height - activeObject.getScaledHeight())) currentPosition = 'bottom';
            if (workspaceCenter.x == objectCenter.x && workspaceCenter.y == objectCenter.y) currentPosition = 'center';
            currentPosition && setactivePosition(alignments.find((p) => p.name == currentPosition));
        }
    }, [activeObjectsState])

    const centerX = (object: fabric.Object) => {
        return canvas._centerObject(object, new fabric.Point(workspace.getCenterPoint().x, object.getCenterPoint().y))
    }

    const center = (object: fabric.Object) => {
        const center = workspace.getCenterPoint();
        return canvas._centerObject(object, center);
    }

    const centerY = (object: fabric.Object) => {
        return canvas._centerObject(object, new fabric.Point(object.getCenterPoint().x, workspace.getCenterPoint().y));
    }

    const top = (object: fabric.Object) => {
        return object.set({ top: 0 });
    }
    const left = (object: fabric.Object) => {
        return object.set({ left: 0 });
    }
    const right = (object: fabric.Object) => {
        return object.set({ left: workspace.width - object.getScaledWidth() });
        // return object.set({ left: (canvas.width - (object.width * object.scaleX)) / 2 });
    }
    const bottom = (object: fabric.Object) => {
        return object.set({ top: workspace.height - object.getScaledHeight() });
        // return object.set({ top: (canvas.height - (object.height * object.scaleY)) / 2 })
    }

    const onChangePosition = (position: any) => {
        const activeObject = canvas.getActiveObject();
        if (!activeObject.locked) {
            setactivePosition(position);
            if (activeObject && workspace) {
                switch (position.name) {
                    case groupAlignments.centerX: centerX(activeObject); break;
                    case groupAlignments.center: center(activeObject); break;
                    case groupAlignments.centerY: centerY(activeObject); break;
                    case groupAlignments.left: left(activeObject); break;
                    case groupAlignments.right: right(activeObject); break;
                    case groupAlignments.top: top(activeObject); break;
                    case groupAlignments.bottom: bottom(activeObject); break;
                }
                updateLocalCanvas(canvas, 'CenterAlignment');
            }
        } else {
            dispatch(showErrorToast('Element is locked 🔒'))
        }
    }

    return (
        <div className={`${styleElementCSS.styleWrap} ${styles.alignmentWrap}`} >
            <TextElement text={"Element Alignment With Background"} color={token.colorTextBase} />
            <div className={`${styleElementCSS.elementWrap} ${styles.alignmentWrapper}`}>
                {alignments.map((position, i) => {
                    return <React.Fragment key={position.name}>
                        <Tooltip title={position.tooltip}>
                            <div className={styles.iconWrap}
                                onClick={() => onChangePosition(position)}
                                onMouseEnter={() => setHoverId(position.name)}
                                onMouseLeave={() => setHoverId('')}
                                style={{
                                    backgroundColor: activeAlignment.name == position.name ? token.colorPrimary : token.colorBgBase,
                                    border: '1px solid #dee1ec',
                                    borderColor: (activeAlignment.name == position.name || hoverId == position.name) ? token.colorPrimary : token.colorBgLayout,
                                    color: activeAlignment.name == position.name ? token.colorBgBase : 'inherit'
                                }}>
                                {position.icon}
                            </div>
                        </Tooltip>
                    </React.Fragment>
                })}
            </div>
        </div>
        // <div className={`${styleElementCSS.styleWrap} ${styles.textStylesWrap}`} style={{ background: token.colorFillContentHover }}>
        //     <div className={`${styleElementCSS.label} ${styles.label}`} style={{ color: token.colorTextBase }}>Alignment with background</div>
        //     <div className={`${styleElementCSS.elementWrap} ${styles.segmentWrap}`}>
        //         <Segmented
        //             style={{ background: 'transparent' }}
        //             size="middle"
        //             block={true}
        //             value={activePosition.name}
        //             onChange={(tab: any) => onChangePosition(alignments.find((p) => p.name == tab))}
        //             options={getSegmentOptions()}
        //         />
        //     </div>
        // </div>
    )
}

export default CenterAlignment