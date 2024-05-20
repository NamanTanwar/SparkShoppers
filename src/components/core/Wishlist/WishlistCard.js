import React,{useState} from 'react'
import ProductImageCarousel from '../../common/ProductImageCarousel'
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeFromWishlist } from '../../../slices/wishlistSlice';
import { removeItemFromWishlist } from '../../../services/operations/wishlistAPI';

const WishlistCard=({product})=>{

     const dispatch=useDispatch()

    const {accessToken,isLoggedIn}=useSelector((state)=>state.auth)
    
    const {_id,images,name,brand,price,ratingAndReviews } = product

     const removeFromWishlistHandler=(isLoggedIn)=>{
           if(!isLoggedIn){    
                dispatch(removeFromWishlist(_id,accessToken))
             }
             else{
                  dispatch(removeItemFromWishlist(_id,accessToken.token))
             }
     }

    return (
        <div className='relative flex flex-col'>
            <button className="absolute z-10"><MdDeleteForever /></button>
            <ProductImageCarousel images={images}/>
            <div className='flex flex-col'>
                <h2>{name}</h2>
                <h4>{brand}</h4>
                <p>{price}</p>
            </div>
            <div>
                <button>Add To Cart</button>
                <button onClick={removeFromWishlistHandler}>Remove from wishlist</button>
            </div>
        </div>
    )
}

export default WishlistCard