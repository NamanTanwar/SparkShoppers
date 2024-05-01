const config=require('./config/config')
const {connectToDB}=require('./config/database')
const app=require('./app')
const {connectToRedis}=require("./config/redisConfig")
const {configureCloudinary}=require('./config/cloudinary')


const PORT=config.port

//connecting to mongodb atlas cluster
connectToDB();



//Configure Cloudinary
configureCloudinary();





app.listen(PORT,()=>{
    console.log(`Server started on PORT ${PORT}`)
})