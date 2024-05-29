import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { getUserOrderHistory } from '../services/operations/userAPI.js'
import RatingAndReviewModal from '../components/common/RatingAndReivew/RatingAndReviewModal.js'

const OrderHistory=()=>{

    const {accessToken,user}=useSelector((state)=>state.auth)
    const [orderHistory,setOrderHistory]=useState([])
    const [loading,setLoading]=useState(false)
    const [showRatingModal,setShowRatingModal]=useState(false)
    const [currProdId,setCurrProdId]=useState(null)

    const handleAddReview=(productId)=>{
        setCurrProdId(productId)
        setShowRatingModal(true)
    }

    const handleCloseModal = () => {
        setShowRatingModal(false);
        setCurrProdId(null);
    }

    useEffect(()=>{

        const fetchData=async ()=>{
            setLoading(true)
            try{
                const response = await getUserOrderHistory(accessToken.token);
                setOrderHistory(response)
            }catch(err){
                console.error('Error fetching order history:', err);
                setOrderHistory([])
            }finally{
                setLoading(false)
            }
        }

        fetchData()
        
    },[])

    return (
        <div>
        <h1>Table</h1>
            <table className='table-auto'>
                <thead>
                    <tr>
                        <th>OrderId</th>
                        <th>OrderDetails</th>
                        <th>CreatedAt</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                {
                    orderHistory && orderHistory.length > 0 ? (
                    orderHistory.map((order) => (
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>
                            {
                                order.products && order.products.map((product) => (
                                    <div key={product._id}>
                                        <p>Product Name: {product.product.name}</p>
                                        <p>Product Cost: {product.cost}</p>
                                        <p>Product Quantity: {product.quantity}</p>
                                        <button onClick={()=>handleAddReview(product.product._id)}>Add review</button>
                                    </div>
                                ))
                            }
                        </td>
                        <td>
                            {(new Date(order.createdAt)).toLocaleDateString()}
                        </td>
                        <td>
                            {order.status}
                        </td>
                    </tr>
                ))
            ) : (
                <h1>No items to show</h1>
            )
        }
                </tbody>
            </table>
            {showRatingModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50" onClick={handleCloseModal}></div>
                    <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
                        <RatingAndReviewModal productId={currProdId} onClose={handleCloseModal} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default OrderHistory