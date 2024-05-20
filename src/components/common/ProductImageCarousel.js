import React,{useState,useEffect} from 'react'

const ProductImageCarousel=({images,width='200px',height='200 h-full'})=>{

    console.log('Images in carouseol:',images)
    
    const [imageToShowIdx,setImageToShowIdx]=useState(0)
    

    const [isHovering,setIsHovering]=useState(false)
    const intervalDuration=500

    const handleNext=()=>{
        setImageToShowIdx((prevValue)=>(prevValue+1)%images.length)
    }

    useEffect(()=>{

        let intervalId

        if(isHovering){
            intervalId=setInterval(()=>handleNext(),intervalDuration)
        }
        else{
            clearInterval(intervalId)
        }

        return ()=>{
            clearInterval(intervalId)
            setImageToShowIdx(0)
        }

    },[isHovering])

    return (
        <div  onMouseEnter={()=>setIsHovering(true)} onMouseLeave={()=>setIsHovering(false)}>
            <img src={images[imageToShowIdx]} />
        </div>
    )
}

export default ProductImageCarousel