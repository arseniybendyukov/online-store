import { useParams } from 'react-router-dom';
import { useGetBlogDetailQuery } from '../../redux/apis/blogApi';
import css from './index.module.css';
import { Tag } from '../../components/Tag';
import { monthAndDayFromDate } from '../../utils/data';
import { SpinnerScreen } from '../../components/SpinnerScreen';

export function BlogDetail() {
  const { id = '' } = useParams();
  const { data: blog, isLoading } = useGetBlogDetailQuery({ id });

  return  <>
    {
      isLoading
      ? <SpinnerScreen height={500} />
      : blog && (
        <div className={css.wrapper}>
          <div className={`container ${css.container}`}>
            <div className={css.info}>
              <div className={css.tags}>
                {blog.tags.map((tag) => <Tag key={tag.id} name={tag.name} color={tag.color} />)}
              </div>

              <span className={css.date}>{monthAndDayFromDate(blog.created_at)}</span>
            </div>

            <h1 className='h1'>{blog.heading}</h1>

            <img src={blog.image} alt='blog' />

            <p>{blog.description}</p>

            <div className={css.separator}></div>

            <p className={css.content}>{blog.text}</p>
          </div>
        </div>
      )
    }
  </>;
}
