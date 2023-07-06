import { ChangeEvent } from 'react';
import { useGetTagsQuery } from '../../../redux/productsApi';
import { IconField, SelectOption } from '../../../components/IconField';
import { ReactComponent as Search } from '../../../images/search.svg';
import { ReactComponent as Filter } from '../../../images/filter.svg';
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
  search: string;
  setSearch: SetState<string>;
  ordering: CatalogOrdering;
  setOrdering: SetState<CatalogOrdering>;
  tag: number;
  setTag: SetState<number>;
}

export function CatalogRowForm({
  search,
  setSearch,
  ordering,
  setOrdering,
  tag,
  setTag,
}: Props) {
  const { data: tags = [] } = useGetTagsQuery();
  
  const tagOptions: SelectOption[] = tags.map((tag) => ({
    label: tag.name,
    value: String(tag.id),
  }));

  tagOptions.unshift({
    label: 'Все теги',
    value: '0',
  });

  return (
    <form className={css.form} onSubmit={(e) => e.preventDefault()}>
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
        id='ordering'
        name='ordering'
        options={orderingOptions}
        value={ordering}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => (
          setOrdering(e.target.value as CatalogOrdering)
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
