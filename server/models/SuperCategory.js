const mongoose=require('mongoose')

const superCategorySchema=new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref:'Product'
        }
    ],
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }
    ]
})

module.exports=mongoose.model('SuperCategory',superCategorySchema)