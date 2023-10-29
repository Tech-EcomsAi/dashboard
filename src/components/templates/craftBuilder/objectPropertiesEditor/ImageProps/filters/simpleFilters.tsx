import React, { useEffect, useState } from 'react'
import { fabric } from "fabric";
import styles from './filter.module.scss';
import { Collapse, theme, Image } from 'antd';
import { simpleImageFilters } from '@constant/craftBuilder';
import { LuCheck } from 'react-icons/lu'
import bgImagestyles from '@molecules/bgImageEditor/bgImageEditor.module.scss'
import { showErrorToast } from '@reduxSlices/toast';
import { useAppDispatch } from '@hook/useAppDispatch';
import { activeObjectsState } from '@template/craftBuilder/types';


type pageProps = {
    createFilter: any,
    updateLocalCanvas: any,
    canvas: fabric.canvas,
    activeObjectsState: activeObjectsState,
    getFabricFilterType: any
}

function SimpleFilters({ createFilter, updateLocalCanvas, canvas, activeObjectsState, getFabricFilterType }: pageProps) {

    const [availableFilters, setAvailableFilters] = useState(simpleImageFilters);
    const { token } = theme.useToken();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const activeObject = canvas?.getActiveObjects()[0];
        if (activeObject) {
            const availableFiltersCopy = { ...availableFilters };
            Object.keys(availableFilters).map((filterType) => {
                let isApplied = activeObject.filters.find((f) => f.type == getFabricFilterType(filterType)) || null
                availableFiltersCopy[filterType] = Boolean(isApplied)
            })
            setAvailableFilters(availableFiltersCopy);
        }
    }, [canvas, activeObjectsState])

    const removeFilter = (activeObject, type) => {
        setAvailableFilters({ ...availableFilters, [type]: false })
        const fabricType = getFabricFilterType(type);
        activeObject.filters = activeObject.filters.filter((value) => value.type !== fabricType);
        activeObject.applyFilters();
        updateLocalCanvas(canvas, 'SimpleFilters:remove');
    }

    const setSelectedFilter = (type, isApplied) => {
        const activeObject = canvas.getActiveObjects()[0];
        if (!activeObject.locked) {
            let imgFilter = null;
            if (isApplied) return removeFilter(activeObject, type);
            if (activeObject) {
                imgFilter = activeObject.filters.find((f) => f.type == getFabricFilterType(type)) || null
                if (!imgFilter) {
                    const filterObj = createFilter(type);
                    if (filterObj) {
                        activeObject.filters.push(filterObj);
                        activeObject.applyFilters();
                        updateLocalCanvas(canvas, "SimpleFilters selectedfilter");
                        setAvailableFilters({ ...availableFilters, [type]: true })
                    }
                }
            }
        } else {
            dispatch(showErrorToast('Element is locked 🔒'))
        }

    }

    return (
        <div className={styles.filterItemWrap}>
            {Object.keys(availableFilters).map((type: any) => {
                return <React.Fragment key={type}>
                    <div className={`hover ${bgImagestyles.imageWrap} ${styles.imageWrap} ${availableFilters[type] ? bgImagestyles.active : ''}`}
                        onClick={() => setSelectedFilter(type, availableFilters[type])}
                        style={{ outlineColor: availableFilters[type] ? token.colorPrimary : token.colorBgTextHover }}
                    >
                        {availableFilters[type] && <div className={styles.selected} style={{ backgroundColor: token.colorPrimary }}>
                            <LuCheck />
                        </div>}
                        <div className={bgImagestyles.imageContent} >
                            <Image style={{ borderRadius: "4px", }} src={`/assets/images/filters/${type}.png`} preview={false} />
                        </div>
                        <div className={bgImagestyles.title} style={{
                            borderRadius: "4px",
                            fontSize: '11px',
                            backgroundColor: availableFilters[type] ? token.colorPrimary : token.colorBgContainer,
                            color: token.colorText
                        }}>{type}</div>
                    </div>
                </React.Fragment>
            })}
        </div>
    )
}

export default SimpleFilters