import { Button } from '../../../components/Button';
import { SocialMedias } from '../../../components/SocialMedias';
import {
  ADDRESS,
  PHONE_NUMBER,
  EMAIL,
} from '../../../consts';
import { NavPaths } from '../../../navigation';
import { ReactComponent as Location } from '../../../images/location.svg';
import { ReactComponent as Phone } from '../../../images/phone.svg';
import { ReactComponent as Envelope } from '../../../images/envelope.svg';
import css from './index.module.css';
import { ReactNode } from 'react';
import { Colors } from '../../../types/common';

interface Props {}

export function Contacts({}: Props) {
  return (
    <section className={css.container}>
      <h2 className='h2'>Контакты</h2>
      <div className={css.main}>
        <div className={css.info}>
          <Rows
            rows={[
              {
                icon: <Location width={20} heigth={20} />,
                text: ADDRESS,
              },
              {
                icon: <Phone width={16} heigth={16} />,
                text: PHONE_NUMBER,
              },
              {
                icon: <Envelope width={17} heigth={17} />,
                text: EMAIL,
              },
            ]}
          />
          <p className={css.paragraph}>Вы можете связаться с нами, оставив сообщение на сайте или в наших соцсетях. Задайте вопрос, и мы очень скоро вам ответим!</p>
          <div className={css.buttons}>
            <Button
              path={NavPaths.CONTACTS}
              state={{ default: { text: 'Связаться с нами', icon: undefined } }}
            />
            <SocialMedias dark />
          </div>
        </div>
        <div className={css.map}>(карта)</div>
      </div>
    </section>
  );
}

interface Row {
  icon: ReactNode;
  text: string;
}

interface RowsProps {
  rows: Row[];
}

const Rows = ({ rows }: RowsProps) => (
  <div className={css.rows}>
    {rows.map((row) => (
      <div key={row.text} className={css.row}>
        <div className={css.rowIcon}>{row.icon}</div>
        <span className={css.rowText}>{row.text}</span>
      </div>
    ))}
  </div>
);
