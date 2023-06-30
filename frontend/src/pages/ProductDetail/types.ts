import { ListProduct, Review } from "../../types/data";

export type OutletContext = {
  boughtTogetherProducts: ListProduct[];
  silimarProducts: ListProduct[];
  reviews: {
    reviews: Review[];
    avgRating: number;
  };
};
