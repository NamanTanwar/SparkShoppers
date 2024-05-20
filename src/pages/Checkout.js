import React from 'react'
import AddressDetailsForm from '../components/core/Checkout/AddressDetailsForm'
import CartView from '../components/core/Checkout/CartView'
import { useSelector } from 'react-redux'

const Checkout=()=>{
    
    const {cartItems,totalPrice}=useSelector((state)=>state.cart)
    
    return (
        <div>
            <h1>Checkout</h1>
            <div className='flex flex-row'>
                <div className='flex flex-col'>
                    <h2>Billing Details</h2>
                    <AddressDetailsForm />
                </div>
                <div className='flex flex-col'>
                    <CartView />
                    <button>Place Order</button>
                </div>
            </div>
        </div>
    )
}

export default Checkout