import { useGetBlogsQuery } from '../../redux/apis/blogApi';
import { BlogCard } from '../../components/BlogCard';
import css from './index.module.css';

export function Blog() {
  const { data, isLoading } = useGetBlogsQuery();

  console.log(data);

  return (
    <div className={`container ${css.container}`}>
      <h1 className='h1'>Блог</h1>

      <div className={css.blogs}>
        {isLoading ? 'Загрузка...' : (
          data?.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        )}
      </div>
    </div>
  );
}
