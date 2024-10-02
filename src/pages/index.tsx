import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer'
import Header from '../components/Header';

export default function IndexPage() {

  const { t } = useTranslation();
  
  return (
    <div>
      <Header />
      <h1>{t('pages.indexPage.title')}</h1>
      <Footer />
    </div>
  )
}