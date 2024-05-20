import { createSlice } from "@reduxjs/toolkit"; 

const initialState={
    cartItems: [],
    totalPrice: 0,
    isLoading: false,
    error: null,
}

const calculateTotalPrice = (cartItem,state,add=true) => {
    const productCost='product' in cartItem ? cartItem.product.cost : cartItem.cost
    const productQuantity='quantity' in cartItem ? cartItem.quantity : 1
    return add ? state.totalPrice+productCost : state.totalPrice-productCost
};

export const cartSlice=createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setLoading:(state,action)=>{
            state.isLoading=action.payload
        },
        setCart:(state,action)=>{
            state.cartItems = action.payload
        },
        setError:(state,action)=>{
            state.error=action.payload
        },

        addItemToCart:(state,action)=>{
        console.log('Entered addItemTacART')
        console.log('action.payload is:',action.payload)
        const product=action.payload
        console.log('Product in add item to cart:',product)
        const productId= 'product' in product ?  product.product._id : product._id
        console.log('productId is:',product._id)
        //When product enters for the first time
        if(!('quantity' in product)){
            console.log('Entered in !quantity in product block')
            const updatedCartTotal=calculateTotalPrice(product,state,true)
            return {
                ...state,
                cartItems: [...state.cartItems,{product:product,quantity: 1}],
                totalPrice: updatedCartTotal
            }
        }
        const existingItem=state.cartItems.find(item=>item.product._id===productId)
        console.log('Existing product value:',Boolean(existingItem))
        if(existingItem){
            console.log('Entered existingItem block')
            let updatedCartItems=state.cartItems.map((item)=>{
                console.log('Item inside cartItem is:',item)
                if(item.product._id===productId){
                    console.log('Entered block where productId matches inside the map')
                    return {...item,quantity:item.quantity+1}
                }
                else{
                    console.log('Entered the block where productId does not matches')
                    return item
                }
            })
            console.log('Updated cartItems:',updatedCartItems)
            const updatedCartTotal=calculateTotalPrice(product,state,true)

            console.log('Updated cart items are:',updatedCartItems)
            console.log('Updated Total Price is:',updatedCartTotal)

            return {
                ...state,
                cartItems:  updatedCartItems,
                totalPrice: updatedCartTotal
            }
        }
        else{
            const updatedCartTotal=calculateTotalPrice(product,state,true)
            return {
                ...state,
                cartItems: [...state.cartItems,{product:product,quantity: 1}],
                totalPrice: updatedCartTotal
            }
        }

        },

        removeItemFromCart:(state,action)=>{
            const product=action.payload
            const productId=product.product._id

            let updatedCartItems=[]
            let updatedCartTotal
            for(let i=0;i<state.cartItems.length;i++){
                
                if(state.cartItems[i].product._id===productId){
                    updatedCartTotal=calculateTotalPrice(state.cartItems[i],state,false)
                    if(state.cartItems[i].quantity>1){
                        updatedCartItems.push({
                            product:state.cartItems[i].product,
                            quantity:state.cartItems[i].quantity-1
                        })
                        
               }
                continue
            }
            updatedCartItems.push(state.cartItems[i])
        }

        console.log('Update cart items:',updatedCartItems)
        console.log('Updated total cartPrice',updatedCartTotal)

        return {
            ...state,
            cartItems: updatedCartItems,
            totalPrice: updatedCartTotal
        }


    },
        setTotalPrice:(state,action)=>{
            state.totalPrice=action.payload
        },
        clearCart: ()=>{
            return initialState
        },
    }
})

export const {setLoading,setCart,setError,addItemToCart,removeItemFromCart,setTotalPrice,clearCart}=cartSlice.actions
export default  cartSlice.reducer

