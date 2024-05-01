import React,{useState} from 'react';
import ProductImageCarousel from '../core/ProductCart/ProductImageCarousel';
import { FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {

    const [isHover,setIsHover]=useState(false)

    const {images,name,brand,price,ratingAndReviews } = product;

    const avgProductRating=2

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
                        <button>Wishlist</button>
                        <button>Add To Cart</button>
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
