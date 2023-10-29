import { BAR, SECTIONS_CATEGORIES } from "@constant/components";
import { BACKGROUND, BORDER, BORDER_RADIUS, BOX_SHADOW, MARGIN, PADDING, TEXT_STYLES } from "@constant/editorStylesProperties";
import { v4 as uuid } from 'uuid';

export default {
    id: uuid(),//id used for dnd
    uid: BAR,//uniqe id used for interbnal identifications
    section: SECTIONS_CATEGORIES.HERO,//category
    "className": "componentWrap",
    "appearance": {
        "mobile": true,
        "desktop": true
    },
    "style": {
        "width": '100%',
        "height": '100%',
        "boxShadow": 'unset',
        "padding": '20px 20px 20px 20px',
        "color": 'black',
        "border": '30px solid #e386c4'
    },
    "background": {
        value: '#000',
        type: 'Color',
        colors: [{ color: '#000', format: 'hex' }]
    },
    "editable": { label: 'Container', style: [BACKGROUND, BORDER, BORDER_RADIUS, MARGIN, PADDING], props: [] },
    "component": "div",
    "children": [
        {
            "uid": `${BAR}#${uuid()}`,
            "component": "div",
            "props": {
                "text": "Hello, BARR!"
            },
            "background": {
                value: '#000',
                type: 'Color',
                colors: [{ color: '#000', format: 'hex' }]
            },
            "editable": { label: 'Heading', style: [TEXT_STYLES, BACKGROUND, BORDER_RADIUS, BOX_SHADOW], props: ['text'] },
            "style": {
                "color": "red",
                "fontSize": "30px"
            }
        },
        {
            "uid": `${BAR}#${uuid()}`,
            "component": "p",
            "props": {
                "text": "Welcome to the BARR world!"
            },
            "editable": { label: 'Subheading', style: [TEXT_STYLES], props: ['text'] },
            "style": {
                "color": "blue",
                "fontSize": "18px"
            }
        }
    ]
}