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
    SEARCH_PRODUCT_API: `${BASE_URL}/product/search-product`
}

export const cartEndpoints={
    GET_CART_API: `${BASE_URL}/cart/get-cart`
}
