import { ReactNode } from "react";
import { ADDRESS, PHONE_NUMBER, EMAIL } from '../../consts/data';
import { ReactComponent as Location } from '../../images/location.svg';
import { ReactComponent as Phone } from '../../images/phone.svg';
import { ReactComponent as Envelope } from '../../images/envelope.svg';
import css from './index.module.css';

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

export const InfoRows = () => (
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
);
