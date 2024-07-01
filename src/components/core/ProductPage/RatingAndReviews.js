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
        // <div className='flex flex-col'> 
        //     <div>
        //         <h2>Customer Reviews</h2>
        //         <div className='flex flex-row'>
        //         <RatingStars avgRating={totalAverageRating} starSize={20}/>
        //         <span>{totalAverageRating} out of {totalReviews}</span>
        //         </div>
        //         <p>{totalReviews} global ratings</p>
        //         <div className='flex flex-col space-y-6'>
        //         {
        //             sortedAverages.map((sortedAverage,idx)=>(
        //                 <div key={idx} className='flex flex-row'>
        //                     <p>{sortedAverage[0]} stars</p>
        //                     <PercentageBar percentage={sortedAverage[1]}/>
        //                     <p>{sortedAverage[1]}%</p>
        //                 </div>
        //             ))
        //          }
        //         </div>
        //     </div>

        //     <div className='flex flex-row'>
        //          <div>
        //             <label htmlFor='review-sort'>Sort reviews by:</label>
        //             <select id='review-sort' value={selectedOption} onChange={handleOptionChange}>
        //                 <option value='most-recent'>Most Recent</option>
        //                 <option value='top-rated'>Top Rated</option>
        //             </select>
        //          </div>
        //          <div className='flex flex-row'>
        //             <Reviews ratingAndReviews={ratingAndReviews} selectedFilter={selectedOption}/>
        //          </div>
        //     </div>

        // </div>
        <div className="flex flex-col mb-8"> 
        <div>
          <h2 className="text-xl font-bold mb-2">Customer Reviews</h2>
          <div className="flex items-center mb-2">
            <RatingStars avgRating={totalAverageRating} starSize={20} />
            <span className="ml-2">{totalAverageRating} out of {totalReviews}</span>
          </div>
          <p className="mb-4">{totalReviews} global ratings</p>
          <div className="space-y-6">
            {sortedAverages.map((sortedAverage, idx) => (
              <div key={idx} className="flex items-center">
                <p className="w-1/6">{sortedAverage[0]} stars</p>
                <PercentageBar percentage={sortedAverage[1]} />
                <p className="ml-2">{sortedAverage[1]}%</p>
              </div>
            ))}
          </div>
        </div>
  
        <div className="flex flex-col lg:flex-row items-center mt-6">
          <div className="mb-4 lg:mb-0 lg:mr-4">
            <label htmlFor="review-sort" className="block font-medium">Sort reviews by:</label>
            <select id="review-sort" value={selectedOption} onChange={handleOptionChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              <option value="most-recent">Most Recent</option>
              <option value="top-rated">Top Rated</option>
            </select>
          </div>
          <div className="flex flex-col lg:flex-row w-full">
            <Reviews ratingAndReviews={ratingAndReviews} selectedFilter={selectedOption} />
          </div>
        </div>
      </div>
    )
}

export default RatingAndReviews