import { PAGES_LIST, SECTIONS_LIST } from "@constant/builder";
import { BACKGROUND, BORDER, BORDER_RADIUS, BOX_SHADOW, CONTENT_ALIGNMENT, MARGIN, PADDING, TEXT_STYLES } from "@constant/editorStylesProperties";
import { v4 as uuid } from 'uuid';
import { NAVIGATION_COMPONENTS_LIST } from "../constants";

export default {
    id: uuid(),//id used for dnd
    pageId: PAGES_LIST.HOME_PAGE,
    secionId: SECTIONS_LIST.NAVIGATION,
    componentId: NAVIGATION_COMPONENTS_LIST.NAVIGATION_ONE,
    thumbnail: "https://firebasestorage.googleapis.com/v0/b/ecomsai.appspot.com/o/sections%2Fhomepage%2Fnavigation%2FTwitter%20post%20-%202.jpg?alt=media&token=ada5c811-9f9f-4a8b-95da-0bc8ed0bf46c",
    unid: 111,//this parameter use for drag and drop component( here 1: Home page 1: Navigation 1: navigation one => 111)
    uid: `${SECTIONS_LIST.NAVIGATION}#${NAVIGATION_COMPONENTS_LIST.NAVIGATION_ONE}||${uuid()}`,//uniqe id used for internal identifications => secionId + "#" + componentId
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
    "editable": { label: 'Container', style: [BACKGROUND, BORDER, BORDER_RADIUS, BOX_SHADOW, MARGIN, PADDING, TEXT_STYLES, CONTENT_ALIGNMENT], props: [] },
    "component": "div",
    "children": [
        {
            "uid": `${NAVIGATION_COMPONENTS_LIST.NAVIGATION_ONE}#${uuid()}`,
            "component": "div",
            "props": {
                "text": "Navigation one component"
            },
            "background": {
                value: '#000',
                type: 'Color',
                colors: [{ color: '#000', format: 'hex' }]
            },
            "editable": { label: 'Heading', style: [TEXT_STYLES, BACKGROUND, BORDER_RADIUS, BOX_SHADOW], props: ['text'] },
            "style": {
                "color": "green",
                "fontSize": "30px"
            }
        },
        // {
        //     "uid": `${NAVIGATION_COMPONENTS_LIST.NAVIGATION_ONE}#${uuid()}`,
        //     "component": "p",
        //     "props": {
        //         "text": "Navigation one component details!"
        //     },
        //     "editable": { label: 'Subheading', style: [TEXT_STYLES], props: ['text'] },
        //     "style": {
        //         "color": "blue",
        //         "fontSize": "18px"
        //     }
        // }
    ]
}