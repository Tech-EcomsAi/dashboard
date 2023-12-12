import { LOGO_ANIMATED, LOGO_LARGE, LOGO_SMALL } from "@constant/common";

export type TEMPLATE_DETAILS_TYPE = {
    id: string,
    title: string,
    description?: string,
    tagline?: string,
    images?: any[],
    thumbnail: any,
    createdOn: any,
    isPublished: boolean,
    isDeleted: boolean,
    sharedWith: any,
    createdBy: any,
    publicUrl: string,
    templateId: string,
    isNew: boolean,
    isTrending: boolean,
    isForYou: boolean,
    isPlatformTemplate: boolean,
}

export type TEMPLATE_SECTION = {
    key: string;
    title: string;
    icon: React.JSX.Element;
    description: string;
    templatesList: TEMPLATE_DETAILS_TYPE[];
}

