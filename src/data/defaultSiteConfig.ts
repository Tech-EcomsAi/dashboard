import { LOGO_TEXT } from "@constant/common";

const DARK_COLORS = ['#0C134F', '#5F264A', '#393646', '#37306B', '#2C3333'];
const LIGHT_COLORS = ['#79E0EE', '#B799FF', '#99A98F', '#A6D0DD', '#FFACAC'];
const NEON_COLORS = ['#79E0EE', '#FFB84C', '#FF55BB', '#F6F1E9', '#F0FF42', '#060047'];
const PASTEL_COLORS = ['#C4DFDF', '#F5F0BB', '#ACB1D6', '#DDFFBB', '#B9F3E4'];
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
        value: '#D3CCE3',
        type: 'Color',
        src: 'https://orra.respark.in/assets/images/female/bg.png',
        isMobile: true,
        isDesktop: false,
        colors: [{ color: '#D3CCE3', format: 'hex' }]
    },
    colors: [
        { label: 'Dark & Light', colors: [...DARK_COLORS, ...LIGHT_COLORS] },
        { label: 'Neon & Pastel', colors: [...NEON_COLORS, ...PASTEL_COLORS] },
    ],
    style: {
        padding: '0 0 0 0',
    }
    //site ref https://colorhunt.co/palettes/neon
};