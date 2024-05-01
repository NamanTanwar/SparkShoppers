
//Validate a mongo Id
const objectId=(value,helpers)=>{
    if(!value.match(/^[0-9a-fA-F]{24}$/)){
       return helpers.message('"{{#label}}" must be a valid mongo id');
    }
    return value
}

//Validating password field
const password=(value,helpers)=>{
    if(value.length<8){
        return helpers.message("password must contain at least 8 charaters")
    }
    if(!value.match(/\d/) || !value.match(/[a-zA-Z]/)){
        return helpers.message(
            'password must contain at least 1 letter and 1 number'
        );
    }
    return value
}

module.exports={
    objectId,
    password,
}