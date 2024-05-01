const mongoose=require('mongoose')

const productOptionsSchema=new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    options: {
        type: [{
            name: {
                type: String,
                required: true,
            },
            values: {
                type: [String],
                required: true,
            }
        }]
    },
})

module.exports=mongoose.model('ProductOptions',productOptionsSchema)
     