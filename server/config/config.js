const dotenv=require('dotenv')
const path=require('path')//comes with node
const Joi=require('joi')

const DEFAULT_WALLET_MONEY = 500;
const DEFAULT_PAYMENT_OPTION = "PAYMENT_OPTION_DEFAULT";
const DEFAULT_ADDRESSS = "ADDRESS_NOT_SET";

dotenv.config({path: path.join(__dirname,"../.env")})

const envVarsSchema=Joi.object()
     .keys({
        NODE_ENV:Joi.string()
                 .valid("production","development","test")
                 .required(),
        PORT: Joi.number().default(4000),
        MONGO_URL: Joi.string().required().description("MongoDB URL") ,         
        JWT_SECRET: Joi.string().required().description("JWT SECRET"),
        JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
                                       .default(30)
                                       .description("minutes after which access token expires"),
        JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
                                        .default(7)
                                        .description("minutes after which refresh token expires"),  
                                       
    }).unknown()//unknown method allows additional key to pe paseed on validate 
                //which are not passed on the schema.validate() without giving errors


//prefs used to set custom error message and validate to preform validation
const {value: envVars,error}=envVarsSchema.prefs({errors: {label: 'key'}}).validate(process.env)

if(error){
    throw new Error(`Config validation error: ${error.message}`)
}

module.exports={
    //development environemt
    env: envVars.NODE_ENV, 
    //port for mongodb
    port: envVars.PORT,
    //mongoose url+options to connect
    mongoose: {
        url: envVars.MONGO_URL+(envVars.NODE_ENV==='test' ? '-test' : ''),
        options: {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        }
    },
    //payment default options for every user
    default_wallet_money: DEFAULT_WALLET_MONEY,
    default_payment_option: DEFAULT_PAYMENT_OPTION,
    default_address: DEFAULT_ADDRESSS,
    //jwt configuration vars
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    },
    
}