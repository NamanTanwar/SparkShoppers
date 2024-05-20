

export const calculateAverageRating=(ratingAndReviews)=>{

    console.log('Rating And Reviews array:',ratingAndReviews)

    const averageRating=(ratingAndReviews.reduce((sum,ratingAndReview)=>sum+ratingAndReview.rating,0)/ratingAndReviews.length).toFixed()
    //return averageRating.toFixed()
    console.log('Average Rating is:',averageRating)

    let averageRatings=new Map()

    for(let i=0;i<ratingAndReviews.length;i++){
        let rating=ratingAndReviews[i].rating
        if(!averageRating.has(rating)){
            averageRatings.set(rating,1)
        }
        else{
            let count=averageRatings.get(rating)
            count+=1
            averageRatings.set(rating,count)
        }
    }

    for(const [key,value] of averageRating){
        averageRatings.set(key,((value/ratingAndReviews.length)*100).toFixed())
    }

    const arr=Array.from(averageRating).sort((a,b)=>a[0]-b[0])


    console.log('Total average rating:',averageRating)
    console.log('sortedAverages:',arr)

    return {
        totalAverageRating: averageRating,
        sortedAverages: arr 
    }


    
}

//x/100*total=percentage