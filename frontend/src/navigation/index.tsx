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
  CART = 'cart',
  SAVED = 'saved',
  REVIEWS = 'reviews',
  PERSONAL_INFO = 'personal-info',
}
