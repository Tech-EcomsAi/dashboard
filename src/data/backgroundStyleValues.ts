import { BACKGROUND_TYPES } from "@constant/common";

export const GRADIENT_INITIAL_VALUE = {
    type: BACKGROUND_TYPES.GRADIENT,
    value: "linear-gradient(to right, #9796F0, #FBC7D4)",
    colors: [{ color: '#9796F0', format: 'hex' }, { color: '#FBC7D4', format: 'hex' }],
    direction: 'to right'
}

export const COLOR_INITIAL_VALUE = {
    type: BACKGROUND_TYPES.COLOR,
    value: "#D3CCE3",
    colors: [{ color: '#D3CCE3', format: 'hex' }],
}

export const IMAGE_INITIAL_VALUE = {
    type: BACKGROUND_TYPES.IMAGE,
    value: '#D3CCE3',
    src: 'https://orra.respark.in/assets/images/female/bg.png',
    isMobile: true,
    isDesktop: false,
    colors: [{ color: '#D3CCE3', format: 'hex' }]
}