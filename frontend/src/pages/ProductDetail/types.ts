import { ListProduct, Review } from "../../types/data";

export type ProductDetailOutletContext = {
  boughtTogetherProducts: ListProduct[];
  silimarProducts: ListProduct[];
  reviews: {
    id: number;
    avgRating: number;
  };
};
