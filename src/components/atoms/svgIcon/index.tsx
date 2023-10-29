/* eslint-disable max-len */
import React, { FC } from "react";

import close from "./close.svg";
import cart from "./cart.svg";
import closeLarge from "./clear.svg";
import share from "./share.svg";
import camera from "./camera.svg";
import expand from "./expand.svg";
import timer from "./timer.svg";
import info from "./info.svg";
import backArrow from "./backArrow.svg";
import instagram from "./instagram.svg";
import backNavigation from "./backNavigation.svg";
import next from "./next.svg";
import home from "./home.svg";
import star2 from "./star2.svg";
import dashboard from "@assets/Icons/sidebar/dashboard";
import analytics from "@assets/Icons/sidebar/analytics";
import builder from "@assets/Icons/sidebar/builder";
import chat from "@assets/Icons/sidebar/chat";
import collapsedMenu from "@assets/Icons/sidebar/collapsedMenu";
import CRM from "@assets/Icons/sidebar/CRM";
import dark from "@assets/Icons/sidebar/dark";
import ecommerce from "@assets/Icons/sidebar/ecommerce";
import expandedMenu from "@assets/Icons/sidebar/expandedMenu";
import help from "@assets/Icons/sidebar/help";
import light from "@assets/Icons/sidebar/light";
import note from "@assets/Icons/sidebar/note";
import notifications from "@assets/Icons/sidebar/notifications";
import promotion from "@assets/Icons/sidebar/promotion";
import PWA from "@assets/Icons/sidebar/PWA";
import query from "@assets/Icons/sidebar/query";
import reports from "@assets/Icons/sidebar/reports";
import settings from "@assets/Icons/sidebar/settings";
import profile from "@assets/Icons/sidebar/profile";
import theme from "@assets/Icons/sidebar/theme";
import logout from "@assets/Icons/sidebar/logout";
//craft builder icons
import template from "@assets/Icons/craftBuilder/template";
import text from "@assets/Icons/craftBuilder/text";
import myStuff from "@assets/Icons/craftBuilder/myStuff";
import documents from "@assets/Icons/craftBuilder/documents";
import brandKit from "@assets/Icons/craftBuilder/brandKit";
import graphics from "@assets/Icons/craftBuilder/graphics";
import qrcode from "@assets/Icons/craftBuilder/qrcode";
import watermark from "@assets/Icons/craftBuilder/watermark";
import character from "@assets/Icons/craftBuilder/character";
import shapes from "@assets/Icons/craftBuilder/shapes";
import images from "@assets/Icons/craftBuilder/images";
import background from "@assets/Icons/craftBuilder/background";

const icons: any = {
    cart: cart,
    close: close,
    backArrow: backArrow,
    instagram: instagram,
    next: next,
    backNavigation: backNavigation,
    info: info,
    timer: timer,
    expand: expand,
    camera: camera,
    share: share,
    closeLarge: closeLarge,
    home: home,
    star2: star2,
    dashboard: dashboard,
    builder: builder,
    analytics: analytics,
    CRM: CRM,
    notifications: notifications,
    profile: profile,
    reports: reports,
    settings: settings,
    ecommerce: ecommerce,
    dark: dark,
    light: light,
    logout: logout,
    collapsedMenu: collapsedMenu,
    theme: theme,
    PWA: PWA,
    chat: chat,
    note: note,
    promotion: promotion,
    query: query,
    expandedMenu: expandedMenu,
    help: help,
    //craft builder icons
    background: background,
    images: images,
    shapes: shapes,
    character: character,
    watermark: watermark,
    qrcode: qrcode,
    graphics: graphics,
    brandKit: brandKit,
    documents: documents,
    myStuff: myStuff,
    text: text,
    template: template,
};

type Props = {
    icon: any;
    alt?: string;
    color?: string;
    width?: number;
    height?: number;
    style?: any;
    background?: string;
    margin?: string;
    padding?: string;
    shape?: string; //circle or square
    onlySvg?: boolean;
};
const getIcon = (icon: any) => icons[icon];

const SvgIcon: FC<Props> = ({
    icon,
    color = "inherit",
    width = 24,
    height = 24,
    shape = "",
    background = "unset",
    padding = "",
    margin = "",
    style,
    onlySvg = false,
}: Props) => {
    const CurrentIcon = getIcon(icon);

    const shapeCss = shape
        ? {
            background: "#dee1ec",
            borderRadius: shape == "circle" ? "50%" : "6px",
            padding: padding || "5px",
            margin: margin || "unset",
        }
        : {};

    return (
        <React.Fragment>
            {onlySvg ? (
                <>
                    <CurrentIcon />
                </>
            ) : (
                <>
                    <span
                        className="svg-icon-wrap d-f-c"
                        style={{
                            color: color,
                            width: `${width}px`,
                            height: `${height}px`,
                            background: background,
                            ...shapeCss,
                            ...style,
                        }}
                    >
                        <CurrentIcon />
                    </span>
                </>
            )}
        </React.Fragment>
    );
};

export default SvgIcon;
