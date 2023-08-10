import { useOutletContext } from "react-router-dom";
import { ProductDetailOutletContext } from "../types";
import { ProductSlider } from "../../../components/ProductSlider";
import { ProductCard } from "../../../components/ProductCard";

export function BoughtTogetherProducts() {
  const { boughtTogetherProducts } = useOutletContext<ProductDetailOutletContext>();

  return (
    <ProductSlider items={boughtTogetherProducts.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))} />
  );
}
