import { ChangeEvent } from 'react';
import { useGetTagsQuery } from '../../../redux/api';
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
    label: 'Price: Low to High',
    value: CatalogOrdering.PRICE_LOW_HIGH,
  },
  {
    label: 'Price: High to Low',
    value: CatalogOrdering.PRICE_HIGH_LOW,
  },
  {
    label: 'Rating: Low to High',
    value: CatalogOrdering.RATING_LOW_HIGH,
  },
  {
    label: 'Rating: High to Low',
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
    label: 'All',
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
        placeholder='Search product by name'
        type='text'
        value={search}
      />

      <IconFormElement
        as='button'
        className={css.filter}
        icon={<Filter className={css.svg} />}
        onClick={openFilters}
        text='Filters'
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
          ? [{ label: 'Loading...', value: '0' }]
          : tagOptions
        }
        value={tag}
      />
    </form>
  );
}
