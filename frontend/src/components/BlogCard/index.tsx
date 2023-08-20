import { Link } from 'react-router-dom';
import { BlogList } from '../../types/data';
import css from './index.module.css';
import { NavPaths } from '../../navigation';
import { Tag } from '../Tag';
import { monthAndDayFromDate } from '../../utils/data';

interface Props {
  blog: BlogList;
}

export function BlogCard({ blog }: Props) {
  return (
    <Link
      to={`${NavPaths.BLOG}/${blog.id}`}
      className={css.blog}
    >
      <div className={css.tags}>
        {blog.tags.map((tag) => <Tag key={tag.id} name={tag.name} color={tag.color} />)}
      </div>

      <img src={blog.image} alt='blog' />

      <div className={css.info}>
        <span className={css.date}>{monthAndDayFromDate(blog.created_at)}</span>
        <h4 className='h4'>{blog.heading}</h4>
        <p>{blog.description}</p>
      </div>
    </Link>
  );
}
