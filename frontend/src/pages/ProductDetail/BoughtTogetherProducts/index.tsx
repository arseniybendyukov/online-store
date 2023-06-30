import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../types";
import { ProductSlider } from "../../../components/ProductSlider";

export function BoughtTogetherProducts() {
  const { boughtTogetherProducts } = useOutletContext<OutletContext>();

  return (
    <ProductSlider products={boughtTogetherProducts} />
  );
}
