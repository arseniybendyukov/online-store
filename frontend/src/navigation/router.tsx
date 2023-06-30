import { createBrowserRouter } from "react-router-dom";
import { NavPaths, ProductDetailNestedPaths, paramPath } from ".";
import { App } from "../App";
import { Catalog } from "../pages/Catalog";
import { ProductDetail } from "../pages/ProductDetail";
import { Reviews } from "../pages/ProductDetail/Reviews";
import { SimilarProducts } from "../pages/ProductDetail/SimilarProducts";
import { BoughtTogetherProducts } from "../pages/ProductDetail/BoughtTogetherProducts";

export const router = createBrowserRouter([
  {
    path: NavPaths.MAIN,
    element: <App />,
    children: [
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
        element: 'contacts page',
      },
      {
        path: NavPaths.HOW_TO_BUY,
        element: 'how to buy page',
      },
      {
        path: NavPaths.LOGIN,
        element: 'login page',
      },
      {
        path: paramPath(NavPaths.PRODUCT_DETAIL, ':id'),
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
            element: <Reviews />,
          },
        ],
      },
    ],
  },
]);
