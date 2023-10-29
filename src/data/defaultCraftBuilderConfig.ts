import { LOGO } from "@constant/common";

export default {
    id: '',
    isPro: false,
    licenceDate: '10-02-2024',
    name: 'Default',
    createdOn: "",
    modifiedOn: "",
    watermark: {
        text: 'TEXT',
        logo: LOGO
    },
    colors: [
        { label: 'Dark', colors: ['#0C134F', '#5F264A', '#393646', '#37306B', '#2C3333'], },
        { label: 'Light', colors: ['#79E0EE', '#B799FF', '#99A98F', '#A6D0DD', '#FFACAC'], },
        { label: 'Neon', colors: ['#79E0EE', '#FFB84C', '#FF55BB', '#F6F1E9', '#F0FF42', '#060047'], },
        { label: 'Pastel', colors: ['#C4DFDF', '#F5F0BB', '#ACB1D6', '#DDFFBB', '#B9F3E4'], },
    ],
};