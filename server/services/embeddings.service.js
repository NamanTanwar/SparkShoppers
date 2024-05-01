const dotenv=require('dotenv')
dotenv.config()

const { HfInference }=require("@huggingface/inference")


const hf=new  HfInference(process.env.HF_TOKEN)

const createEmbeddings=async (productTextData)=>{
        try{
            //create Embeddings for product Data 
            const response=await hf.featureExtraction({
                model: 'sentence-transformers/all-MiniLM-L6-v2',
                inputs: productTextData
            }) 
            console.log('Response from embedding is:',response)
            console.log(response.length)
            return response;
        }catch(err){
            console.log('Error in createEmbeddings service:',err)
            console.log('Error message:',err.message)
            throw err
        }
}

module.exports={
    createEmbeddings
}