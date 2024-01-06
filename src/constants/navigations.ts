
import { BsPeople } from 'react-icons/bs';
import { IoAnalyticsSharp } from 'react-icons/io5';
import { LuCalendarCheck, LuHeadphones, LuHelpingHand, LuLineChart, LuListOrdered, LuListTodo, LuMail, LuMessageSquare, LuNewspaper, LuSettings, LuShoppingCart, LuUsers } from 'react-icons/lu';
import { MdOutlineCampaign } from 'react-icons/md';
import { RiAccountPinCircleLine, RiAppsLine, RiArticleLine } from 'react-icons/ri';
import { RxDashboard } from 'react-icons/rx';
import { TbBug, TbChartPie, TbDeviceMobileShare, TbHelpCircle, TbMessageChatbot, TbMoneybag, TbUsers, TbWorldBolt } from 'react-icons/tb';

export const NAVIGARIONS_ROUTINGS = {
    //generic dashboard or home 
    HOME: '/',
    //Dashboard routings
    DASHBOARDS: 'dashboards',
    DASHBOARDS_SUMMARY: 'dashboards/summary',
    DASHBOARDS_SALES: 'dashboards/sales',
    DASHBOARDS_USERS: 'dashboards/users',
    DASHBOARDS_ANALYTICS: 'dashboards/analytics',

    //App routings
    APPS_DASHBOARD: 'apps/dashboard',
    APP_CHATS: 'apps/chat',
    APP_BLOGS: 'apps/blogger',
    APP_EMAILS: 'apps/email',
    APP_CALENDAR: 'apps/calendars',
    APP_KANBAN: 'apps/kanban',

    //Reports
    REPORTS: 'reports',
    REPORTS_SUMMARY: 'reports/summary',
    REPORTS_SALES: 'reports/sales',
    REPORTS_USERS: 'reports/users',
    REPORTS_ANALYTICS: 'reports/analytics',

    WEBSITE_BUILDER_DASHBOARD: 'websites/dashboard',
    WEBSITE_BUILDER_EDITOR: 'websites/editor',

    CRM: 'CRM',
    ECCOMERCE: "ecommerce",
    SETTINGS: "settings",
    PWA: "pwa",
    PROMOTIONS: "promotions",
    DOCUMENTATION: "documentation",

    LOGGEDIN_PROFILE: 'profile',
    NOTIFICATIONS: 'notifications',
    MESSAGES: 'messages',
    SIGNIN: 'signin',
    FORGOT_PASSWORD: 'forgot-password',
}
export const HOME_ROUTING = `/`;

export type NavItemType = { key?: any, label: string, route: string, icon: any, isChild?: boolean, subNav?: NavItemType[], showSubNav?: boolean, active?: boolean, subNavActive?: boolean };

export const DASHBOARD_MENU: NavItemType[] = [
    {
        label: 'Dashboard', route: NAVIGARIONS_ROUTINGS.DASHBOARDS, icon: RxDashboard,
        subNav: [
            { label: 'Summary', route: NAVIGARIONS_ROUTINGS.DASHBOARDS_SUMMARY, icon: TbChartPie },
            { label: 'Sales', route: NAVIGARIONS_ROUTINGS.DASHBOARDS_SALES, icon: LuLineChart },
            { label: 'Users', route: NAVIGARIONS_ROUTINGS.DASHBOARDS_USERS, icon: TbUsers },
            { label: 'Analytics', route: NAVIGARIONS_ROUTINGS.DASHBOARDS_ANALYTICS, icon: IoAnalyticsSharp },
        ]
    },
]

export const REPORTS_MENU: NavItemType[] = [
    {
        label: 'Reports', route: NAVIGARIONS_ROUTINGS.REPORTS, icon: LuLineChart,
        subNav: [
            { label: 'Summary', route: NAVIGARIONS_ROUTINGS.REPORTS_SUMMARY, icon: TbChartPie },
            { label: 'Sales', route: NAVIGARIONS_ROUTINGS.REPORTS_SALES, icon: LuLineChart },
            { label: 'Users', route: NAVIGARIONS_ROUTINGS.REPORTS_USERS, icon: TbUsers },
            { label: 'Analytics', route: NAVIGARIONS_ROUTINGS.REPORTS_ANALYTICS, icon: IoAnalyticsSharp },
        ]
    },
]

