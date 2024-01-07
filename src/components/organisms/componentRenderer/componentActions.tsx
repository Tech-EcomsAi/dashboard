import { useAppDispatch } from '@hook/useAppDispatch';
import { useAppSelector } from '@hook/useAppSelector';
import styles from '@organismsCSS/componentRenderer/componentActionsWrap.module.scss';
import { initialState, updateActiveEditorComponent } from '@reduxSlices/activeEditorComponent';
import { BuilderContextType, getBuilderContext, updateBuilderState } from '@reduxSlices/siteBuilderState';
import { move, toArray } from '@util/moveItem';
import { removeObjRef } from '@util/utils';
import { Button, Popconfirm, Tooltip, theme } from 'antd';
import { motion } from 'framer-motion';
import { useCallback } from 'react';
import { FiArrowDown, FiArrowUp, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { MdDragIndicator } from 'react-icons/md';

type pageProps = {
    firstChild: boolean,
    lastChild: boolean,
    builderState: any,
    index: any,
    uid: any,
    id: any,
    deviceType: string
}
function ComponentActions({ firstChild, lastChild, builderState, index, uid, id, deviceType }: pageProps) {
    const dispatch = useAppDispatch();
    const builderContext: BuilderContextType = useAppSelector(getBuilderContext);
    const { token } = theme.useToken();
    const onClickAction = (event: any, action: string) => {
        const listKey = Object.keys(builderState)[0];
        const builderStateCopy: any = { ...builderState };
        switch (action) {
            case 'UP':
                builderStateCopy[listKey] = move(builderStateCopy[listKey], { from: index, to: index - 1 });
                break;
            case 'DOWN':
                builderStateCopy[listKey] = move(builderStateCopy[listKey], { from: index + 1, to: index });
                break;
            case 'DELETE':
                const components: any = [...toArray(builderStateCopy[listKey])];
                components.splice(index, 1);
                builderStateCopy[listKey] = components;
                break;
            case 'EDIT':
                break;
            default:
                break;
        }
        dispatch(updateBuilderState(removeObjRef(builderStateCopy)));
        dispatch(updateActiveEditorComponent(action == 'EDIT' ? { id, uid, originalState: builderState[Object.keys(builderState)[0]][index] } : initialState.activeEditorComponent));
        event.stopPropagation();
    }

    const getUpdatedScale = useCallback(
        () => {
            const currentScale = builderContext.state.scale;
            let factor = 20;
            let newScale = 1;
            if (currentScale <= 0.8) {
                newScale = 1
            }
            if (currentScale <= 0.7) {
                newScale = factor * 2
            }
            if (currentScale <= 0.6) {
                newScale = factor * 3
            }
            if (currentScale <= 0.4) {
                newScale = factor * 4
            }
            if (currentScale <= 0.3) {
                newScale = factor * 5
            }
            return newScale == 1 ? 40 : newScale;
        },
        [builderContext],
    )


    return (
        <motion.div
            initial={{ width: "auto", height: "auto", opacity: 0 }}
            animate={{ width: "auto", height: "auto", opacity: 1 }}
            exit={{ width: "auto", height: "auto", opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`${styles.componentActionsWrap} ${styles[deviceType]}`}
            style={{
                border: `1px solid ${token.colorBorderSecondary}`,
                background: token.colorBgBase,
                right: deviceType == 'mobile' ? 'unset' : `-${1.5 * getUpdatedScale()}px`,
                left: deviceType == "mobile" ? `-${1.5 * getUpdatedScale()}px` : "unset",
            }}>
            {!firstChild && <Tooltip placement={deviceType == "mobile" ? "right" : "left"} title={`Move Up`} color={'#8892b0'} key='1'>
                <Button size='large' shape='circle' type="dashed" onClick={(e) => onClickAction(e, 'UP')} icon={<FiArrowUp />}
                    style={{ width: `${1 * getUpdatedScale()}px`, height: `${1 * getUpdatedScale()}px`, fontSize: `${1 * getUpdatedScale() / 2}px` }}
                />
            </Tooltip>}
            {!lastChild && <Tooltip placement={deviceType == "mobile" ? "right" : "left"} title="Move Down" color={'#8892b0'} key='2'>
                <Button size='large' shape='circle' type="dashed" onClick={(e) => onClickAction(e, 'DOWN')} icon={<FiArrowDown />}
                    style={{ width: `${1 * getUpdatedScale()}px`, height: `${1 * getUpdatedScale()}px`, fontSize: `${1 * getUpdatedScale() / 2}px` }}
                />
            </Tooltip>}
            <Tooltip placement={deviceType == "mobile" ? "right" : "left"} title="Edit Section" color={'#8892b0'} key='4'>
                <Button size='large' shape='circle' type="dashed" onClick={(e) => onClickAction(e, 'EDIT')} icon={<FiEdit2 />}
                    style={{ width: `${1 * getUpdatedScale()}px`, height: `${1 * getUpdatedScale()}px`, fontSize: `${1 * getUpdatedScale() / 2}px` }}
                />
            </Tooltip>
            <Tooltip placement={deviceType == "mobile" ? "right" : "left"} title="Delete Section" color={'#8892b0'} key='3'>
                <Popconfirm
                    title="Delete Section"
                    description="Are you sure you want to delete this section?"
                    onConfirm={(e) => onClickAction(e, 'DELETE')}>
                    <Button size='large' shape='circle' type="dashed" icon={<FiTrash2 />}
                        style={{ width: `${1 * getUpdatedScale()}px`, height: `${1 * getUpdatedScale()}px`, fontSize: `${1 * getUpdatedScale() / 2}px` }}
                    />
                </Popconfirm>
            </Tooltip>
            <Tooltip placement={deviceType == "desktop" ? "right" : "left"} title="Move section" color={'#8892b0'} key='5'>
                <Button size='large' shape='circle' type="dashed" className='dragDropHandle' onClick={() => { }} icon={<MdDragIndicator className="dragDropHandle" />}
                    style={{ width: `${1 * getUpdatedScale()}px`, height: `${1 * getUpdatedScale()}px`, fontSize: `${1 * getUpdatedScale() / 2}px` }}
                />
            </Tooltip>
        </motion.div>
    )
}

export default ComponentActions