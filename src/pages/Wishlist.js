import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import WishlistCard from '../components/core/Wishlist/WishlistCard'

const Wishlist=()=>{

    const {items,isLoading,error}=useSelector(state=>state.wishlist)

    const logWishlistItems=()=>{
        console.log(items)
    }

    // if(error){
    //     return <h1>error</h1>
    // }

    // if(isLoading){
    //     return <h1>Loading....</h1>
    // }

    logWishlistItems()

    return (
        <div>
            <h1>Wishlist</h1>
            <div className='grid-cols-4'>
                {
                    items && items.map((item,idx)=>(
                        <WishlistCard key={item._id} product={item}/>
                    ))
                }
            </div>  
        </div>
    )
}

export default Wishlist