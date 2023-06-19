import { useEffect, useState, ChangeEvent } from 'react';
import { useDebounce } from '../../../hooks';
import { useGetTagsQuery } from '../../../redux/productsApi';
import { IconField, SelectOption } from '../../../components/IconField';
import { ReactComponent as Search } from '../../../images/search.svg';
import { ReactComponent as Filter } from '../../../images/filter.svg';
import { ReactComponent as Tag } from '../../../images/tag.svg';
import css from './index.module.css';

const enum Order {
  PRICE_LOW_HIGH = 'price-low-high',
  PRICE_HIGH_LOW = 'price-high-low',
  RATING_LOW_HIGH = 'rating-low-high',
  RATING_HIGH_LOW = 'rating-high-low',
}

const orderOptions: SelectOption<Order>[] = [
  {
    label: 'По возрастанию цены',
    value: Order.PRICE_LOW_HIGH,
  },
  {
    label: 'По убыванию цены',
    value: Order.PRICE_HIGH_LOW,
  },
  {
    label: 'По возрастанию рейтинга',
    value: Order.RATING_LOW_HIGH,
  },
  {
    label: 'По убыванию рейтинга',
    value: Order.RATING_HIGH_LOW,
  },
];

export function CatalogRowForm() {
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState(Order.PRICE_LOW_HIGH);
  const [tag, setTag] = useState<number | undefined>(undefined);
  
  const debouncedSearch = useDebounce(search, 750);

  const { data: tags = [], isLoading } = useGetTagsQuery();
  const tagOptions: SelectOption[] = isLoading
    ? [{ label: 'Загрузка тегов...', value: 'None' }]
    : tags.map((tag) => ({
      label: tag.name,
      value: String(tag.id),
    }));

  useEffect(() => {
    console.log(debouncedSearch);
  }, [debouncedSearch]);

  useEffect(() => {
    console.log(order);
  }, [order]);

  useEffect(() => {
    console.log(tag);
  }, [tag]);

  return (
    <form className={css.form}>
      <IconField
        as='input'
        icon={<Search className={css.svg} />}
        className={css.search}
        id='search'
        name='search'
        type='text'
        placeholder='Найти товар по названию'
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) => (
          setSearch(e.target.value)
        )}
      />
      <IconField
        icon={<Filter className={css.svg} />}
        as='select'
        id='order'
        name='order'
        options={orderOptions}
        value={order}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => (
          setOrder(e.target.value as Order)
        )}
      />
      <IconField
        icon={<Tag className={css.tagSVG} />}
        as='select'
        id='tag'
        name='tag'
        options={tagOptions}
        value={tag}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => (
          setTag(Number(e.target.value))
        )}
      />
    </form>
  );
}
