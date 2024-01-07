import { ConfigType, PAGES_LIST } from '@constant/builder';
import HomePageSectionsList from '@organisms/sections/homePage';
import styles from '@organismsCSS/componentRenderer/componentRenderer.module.scss';
import { useCallback } from 'react';
import ComponentWrapper from './componentWrapper';

function ComponentRenderer(props) {

    const getComponent = useCallback((componentConfig: ConfigType) => {
        let Component: any = null;
        if (componentConfig.pageId == PAGES_LIST.HOME_PAGE) {
            const section = HomePageSectionsList.find((s) => s.name == componentConfig.secionId);
            Component = section?.sectionComponentsList[componentConfig.uid.split("||")[0]];
        }

        // console.log("componentConfig", componentConfig)
        if (Boolean(Component)) {
            return <Component
                key={componentConfig.uid}
                config={componentConfig}
                currentPage={props.currentPage}
                id={props.id}
            />
        }
        return null;
    }, [])

    return (
        <div className={`componentRenderer ${styles.wrap}`}>
            <ComponentWrapper {...props}>
                {getComponent(props.componentConfig)}
            </ComponentWrapper>
        </div >
    )
}

export default ComponentRenderer