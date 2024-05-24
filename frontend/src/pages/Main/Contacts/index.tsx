import { Button } from '../../../components/Button';
import { SocialMedias } from '../../../components/SocialMedias';
import { NavPaths } from '../../../navigation';
import css from './index.module.css';
import { InfoRows } from '../../../components/InfoRows';
import { Map } from '../../../components/Map';

export function Contacts() {
  return (
    <section className={css.container}>
      <h2 className='h2'>Контакты</h2>
      <div className={css.main}>
        <div className={css.info}>
          <InfoRows className={css.infoRows} />

          <p className={css.paragraph}>Вы можете связаться с нами, оставив сообщение на сайте или в наших соцсетях. Задайте вопрос, и мы очень скоро вам ответим!</p>

          <div className={css.buttons}>
            <Button
              path={NavPaths.CONTACTS}
              state={{ default: { text: 'Связаться с нами', icon: undefined } }}
              isBig
            />

            <SocialMedias dark />
          </div>
        </div>
        
        <Map />
      </div>
    </section>
  );
}
