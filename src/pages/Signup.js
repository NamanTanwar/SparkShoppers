import React from 'react'
import SignupForm from "../components/core/Signup/SignupForm"
import SignUpImg from "../assets/SignUp.jpg"

const Signup=()=>{
    return (
        <div className="flex flex-col lg:flex-row justify-around items-center space-y-4 lg:space-x-4 lg:space-y-0 mt-24">

        <div>
            <img src={SignUpImg} alt="Sign up image" className="w-full max-w-md rounded-lg shadow-lg sm:w-3/4 md:w-1/2 lg:w-10/12"/>
        </div>

        <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold mb-2">Create Your Account with Spark Shoppers</h1>
            <p className="text-lg text-gray-600">Enter Your details below</p>
        <SignupForm />
        </div>

        </div>
    )
}

export default Signup