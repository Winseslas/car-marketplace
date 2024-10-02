/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { UserButton, useUser } from '@clerk/clerk-react';
import { LanguageContext } from './LanguageContext';
import { useContext } from 'react';
import LanguageSelector from './LanguageSelector';


function Header() {
  const { t } = useTranslation();
  const { user, isSignedIn } = useUser();

  const languageContext = useContext(LanguageContext);

  
  const handleLanguageChange = languageContext?.changeLanguage ?? (() => { });

  return (
    <div>
      <header
        className="inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 rounded-3xl lg:max-w-screen-lg mb-5">
        <div className="px-4">
          <div className="flex items-center justify-between">
            <div className="flex shrink-0">
              <Link aria-current="page" className="flex items-center" to="/">
                <img className="h-7 w-auto" src="/7932097.svg" alt={t('siteTitle')} />
                <p className="sr-only">
                  {t('siteTitle')}
                </p>
              </Link>
            </div>
            <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
              <Link aria-current="page"
                className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                to='/'>{t('navigation.home')}</Link>
              <Link className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                to='/'>{t('navigation.search')}</Link>
              <Link className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                to='/'>{t('navigation.new')}</Link>
              <Link className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                to='/'>{t('navigation.preowned')}</Link>
            </div>

            <div className="flex items-center justify-end gap-3">

              {isSignedIn ? (
                <div className="flex items-center">
                  <UserButton />
                  <Link to='/' className="ml-3 inline-flex items-center justify-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" >&nbsp;{t('pages.indexPage.submitListing')}</Link>
                </div>
              ) : (
                <Link to='/' className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" >&nbsp;{t('pages.indexPage.submitListing')}</Link>
              )}

              {/* <Link className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
                to="/">{t('navigation.signIn')}</Link> */}

              {/* <Link className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                to="/">{t('navigation.login')}</Link> */}

            <LanguageSelector
              formClassName="mt-0"
              labelClassName="sr-only"
              selectClassName="border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onLanguageChange={handleLanguageChange} />
            </div>

          </div>
        </div>
      </header>
    </div>
  )
}

export default Header