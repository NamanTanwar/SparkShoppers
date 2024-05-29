import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import {TiStarOutline,TiStarFullOutline} from "react-icons/ti"
import {toast} from 'react-hot-toast'
import { addRatingAndReview } from '../../../services/operations/userAPI'
import ClipLoader from 'react-spinners/ClipLoader';

const data=[
    {id:1, type:'Poor'},
    {id:2, type:'Bad'},
    {id:3, type:'Avg'},
    {id:4, type:'Good'},
    {id:5, type:'Excellent'}
]


const RatingAndReviewModal=({productId,onClose})=>{

    console.log('productId in ratingAndReviewModal comp:',productId)

    const [review,setReview]=useState('')

    const [hoverId,setHoverId]=useState(0)
    const [clickedId,setClickedId]=useState(-1)
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)

    const {user,accessToken}=useSelector((state)=>state.auth)

    const handleSubmit=async (e)=>{
        e.preventDefault()

        if(clickedId===-1){
            toast.error('Kindly select at least one rating')
            return
        }
        if(review===''){
            toast.error('Review Field empty')
            return
        }
        const toastId=toast.loading('Loading...')
        try{
            setLoading(true)
            setError(null)
            const response=await addRatingAndReview(accessToken.token,clickedId,review,productId)
            console.log('Response is:',response)
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            setLoading(false)
            toast.success('Rating and review added successfully')
            setReview('')
            setClickedId(-1)
            onClose()
        }catch(err){
            setError(err)
            toast.error(err.message || 'Something went wrong!!')
        }finally{
            toast.dismiss(toastId)
            setLoading(false)
        }
  
    }



    return (
       <form onSubmit={handleSubmit}>
            <div className="rating-review-card flex flex-col bg-gray-100 rounded-lg shadow-lg p-6 max-w-lg mx-auto my-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Hey {user.firstname}</h1>
            </div>
            <div className="text-gray-700 mb-4">
                <p>How would you like to rate your experience?</p>
            </div>
            <div className="flex flex-row justify-center space-x-2 mb-4">
                {data.map((item) => (
                    <div
                        key={item.id}
                        className="rating-star flex flex-col items-center cursor-pointer p-2 rounded-lg transition duration-200 ease-in-out transform hover:bg-gray-200 hover:scale-110"
                        onMouseEnter={() => setHoverId(item.id)}
                        onMouseLeave={() => setHoverId(0)}
                        onClick={() => setClickedId(item.id)}
                    >
                        {hoverId >= item.id || clickedId >= item.id ? (
                            <TiStarFullOutline className="text-yellow-500 text-3xl" />
                        ) : (
                            <TiStarOutline className="text-yellow-500 text-3xl" />
                        )}
                        <p className="text-sm text-gray-600 mt-1">{item.type}</p>
                    </div>
                ))}
            </div>
            <textarea
                className="review-text h-24 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full resize-none"
                placeholder="Enter review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                name="review"
            />
            <div className="flex justify-end mt-4">
                <button type='submit' className="submit-button bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out">
                    Submit
                </button>
            </div>
        </div>
        {loading && (
                    <div className="flex justify-center mt-4">
                        <ClipLoader color="#3B82F6" loading={loading} size={35} />
                    </div>
                )}
                {error && <p className="text-red-500 text-sm mt-2">Something went wrong</p>}
       </form>
        
    );
}

export default RatingAndReviewModal