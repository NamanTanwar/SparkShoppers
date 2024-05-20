import React from 'react'
import { useSelector } from 'react-redux'

const CartView=()=>{
    
    const {cartItems,totalPrice}=useSelector((state)=>state.cart)
    
    return (
        <div>
            <h2>Order Summary:</h2>
            {
                (cartItems && cartItems.length>0) ? 
                
                (<div className='flex flex-col'>
                    {
                        cartItems.map((item,idx)=>(
                            <div key={item.product._id} className='flex flex-row'>
                                <div>
                                    <img src={item.product.images[0]}/>
                                    <p>{item.product.name}</p>
                                </div>
                                <div>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                                <div>
                                    <p>{item.product.cost}</p>
                                </div>
                            </div>
                        ))
                    }
                    <div className='flex flex-row'>
                        <p>Subtotal:</p>
                        <p>{totalPrice}</p>
                    </div>
                    <div className='flex flex-row'>
                        <p>Shipping:</p>
                        <p>Free</p>
                    </div>
                    <div className='flex flex-row'>
                        <p>Total</p>
                        <p>{totalPrice}</p>
                    </div>
                </div>) 
                
                    : 
                
                (<>
                    <h1>No Items to show</h1>
                </>)
            }
        </div>
    )
}

export default CartView