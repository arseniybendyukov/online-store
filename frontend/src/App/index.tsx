import { Header } from '../components/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer';
import css from './index.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from '../components/ScrollToTop';

export const App = () => <>
  <ScrollToTop />

  <div className={css.app}>
    <Header />

    <main className={css.main}>
      <Outlet />
    </main>
    
    <Footer />

    <ToastContainer
      theme='colored'
      position='bottom-center'
      autoClose={5000}
      hideProgressBar
    />
  </div>
</>;
