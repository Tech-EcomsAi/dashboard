

const CRAFT_SIZES = [
    {
        name: 'Popular',
        icon: null,
        items: [
            { id: 1, icon: 'instagram', name: 'Instagram Square Post', width: 1080, height: 1080, unit: 'px' },
            { id: 2, icon: 'instagram', name: 'Instagram Story', width: 1080, height: 1920, unit: 'px' },
            { id: 3, icon: 'instagram', name: 'Instagram Reel', width: 1080, height: 1920, unit: 'px' },
            { id: 4, icon: 'facebook', name: 'Facebook Post', width: 1080, height: 1080, unit: 'px' },
            { id: 5, icon: 'tiktok', name: 'Tiktok Video', width: 1080, height: 1920, unit: 'px' },
        ]
    },
    {
        name: 'Instagram',
        icon: "instagram",
        items: [
            { id: 1, name: 'Square Post', width: 1080, height: 1080, unit: 'px' },
            { id: 2, name: 'Story', width: 1080, height: 1920, unit: 'px' },
            { id: 3, name: 'Reel', width: 1080, height: 1920, unit: 'px' },
            { id: 4, name: 'Carousel', width: 1080, height: 1080, unit: 'px' },
            { id: 5, name: 'Story Ad', width: 1080, height: 1920, unit: 'px' },
            { id: 6, name: 'Ad', width: 1080, height: 1350, unit: 'px' },
            { id: 7, name: 'Portrait Post', width: 1080, height: 1350, unit: 'px' },
            { id: 8, name: 'Landscape Post', width: 1080, height: 566, unit: 'px' },
        ]
    },
    {
        name: 'Facebook',
        icon: "facebook",
        items: [
            { id: 1, name: 'Post', width: 1080, height: 1080, unit: 'px' },
            { id: 2, name: 'Story', width: 1080, height: 1920, unit: 'px' },
            { id: 3, name: 'Profile Cover', width: 851, height: 315, unit: 'px' },
            { id: 4, name: 'Event Cover', width: 1200, height: 630, unit: 'px' },
            { id: 5, name: 'Page Cover', width: 820, height: 312, unit: 'px' },
            { id: 6, name: 'Group Cover', width: 1640, height: 856, unit: 'px' },
        ]
    },
    {
        name: 'Twitter',
        icon: "twitter",
        items: [
            { id: 1, name: 'Post', width: 1200, height: 675, unit: 'px' },
            { id: 2, name: 'Video', width: 1920, height: 1080, unit: 'px' },
            { id: 3, name: 'Header', width: 1500, height: 500, unit: 'px' },
        ]
    },
    {
        name: 'TikTok',
        icon: "tiktok",
        items: [
            { id: 1, name: 'Profile', width: 720, height: 720, unit: 'px' },
            { id: 2, name: 'Video', width: 1080, height: 1920, unit: 'px' },
            { id: 3, name: 'Image Add', width: 1200, height: 628, unit: 'px' },
            { id: 4, name: 'Square Add', width: 640, height: 640, unit: 'px' },
        ]
    },
    {
        name: 'Product Hunt',
        icon: "productHunt",
        items: [
            { id: 1, name: 'Gallery', width: 2540, height: 1520, unit: 'px' },
            { id: 2, name: 'Thumbnail', width: 240, height: 240, unit: 'px' },
        ]
    },
    {
        name: 'YouTube',
        icon: "youtube",
        items: [
            { id: 1, name: 'Video', width: 1920, height: 1080, unit: 'px' },
            { id: 2, name: 'Thumbnail', width: 1280, height: 720, unit: 'px' },
            { id: 3, name: 'Short', width: 1080, height: 1920, unit: 'px' },
            { id: 4, name: 'Banner', width: 2560, height: 1440, unit: 'px' },
            { id: 5, name: 'Profile Photo', width: 800, height: 800, unit: 'px' },
            { id: 6, name: 'Display Ad', width: 300, height: 60, unit: 'px' },
            { id: 7, name: 'Video Ad', width: 1920, height: 1080, unit: 'px' },
        ]
    },
    {
        name: 'Pinterest',
        icon: "pinterest",
        items: [
            { id: 1, name: 'Post', width: 1000, height: 1500, unit: 'px' },
            { id: 2, name: 'Idea Pin', width: 1080, height: 1920, unit: 'px' },
            { id: 3, name: 'Square', width: 600, height: 600, unit: 'px' },
            { id: 4, name: 'Vertical Post', width: 600, height: 900, unit: 'px' },
        ]
    },
    {
        name: 'LinkedIn',
        icon: "linkedin",
        items: [
            { id: 1, name: 'Profile Cover', width: 1584, height: 396, unit: 'px' },
            { id: 2, name: 'Post', width: 1920, height: 1920, unit: 'px' },
            { id: 3, name: 'Blog Post', width: 1200, height: 628, unit: 'px' },
            { id: 4, name: 'Feed', width: 1080, height: 1080, unit: 'px' },
            { id: 5, name: 'Stories', width: 1080, height: 1920, unit: 'px' },
            { id: 6, name: 'Cover(Business)', width: 2256, height: 328, unit: 'px' },
            { id: 7, name: 'Cover(Personal)', width: 1584, height: 396, unit: 'px' },
        ]
    },
    {
        name: 'Twitch',
        icon: "twitch",
        items: [
            { id: 1, name: 'Banner', width: 1200, height: 480, unit: 'px' },
            { id: 2, name: 'Overlay', width: 1920, height: 1080, unit: 'px' },
        ]
    },
    {
        name: 'Snapchat',
        icon: "snapchat",
        items: [
            { id: 1, name: 'Ad', width: 1080, height: 1920, unit: 'px' },
            { id: 2, name: 'Filter', width: 1080, height: 1920, unit: 'px' },
        ]
    },
    {
        name: 'Appstore',
        icon: "appstore",
        items: [
            { id: 1, name: 'High Res Icon', width: 512, height: 512, unit: 'px' },
            { id: 2, name: 'Feature Graphic', width: 1024, height: 500, unit: 'px' },
            { id: 3, name: 'ScreenShots 5"', width: 1080, height: 1920, unit: 'px' },
            { id: 4, name: 'ScreenShots 6"', width: 1440, height: 2880, unit: 'px' },
        ]
    },
    {
        name: 'Flyers',
        icon: "",
        items: [
            { id: 1, name: 'Flyers 1', width: 1275, height: 1650, unit: 'px', size: '4.25″ × 5.5″' },
            { id: 2, name: 'Flyers 2', width: 1650, height: 2550, unit: 'px', size: '5.5″ × 8.5″' },
            { id: 3, name: 'Flyers 3', width: 2550, height: 3300, unit: 'px', size: '8.5″ × 11″' },
        ]
    },
    {
        name: 'Other',
        icon: "",
        items: [
            { id: 1, icon: 'dribble', name: 'Dribble Shot', width: 2800, height: 2100, unit: 'px' },
            { id: 2, icon: 'blogger', name: 'Blog Cover', width: 2400, height: 1260, unit: 'px' },
            { id: 3, icon: 'notion', name: 'Notion Cover', width: 1500, height: 600, unit: 'px' },
            { id: 4, icon: 'tumblr', name: 'Tumblr Banner', width: 3000, height: 1055, unit: 'px' },
            { id: 5, icon: 'reddit', name: 'Reddit Cover', width: 1920, height: 256, unit: 'px' },
        ]
    },
]
export default CRAFT_SIZES;