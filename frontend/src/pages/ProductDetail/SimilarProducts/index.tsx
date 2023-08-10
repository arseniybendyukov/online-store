import { useOutletContext } from "react-router-dom";
import { ProductDetailOutletContext } from "../types";
import { ProductSlider } from "../../../components/ProductSlider";
import { ProductCard } from "../../../components/ProductCard";

export function SimilarProducts() {
  const { silimarProducts } = useOutletContext<ProductDetailOutletContext>();

  return (
    <ProductSlider items={silimarProducts.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))} />
  );
}
