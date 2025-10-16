import { useGetBlogTagsQuery, useGetBlogsQuery } from '../../redux/api';
import { BlogCard } from '../../components/BlogCard';
import css from './index.module.css';
import { SpinnerScreen } from '../../components/SpinnerScreen';
import { IconFormElement, SelectOption } from '../../components/IconFormElement';
import { ReactComponent as Tag } from '../../images/tag.svg';
import { ChangeEvent } from 'react';
import { useSearchParamsState } from '../../hooks';

export function Blog() {
  const [tag, setTag] = useSearchParamsState('tag', (searchParams) => searchParams.get('tag') ?? '0');

  const {
    data: tags = [],
    isLoading: isTagsLoading,
  } = useGetBlogTagsQuery();
  
  const tagOptions: SelectOption[] = tags.map((tag) => ({
    label: tag.name,
    value: String(tag.id),
  }));

  tagOptions.unshift({
    label: 'All',
    value: '0',
  });

  const {
    data: blogs,
    isLoading: isBlogsLoading,
  } = useGetBlogsQuery({ tag: Number(tag) });

  return (
    <div className={`container ${css.container}`}>
      <div className={css.header}>
        <h1 className='h1'>Blog</h1>

        <IconFormElement
          icon={<Tag className={css.tagSVG} />}
          as='select'
          id='tag'
          name='tag'
          value={tag}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => (
            setTag(e.target.value)
          )}
          options={
            isTagsLoading
            ? [{ label: 'Loading...', value: '0' }]
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
                No posts yet
              </div>
            )
          }
        </>
      }
    </div>
  );
}
