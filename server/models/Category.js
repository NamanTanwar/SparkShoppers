const mongoose=require('mongoose');

const categorySchema=mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    products:[
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref:'Product'
        }
    ],
    description: {
        type: String,
        trim: true,
    }
}
)

module.exports=mongoose.model('Category',categorySchema)