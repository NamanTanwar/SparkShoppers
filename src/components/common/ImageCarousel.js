import React,{useState} from 'react';
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";

const ImageCarousal=({productImgList})=>{


    const [activeIdx,setActiveIdx]=useState(0)

    const handlePrevious=()=>{
       activeIdx!==0 ? setActiveIdx(activeIdx-1) : setActiveIdx(productImgList.length-1)
    }


    const handleNext=()=>{
        setActiveIdx((activeIdx+1)%productImgList.length)
    }

    return (
        <div className="flex flex-row justify-center items-center">
            <button onClick={handlePrevious}> 
                <GrFormPrevious />
            </button>
            <img />
            <button onClick={handleNext}>
                <GrFormNext />
            </button>
        </div>
    )

}

export default ImageCarousal