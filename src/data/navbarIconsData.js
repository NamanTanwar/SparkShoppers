import { CiHeart } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";

export const  navIcons=[{
    name: 'Wishlist',
    icon: <CiHeart/>,
    navigateTo: '/wishlist',
    },
    {
    name: 'Cart',
    icon:<FaCartShopping />,
    navigateTo: '/cart'
    },
    {
    name: 'My Profile',
    icon:<FaCircleUser />,
    }]