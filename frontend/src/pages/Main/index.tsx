import { Banner } from './Banner';
import { Hits } from './Hits';
import { Brands } from './Brands';
import { Contacts } from './Contacts';
import css from './index.module.css';

export function Main() {
  return (
    <div className={`container ${css.container}`}>
      <Banner />
      <Hits />
      <Brands />
      {/* BlogPosts */}
      {/* Reviews */}
      <Contacts />
    </div>
  );
}
