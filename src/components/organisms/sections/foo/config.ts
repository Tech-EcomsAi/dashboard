import { BACKGROUND_TYPES } from "@constant/common";
import { FOO, SECTIONS_CATEGORIES } from "@constant/components";
import { SITE_COLOR_VARIABLE } from "@constant/defaultValues";
import { BACKGROUND, BORDER, BORDER_RADIUS, BOX_SHADOW, CONTENT_ALIGNMENT, MARGIN, PADDING, TEXT_STYLES } from "@constant/editorStylesProperties";
import { v4 as uuid } from 'uuid';

export default {
    "id": uuid(),
    "uid": FOO,
    "section": SECTIONS_CATEGORIES.NAVIGATION,
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
        "color": 'black'
    },
    "background": {
        value: SITE_COLOR_VARIABLE.COLOR_PARAGRAPH,
        type: BACKGROUND_TYPES.GRADIENT,
        props: {
            type: "radialEllipse",
            direction: "ellipse at right"
        },
        colors: [{ color: '#9400D3', format: 'hex' }, { color: '#4B0082', format: 'hex' }]
    },
    "editable": {
        label: 'Container', style: [
            TEXT_STYLES,
            BACKGROUND,
            BORDER,
            BORDER_RADIUS,
            MARGIN,
            PADDING,
            BOX_SHADOW,
            CONTENT_ALIGNMENT
        ], props: []
    },
    "component": "div",
    "children": [
        {
            "uid": `${FOO}#${uuid()}`,
            "component": "div",
            "props": {
                "text": "Hello World!"
            },
            // "background": {
            //     value: '#e386c4',
            //     type: 'Color',
            //     colors: [{ color: `colorPrimary`, format: 'hex' }]
            // },
            "editable": { label: 'Heading', style: [BOX_SHADOW, BACKGROUND, TEXT_STYLES], props: ['text'] },
            "style": {
                "color": SITE_COLOR_VARIABLE.COLOR_TITLE,
                "fontSize": "30px"
            },
            children: [
                {
                    "uid": `${FOO}#${uuid()}`,
                    "component": "p",
                    "props": {
                        "text": "Welcome to the world of React components!"
                    },
                    "editable": { label: 'Subheading', style: [TEXT_STYLES], props: ['text'] },
                    "style": {
                        "color": SITE_COLOR_VARIABLE.COLOR_PARAGRAPH,
                        "fontSize": "18px"
                    }
                }
            ]
        }
    ]
}