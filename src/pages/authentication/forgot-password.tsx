/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react'
import { useAuth, useSignIn } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import Footer from '../../components/common/Footer';
import { AlertDestructive } from '../../components/modals/AlertDestructive';

const ForgotPasswordPage: React.FC = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [successfulCreation, setSuccessfulCreation] = useState(false);
    const [secondFactor, setSecondFactor] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { isSignedIn } = useAuth();
    const { isLoaded, signIn, setActive } = useSignIn();

    if (!isLoaded) {
        return null
    }

    // Si l'utilisateur est déjà connecté,
    // le rediriger vers la page d'accueil
    if (isSignedIn) {
        navigate('/')
    }

    // Envoyer le code de réinitialisation du mot de passe à l'e-mail de l'utilisateur
    async function create(e: React.FormEvent) {
        e.preventDefault()
        await signIn
            ?.create({
                strategy: 'reset_password_email_code',
                identifier: email,
            })
            .then((_) => {
                setSuccessfulCreation(true)
                setError('')
            })
            .catch((err) => {
                console.error('error', err.errors[0].longMessage)
                setError(err.errors[0].longMessage)
            })
    }

    // Réinitialiser le mot de passe de l'utilisateur.
    // Une fois la réinitialisation réussie, l'utilisateur sera
    // connecté et redirigé vers la page d'accueil
    async function reset(e: React.FormEvent) {
        e.preventDefault()
        await signIn
            ?.attemptFirstFactor({
                strategy: 'reset_password_email_code',
                code,
                password,
            })
            .then((result) => {
                // Vérifier si l'authentification à deux facteurs est requise
                if (result.status === 'needs_second_factor') {
                    setSecondFactor(true)
                    setError('')
                } else if (result.status === 'complete') {
                    // Définir la session active comme
                    // la session nouvellement créée (l'utilisateur est maintenant connecté)
                    setActive({ session: result.createdSessionId })
                    setError('')
                } else {
                    console.log(result)
                }
            })
            .catch((err) => {
                console.error('error', err.errors[0].longMessage)
                setError(err.errors[0].longMessage)
            })
    }

    return (
        <>
            <div className='w-full  max-w-md mx-auto p-6'>
                <div className='mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300' >
                    <div className='p-4 sm:p-7'>
                        <div className="text-center">
                            <header>
                                <center>
                                    <figure className="mb-3 relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
                                        <img
                                            className="rounded-lg"
                                            src="/7932097.svg"
                                            width={40}
                                            height={40}
                                            alt="Winseslas"
                                        />
                                    </figure>
                                </center>
                            </header>
                            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">{t('pages.forgotPasswordPage.title')}</h1>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                {t('pages.forgotPasswordPage.rememberPassword')}
                                <Link className="text-blue-600 decoration-2 hover:underline font-medium" to="/sign-in/">
                                    {t('pages.forgotPasswordPage.loginHere')}
                                </Link>
                            </p>
                        </div>

                        <div className="mt-5">
                            <form onSubmit={!successfulCreation ? create : reset}>
                                <div className="grid gap-y-4">
                                    {!successfulCreation && (<>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-bold ml-1 mb-2 dark:text-white">{t('pages.forgotPasswordPage.emailAddress')}</label>
                                            <div className="relative">
                                                <input type="email"
                                                    id="email"
                                                    name="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder={t('pages.forgotPasswordPage.emailPlaceholder')}
                                                    className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" required aria-describedby="email-error" />
                                            </div>
                                            <p className="hidden text-xs text-red-600 mt-2" id="email-error">
                                                {t('pages.forgotPasswordPage.emailError')}
                                            </p>
                                        </div>
                                        <button type="submit"
                                            className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                        >
                                            {t('pages.forgotPasswordPage.resetPassword')}
                                        </button>
                                        {error && <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                                            <AlertDestructive message={error} />
                                        </div>}
                                    </>)}

                                    {successfulCreation && (<>
                                        <div>
                                            <label htmlFor="code" className="block text-sm font-bold ml-1 mb-2 dark:text-white">
                                                {t('pages.forgotPasswordPage.enterResetCode')}
                                            </label>
                                            <div className="relative">
                                                <input type="code"
                                                    id="code"
                                                    name="code"
                                                    placeholder={t('pages.forgotPasswordPage.codePlaceholder')}
                                                    value={code}
                                                    onChange={(e) => setCode(e.target.value)}
                                                    className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" required aria-describedby="email-error" />
                                            </div>
                                            <p className="hidden text-xs text-red-600 mt-2" id="email-error">{t('pages.forgotPasswordPage.emailError')}</p>
                                        </div>

                                        <button type="submit"
                                            className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                        >
                                            {t('pages.forgotPasswordPage.resetPasswordButton')}
                                        </button>
                                        {error && <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                                            {/* <span className="font-medium">{error}</span> */}
                                            <AlertDestructive message={error} />
                                        </div>}
                                    </>)}
                                </div>
                            </form>
                            {secondFactor && <p>{t('pages.forgotPasswordPage.twoFactorRequired')}</p>}
                        </div>
                    </div>
                </div>

                <p className="mt-3 flex justify-center items-center text-center divide-x divide-gray-300 dark:divide-gray-700">
                    <Link className="pr-3.5 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200"
                        to="https://github.com/"
                        title={t('socialLinks.github')}
                        target="_blank">
                        <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                        </svg>
                        {t('pages.forgotPasswordPage.viewGithub')}
                    </Link>
                    <Link className="pl-3 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200" to="/company_contact_us">
                        {t('components.footer.company_contact_us')}
                    </Link>
                </p>
            </div>
            <div className='w-full flex justify-center'>
                <Footer />
            </div>
        </>
    )
}

export default ForgotPasswordPage