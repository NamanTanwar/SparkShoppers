const cloudinary=require('cloudinary').v2

const uploadImageToCloudinary=async (file,folder,height,quality)=>{

    const options={folder}
    if(height){
        options.height
    }
    if(quality){
        options.quality
    }
    options.resource_type='auto'//automatically detect type
    options.crop='auto'//fits larger images to provided dimensions maintiaing aspect ratio
    options.quality='auto:best'// Adjust quality for best balance between quality and file size
    options.fetch_format='auto'//Automatically select best format (e.g.:AVIF form browers supporting it)
    options.gravity='auto'//auto focus on important parts
    options.dpr='auto'//Adjust for device pixed ratio(retina display)
    return await cloudinary.uploader.upload(file.tempFilePath,options)

}

module.exports={uploadImageToCloudinary}