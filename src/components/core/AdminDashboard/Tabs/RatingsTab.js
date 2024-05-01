import React from 'react'
import RatingStars from '../../../common/RatingStars'
import { FaArrowUp,FaArrowDown } from "react-icons/fa";

const RatingsTab=({ratingsTabData})=>{

    const percentageIncOrDec=Math.round(((ratingsTabData.currentMonthAvg-ratingsTabData.lastMonthAvg)/ratingsTabData.lastMonthAvg)*100*10)/10

    return (
        <div className='flex flex-col p-4 bg-white rounded shadow-md'>

            <h1 className='text-lg font-bold mb-2'>Customer Rating</h1>
            
            <div className='flex flex-col'>
                <div className="text-3xl font-bold mb-2">{ratingsTabData.avgRating}</div>
                <div className='flex flex-row items-center mb-2'>
                    <RatingStars avgRating={ratingsTabData.avgRating} starSize={30} className='mr-2'/>
                    <p className='text-lg'>{ratingsTabData.total}</p>
                </div>

                <div className='text-sm'>
                    {percentageIncOrDec>=0 ? (
                        <>
                        <div className="text-green-700 flex flex-row items-center">
                            <FaArrowUp size={16} color='green-700' className='mr-1'/>
                            <span>+{percentageIncOrDec}</span>
                        </div>
                        <p className="text-gray-500">
                            Points from last Month
                        </p>
                        </>
                        
                    ) : (
                        <>
                        <div className="text-red-700 flex flex-row items-center">
                            <FaArrowDown size={16} color='red-700' className='mr-1'/>
                            <span>-{percentageIncOrDec}</span>
                        </div>
                        <p className='text-gray-500'>
                            Points from last Month
                        </p>
                        </>
                    )}
                </div>

            </div>



        </div>
    )
}

export default RatingsTab