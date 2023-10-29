/* eslint-disable max-len */
import React, { FC } from "react";

import dribble from "./dribble.svg";
import facebook from "./facebook.svg";
import linkedin from "./linkedin.svg";
import instagram from "./instagram.svg";
import reddit from "./reddit.svg";
import pinterest from "./pinterest.svg";
import tumblr from "./tumblr.svg";
import snapchat from "./snapchat.svg";
import twitch from "./twitch.svg";
import twitter from "./twitter.svg";
import youtube from "./youtube.svg";
import appstore from "./appstore.svg";
import notion from "./notion.svg";
import blogger from "./blogger.svg";
import productHunt from "./productHunt.svg";
import tiktok from "./tiktok.svg";
import email from "./email.svg";
import drive from "./drive.svg";
import vcard from "./vcard.svg";
import sms from "./sms.svg";
import call from "./call.svg";
import location from "./location.svg";
import playstore from "./playstore.svg";
import weburl from "./weburl.svg";
import sharevia from "./sharevia.svg";
import whatsapp from "./whatsapp.svg";
export { appstore }


const icons: any = {
    dribble: dribble,
    linkedin: linkedin,
    facebook: facebook,
    tiktok: tiktok,
    productHunt: productHunt,
    blogger: blogger,
    notion: notion,
    appstore: appstore,
    youtube: youtube,
    twitter: twitter,
    twitch: twitch,
    snapchat: snapchat,
    pinterest: pinterest,
    tumblr: tumblr,
    instagram: instagram,
    reddit: reddit,
    whatsapp: whatsapp,
    sharevia: sharevia,
    weburl: weburl,
    playstore: playstore,
    location: location,
    call: call,
    sms: sms,
    vcard: vcard,
    drive: drive,
    email: email,
    // logout: logout,
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
    onlySvg?: boolean
};
const getIcon = (icon: any) => icons[icon];

const SocialIcon: FC<Props> = ({ icon, color = 'inherit', width = 24, height = 24, shape = "", background = "unset", padding = "", margin = "", style, onlySvg = false }: Props) => {
    const CurrentIcon = getIcon(icon);

    const shapeCss = shape ? {
        background: '#dee1ec',
        borderRadius: shape == 'circle' ? '50%' : '6px',
        padding: padding || '5px',
        margin: margin || 'unset'
    } : {};

    return (
        <React.Fragment>
            {onlySvg ? <>
                <CurrentIcon />
            </> : <>
                <span className="svg-icon-wrap d-f-c" style={
                    {
                        'color': color,
                        'width': `${width}px`,
                        'height': `${height}px`,
                        'background': background,
                        ...shapeCss,
                        ...style
                    }}>
                    <CurrentIcon />
                </span>
            </>}
        </React.Fragment>
    );
}

export default SocialIcon;
