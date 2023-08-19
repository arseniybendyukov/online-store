import { createBrowserRouter } from "react-router-dom";
import {
  AuthNestedPaths,
  NavPaths,
  OrdersNestedPaths,
  ProductDetailNestedPaths,
  ProfileNestedPaths,
} from ".";
import { App } from "../App";
import { Catalog } from "../pages/Catalog";
import { ProductDetail } from "../pages/ProductDetail";
import { ProductReviews } from "../pages/ProductDetail/Reviews";
import { SimilarProducts } from "../pages/ProductDetail/SimilarProducts";
import { BoughtTogetherProducts } from "../pages/ProductDetail/BoughtTogetherProducts";
import { Main } from "../pages/Main";
import { Auth } from "../pages/Auth";
import { Login } from "../pages/Auth/Login";
import { Registration } from "../pages/Auth/Registration";
import { Profile } from "../pages/Profile";
import { Orders } from "../pages/Profile/Orders";
import { Saved } from "../pages/Profile/Saved";
import { Cart } from "../pages/Profile/Cart";
import { PersonalInfo } from "../pages/Profile/PersonalInfo";
import { Reviews } from "../pages/Profile/Reviews";
import { Active } from "../pages/Profile/Orders/Active";
import { Completed } from "../pages/Profile/Orders/Completed";
import { OrderDetail } from "../pages/Profile/Orders/Detail";
import { Contacts } from "../pages/Contacts";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: NavPaths.AUTH,
        element: <Auth />,
        children: [
          {
            path: AuthNestedPaths.LOGIN,
            element: <Login />
          },
          {
            path: AuthNestedPaths.REGISTRATION,
            element: <Registration />
          },
        ],
      },
      {
        path: NavPaths.PROFILE,
        element: <Profile />,
        children: [
          {
            path: ProfileNestedPaths.CART,
            element: <Cart />,
          },
          {
            path: ProfileNestedPaths.SAVED,
            element: <Saved />,
          },
          {
            path: ProfileNestedPaths.REVIEWS,
            element: <Reviews />,
          },
          {
            path: ProfileNestedPaths.PERSONAL_INFO,
            element: <PersonalInfo />,
          },
          {
            path: `${ProfileNestedPaths.ORDER_DETAIL}/:id`,
            element: <OrderDetail />
          },
          {
            path: ProfileNestedPaths.ORDERS,
            element: <Orders />,
            children: [
              {
                path: OrdersNestedPaths.ACTIVE,
                element: <Active />,
              },
              {
                path: OrdersNestedPaths.COMPLETED,
                element: <Completed />,
              },
            ],
          },
        ],
      },
      {
        path: NavPaths.MAIN,
        element: <Main />
      },
      {
        path: NavPaths.ABOUT,
        element: 'about page',
      },
      {
        path: NavPaths.BLOG,
        element: 'blog page',
      },
      {
        path: NavPaths.CATALOG,
        element: <Catalog />,
      },
      {
        path: NavPaths.CONTACTS,
        element: <Contacts />,
      },
      {
        path: NavPaths.HOW_TO_BUY,
        element: 'how to buy page',
      },
      {
        path: `${NavPaths.PRODUCT_DETAIL}/:id`,
        element: <ProductDetail />,
        children: [
          {
            path: ProductDetailNestedPaths.BOUGHT_TOGETHER_PRODUCTS,
            element: <BoughtTogetherProducts />,
          },
          {
            path: ProductDetailNestedPaths.SIMILAR_PRODUCTS,
            element: <SimilarProducts />,
          },
          {
            path: ProductDetailNestedPaths.REVIEWS,
            element: <ProductReviews />,
          },
        ],
      },
    ],
  },
]);
