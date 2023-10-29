import { BACKGROUND_TYPES } from "@constant/common";
import { getGradientValue } from "./utils";


const getBackgroundColor = (config) => {
    return { background: config.colors[0].color };
}

const getBackgroundGradient = (config) => {
    return { background: getGradientValue(config.colors, config.direction) };
}

const getBackgroundImage = (config) => {
    return {
        backgroundImage: `url(${config.src})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    }
}

const getBackground = (config) => {

    const configSample = {
        value: '#000',
        type: 'Color',
        colors: [{ color: '#000', format: 'hex' }]
    }

    switch (config?.type) {
        case BACKGROUND_TYPES.COLOR:
            return getBackgroundColor(config)
        case BACKGROUND_TYPES.GRADIENT:
            return getBackgroundGradient(config);
        default:
            break;
    }
}


// const getBodyBackground = (config) => {
//     switch (config?.type) {
//         case BACKGROUND_TYPES.COLOR:
//             return getBackgroundColor(config)
//         case BACKGROUND_TYPES.GRADIENT:
//             return getBackgroundGradient(config);
//         case BACKGROUND_TYPES.IMAGE:
//             return getBackgroundImage(config)
//     }
// }

export default getBackground;