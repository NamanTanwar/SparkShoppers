import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { addItemToCart,removeItemFromCart } from '../../../slices/cartSlice'
import { addItemToCartService } from '../../../services/operations/cartAPI'
import { removeFromCartService } from '../../../services/operations/cartAPI'

const CartTable=({cartItems})=>{

    const dispatch=useDispatch()
    const {isLoggedIn,accessToken}=useSelector((state)=>state.auth)
    const {totalPrice}=useSelector((state)=>state.cart)

    const handleAddToCart=(item)=>{
            if(!isLoggedIn){
                dispatch(addItemToCart(item))
            }
            else{
                dispatch(addItemToCartService(item.product._id,accessToken.token))
            }
    }

    const handleRemoveFromCart=(item)=>{
        if(!isLoggedIn){
            dispatch(removeItemFromCart(item))
        }
        else{
            dispatch(removeFromCartService(item.product._id,accessToken.token,false))
        }
           
    }


    if(cartItems.length===0){
        return (
            <div>
                <h1>No items added to cart</h1>
            </div>
        )
    }

    return (
        <>
        <table className='table-auto'>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
               {

                cartItems && cartItems.length>0 && cartItems.map((item,idx)=>(
                    <tr key={item.product._id}>
                        <td>
                        {item.product.images && item.product.images.length > 0 && (
                            <img src={item.product.images[0]} alt={item.product.name} className='h-11'/>
                        )}
                            <p>{item.product.name}</p>
                        </td>
                        <td>
                            Rs.{item.product.cost}
                        </td>
                        <td>
                            <p>{item.quantity}</p>
                            <div className='flex flex-col'>
                                <button onClick={()=>handleAddToCart(item)}>+</button>
                                <button onClick={()=>handleRemoveFromCart(item)}>-</button>
                            </div>
                        </td>
                        <td>
                            Rs.{item.quantity*item.product.cost}
                        </td>
                    </tr>
                ))
               }
            </tbody>
        </table>
        <div className='flex flex-row'>
                <button>Return To Browse Products</button>
                <button>Update Cart</button>
        </div>
        <div className='flex flex-col'>
            <h2>Cart Total</h2>
            <div className='flex flex-row'>
               <p>Subtotal:</p>
               <p>Rs.{totalPrice}</p>
            </div>
            <div className="flex flex-row">
               <p>Shipping:</p>
               <p>Free</p>
            </div>
            <div className='flex flex-row'>
               <p>Total:</p>
               <p>Rs.{totalPrice}</p>
            </div>
            <div>
                <button>Proceed to checkout</button>
            </div>
        </div>
    </>
    )

}

export default CartTable