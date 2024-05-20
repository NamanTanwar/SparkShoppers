const jwt=require('jsonwebtoken')
const config=require('../config/config')
const {tokenTypes}=require("../config/token")

//Generate a jwt token
const generateToken=(userId,expires,type,secret=config.jwt.secret)=>{

    const payload={

        sub: userId,
        iat: Math.floor(Date.now()/1000),
        exp: expires,
        type,
    }

    return jwt.sign(payload,secret)

}

//Generating an acccess token to be used when user is signing in
const generateAuthTokens=async (user)=>{

    const accessTokenExpires= Math.floor(Date.now() / 1000) + config.jwt.accessExpirationMinutes * 60;

    const accessToken=generateToken(
        user._id,
        accessTokenExpires,
        tokenTypes.ACCESS
    )

    return {
        access: {
            token: accessToken,
            expires: new Date(accessTokenExpires*1000),
        }
    }
}

const generateRefreshToken=async (user)=>{

    const refreshTokenExpires=Math.floor(Date.now()/1000)+config.jwt.refreshExpirationDays*24*60*60

    const refreshToken=generateToken(
        user._id,
        refreshTokenExpires,
        tokenTypes.REFRESH
    )

    return  {
        refresh: {
            token: refreshToken,
            expires: new Date(refreshTokenExpires*1000)
        }
        
    }

}

const newRefreshToken=async (refreshToken)=>{
    

    jwt.verify(refreshToken,config.jwt.secret,(err,user)=>{
        if(err){
            throw new Error('Invalid token provided')
        }

        const newAccessToken=generateAuthTokens(user)
        const newRefreshToken=generateRefreshToken(user)

        return {
            newAccessToken,
            newRefreshToken
        }

    })
}

const extractUserIdFromToken=async (token,secret=config.jwt.secret)=>{
    try{
        const parts=token.split('.')
        if(!parts.length){
            throw new Error('Invalid token')
        }
        const decodedToken=jwt.verify(token,secret)

        return decodedToken.sub
    }catch(err){   
        console.log('Error in extract userId from token:',err)
    }
}

module.exports={
    generateToken,
    generateAuthTokens,
    generateRefreshToken,
    newRefreshToken,
    extractUserIdFromToken,
}