import { InfoRows } from '../../components/InfoRows';
import { Map } from '../../components/Map';
import { SocialMedias } from '../../components/SocialMedias';
import { ContactsForm } from './ContactsForm';
import css from './index.module.css';

export function Contacts() {
  return (
    <div className={css.wrapper}>
      <div className={`container ${css.container}`}>
        <div className={css.polygon}></div>

        <div className={css.modal}>
          <div className={css.main}>
            <div className={css.left}>
              <div className={css.heading}>
                <h2 className='h2'>Contact Us</h2>
                <p className={css.subheading}>
                  Send a message, and we’ll get back to you as soon as possible!
                </p>
              </div>
              <ContactsForm />
            </div>
            
            <div className={css.right}>
              <Map className={css.map} />
              <InfoRows />
            </div>
          </div>
          
          <div className={css.footer}>
            <h4 className='h4'>
              Ask a question on our social media pages
            </h4>
            <SocialMedias dark />
          </div>
        </div>
      </div>
    </div>
  );
}
