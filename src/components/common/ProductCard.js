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

const ProductCard = ({ product,inputRef,idx,productsLength }) => {

    const dispatch=useDispatch()

    const {isLoggedIn,accessToken,user}=useSelector((state)=>state.auth)

    const [isHover,setIsHover]=useState(false)

    const {_id,images,name,brand,cost,ratingAndReviews } = product;

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
        <div className='relative flex flex-col bg-white shadow-md p-4 rounded-lg hover:shadow-xl transition-shadow duration-300' onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)}>

            
            <div className='flex justify-center items-center h-40 bg-gray-200'>
                <ProductImageCarousel images={images} width="100%" height="100%" />
            </div>
            

            <div className='absolute top-2 left-2 flex items-center space-x-1 bg-yellow-100 p-1 rounded'>
                <div className='text-yellow-600 flex items-center'>
                    {avgProductRating} <FaStar />
                </div>
                <span>|</span>
                <div>{ratingAndReviews?.length}</div>
            </div>

            {
                isHover ? (
                    <div className='absolute bottom-2 left-2 right-2 flex flex-col space-y-2 bg-white p-2 rounded shadow-md'>
                        <button  className='bg-red-500 text-white py-1 rounded hover:bg-red-600' onClick={handleAddToWishlist}>Wishlist</button>
                        <button className='bg-green-500 text-white py-1 rounded hover:bg-green-600' onClick={handleAddToCart}>Add To Cart</button>
                    </div>
                ) : (<div className='flex flex-col mt-4 text-center'>
                <h1 className='text-lg font-semibold'>{name}</h1>
                <h2 className='text-sm text-gray-600'>{brand}</h2>
                <p className='text-lg text-blue-600'>{cost}</p>
            </div>)
            }
            <div ref={idx+1===productsLength ? inputRef : null}></div>
        </div>
    );
};

export default ProductCard;
