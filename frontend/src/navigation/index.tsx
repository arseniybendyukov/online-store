import { NamedLink } from "../types/common";

export const enum PDFDocumentsPaths {
  PRIVACY_POLICY = '/privacy_policy/',
  OFERTA = '/oferta/',
  DATA_PROCESSING = '/data_processing/',
}

export const enum NavPaths {
  MAIN = '/',
  AUTH = '/auth',
  PROFILE = '/profile',
  ABOUT = '/about',
  BLOG = '/blog',
  CART = '/cart',
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
  EMAIL_VERIFICATION = 'email-verification',
  EMAIL_RESEND = 'email-resend',
}

export const enum ProfileNestedPaths {
  ORDERS = 'orders',
  ORDER_DETAIL = 'order',
  SAVED = 'saved',
  REVIEWS = 'reviews',
  PERSONAL_INFO = 'personal-info',
}

export const enum OrdersNestedPaths {
  ACTIVE = 'active',
  NOT_ACTIVE = 'not-active',
}

export const headerLinks: NamedLink<NavPaths>[] = [
  {
    path: NavPaths.ABOUT,
    name: 'О нас',
  },
  // TODO: !!СКРЫТЫЙ БЛОГ!!
  // {
  //   path: NavPaths.BLOG,
  //   name: 'Блог',
  // },
  {
    path: NavPaths.CATALOG,
    name: 'Каталог',
  },
  {
    path: NavPaths.CONTACTS,
    name: 'Контакты',
  },
  {
    path: NavPaths.HOW_TO_BUY,
    name: 'Как купить',
  },
];

export const profileLinks: NamedLink[] = [
  {
    name: 'Заказы',
    path: `${ProfileNestedPaths.ORDERS}/${OrdersNestedPaths.ACTIVE}`,
  },
  {
    name: 'Сохраненное',
    path: ProfileNestedPaths.SAVED,
  },
  {
    name: 'Мои отзывы',
    path: ProfileNestedPaths.REVIEWS,
  },
  {
    name: 'Личные данные',
    path: ProfileNestedPaths.PERSONAL_INFO,
  },
];
