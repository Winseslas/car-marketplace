/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer'

export default function IndexPage() {

  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('pages.indexPage.title')}</h1>
      {/* <h1>This is the index page</h1> */}
      {/*
      <div>
        <ul>
          <li>
            <Link to="/sign-up">Sign Up</Link>
          </li>
          <li>
            <Link to="/sign-in">Sign In</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </div> */}

      <Footer></Footer>
    </div>
  )
}