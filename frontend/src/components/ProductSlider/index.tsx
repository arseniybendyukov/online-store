import { ListProduct } from '../../types/data';
import { ProductCard } from '../ProductCard';
import { Slider } from '../Slider';

interface Props {
  products: ListProduct[];
}

export const ProductSlider = ({ products }: Props) => <>
  {
    products.length > 0
    ? (
    <Slider
      breakpoints={{
        0: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
        510: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        890: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
        1170: {
          slidesPerView: 4,
          slidesPerGroup: 4,
        },
      }}
      items={products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    />
    ) : (
    <div className='empty' style={{ minHeight: 300 }}>
      No such products
    </div>
    )
  }
</>;
