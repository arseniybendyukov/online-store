import { useGetBlogTagsQuery, useGetBlogsQuery } from '../../redux/apis/blogApi';
import { BlogCard } from '../../components/BlogCard';
import css from './index.module.css';
import { SpinnerScreen } from '../../components/SpinnerScreen';
import { IconField, SelectOption } from '../../components/IconField';
import { ReactComponent as Tag } from '../../images/tag.svg';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSyncQueryParam } from '../../hooks';

export function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParamTag = useMemo(() => Number(searchParams.get('tag') || '0'), [searchParams]);
  const [tag, setTag] = useState<number>(queryParamTag);
  useSyncQueryParam([['tag', tag]], setSearchParams);
  useEffect(() => {
    setTag(queryParamTag);
  }, [queryParamTag]);

  const {
    data: tags = [],
    isLoading: isTagsLoading,
  } = useGetBlogTagsQuery();
  
  const tagOptions: SelectOption[] = tags.map((tag) => ({
    label: tag.name,
    value: String(tag.id),
  }));

  tagOptions.unshift({
    label: 'Все',
    value: '0',
  });

  const {
    data: blogs,
    isLoading: isBlogsLoading,
  } = useGetBlogsQuery({ tag });

  return (
    <div className={`container ${css.container}`}>
      <div className={css.header}>
        <h1 className='h1'>Блог</h1>

        <IconField
          icon={<Tag className={css.tagSVG} />}
          as='select'
          id='tag'
          name='tag'
          value={tag}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => (
            setTag(Number(e.target.value))
          )}
          options={
            isTagsLoading
            ? [{ label: 'Загрузка...', value: '0' }]
            : tagOptions
          }
        />
      </div>

      {
        isBlogsLoading
        ? <SpinnerScreen height={500} />
        : blogs && <>
          {
            blogs.length
            ? (
              <div className={css.blogs}>
                {blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
              </div>
            )
            : (
              <div className='empty' style={{ height: 500 }}>
                Нет постов в блоге
              </div>
            )
          }
        </>
      }
    </div>
  );
}
