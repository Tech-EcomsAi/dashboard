import { reduxStore } from "@reduxStore/index";
import defaultSiteConfig from "src/data/defaultSiteConfig";

type gradientConfigObj = {
    type: string,
    props: any,
    colors: any[]
}

const getSiteVariables = () => {
    const colorVariables = reduxStore.getState()?.siteConfig?.siteConfig?.variables
    return colorVariables || defaultSiteConfig.variables;
}

export const getColourValue = (color: string) => {
    if (color.includes('color')) return getSiteVariables()[color];
    else return color
}

export const getGradientValue = (configObj: gradientConfigObj) => {
    const colors = configObj.colors;
    let { direction, type } = configObj.props;
    if (type.includes("radial")) {
        type = 'radial'
    };
    let colorsString = '';
    colors.map((c, i) => {
        colorsString = `${colorsString}${c.color}${i != colors.length - 1 ? ', ' : ''}`
    })
    // console.log("configObj.props", configObj.props)
    return (`${type}-gradient(${direction}, ${colorsString})`);
}