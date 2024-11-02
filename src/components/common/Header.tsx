import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { UserButton, useUser } from '@clerk/clerk-react';
import { LanguageContext } from './LanguageContext';
import { useContext, useState } from 'react';
import LanguageSelector from './LanguageSelector';


function Header() {
  const { t } = useTranslation();
  const { isSignedIn } = useUser();

  const languageContext = useContext(LanguageContext);
  const handleLanguageChange = languageContext?.changeLanguage ?? (() => { });

  // State to manage menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div>
      <nav className="bg-white border-b border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link aria-current="page" className="flex items-center space-x-3 rtl:space-x-reverse" to="/">
            <img src="/7932097.svg" alt={t('siteTitle')} className="h-8" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
          </Link>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {isSignedIn ? (
              <div className="flex items-center">
                <div className='mr-1 mt-2'>
                <UserButton />
                </div>
                <div className='hidden md:block mt-2 mr-1 xs:mr-1 ml-1'>
                  <LanguageSelector
                    formClassName="mt-0"
                    labelClassName="sr-only"
                    selectClassName="border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onLanguageChange={handleLanguageChange} />
                </div>
                <button type="button" className="mt-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{t('pages.indexPage.submitListing')}</button>
              </div>
            ) : (
              <>
                <div className='hidden md:block mt-1 mr-1 sm:mr-0 md:mr-1'>
                  <LanguageSelector
                    formClassName="mt-0"
                    labelClassName="sr-only"
                    selectClassName="border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onLanguageChange={handleLanguageChange} />
                </div>

                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{t('pages.indexPage.submitListing')}</button>
              </>
            )}

            <button onClick={toggleMenu} data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded={isMenuOpen}>
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>

          <div className={`items-center justify-between ${isMenuOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-cta">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link to="/" className={`block py-2 px-3 md:p-0 ${isActive('/') ? 'text-blue-700' : 'text-gray-900'} rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`} aria-current="page">{t('navigation.home')}</Link>
              </li>
              <li>
                <Link to="/search" className={`block py-2 px-3 md:p-0 ${isActive('/search') ? 'text-blue-700' : 'text-gray-900'} rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>{t('navigation.search')}</Link>
              </li>
              <li>
                <Link to="/new" className={`block py-2 px-3 md:p-0 ${isActive('/new') ? 'text-blue-700' : 'text-gray-900'} rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>{t('navigation.new')}</Link>
              </li>
              <li>
                <Link to="/preowned" className={`block py-2 px-3 md:p-0 ${isActive('/preowned') ? 'text-blue-700' : 'text-gray-900'} rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>{t('navigation.preowned')}</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header