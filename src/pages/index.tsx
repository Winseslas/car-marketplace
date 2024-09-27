import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer'

export default function IndexPage() {

  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('pages.indexPage.title')}</h1>
      <Footer />
    </div>
  )
}