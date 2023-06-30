export const enum NavPaths {
  MAIN = '/',
  ABOUT = '/about',
  BLOG = '/blog',
  CATALOG = '/catalog',
  CONTACTS = '/contacts',
  HOW_TO_BUY = '/how-to-buy',
  LOGIN = '/login',
  PRODUCT_DETAIL = '/product'
}

export const enum ProductDetailNestedPaths {
  REVIEWS = 'reviews',
  SIMILAR_PRODUCTS = 'silimar-products',
  BOUGHT_TOGETHER_PRODUCTS = 'bought-together-products',
}

export const paramPath = (path: NavPaths, param: string | number) => (
  `${path}/${param}`
);
