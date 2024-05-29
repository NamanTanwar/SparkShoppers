import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { setProducts } from '../../../../slices/superCategorySlice'


const PriceSidebar=()=>{
    
    const dispatch=useDispatch()

    const {priceRanges,products}=useSelector((state)=>state.superCategory)

    const handlePriceRangeFilter=(priceRange)=>{
        
        console.log('price range:',priceRange)
        const filteredProducts=products.filter((product)=>{
                return parseInt(product.cost)>=parseInt(priceRange.start) && parseInt(product.cost)<=parseInt(priceRange.end)
        })
        console.log('filtered products:',filteredProducts)
        dispatch(setProducts(filteredProducts))
    
    }
    
    return (
        <div className='mb-4'>
            <h2 className="text-lg font-semibold">Price Range:</h2>
            {
                priceRanges && priceRanges.length>0 ? (
                    <ul className='mb-4'>
                        {
                            priceRanges.map((priceRange,idx)=>(
                                <li key={idx} className="cursor-pointer hover:bg-gray-200 p-2 rounded" onClick={()=>handlePriceRangeFilter(priceRange)}>Rs.{priceRange.start}-Rs.{priceRange.end}</li>
                            ))
                        }
                    </ul>) : (<p>No price ranges to show</p>)
            }
        </div>
    )
}

export default PriceSidebar