import React, { lazy, Suspense } from 'react';
import LoginForm from "../components/core/Login/LoginForm";
import LoginImg from '../assets/login.jpg';
import Navbar from '../components/common/Navbar';
import { useSelector } from 'react-redux';

const Sidebar = lazy(() => import('../components/core/Navbar/SidebarNav'));

const Login = () => {
    const { showSidebar } = useSelector((state) => state.UI);

    return (
        <div>
            {showSidebar && (
                <Suspense fallback={<h1>Loading Sidebar</h1>}>
                    <Sidebar />
                </Suspense>
            )}
            <Navbar />
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-around items-center p-4">
                <div className="w-full md:w-1/2">
                    <img src={LoginImg} alt="Login" className="w-full" />
                </div>
                <div className="flex flex-col w-full md:w-1/2 items-center">
                    <div className="flex flex-col items-center justify-center space-y-2 mb-4">
                        <h1 className="text-4xl font-bold">Log In to Spark Shoppers</h1>
                        <p className="text-2xl text-gray-600">Enter your details below</p>
                    </div>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default Login;
