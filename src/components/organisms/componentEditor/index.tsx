import { PAGES_LIST } from '@constant/builder';
import { useAppSelector } from '@hook/useAppSelector';
import HomePageSectionsList from '@organisms/sections/homePage';
import { SECTION_UID_SEPARATOR } from '@organisms/sections/homePage/navigation/constants';
import { getActiveEditorComponent } from '@reduxSlices/activeEditorComponent';
import { getBuilderState } from '@reduxSlices/siteBuilderState';
import { removeObjRef } from '@util/utils';
import { useCallback, useEffect, useState } from 'react';

function ComponentEditor({ activeComponent }) {

    const [componentConfig, setComponentConfig] = useState<any>({});
    const stateActiveComponent = useAppSelector(getActiveEditorComponent);
    const builderState = useAppSelector(getBuilderState);

    useEffect(() => {
        const config = builderState[Object.keys(builderState)[0]].find(i => i.id == stateActiveComponent.id);
        setComponentConfig(config || {});
    }, [activeComponent, builderState])

    const getComponent = useCallback(() => {

        let Component: any = null;
        if (componentConfig.pageId == PAGES_LIST.HOME_PAGE) {
            const section = HomePageSectionsList.find((s) => s.name == componentConfig.secionId);
            Component = section?.sectionEditorComponentsList[componentConfig.uid.split(SECTION_UID_SEPARATOR)[0]];
        }

        // console.log("componentConfig", componentConfig)
        if (Boolean(Component)) {
            return <Component key={componentConfig.uid} config={removeObjRef(componentConfig)} />
        }
        return null;

        // if (typeof EditorComponentsList[activeComponent.uid] !== "undefined") {
        //     return React.createElement(EditorComponentsList[activeComponent.uid], {
        //         key: activeComponent.id,
        //         config: componentConfig
        //     });
        // }
        // return null;
    }, [componentConfig])

    return getComponent();
}

export default ComponentEditor