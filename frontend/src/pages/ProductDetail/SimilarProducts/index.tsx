import { useOutletContext } from "react-router-dom";
import { ProductDetailOutletContext } from "../types";
import { Slider } from "../../../components/Slider";
import { ProductCard } from "../../../components/ProductCard";

export function SimilarProducts() {
  const { silimarProducts } = useOutletContext<ProductDetailOutletContext>();

  return (
    <Slider items={silimarProducts.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))} />
  );
}
