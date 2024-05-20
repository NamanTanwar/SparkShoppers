import React,{useState} from 'react'

const ImageSection=({images})=>{

    const [activeImageIdx,setActiveImageIdx]=useState(0)

    return (
        <div className='flex flex-row space-x-4'>
            <div className='flex flex-col space-y-3'>
                {
                    images.map((image,idx)=>(
                        <img key={idx} src={image} onClick={()=>setActiveImageIdx(idx)}/>
                    ))
                }
            </div>
            <div>
                <img src={images[activeImageIdx]}/>
            </div>
        </div>
    )
}

export default ImageSection