import { Navigate, createBrowserRouter } from 'react-router-dom';
import {
  AuthNestedPaths,
  NavPaths,
  OrdersNestedPaths,
  ProductDetailNestedPaths,
  ProfileNestedPaths,
} from '.';
import { App } from '../App';
import { Catalog } from '../pages/Catalog';
import { ProductDetail } from '../pages/ProductDetail';
import { ProductReviews } from '../pages/ProductDetail/Reviews';
import { SimilarProducts } from '../pages/ProductDetail/SimilarProducts';
import { BoughtTogetherProducts } from '../pages/ProductDetail/BoughtTogetherProducts';
import { Main } from '../pages/Main';
import { Auth } from '../pages/Auth';
import { Login } from '../pages/Auth/Login';
import { Registration } from '../pages/Auth/Registration';
import { EmailVerification } from '../pages/Auth/EmailVerification';
import { Profile } from '../pages/Profile';
import { Orders } from '../pages/Profile/Orders';
import { Saved } from '../pages/Profile/Saved';
import { Cart } from '../pages/Cart';
import { PersonalInfo } from '../pages/Profile/PersonalInfo';
import { Reviews } from '../pages/Profile/Reviews';
import { Active } from '../pages/Profile/Orders/Active';
import { NotActive } from '../pages/Profile/Orders/NotActive';
import { OrderDetail } from '../pages/Profile/Orders/Detail';
import { Contacts } from '../pages/Contacts';
import { Blog } from '../pages/Blog';
import { BlogDetail } from '../pages/BlogDetail';
import { EmailResend } from '../pages/Auth/EmailResend';

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
            index: true,
            element: <Navigate to={AuthNestedPaths.LOGIN} />
          },
          {
            path: AuthNestedPaths.LOGIN,
            element: <Login />
          },
          {
            path: AuthNestedPaths.REGISTRATION,
            element: <Registration />
          },
          {
            path: AuthNestedPaths.EMAIL_VERIFICATION,
            element: <EmailVerification />,
          },
          {
            path: AuthNestedPaths.EMAIL_RESEND,
            element: <EmailResend />,
          },
        ],
      },
      {
        path: NavPaths.PROFILE,
        element: <Profile />,
        children: [
          {
            index: true,
            element: <Navigate to={ProfileNestedPaths.PERSONAL_INFO} />
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
                index: true,
                element: <Navigate to={OrdersNestedPaths.ACTIVE} />
              },
              {
                path: OrdersNestedPaths.ACTIVE,
                element: <Active />,
              },
              {
                path: OrdersNestedPaths.NOT_ACTIVE,
                element: <NotActive />,
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
        element: <Blog />,
      },
      {
        path: `${NavPaths.BLOG}/:id`,
        element: <BlogDetail />,
      },
      {
        path: NavPaths.CART,
        element: <Cart />,
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
