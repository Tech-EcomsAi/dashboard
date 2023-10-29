import { Input, theme } from 'antd';
import React, { useState } from 'react'
import styles from './graphics.module.scss'
import ReactIconRenderer from '@template/craftBuilder/tabsComposer/graphics/reactIconRenderer'
import { fabric } from "fabric";
import { renderToStaticMarkup } from 'react-dom/server';
import { ICONS_CATEGORY_LIST } from 'src/data/reactIcons';
import { v4 as uuid } from 'uuid';
import { BiArrowBack } from 'react-icons/bi'

const { Search } = Input;

function IconsElements({ onSelect = null, canvas, updateLocalCanvas }) {
    const { token } = theme.useToken();
    const [activeCategory, setActiveCategory] = useState<any>(ICONS_CATEGORY_LIST[0])
    const [hoverId, setHoverId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCategory, setFilteredCategory] = useState([])
    const [selectedCategoryToDisplay, setSelectedCatToDisplay] = useState(null);

    const getSvgElement = (Icon) => {
        const iconHtml = renderToStaticMarkup(<Icon />);
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(iconHtml, 'image/svg+xml');
        const svgElement = svgDoc.documentElement;
        return svgElement;
    };

    const onSelectIcon = (category, Icon) => {

        const svgElement: any = getSvgElement(Icon);
        const svgXml = new XMLSerializer().serializeToString(svgElement);
        const svgUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgXml)}`;
        if (onSelect) {
            onSelect({ src: svgUrl })
        } else {
            fabric.loadSVGFromURL(svgUrl, (objects, options) => {
                const svgObject = fabric.util.groupSVGElements(objects, options);

                // Customize SVG object properties if needed
                const center = canvas.getCenter();
                svgObject.set({
                    left: center.left / 2,
                    top: center.top / 2,
                    scaleX: 1,
                    scaleY: 1,
                    uid: uuid(),
                });
                if (category.id == 'gi') {
                    svgObject.scale(0.3)
                } else {
                    svgObject.scale(5)
                }
                // Add the SVG object to the canvas
                canvas.add(svgObject);
                canvas.setActiveObject(svgObject);
                updateLocalCanvas(canvas, 'IconsElements')
            });
        }

    }

    const onChangeSearchQuery = (query) => {
        setSearchQuery(query);
        let filteredCategory = [];
        ICONS_CATEGORY_LIST.map((catgeory) => {
            let filteredIcons = catgeory.icons.filter((icon) => icon.name.toLowerCase().includes(query.toLowerCase()));
            if (filteredIcons.length != 0) {
                filteredCategory.push({ ...catgeory, icons: filteredIcons })
            }
        })
        setFilteredCategory(filteredCategory);
    }


    return (
        <React.Fragment>
            <div className={styles.searchWrap}>
                <Search
                    placeholder="Search icon"
                    allowClear
                    enterButton="Search"
                    size="middle"
                    value={searchQuery}
                    onChange={(e) => onChangeSearchQuery(e.target.value)}
                />
            </div>
            {Boolean(selectedCategoryToDisplay) ? <>
                <div className={`${styles.iconsListWrap} ${styles.categoryItemsView}`}>
                    <div className={styles.stickyCategory} style={{ background: token.colorBgBase }}>
                        <div className={styles.categoriesWrap}>
                            <div className={styles.category} style={{ zIndex: 1, position: 'relative', background: token.colorBgBase, borderColor: token.colorBorder, color: token.colorText }}>
                                <div className={styles.categoryName} style={{ background: token.colorBgBase }}>
                                    <div className={styles.iconWrap} style={{ color: token.colorTextLabel, background: token.colorBgElevated }} onClick={() => setSelectedCatToDisplay(null)} >
                                        <BiArrowBack />
                                    </div>
                                    {selectedCategoryToDisplay.name}
                                </div>
                                <div className={styles.iconsWrap}>
                                    {selectedCategoryToDisplay.icons.map((icon, i) => {
                                        const IconComponent = icon.icon;
                                        return <ReactIconRenderer viewType="large" key={i} iconDetails={icon} onSelect={() => onSelectIcon(selectedCategoryToDisplay, IconComponent)} />
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </> : <>
                <div className={`${styles.iconsListWrap}`}>
                    <div className={styles.stickyCategory} style={{ background: token.colorBgBase }}>
                        <div className={styles.categoriesWrap}>
                            {(searchQuery ? filteredCategory : ICONS_CATEGORY_LIST).map((category, i) => {
                                return <div className={styles.category} key={i}
                                    onClick={() => setActiveCategory(category)}
                                    onMouseEnter={() => setHoverId(category)}
                                    onMouseLeave={() => setHoverId('')}
                                    style={{
                                        zIndex: 1,
                                        position: 'relative',
                                        background: token.colorBgBase,
                                        borderColor: token.colorBorder,
                                        color: token.colorText
                                    }}>
                                    <div className={styles.categoryName}>
                                        {category.name}
                                        <div className={styles.showAll} style={{ color: token.colorTextLabel }} onClick={() => setSelectedCatToDisplay(category)} >
                                            Show All
                                        </div>
                                    </div>
                                    <div className={styles.iconsWrap}>
                                        {category.icons.map((icon, i) => {
                                            const IconComponent = icon.icon;
                                            return <ReactIconRenderer viewType="" key={i} iconDetails={icon} onSelect={() => onSelectIcon(category, IconComponent)} />
                                        })}
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </>}
        </React.Fragment>
    )
}

export default IconsElements