const {getUserByEmail}=require('./user.service');
const bcrypt=require('bcrypt')


 

const loginUserWithEmailAndPassword=async (email,password)=>{
    
        const user=await getUserByEmail(email)
 
        const isValidPass=await bcrypt.compare(password,user.password)

        if(!user || !isValidPass){
            throw new Error("Incorrect email or password")
        }
        return user;

}

const logoutUser=async (res)=>{
    res.clearCookie('refresh')
    console.log("refresh token cleared")
    return true
}

module.exports={
    loginUserWithEmailAndPassword,
    logoutUser,
}