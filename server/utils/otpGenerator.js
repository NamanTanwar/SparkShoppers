


const otpGenerator=(digits)=>{
    //Validating input
    if(typeof digits!=='number' || digits<=0){
        throw new Error('Number of digits must be a positive integer.')
    }
    
    const min=Math.pow(10,digits-1)
    const max=Math.pow(10,digits)-1

    return Math.floor(Math.random()*(max-min+1)+min)
}

module.exports={
    otpGenerator
}