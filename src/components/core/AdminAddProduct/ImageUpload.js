import React,{useState} from 'react'
import {toast} from 'react-hot-toast' 

const ImageUpload=({selectedImages,setSelectedImages,formData,setFormData})=>{

    
    
    const [imageUrls,setImageUrls]=useState([])

    const [selectedImage,setSelectedImage]=useState(null)
    
    const handleImageChange=(e)=>{
        //Converting filelist to array
        const newImages=Array.from(e.target.files)
        if(newImages.length>4){
            toast.error('You can only select a maximum of 4 images')
            return;
        }

        const updatedImages=[...selectedImages,...newImages]
        setSelectedImages(updatedImages.slice(0,4))

        console.log('Updates Images:',updatedImages)

        console.log('Images in form Data:',formData.images)

        setFormData((prevData)=>({
            ...prevData,
            images: updatedImages.slice(0,4)
        }))

        const newImageUrls=updatedImages.map((image)=>URL.createObjectURL(image))
        setImageUrls(newImageUrls)
    }

    const handleImageClick=(imageUrl)=>{
            setSelectedImage(imageUrl)
    }
    
    const closePreview=()=>{
        setSelectedImage(null)
    }
    
    return (
        <div>
           <div>
                {
                    selectedImage!==null && (
                        <div className='flex flex-row space-x-2'>
                            <img src={selectedImage} alt='selected Image'/>
                            <button onClick={()=>closePreview()}>Close Preview</button>
                        </div>
                    )
                }
           </div>
            <h3>Upload Images here:</h3>
            <input
                multiple 
                type='file'
                name='image'
                onChange={handleImageChange}
            />

            <div className='flex flex-row space-x-2'>
                {
                    imageUrls.map((imageUrl,idx)=>{
                        return (
                            <img src={imageUrl} alt={`Uploaded image ${idx+1}`} onClick={()=>handleImageClick(imageUrl)} className={`border-${selectedImage ? "green-500" : "current"}`}/>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default ImageUpload