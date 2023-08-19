import { InfoRows } from '../../components/InfoRows';
import { SocialMedias } from '../../components/SocialMedias';
import { ContactsForm } from './ContactsForm';
import css from './index.module.css';

export function Contacts() {
  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <div className={css.polygon}></div>

        <div className={css.modal}>
          <div className={css.main}>
            <div className={css.left}>
              <div className={css.heading}>
                <h2 className='h2'>Свяжитесь с нами</h2>
                <p className={css.subheading}>
                  Отправьте сообщение, и мы ответим как можно скорее!
                </p>
              </div>
              <ContactsForm />
            </div>
            
            <div className={css.right}>
              <div className={css.map}>(карта)</div>
              <InfoRows />
            </div>
          </div>
          
          <div className={css.footer}>
            <h4 className='h4'>
              Задайте вопрос в наших социальных сетях
            </h4>
            <SocialMedias dark />
          </div>
        </div>
      </div>
    </div>
  );
}
