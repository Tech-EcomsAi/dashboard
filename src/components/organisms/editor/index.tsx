import { useAppDispatch } from '@hook/useAppDispatch';
import { useAppSelector } from '@hook/useAppSelector';
import styles from '@organismsCSS/editor/editorContainer.module.scss';
import { getActiveEditorComponent } from '@reduxSlices/activeEditorComponent';
import { getBuilderState, updateBuilderState } from "@reduxSlices/siteBuilderState";
import { removeObjRef } from '@util/utils';
import { useEffect, useState } from 'react';
import EditorComponent from './editorComponent';

function Editor({ config }) {
    const dispatch = useAppDispatch();
    const [componentConfig, setComponentConfig] = useState<any>(removeObjRef(config));
    const builderState = useAppSelector(getBuilderState);
    const activeComponent = useAppSelector(getActiveEditorComponent);

    useEffect(() => setComponentConfig({ ...config }), [config])

    const handleConfigUpdate = (updatedConfig) => {
        setComponentConfig(updatedConfig);
        const listKey = Object.keys(builderState)[0];
        const builderStateCopy: any = removeObjRef(builderState);
        const components = removeObjRef(builderStateCopy[listKey]);
        const index = components.findIndex(i => i.id == activeComponent.id);
        components[index] = updatedConfig;
        builderStateCopy[listKey] = components;
        debugger
        dispatch(updateBuilderState(builderStateCopy));
    };

    return (
        <div className={styles.editorContainer}>
            <EditorComponent index={null} config={componentConfig} onConfigUpdate={(con) => handleConfigUpdate(con)} />
        </div>
    )
}

export default Editor;

