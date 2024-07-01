import React from 'react';
import { FaShippingFast, FaUndo, FaHeadset } from 'react-icons/fa';

const FeatureSection=()=>{
    return (
        <div className="flex flex-col md:flex-row space-x-12 space-y-14 items-center justify-center">

            

            <div className="relative bg-green-300 flex flex-col justify-start items-center ml-16 pt-8 pb-5 pl-2 pr-2 hover:bg-green-400 w-64 h-40 mt-12 cursor-pointer">
                <div className="absolute top-0 left-14 transform -translate-x-1/2 -translate-y-1/2">
                    <FaShippingFast className="text-white text-4xl bg-green-500 p-2 rounded-full" />
                </div>
                <h2 className="font-bold">Free Shipping</h2>
                <p className="text-text-100">Enjoy the convenience of 24/7<br/> customer service and support</p>
            </div>

            <div className="relative bg-yellow-300 flex flex-col justify-center items-center pt-8 pb-5 pl-2 pr-2 hover:bg-yellow-400 w-64 h-40 cursor-pointer">
                <div className="absolute top-0 left-14 transform -translate-x-1/2 -translate-y-1/2">
                    <FaUndo className="text-white text-4xl bg-yellow-500 p-2 rounded-full" />
                </div>
                <h2 className="font-bold">14 Days Easy Return</h2>
                <p className="text-text-200">Shop with confidence knowing your <br/>payments are safe and secure</p>
            </div>

            <div className="relative bg-blue-300 flex flex-col justify-center items-center pt-8 pb-5 mr-16 pl-2 pr-2 hover:bg-blue-400 w-64 h-40 cursor-pointer">
                <div className="absolute top-0 left-14 transform -translate-x-1/2 -translate-y-1/2">
                    <FaHeadset className="text-white text-4xl bg-blue-500 p-2 rounded-full" />
                </div>
                <h2 className="font-bold">24/7 Customer Support</h2>
                <p className="text-text-200">Discover a vast range of products to suit<br/> your needs and preferences</p>
            </div>

        </div>
    )
}

export default FeatureSection