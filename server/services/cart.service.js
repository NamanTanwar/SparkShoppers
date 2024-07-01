const Cart = require("../models/Cart");
const Product = require("../models/Product");
const mongoose = require("mongoose");
const User = require("../models/User");
const { getUserByEmail } = require("./user.service");

const addToCart = async (userId, productId, productOptions, quantity) => {
  const userCart = await Cart.findOne({ user: userId });

  if (!userCart) {
    return false;
  }

  const existingProduct = userCart.products.find(
    (product) => product._id.toString() === productId.toString()
  );

  //Item already in cart->increment quantity
  if (existingProduct) {
    const product = await Product.findById(productId);

    //Check for total quantity
    if (product.quantity < existingProduct.quantity + 1) {
      throw new Error("Item quantity limit reached");
    }

    //Increment quantity of product
    existingProduct.quantity += quantity;
  } else {
    //Item not already in cart->Add item to cart

    const newProduct = await Product.findById(productId);

    //Quantity check before adding to cart
    if (newProduct.quantity === 0) {
      throw new Error("Item out of stock");
    }
    //converting options in correct format
    const options = Object.keys(productOptions).map((key) => ({
      optionType: key,
      option: productOptions[key],
    }));

    //Adding product to cart
    userCart.products.push({
      _id: productId,
      quantity: quantity,
      options: options,
    });
  }

  await userCart.save();

  await userCart.populate({
    path: "products._id",
    select: "_id name brand cost images ratingAndReviews productOptions",
  });

  const productWithAlias = [];
  for (let i = 0; i < userCart.products.length; i++) {
    const product = userCart.products[i];
    productWithAlias.push({
      product: product._id,
      productQuantity: product.quantity,
    });
  }

  return productWithAlias;
};

const removeFromCart = async (userId, productId, removeItem = false) => {
  const userCart = await Cart.findOne({ user: userId });

  if (!userCart) {
    return {
      cart: false,
      message: "Cart for user does not exist",
    };
  }

  const result = userCart.products.find(
    (product) => product._id.toString() === productId.toString()
  );

  if (!result) {
    return {
      cart: false,
      message: "Product does not exist in cart",
    };
  }

  if (result.quantity === 1 || removeItem) {
    await Cart.updateOne(
      { user: userId, "products._id": productId },
      {
        $pull: {
          products: {
            _id: productId,
            //quantity: 1
          },
        },
      }
    );
    const result = await Cart.findOne({ user: userId }).populate({
      path: "products._id",
      select: "_id name brand cost images ratingAndReviews productOptions",
    });

    //Successfull response
    let productsWithAlias = [];
    for (let i = 0; i < result.products.length; i++) {
      let product = result.products[i];
      productsWithAlias.push({
        product: product._id,
        productQuantity: product.quantity,
      });
    }

    return {
      cart: productsWithAlias,
      message: "Item removed from cart",
    };
  } else {
    //Decrement quantity of product
    await Cart.updateOne(
      { user: userId, "products._id": productId },
      {
        $inc: { "products.$.quantity": -1 },
      }
    );
    const result = await Cart.findOne({ user: userId }).populate({
      path: "products._id",
      select: "_id name brand cost images ratingAndReviews productOptions",
    });

    //Successfull response
    let productsWithAlias = [];
    for (let i = 0; i < result.products.length; i++) {
      let product = result.products[i];
      productsWithAlias.push({
        product: product._id,
        productQuantity: product.quantity,
      });
    }
    //Succcessfull response

    return {
      cart: productsWithAlias,
      message: "quantity decreased",
    };
  }
};

const getAllItems = async (userId) => {
  //const userIdObject =new mongoose.Types.ObjectId(userId);

  const cart = await Cart.findOne({ user: userId }).populate("products._id");

  if (!cart) {
    throw new Error("User cart does not exist");
  }

  const cartItems = cart.products;

  return cartItems;
};

const calculateTotal = async (userId) => {
  let cartTotalPipeline = [
    { $match: { user: new mongoose.Types.ObjectId(userId) } },
    {
      $unwind: "$products",
    },
    {
      $lookup: {
        from: "products",
        localField: "products._id",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $unwind: "$productDetails",
    },
    {
      $group: {
        _id: "$user",
        totalPrice: {
          $sum: {
            $multiply: ["$products.quantity", "$productDetails.cost"],
          },
        },
      },
    },
  ];

  const result = await Cart.aggregate(cartTotalPipeline);

  return result.length > 0 ? result[0].totalPrice : 0;
};

const getUserCart = async (userId) => {
  //getiing user cart via userId
  const result = await Cart.findOne({ user: userId }).populate({
    path: "products._id",
    select: "_id name brand cost images ratingAndReviews productOptions",
  });

  let productsWithAlias = [];
  for (let i = 0; i < result.products.length; i++) {
    let product = result.products[i];
    productsWithAlias.push({
      product: product._id,
      productQuantity: product.quantity,
    });
  }

  return productsWithAlias;
};

module.exports = {
  addToCart,
  removeFromCart,
  getAllItems,
  calculateTotal,
  getUserCart,
};
