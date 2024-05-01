import React, { useState,useRef,useEffect } from 'react'
import ReviewCard from '../../common/ReviewCard'

const ReviewTab=({reviews})=>{
   
    const [current,setCurrent]=useState('mostRecent')
    //Selecting type of list to be shown
    const [reviewList,setReviewList]=useState(reviews.mostRecentReviews)
    //selecting how many reviews to show 
    const [visibleReviews, setVisibleReviews] = useState(reviewList.slice(0,reviews.mostRecentReviews.length/2))

    //Ref to track for intersection observer
    const observerRef=useRef(null)

    //for each case we are setting the state for type of list to show and
    //how many reviews to show before scroll
    const handleChange=(e)=>{
        setCurrent(e.target.value)
        if(e.target.value==='mostRecent'){
            setReviewList(reviews.mostRecentReviews)
            setVisibleReviews(reviewList.slice(0,reviewList.length/2))
        }
        else if(e.target.value==='mostRated'){
            setReviewList(reviews.bestReviews)
            setVisibleReviews(reviewList.slice(0,reviewList.length/2))
        }    
        else{
            setReviewList(reviews.worstReviews)
            setVisibleReviews(reviewList.slice(0,reviewList.length/2))
        }
    }

    const handleIntersection=(entries)=>{
        const [entry]=entries
        if(entry.isIntersection){
            const nextReviews=visibleReviews.concat(
                reviewList.slice(visibleReviews.length,visibleReviews.length+5)
            )
            setVisibleReviews(nextReviews)
        }
    }

    useEffect(()=>{
        
        const observer=new IntersectionObserver(handleIntersection,{
            root: null,
            threshold: 0.5,
        })

        if(observerRef.current){
            observer.observe(observerRef.current)
        }

        return ()=>{
            observer.disconnect()
        }

    },[visibleReviews,observerRef])


    return (
        <div className='flex flex-col'>
            <div className='flex flex-row justify-between mb-4'>
                <h1>Recent Reviews:</h1>
                <div>
                    <label> 
                        <p>Sort By:</p>
                        {/* Add dropdown menu here */}
                        <select value={current} onChange={handleChange}>
                            <option value='mostRecent'>Most Recent</option>
                            <option value='mostRated'>Most Rated</option>
                            <option value='leastRated'>Least Rated</option>
                        </select>
                    </label>
                </div>
            </div>
            
            <div className="flex flex-col">
                {
                    visibleReviews.map((review,idx)=>(
                        <ReviewCard key={idx} firstname={review.user.firstname} lastname={review.user.lastname} rating={review.rating} review={review.review}/>
                    ))
                }
            </div>
            {
                visibleReviews.length<reviewList.length && (
                    <div ref={observerRef} className='h-20'></div>
                )
            }
        </div>
    )
}

export default ReviewTab