import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useTranslation } from 'react-i18next';

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="inline-block p-8">
            <div className="text-[200px] leading-none font-black text-gray-800 font-sans" style={{ fontFeatureSettings: '"ss04" 1' }}>
              404
            </div>
          </div>
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
            {t('pages.notFoundPage.title', 'Page non trouvée')}
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            {t('pages.notFoundPage.message', 'Désolé, nous n\'avons pas trouvé la page que vous cherchez.')}
          </p>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border-2 text-base font-semibold rounded-md shadow-sm transition-colors duration-200 bg-white text-black border-black hover:bg-orange-600 hover:border-transparent hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600"
            >
              {t('pages.notFoundPage.backToHome', 'Retour à l\'accueil')}
            </Link>
          </div>
        </div>
      </main>

      <div className='w-full flex justify-center mt-auto'>
        <Footer />
      </div>
    </div>
  );
}