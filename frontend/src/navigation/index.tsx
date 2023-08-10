export const enum NavPaths {
  MAIN = '/',
  AUTH = '/auth',
  PROFILE = '/profile',
  ABOUT = '/about',
  BLOG = '/blog',
  CATALOG = '/catalog',
  CONTACTS = '/contacts',
  HOW_TO_BUY = '/how-to-buy',
  PRODUCT_DETAIL = '/product'
}

export const enum ProductDetailNestedPaths {
  REVIEWS = 'reviews',
  SIMILAR_PRODUCTS = 'silimar-products',
  BOUGHT_TOGETHER_PRODUCTS = 'bought-together-products',
}

export const enum AuthNestedPaths {
  LOGIN = 'login',
  REGISTRATION = 'registration',
}

export const enum ProfileNestedPaths {
  ORDERS = 'orders',
  ORDER_DETAIL = 'order/:id',
  CART = 'cart',
  SAVED = 'saved',
  REVIEWS = 'reviews',
  PERSONAL_INFO = 'personal-info',
}

export const enum OrdersNestedPaths {
  ACTIVE = 'active',
  COMPLETED = 'completed',
}
