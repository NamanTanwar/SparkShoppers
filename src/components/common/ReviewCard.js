import React from 'react'
import RatingStars from './RatingStars'

const ReviewCard=({firstname,lastname,rating,review})=>{


    return (
        <div className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden">
            <div className='flex flex-row items-center px-4 py-3 border-b border-gray-200'>
                <img className='w-12 h-12 rounded-full mr-4 object-cover' src={`https://api.dicebear.com/8.x/initials/svg?seed=${firstname}`} alt='avatar'/>
                <div className='flex flex-col space-y-1'>
                    <h1 className='text-lg font-medium text-gray-800'>{firstname} {lastname}</h1>
                    <div className='flex items-center'>
                    <RatingStars avgRating={rating} starSize={20}/>
                    <span className='ml-2 text-gray-500 text-sm'>({rating})</span>
                    </div>
                </div>
            </div>
            <div className='px-4 py-4'>
                <p className='text-base leading-loose text-gray-700'>{review}</p>
            </div>
        </div>
    )
}

export default ReviewCard