import React from 'react';
import { TiStarFullOutline,TiStarHalfOutline,TiStarOutline } from "react-icons/ti";

const RatingStars=({avgRating,starSize})=>{

    const calculateStars=(avgRating)=>{
        const fullStars=Math.floor(avgRating)
        const halfStars=Math.floor(avgRating)===Math.ceil(avgRating) ? 0 : 1
        const emptyStars=5-fullStars-halfStars

        return {fullStars,halfStars,emptyStars}
    }

    const {fullStars,halfStars,emptyStars}=calculateStars(avgRating)

    return (
        <div className="flex flex-row">
           {[...Array(fullStars)].map((_, index) => (
                <TiStarFullOutline key={`full-star-${index}`} size={starSize}/>
            ))}
            {[...Array(halfStars)].map((_, index) => (
                <TiStarHalfOutline key={`half-star-${index}`} size={starSize}/>
            ))}
            {[...Array(emptyStars)].map((_, index) => (
                <TiStarOutline key={`empty-star-${index}`} size={starSize}/>
            ))}  
        </div>
    )
}

export default RatingStars