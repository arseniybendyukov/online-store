import { ReactNode } from "react";
import { ADDRESS, EMAIL } from '../../consts/data';
import { ReactComponent as Location } from '../../images/location.svg';
import { ReactComponent as Phone } from '../../images/phone.svg';
import { ReactComponent as Envelope } from '../../images/envelope.svg';
import css from './index.module.css';
import { PhoneLink } from "../PhoneLink";
import { useActivateEmailMutation } from "../../redux/api";

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
        icon: <Location width={25} heigth={25} />,
        text: ADDRESS,
      },
      {
        icon: <Phone width={20} heigth={20} />,
        text: <PhoneLink />,
      },
      {
        icon: <Envelope width={20} heigth={20} />,
        text: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>,
      },
    ]}
  />
);
