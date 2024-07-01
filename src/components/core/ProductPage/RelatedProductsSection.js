import React,{useState} from 'react'

import Carousal from '../../common/Carousal';

const RelatedProductsSection=({relatedProducts,itemsToShow})=>{


    if(!relatedProducts || (relatedProducts && relatedProducts.length==0)){
        return (
            <div>
                <h1>No items to show</h1>
            </div>
        )
    }

   return (
    <div className='mb-8'>
        <Carousal items={relatedProducts} itemsInView={itemsToShow}/>
    </div>
   )
}

export default RelatedProductsSection