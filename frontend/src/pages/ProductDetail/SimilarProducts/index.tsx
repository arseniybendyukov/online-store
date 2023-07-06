import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../types";
import { ProductSlider } from "../../../components/ProductSlider";

export function SimilarProducts() {
  const { silimarProducts } = useOutletContext<OutletContext>();

  return (
    <ProductSlider products={silimarProducts} />
  );
}
