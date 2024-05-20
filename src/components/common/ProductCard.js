import React,{useState} from 'react';
import ProductImageCarousel from './ProductImageCarousel';
import { FaHandPointLeft, FaStar } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../services/operations/cartAPI';
import {addToWishlist} from '../../slices/wishlistSlice'
import { addItemToWishlist } from '../../services/operations/wishlistAPI';
import { addItemToCart } from '../../slices/cartSlice';
import { addItemToCartService } from '../../services/operations/cartAPI';

const ProductCard = ({ product }) => {

    const dispatch=useDispatch()

    const {isLoggedIn,accessToken,user}=useSelector((state)=>state.auth)

    const [isHover,setIsHover]=useState(false)

    const {_id,images,name,brand,price,ratingAndReviews } = product;

    const avgProductRating=2

    const handleAddToWishlist=()=>{
        if(!isLoggedIn){
            dispatch(addToWishlist(product))
        }
        else{
            dispatch(addItemToWishlist(_id,accessToken.token))
        }
    }

    const handleAddToCart=()=>{
        if(!isLoggedIn){
            dispatch(addItemToCart(product))
        }else{
            dispatch(addItemToCartService(_id,accessToken.token))
        }
    }

    return (
        <div className='relative flex flex-col' onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)}>

            <ProductImageCarousel images={images}/>
            

            <div className='absolute flex flex-row space-x-2'>
                <div>
                    {avgProductRating} <FaStar />
                </div>
                <span>|</span>
                <div>{ratingAndReviews?.length}</div>
            </div>

            {
                isHover ? (
                    <div className='flex flex-col space-y-2'>
                        <button onClick={handleAddToWishlist}>Wishlist</button>
                        <button onClick={handleAddToCart}>Add To Cart</button>
                    </div>
                ) : (<div className='flex flex-col'>
                <h1>{name}</h1>
                <h2>{brand}</h2>
                <p>{price}</p>
            </div>)
            }
        </div>
    );
};

export default ProductCard;
