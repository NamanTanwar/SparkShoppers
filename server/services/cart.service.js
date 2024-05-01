const Cart=require('../models/Cart')
const Product=require('../models/Product')
const mongoose=require('mongoose')


const addToCart=async (userId,productId)=>{

    
    
        const userCart=await Cart.findOne({user:userId})

        if(!userCart){
            return false;
        }

        console.log("User cart:",userCart)

       const existingProduct=userCart.products.find(
            (product)=>product._id.toString()===productId.toString()
        )

        //Item already in cart->increment quantity 
        if(existingProduct){

            const product=await Product.findById(productId)

            //Check for total quantity
            if(product.quantity<existingProduct.quantity+1){
                throw new Error('Item quantity limit reached')
            }

            //Increment quantity of product
            existingProduct.quantity+=1


        }else{//Item not already in cart->Add item to cart
             
            const newProduct=await Product.findById(productId)

            //Quantity check before adding to cart
            if(newProduct.quantity===0){
                throw new Error("Item out of stock")
            }

            //Adding product to cart
            userCart.products.push({
                _id: productId,
                quantity: 1
            })

        }

        await userCart.save()

        return userCart;

}

const removeFromCart=async (userId,productId)=>{

    const userCart=await Cart.findOne({user: userId})

    if(!userCart){
       return {
            cart: false,
            message: "Cart for user does not exist"
          }
    }

    console.log(`User's cart:`,userCart)

    const result=userCart.products.find((product)=>product._id.toString()===productId.toString())

    if(!result){
        return {
            cart: false,
            message: "Product does not exist in cart",
        }
    }

    if(result.quantity===1){
        const result=await Cart.updateOne(
          {user: userId, "products._id": productId},
          {
              $pull: {
                  products: {
                      _id: productId,
                      quantity: 1
                  }
              }
          }
        )
        //Successfull response
        return {
          cart: result,
          message:"Item removed from cart"
        }

      }else{
      
        //Decrement quantity of product
        const result=await Cart.updateOne(
          {user: userId, "products._id": productId },
          {
              $inc: {"products.$.quantity": -1}
          }
        )
        //Succcessfull response
        return {
          cart:result,
          message:"quantity decreased",
      }
      }

}
 
const getAllItems=async (userId)=>{

    console.log("printing userId here:",userId)

    console.log('Printing type of userId here:',userId)

    //const userIdObject =new mongoose.Types.ObjectId(userId);
    
    const cart=await Cart.findOne({user: userId}).populate('products._id')

    console.log('User cart is:',cart)

    if(!cart){
        throw new Error('User cart does not exist')
    }

    const cartItems=cart.products

    return cartItems;

}

module.exports={
    addToCart,
    removeFromCart,
    getAllItems,
}