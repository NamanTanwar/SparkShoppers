const passport=require("passport")
const httpStatus=require('http-status')
const ApiError=require('../utils/ApiError')

const verifyCallback=(req,resolve,reject)=>async (err,user,info)=>{

   // const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
   // console.log('Incoming token:', token);

    if(err || info || !user){
        //console.log('Authentication failed. Error:', err, 'Info:', info);
        return reject(new ApiError(httpStatus.UNAUTHORIZED,'Please authenticate'))
    }
    req.user=user

    resolve();
}

const auth=async (req,res,next)=>{
    return new Promise((resolve,reject)=>{
        passport.authenticate(
            'jwt',
            {session: false},
            verifyCallback(req,resolve,reject)
        )(req,res,next)
    })
    .then(()=>next())
    .catch((err)=>next(err))
}

module.exports=auth