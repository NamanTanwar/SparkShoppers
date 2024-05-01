const {client}=require('../config/redisConfig')
const {mailSender}=require('../utils/mailSender')
const {otpTemplate}=require('../mail/templates/emailVerificationTemplate')
const {otpGenerator}=require('../utils/otpGenerator')
//Generate a unique otp with given input


const generateOtp=async (obj)=>{
    //Generating unique 6 digit otp
    const generatedOtp=otpGenerator(6)
    //storing user signup info temporarily
    await client.hSet('user-session:123',{...obj,otp:generatedOtp})

    const storedObj=await client.hGetAll('user-session:123')

    console.log("Redis stored:",storedObj)

}

const sendOtpToUser=async (email)=>{

    //Getting otp from temporary storage
    const otp=await client.hGet( 'user-session:123','otp')

    console.log("Otp fetched from redis:",otp)

    //Sending otp to user via mail
    const result=await mailSender(email,'OTP Verification',otpTemplate(otp))

    console.log("Result of mailSender:",result)

}

const verifyOtp=async (userOtp)=>{
    
    //Verifying user otp
    const otp=await client.hGet('user-session:123','otp')

    //if otp not present
    if(!otp){
        console.log("Otp not present")
        return false;
    }

    console.log("Printing otp from redis:",otp)
    if(otp===userOtp){
       
        //Extrating chached used data from redis
        let userSession=await client.hGetAll('user-session:123')

        console.log("Printing user session:",userSession)

        //Converting to json object
        let jsonObject=userSession
        //removing unnecessary fields
        delete jsonObject.otp
        //to be used to create user


        //Deleting the users chached data from redis
        const deletedKeysCount=await client.del('user-session:123')

        console.log('Redis cached data deleted with count:',deletedKeysCount)

        return jsonObject
    }
    else{
        return false;
    }
}

module.exports={
    generateOtp,
    sendOtpToUser,
    verifyOtp,
}