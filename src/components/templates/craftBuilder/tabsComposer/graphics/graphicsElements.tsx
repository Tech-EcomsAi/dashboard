import { Input, Spin, theme } from 'antd';
import React, { useRef, useState } from 'react'
import styles from './graphics.module.scss'
import { fabric } from "fabric";
import { renderToStaticMarkup } from 'react-dom/server';
import useInViewport from '@hook/useInViewport';
import { LoadingOutlined } from '@ant-design/icons';
import iconCss from './reactIconRenderer/reactIconRenderer.module.scss';
import { CUSTOME_ATTRIBUTES, OBJECT_TYPES } from '@constant/craftBuilder';
import { v4 as uuid } from 'uuid';
import { BiArrowBack } from 'react-icons/bi';
import { GRAPHICS_LIST } from 'src/data/graphics';

const { Search } = Input;
// onSelect is passed from background of workspace
function GraphicsElements({ onSelect = null, canvas, updateLocalCanvas }) {
    const { token } = theme.useToken();
    const [activeGrCategory, setActiveGrCategory] = useState(Object.keys(GRAPHICS_LIST)[0])
    const [activeCategory, setActiveCategory] = useState<any>('')
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

    const onSelectIcon = (category, icon) => {
        let iconType = 'svg';
        if (typeof icon == 'string') {
            if (icon.includes("base64") || icon.includes("png")) {
                iconType = 'img';
            } else if (icon.includes("png")) {
                iconType = 'img';
            }
        }
        if (onSelect) {
            onSelect({ src: icon })
        } else {
            if (iconType == 'svg') {
                fabric.loadSVGFromURL(icon, (objects, options) => {
                    const svgObject = fabric.util.groupSVGElements(objects, options);
                    const center = canvas.getCenter();
                    svgObject.set({
                        left: center.left / 2,
                        top: center.top / 2,
                        scaleX: 1,
                        scaleY: 1,
                        uid: uuid(),
                        [CUSTOME_ATTRIBUTES.OBJECT_TYPE]: OBJECT_TYPES.graphics
                    });
                    // Add the SVG object to the canvas
                    svgObject.scale(0.2)
                    canvas.add(svgObject);
                    canvas.setActiveObject(svgObject);
                    updateLocalCanvas(canvas, 'GraphicsElements')
                });
            } else {
                fabric.Image.fromURL(icon, function (img: any) {
                    if (img == null) {
                        alert("Error!");
                    } else {
                        const center = canvas.getCenter();
                        img.set({ left: center.left / 2, top: center.top / 2 }).scale(0.2);
                        img.set({ uid: uuid() })
                        canvas.add(img);
                        canvas.viewportCenterObject(img)
                        canvas.setActiveObject(img)
                        updateLocalCanvas(canvas, 'GraphicsElements');
                    }
                }, { crossOrigin: 'anonymous' });
            }
        }
    }

    const onChangeSearchQuery = (query) => {
        setSearchQuery(query);
        let filteredCategory = [];
        GRAPHICS_LIST[activeGrCategory].map((catgeory) => {
            let filteredIcons = catgeory.icons.filter((icon) => icon.toLowerCase().includes(query.toLowerCase()));
            if (filteredIcons.length != 0) {
                filteredCategory.push({ ...catgeory, icons: filteredIcons })
            }
        })
        setFilteredCategory(filteredCategory);
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
                                <div className={styles.categoryName}>
                                    <div className={styles.iconWrap} style={{ color: token.colorTextLabel, background: token.colorBgElevated }} onClick={() => setSelectedCatToDisplay(null)} >
                                        <BiArrowBack />
                                    </div>
                                    {selectedCategoryToDisplay.name}
                                </div>
                                <div className={styles.iconsWrap}>
                                    {selectedCategoryToDisplay.icons.map((icon, i) => {
                                        const IconComponent = icon;
                                        return <ReactIconRenderer viewType="large" key={i} icon={icon} onSelect={() => onSelectIcon(selectedCategoryToDisplay, IconComponent)} />
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </> : <>
                <div className={`${styles.iconsListWrap}`} style={{ background: token.colorBgBase }}>
                    <div className={`${styles.stickyCategory} ${styles.graphicsGroupCat}`} style={{ background: token.colorBgBase }}>
                        {Object.keys(GRAPHICS_LIST).map((grCategory: any) => {
                            return <React.Fragment key={grCategory}>
                                <div className={styles.category} key={grCategory}
                                    onClick={() => setActiveGrCategory(grCategory)}
                                    onMouseEnter={() => setHoverId(grCategory)}
                                    onMouseLeave={() => setHoverId('')}
                                    style={{
                                        background: token.colorBgBase,
                                        borderColor: (hoverId == grCategory || activeGrCategory == grCategory) ? token.colorPrimary : token.colorBorder,
                                        color: (activeGrCategory == grCategory || hoverId == grCategory) ? token.colorPrimary : token.colorTextBase
                                    }}>
                                    {grCategory}
                                </div>
                            </React.Fragment>
                        })}
                    </div>
                    {Boolean(searchQuery || activeGrCategory) && <div className={`${styles.stickyCategory} ${styles.groupCategoryList}`} style={{ background: token.colorBgBase }}>
                        <div className={styles.categoriesWrap}>
                            {(searchQuery ? filteredCategory : GRAPHICS_LIST[activeGrCategory]).map((category, i) => {
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
                                        <div className={styles.showAll} style={{ color: token.colorTextLabel }} onClick={() => setSelectedCatToDisplay(category)}>
                                            Show All
                                        </div>
                                    </div>
                                    <div className={styles.iconsWrap}>
                                        {category.icons.map((icon, i) => {
                                            const IconComponent = icon;
                                            return <ReactIconRenderer key={i} icon={icon} onSelect={() => onSelectIcon(category, IconComponent)} />
                                        })}
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>}
                </div>
            </>}
        </React.Fragment>
    )
}

export default GraphicsElements


const ReactIconRenderer = ({ viewType = '', onSelect, icon }) => {
    const [hoverId, setHoverId] = useState(null);
    const { token } = theme.useToken();
    const iconRef = useRef();
    const isVisible = useInViewport(iconRef);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return (
        <div className={`${iconCss.iconElementWrap} ${iconCss.graphicsElement} ${viewType == 'large' ? iconCss.largeView : ''}`}
            onClick={onSelect}
            onMouseEnter={() => setHoverId(icon)}
            onMouseLeave={() => setHoverId('')}
            ref={iconRef}
            style={{
                background: token.colorBgTextHover,
                borderColor: (hoverId == icon) ? token.colorPrimary : token.colorBorder,
                color: (hoverId == icon) ? token.colorPrimary : token.colorTextBase,
            }}>
            {isVisible ? <img src={icon} /> : <>
                <Spin indicator={antIcon} />
            </>}
        </div>
    )
}

export { ReactIconRenderer };