export const APPS_MENU: NavItemType[] = [
    {
        label: 'Apps', route: 'apps', icon: RiAppsLine,
        subNav: [
            { label: 'Dashboard', route: NAVIGARIONS_ROUTINGS.APPS_DASHBOARD, icon: TbChartPie },
            { label: 'Chat', route: NAVIGARIONS_ROUTINGS.APP_CHATS, icon: LuMessageSquare },
            { label: 'Blog', route: NAVIGARIONS_ROUTINGS.APP_BLOGS, icon: RiArticleLine },
            { label: 'Email', route: NAVIGARIONS_ROUTINGS.APP_EMAILS, icon: LuMail },
            { label: 'Calendar', route: NAVIGARIONS_ROUTINGS.APP_CALENDAR, icon: LuCalendarCheck },
            { label: 'Kanban', route: NAVIGARIONS_ROUTINGS.APP_KANBAN, icon: LuCalendarCheck },
        ]
    },
]

export const SIDEBAR_NAV_MENUS: NavItemType[] = [
    ...DASHBOARD_MENU,
    { label: 'Website', route: NAVIGARIONS_ROUTINGS.WEBSITE_BUILDER_DASHBOARD, icon: TbWorldBolt },
    ...REPORTS_MENU,
    ...APPS_MENU,
    { label: 'Profile', route: NAVIGARIONS_ROUTINGS.LOGGEDIN_PROFILE, icon: RiAccountPinCircleLine },
    { label: 'CRM', route: NAVIGARIONS_ROUTINGS.CRM, icon: BsPeople },
    { label: 'Ecommerce', route: NAVIGARIONS_ROUTINGS.ECCOMERCE, icon: LuShoppingCart },
    { label: 'Settings', route: NAVIGARIONS_ROUTINGS.SETTINGS, icon: LuSettings },
    { label: 'PWA', route: NAVIGARIONS_ROUTINGS.PWA, icon: TbDeviceMobileShare },
    { label: 'Promotions', route: NAVIGARIONS_ROUTINGS.PROMOTIONS, icon: MdOutlineCampaign },
    { label: 'Documentation', route: NAVIGARIONS_ROUTINGS.DOCUMENTATION, icon: TbHelpCircle },
    { label: 'Help', route: 'help', icon: TbHelpCircle },
]

export const LIST_MENUS = [
    { label: 'Orders', keywords: 'orders,transactions', icon: LuListOrdered, route: "orders" },
    { label: 'Appointments', keywords: 'appointments,transactions', icon: LuListTodo, route: "appointments" },
    { label: 'Users/CRM', keywords: 'users,customers', icon: LuUsers, route: "users" },
    { label: 'Payments', keywords: 'payments,transactions', icon: TbMoneybag, route: "payments" }
]

export const REACH_US_LINKS = [
    { label: 'Raise issue', keywords: 'issue,contact,about,support', icon: TbBug, route: "raise-issue" },
    { label: 'Help Center', keywords: 'support,contact,about,ecomsai', icon: LuHeadphones, route: "help-center" },
    { label: 'Contact Us', keywords: 'support,contact,about,ecomsai', icon: TbMessageChatbot, route: "chat-with-us" },
    { label: 'Documentation', keywords: 'documentation,contact,about,ecomsai,support', icon: LuNewspaper, route: "documentation" },
]

export const SEARCHES_LIST = [
    { label: 'Dashboards', items: DASHBOARD_MENU[0].subNav, icon: DASHBOARD_MENU[0].icon },
    { label: 'Apps', items: APPS_MENU[0].subNav, icon: APPS_MENU[0].icon },
    { label: 'Transactions', items: LIST_MENUS, icon: LuListOrdered },
    { label: 'How to Reach Us', items: REACH_US_LINKS, icon: LuHelpingHand }
]
