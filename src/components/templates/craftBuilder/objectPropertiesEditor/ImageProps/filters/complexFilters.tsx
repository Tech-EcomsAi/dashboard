import React, { useEffect, useState } from 'react'
import { fabric } from "fabric";
import styles from './filter.module.scss';
import { Checkbox, Slider, theme } from 'antd';
import { activeObjectsState } from '@template/craftBuilder/types';
import { complexImageFilters } from '@constant/craftBuilder';
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import { showErrorToast } from '@reduxSlices/toast';
import { useAppDispatch } from '@hook/useAppDispatch';
import SliderElement from '@antdComponent/sliderElement';

type pageProps = {
    createFilter: any,
    updateLocalCanvas: any,
    canvas: fabric.canvas,
    activeObjectsState: activeObjectsState,
    getFabricFilterType: any
}

function ComplexFilters({ createFilter, updateLocalCanvas, canvas, activeObjectsState, getFabricFilterType }: pageProps) {

    const [availableFilters, setAvailableFilters] = useState(complexImageFilters);
    const { token } = theme.useToken();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const activeObject = canvas?.getActiveObjects()[0];
        if (activeObject) {
            const availableFiltersCopy = [...availableFilters];
            availableFiltersCopy.map((filterItem) => {
                let isApplied = activeObject.filters.find((f) => f.type == getFabricFilterType(filterItem.type)) || null
                filterItem.status = Boolean(isApplied)
            })
            setAvailableFilters(availableFiltersCopy);
        }
    }, [canvas, activeObjectsState])

    // set filter value
    const changeAttr = (index, type, key, value) => {
        const activeObject = canvas.getActiveObjects()[0];
        const itemFilter = activeObject.filters.find((f) => f.type == getFabricFilterType(type)) || null
        if (itemFilter) {
            itemFilter[key] = value;
        } else {
            const filterObj = createFilter(type);
            filterObj[key] = value;
            if (filterObj) {
                activeObject.filters.push(filterObj);
                activeObject.applyFilters();
                const availableFiltersCopy = [...availableFilters];
                availableFiltersCopy[index].value = value;
                setAvailableFilters(availableFiltersCopy);
            }
        }
        activeObject.applyFilters();
        updateLocalCanvas(canvas, 'complex filter update');
    }

    const removeFilter = (index) => {
        const availableFiltersCopy = [...availableFilters];
        availableFiltersCopy[index].status = false;
        setAvailableFilters(availableFiltersCopy);
        const activeObject = canvas.getActiveObjects()[0];
        const fabricType = getFabricFilterType(availableFiltersCopy[index].type);
        activeObject.filters = activeObject.filters.filter((value) => value.type !== fabricType);
        activeObject.applyFilters();
        updateLocalCanvas(canvas, 'complex filter remove');
    }

    const activateFilter = (index, status) => {
        const activeObject = canvas.getActiveObjects()[0];
        if (!activeObject.locked) {
            const availableFiltersCopy = [...availableFilters];
            if (status) {
                availableFiltersCopy[index].status = status;
                onChangeValue(index, availableFiltersCopy[index], availableFiltersCopy[index].value)
            } else {
                removeFilter(index);
            }
        } else {
            dispatch(showErrorToast('Element is locked 🔒'))
        }
    }

    const onChangeValue = (index, filterItem, value) => {
        const activeObject = canvas.getActiveObjects()[0];
        if (!activeObject.locked) {
            const availableFiltersCopy = [...availableFilters];
            availableFiltersCopy[index].value = value;
            setAvailableFilters(availableFiltersCopy);
            const moduleInfo = availableFilters.find((item) => item.type === filterItem.type);
            if (moduleInfo.status) {
                changeAttr(index, filterItem.type, filterItem.key, filterItem.value);
            }
        } else {
            dispatch(showErrorToast('Element is locked 🔒'))
        }
    }

    return (
        <div className={styles.complexFiltersWrap}>
            {availableFilters.map((filterItem, i) => {
                return <div key={filterItem.key} className={`${styleElementCSS.styleWrap} ${styles.elementWrap}`}>
                    <div className={`${styleElementCSS.label}  ${styles.elementLabel}`}>
                        <Checkbox defaultChecked={filterItem.status} style={{ color: token.colorTextBase }} checked={filterItem.status} onChange={(value) => activateFilter(i, !filterItem.status)}>{filterItem.name}</Checkbox>
                    </div>
                    <div className={`${styleElementCSS.elementWrap} ${styles.element} ${filterItem.status ? styles.showValue : styles.hideValue}`}>
                        <SliderElement
                            min={filterItem.min}
                            max={filterItem.max}
                            onChange={(value) => onChangeValue(i, filterItem, value)}
                            value={filterItem.value}
                            step={filterItem.step}
                        />
                    </div>
                </div>
            })}
        </div>
    )
}

export default ComplexFilters