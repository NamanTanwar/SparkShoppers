const BASE_URL=process.env.REACT_APP_BASE_URL

export const categoryEndpoints={
    GET_SUPER_CATEGORIES_API: `${BASE_URL}/category/getSuperCategories`,
}

export const authEndpoints={
    SEND_OTP_API: `${BASE_URL}/auth/send-otp`,
    SIGNUP_API: `${BASE_URL}/auth/signup`,
    LOGIN_API: `${BASE_URL}/auth/login`,
    LOGOUT_API: `${BASE_URL}/auth/logout`
}

export const productEndpoints={
    CREATE_PRODUCT_API: `${BASE_URL}/product/create-product`,
    SEARCH_PRODUCT_API: `${BASE_URL}/product/search-product`,
    GET_PRODUCT_DATA_API: `${BASE_URL}/product/get-product`
}

export const cartEndpoints={
    GET_CART_API: `${BASE_URL}/cart/get-cart`,
    ADD_TO_CART_API: `${BASE_URL}/cart/add-to-cart`,
    REMOVE_CART_ITEM_API: `${BASE_URL}/cart/remove-from-cart`,
    CALCULATE_CART_TOTAL: `${BASE_URL}/cart/calculate-total`
}

export const wishlistEndpoints={
    REMOVE_WISHLIST_ITEM_API: `${BASE_URL}/wishlist/delete-from-wishlist`,
    ADD_WISHLIST_ITEM_API: `${BASE_URL}/wishlist/add-to-wishlist`,
}

export const paymentEndpoints={
    CAPTURE_PAYMENT_API: `${BASE_URL}/payment/capturePayment`,
    VERIFY_PAYMENT_API: `${BASE_URL}/payment/verify-payment`
}