import { Header } from '../components/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer';
import css from './index.module.css';

export const App = () => (
  <div className={css.app}>
    <Header />
    <main className={css.main}>
      <Outlet />
    </main>
    <Footer />
  </div>
);
