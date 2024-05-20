import React from 'react'
import RatingStars from '../../common/RatingStars'

const ProductDescription=({productName,productTotalReviews,productAvgRating,productPrice,productDescription,productOptions,productQuantity})=>{
    return (
        <div className='flex flex-col'>
            <h1>{productName}</h1>
            <div className='flex flex-row'>
                <RatingStars avgRating={productAvgRating} starSize={20} />
                <div>{`(${productTotalReviews} Reviews)`}</div>
                <span>|</span>
                {productQuantity>0 ? (<p className='text-green-600'>In Stock</p>) : (<p className='text-red-600'>Out of Stock</p>)}
            </div>
            <h2>Rs.{productPrice}</h2>
            <p>{productDescription}</p>
            <hr></hr>
            <div className='flex flex-col'>
                {
                    productOptions.options.map((productOption,idx)=>(
                            <li key={productOption._id}>
                                {productOption.name}: {productOption.values.join(",")}
                            </li>
                    ))
                }
            </div>
        </div>
    )
}

export default ProductDescription