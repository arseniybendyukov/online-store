import { Variant } from "../../types/data";
import { ListProduct } from "../../types/data";

export type ProductDetailOutletContext = {
  boughtTogetherProducts: ListProduct[];
  silimarProducts: ListProduct[];
  reviews: {
    id: number;
    avgRating: number;
    variants: Variant[];
  };
};
