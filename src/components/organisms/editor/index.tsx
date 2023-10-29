import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@hook/useAppSelector';
import { getBuilderState, updateBuilderState } from '@reduxSlices/builderState';
import { getActiveEditorComponent } from '@reduxSlices/activeEditorComponent';
import { useAppDispatch } from '@hook/useAppDispatch';
import EditorComponent from './editorComponent';
import styles from '@organismsCSS/editor/editorContainer.module.scss';
import { removeObjRef } from '@util/utils';

function Editor({ config }) {
    const dispatch = useAppDispatch();
    const [componentConfig, setComponentConfig] = useState<any>(removeObjRef(config));
    const builderState = useAppSelector(getBuilderState);
    const activeComponent = useAppSelector(getActiveEditorComponent);

    useEffect(() => setComponentConfig({ ...config }), [config])

    const handleConfigUpdate = (updatedConfig) => {
        setComponentConfig(updatedConfig);
        const listKey = Object.keys(builderState)[0];
        const builderStateCopy: any = { ...builderState };
        const components = [...builderStateCopy[listKey]];
        const index = components.findIndex(i => i.id == activeComponent.parentId);
        components[index] = updatedConfig;
        builderStateCopy[listKey] = components;
        dispatch(updateBuilderState(builderStateCopy));
    };

    return (
        <div className={styles.editorContainer}>
            <EditorComponent index={null} config={componentConfig} onConfigUpdate={(con) => handleConfigUpdate(con)} />
        </div>
    )
}

export default Editor;

