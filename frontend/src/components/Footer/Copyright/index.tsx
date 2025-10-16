import { Link } from 'react-router-dom';
import css from './index.module.css';
import { PDFDocumentsPaths } from '../../../navigation';

export function Copyright() {
  return (
    <div className={css.container}>
      <div className={css.infos}>
        <span>© Online Store, 2019 — 2025</span>
        <span>John Doe Enterprises</span>
        <span>Tax ID: 123456789</span>
        <span>Registration No.: 9876543210</span>
      </div>
      <Link to={PDFDocumentsPaths.PRIVACY_POLICY}>Privacy Policy</Link>
    </div>
  );
}
