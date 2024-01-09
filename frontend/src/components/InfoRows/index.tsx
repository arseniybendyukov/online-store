import { ReactNode } from "react";
import { ADDRESS, EMAIL } from '../../consts/data';
import { ReactComponent as Location } from '../../images/location.svg';
import { ReactComponent as Phone } from '../../images/phone.svg';
import { ReactComponent as Envelope } from '../../images/envelope.svg';
import css from './index.module.css';
import { PhoneLink } from "../PhoneLink";

interface Row {
  icon: ReactNode;
  text: ReactNode;
}

interface RowsProps {
  rows: Row[];
  className?: string;
}

const Rows = ({ rows, className }: RowsProps) => (
  <div className={`${css.rows} ${className ? className : ''}`}>
    {rows.map((row, index) => (
      <div key={index} className={css.row}>
        <div className={css.rowIcon}>{row.icon}</div>
        <span className={css.rowText}>{row.text}</span>
      </div>
    ))}
  </div>
);

interface InfoRowsProps {
  className?: string;
}

export const InfoRows = ({ className }: InfoRowsProps) => (
  <Rows
    className={className}
    rows={[
      {
        icon: <Location width={20} heigth={20} />,
        text: ADDRESS,
      },
      {
        icon: <Phone width={16} heigth={16} />,
        text: <PhoneLink />,
      },
      {
        icon: <Envelope width={17} heigth={17} />,
        text: EMAIL,
      },
    ]}
  />
);
