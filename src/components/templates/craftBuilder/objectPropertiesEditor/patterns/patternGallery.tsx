import { Input, Spin, theme } from 'antd';
import React, { useRef, useState } from 'react'
import styles from '../../tabsComposer/graphics/graphics.module.scss'
import { fabric } from "fabric";
import { renderToStaticMarkup } from 'react-dom/server';
import { GRAPHICS_LIST } from 'src/data/graphics';
import useInViewport from '@hook/useInViewport';
import { LoadingOutlined } from '@ant-design/icons';
import iconCss from '../../tabsComposer/graphics/reactIconRenderer/reactIconRenderer.module.scss';
import { CUSTOME_ATTRIBUTES, OBJECT_TYPES } from '@constant/craftBuilder';
import { v4 as uuid } from 'uuid';
import { BiArrowBack } from 'react-icons/bi';
import { COMMON_PATTERNS_LIST } from 'src/data/patterns';
import { ICONS_CATEGORY_LIST } from 'src/data/reactIcons';

const { Search } = Input;
// onSelect is passed from background of workspace
function PatternGallery({ onSelect = null }) {
    const { token } = theme.useToken();

    const getSvgElement = (Icon) => {
        const iconHtml = renderToStaticMarkup(<Icon />);
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(iconHtml, 'image/svg+xml');
        const svgElement = svgDoc.documentElement;
        return svgElement;
    };

    const onSelectIcon = (svgUrl) => {
        onSelect({ src: svgUrl })
    }

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        const fileName = [];
        if (file) {
            for (let i = 0; i < event.target.files.length; i++) {
                let file = event.target.files.item(i)
                fileName.push(`/assets/graphics/person/thinking/${file.name}`)
            }
        }
        console.log(fileName)
    };

    return (
        <React.Fragment>
            {/* <input type={'file'} multiple onChange={handleFileChange} /> */}
            {COMMON_PATTERNS_LIST.map((category, i) => {
                return <React.Fragment key={i}>
                    <div className={`${styles.iconsListWrap} ${styles.categoryItemsView}`}>
                        <div className={styles.stickyCategory} style={{ background: token.colorBgBase }}>
                            <div className={styles.categoriesWrap}>
                                <div className={styles.category} style={{ zIndex: 1, position: 'relative', background: token.colorBgBase, borderColor: token.colorBorder, color: token.colorText }}>
                                    <div className={styles.categoryName}>
                                        {category.name}
                                    </div>
                                    <div className={styles.iconsWrap}>
                                        {category.icons.map((icon, i) => {
                                            const svgElement: any = getSvgElement(icon.icon);
                                            const svgXml = new XMLSerializer().serializeToString(svgElement);
                                            const svgUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgXml)}`;
                                            return <ReactIconRenderer viewType="large" key={i} icon={svgUrl} onSelect={() => onSelectIcon(svgUrl)} />
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            })}
        </React.Fragment>
    )
}

export default PatternGallery


const ReactIconRenderer = ({ viewType = '', onSelect, icon }) => {
    const [hoverId, setHoverId] = useState(null);
    const { token } = theme.useToken();
    const iconRef = useRef();
    const isVisible = useInViewport(iconRef);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return (
        <div className={`${iconCss.iconElementWrap} ${iconCss.graphicsElement} ${iconCss.patternImageWrap} ${viewType == 'large' ? iconCss.largeView : ''}`}
            onClick={onSelect}
            onMouseEnter={() => setHoverId(icon)}
            onMouseLeave={() => setHoverId('')}
            ref={iconRef}
            style={{
                background: token.colorBgTextHover,
                borderColor: (hoverId == icon) ? token.colorPrimary : token.colorBorder,
                color: (hoverId == icon) ? token.colorPrimary : token.colorTextBase,
            }}>
            {isVisible ? <div className={iconCss.patternImage} style={{ background: `url(${icon})` }}>
                {/* <img src={icon} /> */}
            </div> : <>
                <Spin indicator={antIcon} />
            </>}
        </div>
    )
}

export { ReactIconRenderer };