import { DARK_COLORS, LIGHT_COLORS, LOGO_TEXT, NEON_COLORS, PASTEL_COLORS } from "@constant/common";
export default {
    id: '',
    version: '1.0',
    name: 'Default',
    createdOn: "",
    modifiedOn: "",
    logo: {
        type: 'TEXT',
        value: LOGO_TEXT
    },
    background: {
        value: 'colorBg',
        type: 'Color',
        src: 'https://orra.respark.in/assets/images/female/bg.png',
        isMobile: true,
        isDesktop: false,
        colors: [{ color: 'colorBg', format: 'hex' }]
    },
    colors: [
        { label: 'Dark & Light', colors: [...DARK_COLORS, ...LIGHT_COLORS] },
        { label: 'Neon & Pastel', colors: [...NEON_COLORS, ...PASTEL_COLORS] },
    ],
    style: {
        padding: '0 0 0 0',
    },
    variables: {
        colorBg: "#ffff",
        colorTitle: "pink",
        colorParagraph: "green",
        colorButton: "#0f3832",
        colorOutlineButton: "#0f3832",
    },
    builderState: null
    //site ref https://colorhunt.co/palettes/neon
};