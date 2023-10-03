import { Link, Outlet, useParams } from "react-router-dom";
import { useGetProductDetailQuery, useToggleSaved } from "../../redux/apis/productsApi";
import css from './index.module.css';
import { RatingStars } from "../../components/RatingStars";
import { ProductPrice } from "../../components/ProductPrice";
import { Label } from "../../components/Label";
import { RadioVariants } from "../../components/RadioVariants";
import { useEffect, useState } from "react";
import { Variant } from "../../types/data";
import { AmountInput } from "../../components/AmountInput";
import { AddToCartButton } from "../../components/AddToCartButton";
import { Button } from "../../components/Button";
import { Colors } from "../../types/common";
import { ReactComponent as Heart } from '../../images/heart.svg';
import { ProductDetailNestedPaths } from "../../navigation";
import { NavTabs } from "../../components/NavTabs";
import { SpinnerScreen } from "../../components/SpinnerScreen";
import { useAppSelector } from "../../redux/store";
import { toast } from "react-toastify";

export function ProductDetail() {
  const { id = '' } = useParams();
  const { data: product, isLoading } = useGetProductDetailQuery({ id });

  const user = useAppSelector((state) => state.userState.user);

  const {
    toggleSaved,
    isLoading: isToggleSaveLoading,
  } = useToggleSaved(product?.id || 0, product?.is_saved || false);

  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  function onSaveButtonClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (user) {
      toggleSaved();
    } else {
      toast('Войдите, чтобы сохранять товары', { type: 'error' });
    }
  }

  return <>
    {
      isLoading
      ? <SpinnerScreen height={500} />
      : product && (
        <div className={`container ${css.container}`}>
          <div className={css.productDetails}>
            <div className={css.slider}>
              <img src={product.image} alt={`product ${product.name}`} />
            </div>
            <div className={css.main}>
              <h1 className='h1'>{product.name}</h1>
              <div className={css.rowStats}>
                <RatingStars avgRating={product.avg_rating} />
                <ReadReviews reviewsCount={product.reviews_count} />
              </div>
              <div className={css.description}>{product.description}</div>
              {selectedVariant && (
                <ProductPrice
                  large
                  actualPrice={selectedVariant.price.actual_price}
                  salePrice={selectedVariant.price.sale_price}
                  percentage={selectedVariant.price.percentage}
                />
              )}
              <div className={css.devider}></div>
              <Label label='Бренд'>{product.brand.name}</Label>
              <Label label='Категория'>{product.subcategory.category.name}</Label>
              <Label label='Вариант товара'>
                <RadioVariants
                  options={product.variants}
                  selectedVariant={selectedVariant}
                  setSelectedVariant={setSelectedVariant}
                />
              </Label>
              <Label label='Количество'>
                <AmountInput
                  amount={amount}
                  setAmount={setAmount}
                />
              </Label>
              <div className={css.buttons}>
                <AddToCartButton
                  productId={product.id}
                  productVariantId={selectedVariant?.pk || 0}
                  isInCart={product.is_in_cart}
                  amount={amount}
                />

                <Button
                  onClick={onSaveButtonClick}
                  isActive={product.is_saved}
                  isLoading={isToggleSaveLoading}
                  color={Colors.RED}
                  state={{
                    default: {
                      text: 'В сохраненное',
                      icon: <Heart className={css.heartSVG} />,
                    },
                    active: {
                      text: 'Cохранено',
                      icon: <Heart className={`${css.heartSVG} ${css.active}`} />,
                    },
                  }}
                />
              </div>
            </div>
          </div>
          <NavTabs
            options={[
              {
                path: ProductDetailNestedPaths.BOUGHT_TOGETHER_PRODUCTS,
                name: `С этим товаром покупают (${product.bought_together_products.length})`,
              },
              {
                path: ProductDetailNestedPaths.SIMILAR_PRODUCTS,
                name: `Похожие товары (${product.silimar_products.length})`,
              },
              {
                path: ProductDetailNestedPaths.REVIEWS,
                name: `Отзывы (${product.reviews_count})`,
              },
            ]}
          />
          <Outlet
            context={{
              boughtTogetherProducts: product.bought_together_products,
              silimarProducts: product.silimar_products,
              reviews: {
                id: product.id,
                avgRating: product.avg_rating,
                variants: product.variants,
              },
            }}
          />
        </div>
      )
    }
  </>;
}

interface ReadReviewsProps {
  reviewsCount: number;
}

const ReadReviews = ({ reviewsCount }: ReadReviewsProps) => (
  <Link to='#' className={css.reviewsCount}>
    Читать {reviewsCount} отзывов
  </Link>
);
