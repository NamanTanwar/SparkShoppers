import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { getUserCart } from '../services/operations/cartAPI';

const Cart=()=>{
    
    const dispatch=useDispatch()

    const {cart,isLoading,error}=useSelector(state => state.cart)
    const {isLoggedIn}=useSelector(state=>state.auth)

    useEffect(()=>{

        const fetchCartData=async ()=>{
            const cartData=await dispatch(getUserCart())
            console.log(cartData)
        }

    if(isLoggedIn){
        ;(async ()=>{
            await fetchCartData()
        })()
    }
    
    },[isLoggedIn])

    if(isLoading){
        return <div>Loading...</div>
    }

    if(error){
        return <div>{error}</div>
    }
    
    return (
        <div className='flex flex-col'>
            {
                cart.map((product,idx)=>(
                    <h1 key={product._id}>{product.name}</h1>
                ))
            }
        </div>
    )
}

export default Cart