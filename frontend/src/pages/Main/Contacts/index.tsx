import { Button } from '../../../components/Button';
import { SocialMedias } from '../../../components/SocialMedias';
import { NavPaths } from '../../../navigation';
import css from './index.module.css';
import { InfoRows } from '../../../components/InfoRows';
import { Map } from '../../../components/Map';

export function Contacts() {
  return (
    <section className={css.container}>
      <h2 className='h2'>Our Contacts</h2>
      <div className={css.main}>
        <div className={css.info}>
          <InfoRows className={css.infoRows} />

          <p className={css.paragraph}>You can contact us by leaving a message on our website or through our social media. Ask a question, and we’ll get back to you very soon!</p>

          <div className={css.buttons}>
            <Button
              path={NavPaths.CONTACTS}
              state={{ default: { text: 'Contact Us', icon: undefined } }}
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
