import React, { useEffect, useState } from "react";
import PropsEditor from "./propsEditor";
import StylesEditor from "./stylesEditor";
import styles from '@organismsCSS/editor/editorComponent.module.scss';
import { Collapse, CollapseProps, theme } from "antd";
import { useAppSelector } from "@hook/useAppSelector";
import { getActiveEditorComponent } from "@reduxSlices/activeEditorComponent";
import BackgroundEditor from "./backgroundEditor";
import { removeObjRef } from "@util/utils";
const { Panel } = Collapse;

const EditorComponent = ({ index, config, onConfigUpdate }) => {
    const { token } = theme.useToken();
    const activeComponent = useAppSelector(getActiveEditorComponent);
    const [activeKey, setActiveKey] = useState('00');

    useEffect(() => {
        setActiveKey(activeComponent.childId || '00')
    }, [activeComponent])

    const onChange = (key: string | string[]) => {
        if (key.length) setActiveKey(key[0]);
        else setActiveKey(null)
    };

    const updatePrentConfig = (c, index) => {
        const updatedConfig = removeObjRef(config);
        updatedConfig.children[index] = c;
        onConfigUpdate(updatedConfig);
    }

    const items: CollapseProps['items'] = [
        {
            key: `${index == null ? '00' : config.uid}`,
            label: config?.editable?.label,
            children: <>
                {Boolean(Boolean(config?.editable?.props?.length) && config?.editable?.props?.length != 0) && <PropsEditor config={config} onConfigUpdate={(updatedConfig) => onConfigUpdate(updatedConfig)} />}
                {Boolean(Boolean(config?.editable?.style?.length) && config?.editable?.style?.length != 0) && <StylesEditor config={config} onConfigUpdate={(updatedConfig) => onConfigUpdate(updatedConfig)} />}
            </>,
        }
    ];


    return (
        <div className={styles.editorComponent}>
            <Collapse
                style={{ borderColor: token.colorBorderSecondary }}
                expandIconPosition='end'
                accordion
                onChange={onChange}
                // onChange={() => setActiveKey(activeComponent.childId || '00')}
                size="small"
                className={styles.elementContainer}
                // defaultActiveKey={[activeComponent.childId || '00']}
                activeKey={activeKey}
                items={items}
            >
                {/* <Panel header={config?.editable?.label} key={`${index == null ? '00' : config.uid}`} className={styles.panelWrap}>
                  
                </Panel> */}
            </Collapse>
            {config.children ? config.children?.map((childConfig, index) => {
                return <React.Fragment key={index}>
                    <EditorComponent index={index} config={childConfig} onConfigUpdate={(c) => updatePrentConfig(c, index)} />
                </React.Fragment>
            }) : null}
        </div>
    )
}
export default EditorComponent;