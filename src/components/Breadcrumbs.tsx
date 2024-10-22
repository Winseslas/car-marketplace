import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    // Mapping des noms personnalisés
    const breadcrumbNameMap: { [key: string]: string } = {
        '': t('navigation.home'),
        'contact': t('navigation.contact'),
        'sign-in': t('navigation.signIn'),
        'sign-up': t('navigation.signUp'),
        'forgot-password': t('navigation.forgotPassword'),
        'profile': t('pages.profilePage.title'),
        'my-listing': t('pages.profilePage.myListing'),
        'favorites': t('pages.profilePage.favorites'),
        'settings': t('pages.profilePage.settings'),
        'billing': t('pages.profilePage.billing'),
        'create-car': t('pages.profilePage.createCar.title'),
        'dashboard': 'Dashboard',
        'invoices': 'Invoices',
    };

    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                    <Link to="/" className="inline-flex items-center text-sm font-medium text-black-700 hover:text-blue-600 dark:text-black-400 dark:hover:text-white">
                        {t('navigation.home')}
                    </Link>
                </li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const name = breadcrumbNameMap[value] || value;

                    return (
                        <li key={to} className="flex items-center">
                            <svg className="rtl:rotate-180 w-3 h-3 text-black-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                            {index < pathnames.length - 1 ? (
                                <Link to={to} className="text-sm font-medium text-black-700 hover:text-blue-600 dark:text-black-400 dark:hover:text-white">
                                    {name}
                                </Link>
                            ) : (
                                <span className="text-sm font-medium text-black-500 dark:text-black-400" style={{ fontWeight: 'bold' }}>{name}</span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;