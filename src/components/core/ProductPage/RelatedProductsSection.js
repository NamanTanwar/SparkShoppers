import React,{useState} from 'react'

import Carousal from '../../common/Carousal';

const RelatedProductsSection=({relatedProducts,itemsToShow})=>{


    if(relatedProducts.length==0){
        return (
            <div>
                <h1>No items to show</h1>
            </div>
        )
    }

   return (
    <div>
        <Carousal items={relatedProducts} itemsInView={itemsToShow}/>
    </div>
   )
}

export default RelatedProductsSection