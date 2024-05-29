import React from 'react'
import RatingStars from '../../common/RatingStars'

const Reviews=({ratingAndReviews,selectedFilter})=>{
    
    const filteredReviews=ratingAndReviews.sort((a,b)=>{
        if(selectedFilter==='most-recent')
            return new Date(b.createdAt)-new Date(a.createdAt)
        else if(selectedFilter==='top-rated')
            return b.rating-a.rating
        else
            return 0
    })
    
    return (
        <div className='flex flex-col'>
            {
                filteredReviews.map((ratingAndReview,idx)=>(
                    <div className='flex flex-col'>
                        
                        <div className='flex flex-row'>
                            <img src={`https://api.dicebear.com/8.x/initials/svg?seed=${ratingAndReview.user.firstname}`} alt='User profile img' className='h-10'/>
                            <p>{ratingAndReview.user.firstname} {ratingAndReview.user.lastname}</p>
                        </div>
                        <div>
                         <RatingStars avgRating={ratingAndReview.rating} starSize={20}/>
                         <p>Reviewed on {new Date(ratingAndReview.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p>
                                {ratingAndReview.review}
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Reviews