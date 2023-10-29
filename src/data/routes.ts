import IRoute from "src/types/navigation"
import SvgIcon from '@atoms/svgIcon';


const routes: IRoute[] = [
    {
        name: 'Dashboard',
        url: '/',
        icon: 'dashboard',
        secondary: true
    },
    {
        name: 'NFT Marketplace',
        url: '/admin',
        icon: '',
        secondary: true
    },
    {
        name: 'Data Tables',
        url: '/admin',
        icon: '',
    },
    {
        name: 'Profile',
        url: '/admin',
        icon: '',
    },
    {
        name: 'Sign In',
        url: '/auth',
        icon: '',
    },
    {
        name: 'RTL Admin',
        url: '/rtl',
        icon: '',
    }
]

export default routes
