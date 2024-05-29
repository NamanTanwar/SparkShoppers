import { apiConnector } from "../apiConnector";
import {toast} from 'react-hot-toast'
import { userEndpoints } from "../apis";

const { GET_USER_ORDER_HISTORY,ADD_USER_RATING_AND_REVIEW_API,GET_USER_RATING_AND_REVIEW_API}=userEndpoints

export const getUserOrderHistory=async (userToken)=>{
    const toastId=toast.loading('Loading...')
    try{
        console.log('api:',GET_USER_ORDER_HISTORY)
        const response=await apiConnector(
            'GET',
            GET_USER_ORDER_HISTORY,
            null,
            {
                authorization: `Bearer ${userToken}`
            }
        )
        console.log('response:',response)
        toast.success('Data fetched successfully')
        return response.data.orderDetails
    }catch(err){
        console.log('error in getUserOrderHistory service:',err)
        toast.error('Somenthing went wrong')
    }finally{
        toast.dismiss(toastId)
    }
}

export const addRatingAndReview=async (userToken,rating,review,productId)=>{

        try{
            console.log('api:',ADD_USER_RATING_AND_REVIEW_API)
            const response=await apiConnector(
                'POST',
                ADD_USER_RATING_AND_REVIEW_API,
                {
                    userToken,
                    rating,
                    review,
                    productId
                }
            )
            return response
        }catch(err){
            console.log('Error in addRatingAndReview service:',err)
            throw err
        }

}

export const getUserReviews=async (userToken)=>{
    try{
        const response=await apiConnector(
            'POST',
            GET_USER_RATING_AND_REVIEW_API,
            {
                userToken
            }
        )

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        console.log('response is:',response)

        return response.data.reviews

    }catch(err){
        console.log('Error in getUserReview service:',err)
        throw err
    }
}