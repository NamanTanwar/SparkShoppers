const {Strategy: JwtSrategy,ExtractJwt}=require('passport-jwt')
const config=require('../config/config')
const {tokenTypes}=require('./token')
const User=require('../models/User')

//Specifying the jwt secret and method of extraction
//of jwt from request
const jwtOptions={
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}


//Takes payload and done as argument 
const jwtVerify=async (payload,done)=>{
    try{
        if(payload.type!==tokenTypes.ACCESS){
            throw new Error("Invalid token type")
        }
        //payload.sub contains mongoId
        const user=await User.findById(payload.sub)

        //user not found
        if(!user){
            return done(null,false)
        }
        //user successfully found
        done(null,user)
    }catch(err){
        done(err,false)
    }
}

//jwtStrategy is created jwtOptions object
//and jwtVerify function to be used by passport
const jwtStrategy=new JwtSrategy(jwtOptions,jwtVerify);

module.exports={
    jwtStrategy,
}