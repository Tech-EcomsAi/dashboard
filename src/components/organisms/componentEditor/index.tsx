import React, { useCallback, useEffect, useState } from 'react';
import EditorComponentsList from '@organisms/sections/editorComponentsList';
import { useAppSelector } from '@hook/useAppSelector';
import { getActiveEditorComponent } from '@reduxSlices/activeEditorComponent';

function ComponentEditor({ activeComponent, builderState }) {

    const [componentConfig, setComponentConfig] = useState<any>({});
    const stateActiveComponent = useAppSelector(getActiveEditorComponent);

    useEffect(() => {
        const config = builderState[Object.keys(builderState)[0]].find(i => i.id == stateActiveComponent.parentId);
        setComponentConfig(config || {});
    }, [activeComponent])

    const getComponent = useCallback(() => {
        if (typeof EditorComponentsList[activeComponent.uid] !== "undefined") {
            return React.createElement(EditorComponentsList[activeComponent.uid], {
                key: activeComponent.parentId,
                config: componentConfig
            });
        }
        return null;
    }, [componentConfig])

    return getComponent();
}

export default ComponentEditor