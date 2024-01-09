import { useOutletContext } from "react-router-dom";
import { ProductDetailOutletContext } from "../types";
import { Slider } from "../../../components/Slider";
import { ProductCard } from "../../../components/ProductCard";

export function SimilarProducts() {
  const { silimarProducts } = useOutletContext<ProductDetailOutletContext>();

  return (
    silimarProducts.length > 0
      ? (
      <Slider
        breakpoints={{
          0: { slidesPerView: 1 },
          510: { slidesPerView: 2 },
          890: { slidesPerView: 3 },
          1170: { slidesPerView: 4 },
        }}
        items={silimarProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      />
    ) : (
      <div className='empty' style={{ minHeight: 300 }}>
        Нет таких товаров
      </div>
    )
  );
}
