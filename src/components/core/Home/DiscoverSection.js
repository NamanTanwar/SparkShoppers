import React from 'react';
import { MdKeyboardArrowRight } from "react-icons/md";
import DiscoverImg from "../../../assets/discover-section.png"

const DiscoverSection=()=>{
    return (
        <div className="flex flex-row pt-6">

            <div className="flex flex-col space-y-8 pl-10 w-1/2 pt-20">
                <h1 className="font-bold text-4xl">
                    Find Your Perfect Products <br/> at Amazing Prices 
                </h1>
                <p className="text-text-200">
                    Explore our collection of featured products and discover the best deals on the <br/>market. Whether you're looking for electronics, fashion, or home decor, we have<br/> something for everyone
                </p>
                <div className="flex flex-row items-center space-x-8">
                    <button className="border-black pl-4 pr-4 pt-2 pb-2 border-x border-y">
                        Shop
                    </button>
                    <button className="flex flex-row ">
                        Learn More
                        <MdKeyboardArrowRight />
                    </button>
                </div>
            </div>

            <div className="w-1/2 pr-10">
                <img className="w-auto" src={DiscoverImg} alt="Discover Section"/>
            </div>

        </div>
    )
}

export default DiscoverSection