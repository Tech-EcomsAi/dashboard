import React, { useState } from 'react'
import styles from '@organismsCSS/componentRenderer/componentRenderer.module.scss';
import { FiArrowUp, FiArrowDown, FiTrash2, FiEdit2 } from 'react-icons/fi';
import { Popconfirm, theme, Tooltip } from 'antd';
import { useAppDispatch } from '@hook/useAppDispatch';
import { move, toArray } from '@util/moveItem';
import { updateBuilderState } from '@reduxSlices/builderState';
import { getActiveEditorComponent, initialState, updateActiveEditorComponent } from '@reduxSlices/activeEditorComponent';
import { useAppSelector } from '@hook/useAppSelector';
import { removeObjRef } from '@util/utils';

type pageProps = {
    builderState: any,
    lastChild: any,
    index: any,
    uid: any,
    currentPage: any,
    parentId: any,
    children: any
}
function ComponentWrapper({ builderState, lastChild, index, uid, currentPage, parentId, children }: pageProps) {
    const dispatch = useAppDispatch();
    const activeComponent = useAppSelector(getActiveEditorComponent);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const actionWrapCss = { "padding": "10px", "height": "auto", "width": "auto", "overflow": "auto" };

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
        dispatch(updateActiveEditorComponent(action == 'EDIT' ? { parentId, uid, originalState: builderState[Object.keys(builderState)[0]][index] } : initialState.activeEditorComponent));
        event.stopPropagation();
    }

    return (
        <div className={`${styles.componentContentWrap} ${activeComponent.parentId === parentId ? styles.active : ''} ${lastChild ? styles.lastChild : ''} ${index == 0 ? styles.firstChild : ''}`}>
            {/* //this section shows when you click on section or hover over on section  */}
            {currentPage == 'BUILDER' && <div className={styles.actionsWrap} style={confirmationOpen ? actionWrapCss : {}}>
                <Tooltip title="Move Up" color={'#8892b0'} key='1'>
                    <div className={`iconWrap hover ${styles.iconWrap}`} onClick={(e) => onClickAction(e, 'UP')}>
                        <FiArrowUp />
                    </div>
                </Tooltip>
                <Tooltip title="Move Down" color={'#8892b0'} key='2'>
                    <div className={`iconWrap hover ${styles.iconWrap}`} onClick={(e) => onClickAction(e, 'DOWN')}>
                        <FiArrowDown />
                    </div>
                </Tooltip>
                <Tooltip title="Edit Section" color={'#8892b0'} key='4'>
                    <div className={`iconWrap hover ${styles.iconWrap}`} onClick={(e) => onClickAction(e, 'EDIT')}>
                        <FiEdit2 />
                    </div>
                </Tooltip>
                <Tooltip title="Delete Section" color={'#8892b0'} key='3'>
                    <Popconfirm
                        title="Delete Section"
                        description="Are you sure you want to delete this section?"
                        onConfirm={(e) => onClickAction(e, 'DELETE')}
                    // onOpenChange={(status) => setConfirmationOpen(status)}
                    >
                        <div className={`iconWrap hover ${styles.iconWrap}`}>
                            <FiTrash2 />
                        </div>
                    </Popconfirm>
                </Tooltip>
            </div>}
            {children}
        </div >
    )
}

export default ComponentWrapper