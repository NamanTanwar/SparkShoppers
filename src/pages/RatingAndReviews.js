import React,{useState,useEffect} from 'react'
import { getUserReviews } from '../services/operations/userAPI'
import { useSelector } from 'react-redux'
import ClipLoader from 'react-spinners/ClipLoader'
import {toast} from 'react-hot-toast'
import RatingStars from '../components/common/RatingStars'

const RatingAndReviews=()=>{
    
    const [reviewData,setReviewData]=useState([])
    const {accessToken}=useSelector((state)=>state.auth)
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)

    useEffect(()=>{
        const fetchReviews=async ()=>{
            setLoading(true)
            setError(null)
            try{
                const reviews=await getUserReviews(accessToken.token)
                setReviewData(reviews)
                toast.success('Reviews fetched successfully!')
                console.log(reviews)
            }catch(err){
                console.log('Error in fetching reviews:',err)
                toast.err(err.message || 'Something Went wrong!')
            }finally{
                setLoading(false)
            }
        }

        fetchReviews()

    },[accessToken.token])

    if (loading) {
        return (
            <div className="flex justify-center mt-4">
                <ClipLoader color="#3B82F6" loading={loading} size={35} />
            </div>
        );
    }

    if (error) {
        return <p className="text-red-500 text-sm mt-2">Something went wrong!</p>;
    }


    return (
        <div>
            <h1>Products rated by Me</h1>
            {
                reviewData && reviewData.length>0 ? (
                        <div className='flex flex-col'>
                            {
                                reviewData.map((review)=>(
                                    <div key={review._id} className='flex flex-col'>
                                        <div className='flex flex-row'>
                                            <p>Product Reviewed:</p>
                                            <p>{review.product.name}</p>
                                            <p>{review.product.brand}</p>
                                        </div>
                                        <div className='flex flex-row'>
                                            <p>Rating Given:</p>
                                            <div>
                                                <RatingStars avgRating={review.rating} starSize={20}/>
                                                <p>({review.rating})</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p>Review Given:</p>
                                            <p>{review.review}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                ) : (
                    <h2>No reviews to show</h2>
                )
            }
        </div>
    )
}

export default RatingAndReviews