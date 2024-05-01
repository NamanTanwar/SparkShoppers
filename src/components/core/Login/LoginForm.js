import React, { useState } from 'react';
import CTAButton from '../../common/CTAButton';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../services/operations/authAPI';

const LoginForm=()=>{

    const dispatch=useDispatch()
    const navigate=useNavigate()


    const [formData,setFormData]=useState({
        email: "",
        password: ""
    })

    const [errors,setErrors]=useState({})

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        console.log(formData)
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        validateForm(formData)

        if(Object.keys(errors).length===0){

            dispatch(login(formData,navigate))

            setFormData({
                email: '',
                password: ''
            })

            setErrors({})

        }


    }


    const validateForm=(formData)=>{
        
        if(!formData.email){
            setErrors({email: "Email is required"})
        }

        if(!formData.password){
            setErrors({password: "Password is required"})
        }

    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3 mt-4">

            <div className="flex flex-row justify-around">
                <label htmlFor="email">Enter Email</label>
                <input 
                    type="text"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 ${
                        errors.firstName ? 'border-red-500' : ''
                        }`}
                />
                {errors.email && <span className="text-red-500">{errors.email}</span>}
            </div>

            <div className="flex flex-row justify-around">
                <label htmlFor="password">Enter Password</label>
                <input 
                    type="text"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 ${
                        errors.lastName ? 'border-red-500' : ''
                        }`}
                />
                {errors.password && <span className="text-red-500">{errors.password}</span>}
            </div>

            <div className="flex flex-row space-x-2 justify-center">
            <button type='submit'>Login</button>
            <CTAButton type={'button'} text={"Forgot Password"} path={'/forgot-password'}/>
            </div>
           
        </form>
    )
}

export default LoginForm