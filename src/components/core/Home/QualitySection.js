import React from 'react';
import { MdKeyboardArrowRight } from "react-icons/md";
import Img from "../../../assets/qualitySection.png"

const QualitySection=()=>{
    return (
        <div className="flex flex-col md:flex-row mt-10 justify-center items-center mr-6">

            <div className="w-full md:w-1/2 relative">

                <img src={Img} alt="Laptop Img"/>
            </div>

            <div className="flex flex-col space-y-6">
                <h1 className="text-5xl">Discover Our  Popular and <br/>Effective Products</h1>
                <p className="text-text-200">Our products have gained immense popularity and proven effectiveness <br/>making us a trusted choice for customers</p>
                <div className="flex flex-col md:flex-row space-y-2 md:space-x-16">
                    <div>
                        <h1 className="text-5xl">50%</h1>
                        <p className="text-text-200">Customers recommend Our<br/> Products for their quality</p>
                    </div>

                    <div>
                        <h1 className="text-5xl">50%</h1>
                        <p className="text-text-200">Satisfaction Guaranteed with our<br/> Premium Products</p>
                    </div>
                    
                </div>

                <div className="flex flex-row items-center space-x-8">
                        <button className="border-black pl-4 pr-4 pt-2 pb-2 border-x border-y">
                            Learn More
                        </button>
                        <button className="flex flex-row items-center">
                            Sign Up
                            <MdKeyboardArrowRight />
                        </button>
                </div>

            </div>


        </div>
    )
}

export default QualitySection