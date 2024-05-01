import React,{lazy,Suspense} from 'react'
import LoginForm from "../components/core/Login/LoginForm"
import LoginImg from '../assets/login.jpg'
import Navbar from '../components/common/Navbar'
import { useSelector } from 'react-redux'



const Sidebar=lazy(()=>import('../components/core/Navbar/Sidebar'))

const Login=()=>{


    const {showSidebar}=useSelector((state)=>state.UI)
    
    return (
        <div>
        {(
            showSidebar && (
                <Suspense fallback={<h1>Loading Sidebar</h1>}>
                    <Sidebar />
                </Suspense>
                  
            )
             )}
            <Navbar />
            <div className="flex flex-row space-x-4 justify-around items-center">
        <div className="w-1/2">
        <img src={LoginImg} alt="Login image" />
        </div>
        <div className="flex flex-col">
            <div className="flex flex-col items-center justify-center space-y-2">
                <h1 className="text-4xl font-bold">Log In to Spark Shoppers</h1>
                <p className="text-2xl text-text-200">Enter your details below</p>
            </div>
            <LoginForm />
        </div>

        </div>
        </div>
        
    )
}

export default Login;