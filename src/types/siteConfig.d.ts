import { ReactComponentElement } from "react";

interface SiteConfig {
    id: any,
    version: string,
    name: string,
    createdOn: string,
    modifiedOn: string,
    logo: {
        type: string,
        value: any
    },
    background: {
        type: string,//Color/Gradient/image
        value: any
    },
    colors: any[],
    style: any
    //site ref https://colorhunt.co/palettes/neon
}

export default SiteConfig;