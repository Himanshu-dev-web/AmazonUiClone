
import {
    MenuIcon,
    SearchIcon,
    ShoppingCartIcon,
} from "@heroicons/react/outline";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
// import { useSession, signIn, signOut } from "next-auth/react"
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/basketSlice';
// import { BeakerIcon } from '@heroicons/react/24/solid'

const Header = ({setSearch}) => {
    
    // const [session] = useSession();
   // const { data: session, status } = useSession()
   const { loginWithRedirect,user, logout, isAuthenticated, isLoading  } = useAuth0();


    const items = useSelector(selectItems)
    return (
        <header> 
        {/* {top nav} */}
            <div className='flex items-center bg-amazon_blue p-1 flex-grow py-2'>
                <div className='mt-2 flex items-center flex-grow sm:flex-grow-0 px-4'>
                   <Link to="/">
                    <img
                        src='https://links.papareact.com/f90'
                        width={150}
                        height={40}
                        style={{objectFit:"contain"}}
                        className='cursor-pointer'
                    />
                    </Link>
                </div>
                {/* {search bar} */}
                <div className='hidden sm:flex items-center rounded-md h-10 flex-grow  cursor-pointer bg-yellow-400 hover:bg-yellow-500'>
                    <input onChange={(e) => setSearch(e.target.value)} className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none' type="text"/>
                    <SearchIcon className="h-12 p-4 "/> 
                </div>
                {/* {Right Hand section} */}
                <div className='mx-4 flex items-center text-xs space-x-6 text-white whitespace-nowrap'>
                    <div onClick={!isAuthenticated ? () => loginWithRedirect() :  () => logout({ logoutParams: { returnTo: window.location.origin } })} className='cursor-pointer link'>
                        <p>
                        {isAuthenticated? `Hello, ${user.name}` : "sign In"}
                         </p>

                        <p className='font-extrabold md:text-sm'>Account & Lists</p>
                    </div>

                    <div className='link'>  
                    <p>Returns</p>
                    <p className='font-extrabold md:text-sm'>& orders</p>
                    </div>

                <Link to="/checkout">
                    <div  className='relative link flex items-center'>
                        <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-600 text-center rounded-full font-bold'>
                            {items.length}
                        </span>
                        <ShoppingCartIcon className='h-10'/>
                        <p className='hidden md:inline font-extrabold md:text-sm mt-2'>Basket</p>
                    </div>
                    </Link>
                </div>
            </div>

            {/* {bottom nav} */}
            <div className='flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm'>
                <p className='link flex items-center'>
                    <MenuIcon className='h-6 mr-1' />
                    All
                </p>
                <p className='link'>Prime Video</p>
                <p className='link'>Prime Video</p>
                <p className='link'>Prime Video</p>
                <p className='link hidden lg:inline-flex'>Electronics</p>
                <p className='link hidden lg:inline-flex'>Food & Grocery</p>
                <p className='link hidden lg:inline-flex'>Buy Again</p>
                <p className='link hidden lg:inline-flex'>Shopper Toolkit</p>
                <p className='link hidden lg:inline-flex'>Prime</p>
                <p className='link hidden lg:inline-flex'>Health & Personal Care</p>

            </div>
        </header>
    )
}

export default Header
