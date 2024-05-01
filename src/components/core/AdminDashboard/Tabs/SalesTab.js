import React from 'react'
import { GrDocumentPerformance } from "react-icons/gr";
import { FaArrowUp,FaArrowDown } from "react-icons/fa";

const SalesTab=({salesTabData})=>{

    const percentageIncOrDec=Math.round(((salesTabData.currentMonthAvg-salesTabData.lastMonthAvg)/salesTabData.lastMonthAvg)*100*10)/10

    return (
        <div className="flex flex-col p-4 bg-white rounded shadow-md">
            <div className='flex flex-row items-center mb-2'>
                <GrDocumentPerformance size={24} className='text-gray-500 mr-2'/>
                <h1 className='text-lg font-bold'>Sales</h1>
            </div>
            <div className="text-3xl font-bold mb-2">Rs.{salesTabData.total}</div>

            <div className='text-sm'>
                <p>
                {percentageIncOrDec >= 0? (
                    <span className='text-green-700 flex flex-row'>
                    Increase over last Month by {percentageIncOrDec} 
                    <FaArrowUp color="green-700" size={16}/>
                    </span>
                ) : (
                    <span className='text-red-700 flex flex-row'>
                    Decrease over last month by {percentageIncOrDec} 
                    <FaArrowDown color="red-700" size={16}/>
                    </span>
                )}
                </p>
            </div>
            
        </div>
    )
}

export default SalesTab