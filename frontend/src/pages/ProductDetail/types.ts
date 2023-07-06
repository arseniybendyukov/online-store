import { ListProduct, Review } from "../../types/data";

export type OutletContext = {
  boughtTogetherProducts: ListProduct[];
  silimarProducts: ListProduct[];
  reviews: {
    id: number;
    avgRating: number;
  };
};
