import React,{useState,useEffect} from 'react'
import { FaRegHeart } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { TbTruckReturn } from "react-icons/tb";
import { useLocation } from 'react-router-dom';
import { fetchProductData } from '../services/operations/productAPI';
import ImageSection from '../components/core/ProductPage/ImageSection';
import ProductDescription from '../components/core/ProductPage/ProductDescription';
import RatingAndReviews from '../components/core/ProductPage/RatingAndReviews';
import {toast} from 'react-hot-toast'
import RelatedProductsSection from '../components/core/ProductPage/RelatedProductsSection';



const ProductPage=()=>{

  const location=useLocation()

    const productId=location.pathname.split('/')[2]

    const [productData,setProductData]=useState(null)
    const [error,setError]=useState(false)
    const [loading,setLoading]=useState(false)
    const [productQuantity,setProductQuantity]=useState(1)

    useEffect(()=>{

      ;(async ()=>{
        console.log('productId:',productId)
          const response=await fetchProductData(productId,true,setLoading,setProductData,setError)
          console.log(response)
             
      })()
      //fetchProduct()


      
    },[productId])

    const logData=()=>{
      console.log('Product data is:',productData)
    }

    logData()

    const handleProductCountInc=()=>{
      if(productQuantity===1)
        toast.error('Quantity should be at least 1')
      else
        setProductQuantity((prevValue)=>prevValue-1)
    }

    const handleProductCountDec=()=>{
      if(productQuantity===productData.product.quantity)
        toast.error('Maximum quantity selected')
      else
        setProductQuantity((prevValue)=>prevValue+1)
    }

    return (
        <div >
          <h1>Product PAGE</h1>
            {productData && (
              <>
              <ImageSection images={productData.product.images}/>
            <ProductDescription 
              productName={productData.product.productName} 
              productTotalReviews={productData.product.ratingAndReviews.length} 
              productAvgRating={4} 
              productPrice={productData.product.cost}
              productDescription={productData.product.description} 
              productOptions={productData.product.productOptions}
              productQuantity={productData.product.quantity}
            />
            <div className='flex flex-row'>
              <div className='flex flex-row'>
                <button onClick={handleProductCountInc}>-</button>
                <button>{productQuantity}</button>
                <button onClick={handleProductCountDec}>+</button>
              </div>
            <button>Add to Cart</button>
            <button className='border-black rounded-md'><FaRegHeart /></button>
            </div>
            <div>
                <div className='flex flex-row'>
                  <FaTruckFast />
                  <div className='flex flex-col'>
                     <h3>Free Delivery</h3>
                     <p>Enter your postal code for Delivery Availability</p>
                  </div>
                </div>
                <div className='flex flex-row'>
                 <TbTruckReturn />
                 <div className='flex flex-col'>
                     <h3>Free Delivery</h3>
                     <p>Enter your postal code for Delivery Availability</p>
                  </div>
                </div>
            </div>
            {/*Test after adding rating and reviews */}
            {/*<RatingAndReviews ratingAndReviews={productData.product.ratingAndReviews}/>*/}
              </>  
            )}
            <div>
              <RelatedProductsSection relatedProducts={productData.relatedProducts} itemsToShow={4}/>
            </div>
        </div>
    )
}

export default ProductPage