import React from 'react'
import { useSelector } from 'react-redux'
import CartTable from '../components/core/Cart/CartTable'

const CartPage=()=>{
    
    const {cartItems}=useSelector((state)=>state.cart)

    const logCartItems=()=>{
        console.log(cartItems)
    }
    
    logCartItems()

    return (
        <div>
            <h1>Cart Page</h1>
            <CartTable cartItems={cartItems}/>
        </div>
    )
}

export default CartPage