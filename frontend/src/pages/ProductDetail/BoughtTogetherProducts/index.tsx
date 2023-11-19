import { useOutletContext } from "react-router-dom";
import { ProductDetailOutletContext } from "../types";
import { Slider } from "../../../components/Slider";
import { ProductCard } from "../../../components/ProductCard";

export function BoughtTogetherProducts() {
  const { boughtTogetherProducts } = useOutletContext<ProductDetailOutletContext>();

  return (
    boughtTogetherProducts.length > 0
      ? (
      <Slider items={boughtTogetherProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))} />
    ) : (
      <div className='empty' style={{ minHeight: 300 }}>
        Нет таких товаров
      </div>
    )
  );
}
