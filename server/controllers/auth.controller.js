const httpStatus=require('http-status')
const {userService,tokenService,authService,otpService,wishlistService,cartService}=require('../services')
 
//Controller to handle signup.
const signup=async (req,res)=>{
    try{ 
        //Verifying otp 
        const userDetails=await otpService.verifyOtp(req.body.otp)
        //Creating User in DB
        if(!userDetails){
            return res.status(httpStatus.UNAUTHORIZED).json({
                success:false,
                message:"Invalid Otp",
            })
        }

        const user=await userService.createUser(userDetails);

        //Generating JWT Token on successfull creation of user in DB
        const accessToken=await tokenService.generateAuthTokens(user)
        
        //Generating refresh token for user
        const refreshToken=await tokenService.generateRefreshToken(user)

        //Generate cart
        const cart=await userService.createCartForUser(user._id)

        //Generate wishlist
        const wishlist=await userService.createWishlistForUser(user._id)

        //Generating refresh token as a http cookie only
        res.cookie('jwt',refreshToken,{
            httpOnly: true,
            maxAge: 7*24*60*60*1000,
        })
        //Sending successfull response

        const userResponse={
            userId: user._id.toString(),
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
        }
  
        res.status(httpStatus.CREATED).json(
            
            {
                success: true,
                message:"User created successfully",
                userResponse,
                accessToken
            })
    }catch(err){

        if(err.message==='Email already taken'){
            res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                error: err.message,
                message:"Account already signed up. Kindly login"
            })
        }

        console.log("Error in signup:",err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message:err.message,
            error:"Internal Server Error"
        }) 
    }
}

//Controller to handle login
const login=async (req,res)=>{
    try{

        const {email,password}=req.body
        //Login user service
        const user=await authService.loginUserWithEmailAndPassword(email,password)
        //generate auth tokens
        const accessToken=await tokenService.generateAuthTokens(user)
 
        //Generating refresh token 
        const refreshToken=await tokenService.generateRefreshToken(user)

        //fetch user wishlist
        const userWishlist=await wishlistService.getUserWishlist(email)
        //fetch user cart

        const userCart=await cartService.getUserCart(user._id)
        console.log('userCart here is:',userCart)
        //fetch cart total
        const cartTotal=await cartService.calculateTotal(user._id)

        //sending refresh token as http only cookie
        res.cookie('jwt',refreshToken,{
            httpOnly: true,
            maxAge: 7*24*60*60*1000
        })
 
        const userResponse={
            userId: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            userWishlist: userWishlist,
            userCart: userCart,
            cartTotal: cartTotal,
        }

        //sending user along with generated token to client
        res.status(200).json({
            success: true,
            message: "Login Successfull",
            userResponse, 
            accessToken
        })
  
 
    }catch(err){
        console.log(err);
        let statusCode=httpStatus.INTERNAL_SERVER_ERROR
        let errorMessage="Internal Server Error"

        if(err.message==="Incorrect email or password"){
            statusCode=httpStatus.UNAUTHORIZED
            errorMessage=err.message
        }

        res.status(statusCode).json({
            success: false,
            message:err.message,
            error:errorMessage
        })
    }
} 

const sendOtp=async (req,res)=>{
    try{
       //Creating and storing otp in redis cache
       await otpService.generateOtp(req.body)
        //Sending otp to user via email
        await otpService.sendOtpToUser(req.body.email)

        res.status(httpStatus.OK).json({
            success:true,
            message:"Otp sent successfully"
        })
        
    }catch(err){
       console.log(err)
       res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: err.message,
        message: 'Internal Server Error'
       })
    }
}

const refreshToken=async (req,res)=>{
    try{
        //Extracting current refresh token from cookie
        const refreshToken=req.cookies?.jwt
        //if refresh token present
        if(!refreshToken){
            return res.status(httpStatus.UNAUTHORIZED).json({
                success:false,
                message:"Unauthorized user"
            })
        }
        //Genrating new acessToken and refreshToken
        const {newAccessToken,newRefreshToken}=await tokenService.newRefreshToken(refreshToken)

        //Setting http only cookie for refresh token
        res.cookie('jwt',newRefreshToken,{
            httpOnly: true,
            maxAge: 7*24*60*60*1000
        })
        //Successfull response
        res.status(httpStatus.OK).json({
            success:true,
            message:"New tokens generated successfully",
            accessToken: newAccessToken
        })

    }catch(err){
        console.log("Error in refresh token :",err)
        let statusCode=httpStatus.INTERNAL_SERVER_ERROR
        if(err.message==='Invalid token provided')
            statusCode=httpStatus.UNAUTHORIZED

        res.status(httpStatus.statusCode).json({
            success:false,
            error:err.message,
            message: "Internal Server Error"
        })

    }
}

const logout=async (req,res)=>{

    try{
        const result=await authService.logoutUser(res)
        if(!result){
            throw new Error('logout failed')
        }
        res.status(httpStatus.OK).json({
            success: true,
            message:"Logged out Successfully",
        })
    }catch(err){
        console.log("Error in logout controller:",err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success:false,
            error:err.message,
            message:"Internal Server Error"
        })
    }
}

module.exports={
      signup,
      login,
      sendOtp,
      refreshToken,
      logout,
}  