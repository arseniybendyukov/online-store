import { Link } from 'react-router-dom';
import css from './index.module.css';
import { PDFDocumentsPaths } from '../../../navigation';

export function Copyright() {
  return (
    <div className={css.container}>
      <span>© Proff Clean Market, 2020 — 2024</span>
      <a href={PDFDocumentsPaths.PRIVACY_POLICY}>Политика конфиденциальности</a>
    </div>
  );
}
