import React from 'react'
import styles from '@organismsCSS/editor/propsEditor.module.scss';
import TextElement from '@molecules/propsElement/textElement';
import { removeObjRef } from '@util/utils';

function PropsEditor({ config, onConfigUpdate }) {

    const handlePropsChange = (from, value) => {
        const configCopy = removeObjRef(config);
        configCopy.props = { ...configCopy.props, [from]: value };
        onConfigUpdate(configCopy);
    };

    const getPropsComponent = (property: string, value: any) => {
        let component = null;
        switch (property) {
            case 'text':
                component = <TextElement label={'Heading Text'} value={value} onChange={(value) => handlePropsChange(property, value)} placeholder={'Heading text'} />
                break;

            default:
                break;
        }
        return component;
    }

    return (
        <div className={styles.propsEditor}>
            {config?.editable?.props.map((property, index) => {
                return <React.Fragment key={index}>
                    {getPropsComponent(property, config.props[property])}
                </React.Fragment>
            })}
        </div>
    )
}

export default PropsEditor