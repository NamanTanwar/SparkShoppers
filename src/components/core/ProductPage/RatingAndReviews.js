import React,{useState} from 'react'
import { calculateAverageRating } from '../../../utils/averageRating'
import RatingStars from '../../common/RatingStars'
import PercentageBar from '../RatingAndReviews/PercentageBar'
import Reviews from './Reviews'

const RatingAndReviews=({ratingAndReviews})=>{
    

    const [selectedOption,setSelectedOption]=useState('most-recent')

    const {totalAverageRating,sortedAverages}=calculateAverageRating(ratingAndReviews)
    const totalReviews=ratingAndReviews.length

    const handleOptionChange=(e)=>{
        setSelectedOption(e.target.value)
    }

    
    return (
        <div className='flex flex-col'> 
            <div>
                <h2>Customer Reviews</h2>
                <div className='flex flex-row'>
                <RatingStars avgRating={totalAverageRating} starSize={20}/>
                <span>{totalAverageRating} out of {totalReviews}</span>
                </div>
                <p>{totalReviews} global ratings</p>
                <div className='flex flex-col space-y-6'>
                {
                    sortedAverages.map((sortedAverage,idx)=>(
                        <div key={idx} className='flex flex-row'>
                            <p>{sortedAverage[1]} stars</p>
                            <PercentageBar percentage={sortedAverage[0]}/>
                            <p>{sortedAverage[1]}%</p>
                        </div>
                    ))
                 }
                </div>
            </div>

            <div className='flex flex-row'>
                 <div>
                    <label htmlFor='review-sort'>Sort reviews by:</label>
                    <select id='review-sort' value={selectedOption} onChange={handleOptionChange}>
                        <option value='most-recent'>Most Recent</option>
                        <option value='top-rated'>Top Rated</option>
                    </select>
                 </div>
                 <div className='flex flex-row'>
                    <Reviews ratingAndReviews={ratingAndReviews} selectedFilter={selectedOption}/>
                 </div>
            </div>

        </div>
    )
}

export default RatingAndReviews