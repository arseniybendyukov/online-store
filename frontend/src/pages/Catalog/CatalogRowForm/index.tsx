import { ChangeEvent } from 'react';
import { useGetTagsQuery } from '../../../redux/apis/productsApi';
import { IconFormElement, SelectOption } from '../../../components/IconFormElement';
import { ReactComponent as Search } from '../../../images/search.svg';
import { ReactComponent as Filter } from '../../../images/filter.svg';
import { ReactComponent as Sort } from '../../../images/sort.svg';
import { ReactComponent as Tag } from '../../../images/tag.svg';
import css from './index.module.css';
import { SetState } from '../../../types/common';
import { CatalogOrdering } from '../../../types/filters';

const orderingOptions: SelectOption<CatalogOrdering>[] = [
  {
    label: 'По возрастанию цены',
    value: CatalogOrdering.PRICE_LOW_HIGH,
  },
  {
    label: 'По убыванию цены',
    value: CatalogOrdering.PRICE_HIGH_LOW,
  },
  {
    label: 'По возрастанию рейтинга',
    value: CatalogOrdering.RATING_LOW_HIGH,
  },
  {
    label: 'По убыванию рейтинга',
    value: CatalogOrdering.RATING_HIGH_LOW,
  },
];

interface Props {
  openFilters: () => void;
  search: string;
  setSearch: SetState<string>;
  ordering: CatalogOrdering;
  setOrdering: SetState<CatalogOrdering>;
  tag: number;
  setTag: SetState<number>;
}

export function CatalogRowForm({
  openFilters,
  search,
  setSearch,
  ordering,
  setOrdering,
  tag,
  setTag,
}: Props) {
  const isReversedOrdering = !ordering.startsWith('-');
  const { data: tags = [], isLoading } = useGetTagsQuery();
  
  const tagOptions: SelectOption[] = tags.map((tag) => ({
    label: tag.name,
    value: String(tag.id),
  }));

  tagOptions.unshift({
    label: 'Все',
    value: '0',
  });

  return (
    <form className={css.form} onSubmit={(e) => e.preventDefault()}>
      <IconFormElement
        as='input'
        className={css.search}
        icon={<Search className={css.svg} />}
        id='search'
        name='search'
        onChange={(e: ChangeEvent<HTMLInputElement>) => (
          setSearch(e.target.value)
        )}
        placeholder='Найти товар по названию'
        type='text'
        value={search}
      />

      <IconFormElement
        as='button'
        className={css.filter}
        icon={<Filter className={css.svg} />}
        onClick={openFilters}
        text='Фильтры'
      />

      <IconFormElement
        as='select'
        className={css.ordering}
        icon={<Sort className={`${css.svg} ${isReversedOrdering ? css.reversed : ''}`} />}
        id='ordering'
        name='ordering'
        options={orderingOptions}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => (
          setOrdering(e.target.value as CatalogOrdering)
        )}
        value={ordering}
      />

      <IconFormElement
        as='select'
        className={css.tag}
        icon={<Tag className={css.tagSVG} />}
        id='tag'
        name='tag'
        onChange={(e: ChangeEvent<HTMLSelectElement>) => (
          setTag(Number(e.target.value))
        )}
        options={
          isLoading
          ? [{ label: 'Загрузка...', value: '0' }]
          : tagOptions
        }
        value={tag}
      />
    </form>
  );
}
