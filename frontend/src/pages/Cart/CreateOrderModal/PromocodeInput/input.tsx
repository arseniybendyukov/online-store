import { IconFormElement } from "../../../../components/IconFormElement";
import css from './index.module.css';
import { ReactComponent as PromocodeSVG } from '../../../../images/promocode.svg';
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "../../../../hooks";
import { useGetPromocodeQuery } from "../../../../redux/api";
import { SetState } from "../../../../types/common";
import { Promocode } from "../../../../types/data";

interface Props {
  setPromocode: SetState<Promocode | null>;
}

export function PromocodeInput({ setPromocode }: Props) {
  const [promocodeSlug, setPromocodeSlug] = useState('');
  const debouncedPromocodeSlug = useDebounce(promocodeSlug, 500);

  const { data, isLoading, isError, error } = useGetPromocodeQuery(debouncedPromocodeSlug);

  useEffect(() => {
    if (isError) {
      setPromocode(null);
    } else if (data) {
      setPromocode(data);
    }
  }, [data, isError, setPromocode]);

  return (
    <div>
      <IconFormElement
        as='input'
        className={css.search}
        icon={<PromocodeSVG className={css.svg} />}
        id='search'
        name='search'
        onChange={(e: ChangeEvent<HTMLInputElement>) => (
          setPromocodeSlug(e.target.value)
        )}
        placeholder='Use a promo code'
        type='text'
        value={promocodeSlug}
      />

      {!isLoading && error && 'status' in error && error.status === 404 && (
        <span className='error'>The promo code does not exist or is inactive</span>
      )}

      {!isLoading && !isError && data && (
        <span className='success'>A {data.percentage}% discount has been applied with the promo code!</span>
      )}
    </div>
  );
}
