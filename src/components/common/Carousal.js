import React,{useState} from 'react'
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import ProductCard from './ProductCard';


const Carousal=({items,itemsInView})=>{

    const [startIdx,setStartIdx]=useState(0)
    const [endIdx,setEndIdx]=useState(itemsInView>items.length? items.length-1 : itemsInView-1)

    const handleClickLeft=()=>{
        if(startIdx==0)
            return
        setStartIdx((prevValue)=>prevValue-1)
        setEndIdx((prevValue)=>prevValue-1)
    }

    const handleClickRight=()=>{
        if(endIdx==items.length-1)
            return
        setStartIdx((prevValue)=>prevValue+1)
        setEndIdx((prevValue)=>prevValue+1)
    }
 

    return (
        <div className='flex flex-row space-x-4'>
            <button onClick={handleClickLeft}><FaChevronCircleLeft /></button>
            <div className='overflow-hidden'>
                {
                   items && items.slice(startIdx,endIdx+1).map((item,idx)=>(
                            <ProductCard key={item._id} product={item}/>
                    ))
                }
            </div>
            <button onClick={handleClickRight}><FaChevronCircleRight /></button>
        </div>
    )
}

export default Carousal