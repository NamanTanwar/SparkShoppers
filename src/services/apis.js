const BASE_URL = process.env.REACT_APP_BASE_URL;

export const categoryEndpoints = {
  GET_SUPER_CATEGORIES_API: `${BASE_URL}/category/getSuperCategories`,
  GET_SUPER_CATEGORIES_PAGE_DATA_API: `${BASE_URL}/category/getSuperCategoryPageData`,
  GET_SUPER_CATEGORIES_CATEGORY_DATA_API: `${BASE_URL}/category/getSuperCategoryCategoryData`,
  GET_SUPER_CATEGORIES_BRAND_DATA_API: `${BASE_URL}/category`,
};

export const authEndpoints = {
  SEND_OTP_API: `${BASE_URL}/auth/send-otp`,
  SIGNUP_API: `${BASE_URL}/auth/signup`,
  LOGIN_API: `${BASE_URL}/auth/login`,
  LOGOUT_API: `${BASE_URL}/auth/logout`,
  RESET_PASSWORD_API: `${BASE_URL}/auth/reset-password`,
  GET_GOOGLE_AUTH_INFO_API: `${BASE_URL}/auth/google-auth-info`,
  RESEND_OTP_TO_USER_API: `${BASE_URL}/auth/resend-otp-to-user`,
  GET_TEST_LOGIN_CREDENTIALS: `${BASE_URL}/auth/get-test-credentials`,
};

export const productEndpoints = {
  CREATE_PRODUCT_API: `${BASE_URL}/product/create-product`,
  SEARCH_PRODUCT_API: `${BASE_URL}/product/search-product`,
  GET_PRODUCT_DATA_API: `${BASE_URL}/product/get-product`,
  GET_NEW_PRODUCTS_DATA_API: `${BASE_URL}/product/get-new-product`,
  GET_BROWSE_USER_PAGE_DATA_API: `${BASE_URL}/product/browse-user-page-data`,
};

export const cartEndpoints = {
  GET_CART_API: `${BASE_URL}/cart/get-cart`,
  ADD_TO_CART_API: `${BASE_URL}/cart/add-to-cart`,
  REMOVE_CART_ITEM_API: `${BASE_URL}/cart/remove-from-cart`,
  CALCULATE_CART_TOTAL: `${BASE_URL}/cart/calculate-total`,
};

export const wishlistEndpoints = {
  REMOVE_WISHLIST_ITEM_API: `${BASE_URL}/wishlist/delete-from-wishlist`,
  ADD_WISHLIST_ITEM_API: `${BASE_URL}/wishlist/add-to-wishlist`,
};

export const paymentEndpoints = {
  CAPTURE_PAYMENT_API: `${BASE_URL}/payment/capturePayment`,
  VERIFY_PAYMENT_API: `${BASE_URL}/payment/verify-payment`,
  GET_ORDER_DETAILS: `${BASE_URL}/payment/get-order-details`,
};

export const userEndpoints = {
  GET_USER_ORDER_HISTORY: `${BASE_URL}/user/get-order-history`,
  ADD_USER_RATING_AND_REVIEW_API: `${BASE_URL}/user/add-rating-and-review`,
  GET_USER_RATING_AND_REVIEW_API: `${BASE_URL}/user/get-rating-and-review`,
  SUBMIT_CONTACT_US_FORM: `${BASE_URL}/user/contact-us-form`,
  SEND_FORGOT_PASSWORD_EMAIL: `${BASE_URL}/user/forgot-user-email`,
};

export const adminEndpoints = {
  GET_ADMIN_PAGE_DATA: `${BASE_URL}/admin/get-admin-data`,
};
