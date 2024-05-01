
//Create an object composed of the picked object properties
//
const pick=(object,keys)=>{
    //here key is the array containing a list of keys to pick from
    return keys.reduce((obj,key)=>{
         //check if object exists and object has a property key
        if(object && Object.prototype.hasOwnProperty.call(object,key)){
            //new kry value pair inserted in new obj
            obj[key]=object[key]

        }

        return obj;

    },{})

}

module.exports=pick;