import useInViewport from '@hook/useInViewport';
import { Spin, theme } from 'antd';
import React, { useRef, useState } from 'react'
import styles from './reactIconRenderer.module.scss'
import { LoadingOutlined } from '@ant-design/icons';

function ReactIconRenderer({ viewType, onSelect, iconDetails }) {
    const [hoverId, setHoverId] = useState(null);
    const IconComponent = iconDetails.icon;
    const { token } = theme.useToken();
    const iconRef = useRef();
    const isVisible = useInViewport(iconRef);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return (
        <div className={`${styles.iconElementWrap} ${viewType == 'large' ? styles.largeView : ''}`}
            onClick={onSelect}
            onMouseEnter={() => setHoverId(iconDetails.name)}
            onMouseLeave={() => setHoverId('')}
            ref={iconRef}
            style={{
                background: token.colorBgTextHover,
                borderColor: (hoverId == iconDetails.name) ? token.colorPrimary : token.colorBorder,
                color: (hoverId == iconDetails.name) ? token.colorPrimary : token.colorTextBase
            }}>
            {isVisible ? <IconComponent /> : <>
                <Spin indicator={antIcon} />
            </>}
        </div>
    )
}

export default ReactIconRenderer