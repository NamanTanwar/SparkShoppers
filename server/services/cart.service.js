const Cart=require('../models/Cart')
const Product=require('../models/Product')
const mongoose=require('mongoose')
const User=require('../models/User')
const { getUserByEmail } = require('./user.service')


const addToCart=async (userId,productId)=>{
        console.log('Entered user cart service')
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

        await userCart.populate(
            {
                path: 'products._id',
                select: '_id name brand cost images ratingAndReviews productOptions'
            }
        )
        console.log('User cart is:',userCart)
        const productWithAlias=[]
        for(let i=0;i<userCart.products.length;i++){
            const product=userCart.products[i]
            productWithAlias.push({
                product: product._id,
                quantity: product.quantity
            })
        }
        console.log('products array is:',userCart.products)
        console.log('productWithAlias is:',productWithAlias)
        return productWithAlias
}

const removeFromCart=async (userId,productId,removeItem=false)=>{

    console.log('user id:',userId)
    console.log('productiD:',productId)
    console.log('removeItem:',removeItem)

    const userCart=await Cart.findOne({user: userId})

    console.log('User cart found:',userCart)

    if(!userCart){
       return {
            cart: false,
            message: "Cart for user does not exist"
          }
    }

    console.log(`User's cart:`,userCart)

    const result=userCart.products.find((product)=>product._id.toString()===productId.toString())

    console.log('Result of finding id inside userCart.products:',result)

    if(!result){
        return {
            cart: false,
            message: "Product does not exist in cart",
        }
    }

    if(result.quantity===1 || removeItem){
       console.log('Entered r.q===1 || removeItem') 
       await Cart.updateOne(
          {user: userId, "products._id": productId},
          {
              $pull: {
                  products: {
                      _id: productId,
                      //quantity: 1
                  }
              }
          }
        )
       const result=await Cart.findOne({ user: userId }).populate(
            {
                path: 'products._id',
                select: '_id name brand cost images ratingAndReviews productOptions'
            }
        )
        console.log('Cart result without alias:',result)
        //Successfull response
        let productsWithAlias=[]
        for(let i=0;i<result.products.length;i++){
            let product=result.products[i]
            productsWithAlias.push({
                product: product._id,
                quantity: product.quantity
            })
        }

        console.log('cart result with alias:',productsWithAlias)

        return {
          cart: productsWithAlias,
          message:"Item removed from cart"
        }

      }else{
            console.log('Entered else block i.e. quantity>1 & removeItem=false')
        //Decrement quantity of product
        await Cart.updateOne(
          {user: userId, "products._id": productId },
          {
              $inc: {"products.$.quantity": -1}
          }
        )
        const result=await Cart.findOne({ user: userId }).populate(
            {
                path: 'products._id',
                select: '_id name brand cost images ratingAndReviews productOptions'
            }
        )
        console.log('cart result without alias:',result)
         //Successfull response
         let productsWithAlias=[]
         for(let i=0;i<result.products.length;i++){
             let product=result.products[i]
             productsWithAlias.push({
                 product: product._id,
                 quantity: product.quantity
             })
         }
        //Succcessfull response
        console.log('products with alias:',productsWithAlias)
        return {
          cart:productsWithAlias,
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

const calculateTotal=async (userId)=>{

    let cartTotalPipeline=[
        {$match: {user: new mongoose.Types.ObjectId(userId)}},
        {
            $unwind: '$products'
        },
        {
            $lookup: {
                from: 'products',
                localField: 'products._id',
                foreignField: '_id',
                as: 'productDetails',
            }
        },
        {
            $unwind: '$productDetails'
        },
        {
            $group: {
                _id: '$user',
                totalPrice: {
                    $sum: {
                        $multiply: ['$products.quantity','$productDetails.cost']
                    }
                }
            }
        }
    ]

    const result=await Cart.aggregate(cartTotalPipeline)

    console.log('result in calculateTotal service is:',result)

    return result.length>0 ? result[0].totalPrice: 0

}

const getUserCart=async (userId)=>{
    
    const cart=await Cart.findOne({user: userId}).populate({
        path: 'products._id',
        select: '_id name brand price images ratingAndReviews productOptions'
    })
    const productWithAlias=cart.products.map(({_id,...product})=>(
        {product: _id,...product}
    ))

    return productWithAlias

}

module.exports={
    addToCart,
    removeFromCart,
    getAllItems,
    calculateTotal,
    getUserCart
}