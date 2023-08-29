import { useGetBlogsQuery } from '../../redux/apis/blogApi';
import { BlogCard } from '../../components/BlogCard';
import css from './index.module.css';
import { SpinnerScreen } from '../../components/SpinnerScreen';

export function Blog() {
  const { data, isLoading } = useGetBlogsQuery();

  return (
    <div className={`container ${css.container}`}>
      <h1 className='h1'>Блог</h1>

      {
        isLoading
        ? <SpinnerScreen height={500} />
        : data && (
          <div className={css.blogs}>
            {data.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
          </div>
        )
      }
    </div>
  );
}
