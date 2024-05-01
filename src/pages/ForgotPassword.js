import React,{useState} from 'react'
import ForgotPassImg from "../assets/forgot-password.jpg"
import CTAButton from '../components/common/CTAButton'

const ForgotPassword=()=>{

    const [email,setEmail]=useState('')

    const [errors,setErrors]=useState({})

    const handleSubmit=()=>{
        validateForm(email)
    }

    const handleChange=(e)=>{
        setEmail(e.target.value)
    }




    const validateForm=(email)=>{
        if(email.length===0){
            setErrors({email: "Email is required"})
        }

    }

    return (
        <div className="flex flex-row">
            <div>
                <img src={ForgotPassImg} alt="Forgot password"/>
            </div>
            <div>
            <div className="flex flex-col space-y-4">
                <h1>Forgot Password ?</h1>
                <p>No worries enter your registered email to reset password</p>
            </div>
            <form onSubmit={handleSubmit}>

                <div className="flex flex-row space-x-2 justify-center items-center">
                <label htmlFor="email">Enter your email:</label>
                <input 
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleChange}
                    className={`border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 ${
                        errors.email ? 'border-red-500' : ''
                        }`}
                />
                {errors.email && <span className="text-red-500">{errors.email}</span>}
                </div>

                <CTAButton type={'submit'} text={"Send Email"} path={'/verify-otp'}/>

            </form>
                
            </div>
        </div>
    )
}

export default ForgotPassword