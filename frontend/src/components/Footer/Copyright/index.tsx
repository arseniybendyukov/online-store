import { Link } from 'react-router-dom';
import css from './index.module.css';
import { PDFDocumentsPaths } from '../../../navigation';

export function Copyright() {
  return (
    <div className={css.container}>
      <div className={css.infos}>
        <span>© Proff Clean Market, 2020 — 2024</span>
        <span>ИП КРАМЕР ТАТЬЯНА ПЕТРОВНА</span>
        <span>ИНН 540551812287</span>
        <span>ОГРНИП: 320547600093414</span>
      </div>
      <a href={PDFDocumentsPaths.PRIVACY_POLICY}>Политика конфиденциальности</a>
    </div>
  );
}
