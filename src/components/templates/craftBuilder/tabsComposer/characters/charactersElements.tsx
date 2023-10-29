import { Input, Spin, theme } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import styles from './characters.module.scss'
import { fabric } from "fabric";
import useInViewport from '@hook/useInViewport';
import { LoadingOutlined } from '@ant-design/icons';
import { CUSTOME_ATTRIBUTES, OBJECT_TYPES } from '@constant/craftBuilder';
import { CHARACTERS_LIST } from 'src/data/characters';
import { v4 as uuid } from 'uuid';

const { Search } = Input;

function CharactersElements({ canvas, updateLocalCanvas, activeTab }) {
    const { token } = theme.useToken();
    const [activeCategory, setActiveCategory] = useState<any>(CHARACTERS_LIST[activeTab][0])
    const [hoverId, setHoverId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCategory, setFilteredCategory] = useState([]);

    useEffect(() => {
        setActiveCategory(CHARACTERS_LIST[activeTab][0]);
    }, [activeTab])


    const onSelectIcon = (category, icon) => {

        fabric.loadSVGFromURL(icon, (objects, options) => {
            const svgObject = fabric.util.groupSVGElements(objects, options);
            const center = canvas.getCenter();
            svgObject.set({
                left: center.left / 2,
                top: center.top / 2,
                scaleX: 1,
                scaleY: 1,
                uid: uuid(),
                [CUSTOME_ATTRIBUTES.OBJECT_TYPE]: OBJECT_TYPES.CharactersProps
            });
            // Add the SVG object to the canvas
            svgObject.scale(0.4)
            canvas.add(svgObject);
            canvas.setActiveObject(svgObject);
            updateLocalCanvas(canvas, 'CharactersElements')
        });
    }

    const onChangeSearchQuery = (query) => {
        setSearchQuery(query);
        let filteredCategory = [];
        CHARACTERS_LIST[activeTab].map((catgeory) => {
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
                fileName.push(`/assets/CharactersPropss-graphics/assets/Pose/${file.name}`)
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
            <div className={`${styles.iconsListWrap}`} style={{ background: token.colorBgBase }}>
                {searchQuery ? <>
                    <div className={styles.stickyCategory} style={{ background: token.colorBgBase }}>
                        <div className={styles.categoriesWrap}>
                            {filteredCategory.map((category, i) => {
                                return <div className={styles.categoryName} key={i}
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
                                    <div className={styles.category}>
                                        {category.name}
                                    </div>
                                    <div className={styles.iconsWrap}>
                                        {category.icons.map((icon, i) => {
                                            return <ReactIconRenderer key={i} onSelect={() => onSelectIcon(category, icon)} icon={icon} />
                                        })}
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </> : <>
                    <div className={styles.stickyCategory} style={{ background: token.colorBgBase }}>
                        <div className={styles.categoriesWrap}>
                            {CHARACTERS_LIST[activeTab].map((category, i) => {
                                return <div className={styles.categoryName} key={i}
                                    onClick={() => setActiveCategory(category)}
                                    onMouseEnter={() => setHoverId(category)}
                                    onMouseLeave={() => setHoverId('')}
                                    style={{
                                        zIndex: activeCategory.id == category.id ? 2 : 1,
                                        position: activeCategory.id == category.id ? 'sticky' : 'relative',
                                        background: token.colorBgBase,
                                        borderColor: (hoverId == category || activeCategory.id == category.id) ? token.colorPrimary : token.colorBorder,
                                        color: (activeCategory.id == category.id || hoverId == category) ? token.colorPrimary : token.colorText
                                    }}>
                                    {category.name}
                                </div>
                            })}
                        </div>
                        <div className={styles.activeCategory}>{activeCategory.name}</div>
                    </div>
                    {activeCategory && <div className={styles.iconsWrap}>
                        {activeCategory?.icons.map((iconUrl, i) => {
                            return <ReactIconRenderer key={i} icon={iconUrl} onSelect={() => onSelectIcon(activeCategory, iconUrl)} />
                        })}
                    </div>}
                </>}
            </div>
        </React.Fragment>
    )
}

export default CharactersElements


const ReactIconRenderer = ({ onSelect, icon }) => {
    const [hoverId, setHoverId] = useState(null);
    const { token } = theme.useToken();
    const iconRef = useRef();
    const isVisible = useInViewport(iconRef);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return (
        <div className={styles.iconElementWrap}
            onClick={onSelect}
            onMouseEnter={() => setHoverId(icon)}
            onMouseLeave={() => setHoverId('')}
            ref={iconRef}
            style={{
                background: token.colorBgTextHover,
                borderColor: (hoverId == icon) ? token.colorPrimary : token.colorBorder,
                color: (hoverId == icon) ? token.colorPrimary : token.colorTextBase,
                width: `calc(100% / 3 - 9px)`,
                height: '80px'
            }}>
            {isVisible ? <img src={icon} /> : <>
                <Spin indicator={antIcon} />
            </>}
        </div>
    )
}

export { ReactIconRenderer };