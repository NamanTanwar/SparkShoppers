const mongoose=require('mongoose')

const passwordResetSchema=mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
        index: {type: 'expires', expires: '20m'}
    }
})

module.exports=mongoose.model('PasswordResetSchema',passwordResetSchema)