const Joi=require('joi')
const httpStatus=require('http-status')
const pick=require('../utils/pick')
const ApiError=require('../utils/ApiError');

const validate=(schema)=>(req,res,next)=>{

    console.log(req.body)

    //Validating if incoming request is JSON format
   if(Object.keys(req.body).length!==0 && !req.is('application/json')){
        return next(
            new ApiError(
                httpStatus.UNSUPPORTED_MEDIA_TYPE,
                "Supports JSON request body only"
            )
        ) 
    }   

    //Cherry pick from input schema
    //looks through the key of schema object to pick the selected field
    const validSchema=pick(schema,['params','query','body'])

    //Cherry pick from the request object
    const object=pick(req,Object.keys(validSchema))

    //Compile the schema to Joi schema objet and validate the request object
    const {value, error}=Joi.compile(validSchema)
                           .prefs({errors: {label: "key"}})
                           .validate(object)

    //If validation fails
    if(error){
        console.log('Error is:',error)
        const errorMessage=error.details
        .map((detail)=>detail.message)
        .join(',')
        return next(new ApiError(httpStatus.BAD_REQUEST,errorMessage))
    }      
    
    //Update validated fields in request with the returned value
    Object.assign(req,value)

    return next()
    
}

module.exports={
    validate,
} 