import { useParams } from 'react-router-dom';
import { useGetBlogDetailQuery } from '../../redux/apis/blogApi';
import css from './index.module.css';

export function BlogDetail() {
  const { id = '' } = useParams();
  const { data: blog, isLoading } = useGetBlogDetailQuery({ id });

  console.log(blog);

  return (
    <div>Blog detail</div>
  );
}
