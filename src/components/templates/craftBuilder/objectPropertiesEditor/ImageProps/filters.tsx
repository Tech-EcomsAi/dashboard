import React, { useState } from 'react'
import { activeObjectsState } from '../../types'
import { fabric } from "fabric";
import styles from '@objectPropertiesEditor/objectPropertiesEditor.module.scss';
import { Collapse, theme } from 'antd';
const { Panel } = Collapse;
import ComplexFilters from '@template/craftBuilder/objectPropertiesEditor/ImageProps/filters/complexFilters';
import SimpleFilters from '@template/craftBuilder/objectPropertiesEditor/ImageProps/filters/simpleFilters';

type pageProps = {
    updateLocalCanvas: any,
    canvas: fabric.canvas,
    activeObjectsState: activeObjectsState
}

function Filters({ updateLocalCanvas, canvas, activeObjectsState }: pageProps) {

    const { token } = theme.useToken();
    const [activeFiltersTab, setActiveFiltersTab] = useState(0);

    const onChangeTab = (tab) => {
        setActiveFiltersTab(tab);
    }

    const getFabricFilterType = (type) => {
        return type.charAt(0).toUpperCase() + type.slice(1);
    }

    const createFilter = (type) => {
        let filterObj = null;
        // capitalize first letter for matching with fabric image filter name
        const fabricType = getFabricFilterType(type);
        const ImageFilter = fabric.Image.filters[fabricType];
        if (ImageFilter) {
            filterObj = new ImageFilter(null);
        }
        return filterObj;
    }

    return (
        <div className={styles.filtersWrap}>
            <Collapse
                // ghost
                style={{ background: token.colorBgLayout, width: '100%' }}
                expandIconPosition='end'
                accordion
                onChange={(type: any) => onChangeTab(type)}
                size="small"
                className={styles.filtersContainer}
                activeKey={activeFiltersTab}
            >
                <Panel header="Filters" key={1} className={styles.panelWrap}>
                    <SimpleFilters getFabricFilterType={getFabricFilterType} createFilter={createFilter} updateLocalCanvas={updateLocalCanvas} canvas={canvas} activeObjectsState={activeObjectsState} />
                </Panel>
                <Panel header="Adjustments" key={2} className={styles.panelWrap}>
                    <ComplexFilters getFabricFilterType={getFabricFilterType} createFilter={createFilter} updateLocalCanvas={updateLocalCanvas} canvas={canvas} activeObjectsState={activeObjectsState} />
                </Panel>
            </Collapse>
        </div>
    )
}

export default Filters