import { Link, Outlet, useParams, useSearchParams } from "react-router-dom";
import { useGetProductDetailQuery, useToggleSavedMutation } from "../../redux/apis/productsApi";
import css from './index.module.css';
import { RatingStars } from "../../components/RatingStars";
import { ProductPrice } from "../../components/ProductPrice";
import { Label } from "../../components/Label";
import { RadioVariants } from "../../components/RadioVariants";
import { useEffect, useMemo, useState } from "react";
import { AmountInput } from "../../components/AmountInput";
import { ToggleCartButton } from "../../components/ToggleCartButton";
import { Button } from "../../components/Button";
import { Colors } from "../../types/common";
import { ReactComponent as Heart } from '../../images/heart.svg';
import { ProductDetailNestedPaths } from "../../navigation";
import { NavTabs } from "../../components/NavTabs";
import { SpinnerScreen } from "../../components/SpinnerScreen";
import { useAppSelector } from "../../redux/store";
import { toast } from "react-toastify";
import { getRootCategory } from "../../utils/data";
import { useSyncQueryParam } from "../../hooks";
import { NotInStock } from "../../components/NotInStock";
import { Description } from "../../components/Description";

export function ProductDetail() {
  const { id = '' } = useParams();
  const { data: product, isLoading } = useGetProductDetailQuery({ id });

  const [searchParams, setSearchParams] = useSearchParams();

  const user = useAppSelector((state) => state.userState.user);

  const [amount, setAmount] = useState(1);

  const queryParamVariant = useMemo(() => {
    const raw = searchParams.get('variant');
    return raw !== null
    ? Number(raw)
    : null
  }, [searchParams]);

  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(queryParamVariant);

  const selectedVariant = product?.variants.filter((variant) => variant.id === selectedVariantId)[0] || null;

  useEffect(() => {
    if (selectedVariant === null) {
      setSelectedVariantId(null);
    }
  }, [selectedVariant]);

  useEffect(() => {
    setSelectedVariantId(queryParamVariant);
  }, [queryParamVariant]);

  const [
    toggleSaved,
    { isLoading: isToggleSaveLoading},
  ] = useToggleSavedMutation();

  useEffect(() => {
    if (product && selectedVariantId === null) {
      setAmount(1);
      setSelectedVariantId(product.variants[0].id);
    }
  }, [product, selectedVariantId]);

  function onSaveButtonClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    if (selectedVariant) {
      if (user) {
        toggleSaved({ variantId: selectedVariant.id });
      } else {
        toast('Войдите, чтобы сохранять товары', { type: 'error' });
      }
    } else {
      toast('Ошибка: не выбран вариант товара', { type: 'error' });
    }
  }

  // Синхронизация состояния с query parameters
  useSyncQueryParam(
    [
      ['variant', selectedVariantId],
    ],
    setSearchParams,
  );

  return <>
    {
      isLoading
      ? <SpinnerScreen height={500} />
      : product && (
        <div className={`container ${css.container}`}>
          <div className={css.productDetails}>
            <ProductImage
              image={selectedVariant?.image}
              name={product.render_name}
              className={css.desktopImage}
            />

            <div className={css.main}>
              {!selectedVariant?.is_in_stock && <NotInStock />}
              <h1 className='h1'>{product.render_name}</h1>
              <div className={css.rowStats}>
                <RatingStars avgRating={product.avg_rating} />

                {product.avg_rating > 0 && (
                  <ReadReviews reviewsCount={product.reviews_count} />
                )}
              </div>

              <Description text={product.description} />

              <ProductImage
                image={selectedVariant?.image}
                name={product.render_name}
                className={css.mobileImage}
              />

              {selectedVariant && (
                <ProductPrice
                  large
                  actualPrice={selectedVariant.actual_price}
                  salePrice={selectedVariant.sale_price}
                  percentage={selectedVariant.percentage}
                />
              )}
              <div className={css.devider}></div>
              <Label label='Бренд'>{product.brand.name}</Label>
              {product.article && (
                <Label label='Артикул'>{product.article}</Label>
              )}
              {product.brand.manufacturer_country && (
                <Label label='Страна производитель'>
                  {product.brand.manufacturer_country.name}
                </Label>
              )}
              <Label label='Категория'>{getRootCategory(product.category)}</Label>
              {product.ph_level && (
                <Label label='Уровень pH'>{product.ph_level}</Label>
              )}
              <Label label='Вариант товара'>
                <RadioVariants
                  options={product.variants}
                  selectedVariantId={selectedVariantId}
                  setSelectedVariantId={setSelectedVariantId}
                />
              </Label>
              {selectedVariant?.is_in_stock && (
                <Label label='Количество'>
                  <AmountInput
                    amount={amount}
                    setAmount={setAmount}
                  />
                </Label>
              )}
              {selectedVariant && (
                <div className={css.buttons}>
                  <ToggleCartButton
                    cartItemId={selectedVariant.cart_item_id}
                    variantId={selectedVariant.id}
                    isInStock={selectedVariant.is_in_stock}
                    amount={amount}
                  />

                  <Button
                    onClick={onSaveButtonClick}
                    isActive={selectedVariant.is_saved}
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
              )}
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

interface ProductImageProps {
  image?: string,
  name: string,
  className?: string,
}

const ProductImage = ({ image, name, className }: ProductImageProps) => (
  <img
    className={`${css.image} ${className ? className : ''}`}
    src={image}
    alt={`product ${name}`}
  />
);


interface ReadReviewsProps {
  reviewsCount: number;
}

const ReadReviews = ({ reviewsCount }: ReadReviewsProps) => (
  <Link to='#' className={css.reviewsCount}>
    Читать {reviewsCount} отзывов
  </Link>
);
