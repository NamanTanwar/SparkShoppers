import React,{useState} from 'react'
import CTAButton from "../../common/CTAButton"
import { useDispatch } from 'react-redux'
import { signup } from '../../../services/operations/authAPI'
import { useNavigate } from 'react-router-dom'


const SignupForm=()=>{

    const dispatch=useDispatch()

    const navigate=useNavigate()
    
    const [formData,setFormData]=useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [errors,setErrors]=useState({})

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit=(e)=>{

        console.log("Entered here")
        
        e.preventDefault()        
        validateForm(formData)

        if(Object.keys(errors).length===0){

            dispatch(signup(formData.firstname,formData.lastname,formData.email,formData.password,navigate))

            setFormData({
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                confirmPassword: "",
            })

            setErrors({})

        }

    }

    const validateForm=(data)=>{
        
        if(!data.firstname){
            setErrors({firstname: "First name is required"})
        }

        if(!data.lastname){
            setErrors({lastname: "Last name is required"})
        }

        if(!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)){
            setErrors({email: "Email is required"})
        }

        if(!data.password || data.password.length<6){
            setErrors({password: "Password is required"})
        }

        if(data.password!==data.confirmPassword){
            setErrors({confirmPassword: "Confirm password is required"})
        }

    }

    
    return (
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center space-y-4">
         
        <div className="flex flex-row space-x-2 justify-center items-center">
        <label htmlFor="firstname" className="text-gray-600">First Name:</label>
         <input 
            type="text"
            name="firstname"
            id="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className={`border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 ${
                        errors.firstname ? 'border-red-500' : ''
                        }`}
         />
         {errors.firstname && <span className="text-red-500">{errors.firstname}</span>}
        </div>

        <div className="flex flex-row space-x-2 justify-center items-center">
        <label htmlFor="lastname" className="text-gray-600">Last Name:</label>
         <input 
            type="text"
            name="lastname"
            id="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className={`border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 ${
                        errors.lastname ? 'border-red-500' : ''
                        }`}
         />
         {errors.lastname && <span className="text-red-500">{errors.lastname}</span>}
        </div>

        <div className="flex flex-row space-x-2 justify-center items-center">
        <label htmlFor="email" className="text-gray-600">Email:</label>
         <input 
            type="text"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className={`border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 ${
                        errors.email ? 'border-red-500' : ''
                        }`}
         />
         {errors.email && <span className="text-red-500">{errors.email}</span>}
        </div>

        <div className="flex flex-row space-x-2 justify-center items-center">
        <label htmlFor="password" className="text-gray-600">Password:</label>
         <input 
            type="text"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className={`border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 ${
                        errors.password ? 'border-red-500' : ''
                        }`}
         />
         {errors.password && <span className="text-red-500">{errors.password}</span>}
        </div>

        <div className="flex flex-row space-x-2 justify-center items-center">
        <label htmlFor="confirmPassword" className="text-gray-600">Confirm Password:</label>
         <input 
            type="text"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`border border-gray-300 rounded-md p-2 focus:outline-none focus:broder-blue-500 ${
                errors.confirmPassword ? 'border-red-500' : ''
            }`}
         />
         {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword}</span>}
        </div>


         <div className="flex flex-row space-x-6 justify-center items-center">
         <button type='submit'>Sign up</button>
         <div className="flex flex-row">
            <p>Already have an account</p>
            <CTAButton text={"login"} path={'/login'}/>
         </div>
         </div>
         

        </form>
    )
}

export default SignupForm