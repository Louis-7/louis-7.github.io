import { Outlet } from 'react-router-dom';
import Header from '../../sections/Header';
import Footer from '../../sections/Footer';

import './Root.css';

export function Root() {
  return (
    <>
      <Header />
      <div className="body-container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
