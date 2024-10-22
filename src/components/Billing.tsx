import { useTranslation } from "react-i18next";
import GreenCheckIcon from "./GreenCheckIcon";
import RedCloseIcon from "./RedCloseIcon";

export default function Billing() {
    const { t } = useTranslation();

    return (
        <div>
            <div className="bg-white p-4 text-surface dark:bg-neutral-700 dark:text-white dark:shadow-black/30 rounded-xl shadow"
                style={{ backgroundColor: '#e6edf7' }}>
                <div className="overflow-hidden">
                    <div className="md:w-full text-start text-sm font-light text-surface dark:text-white">
                        <div className="bg-transparent" id="pricing">
                            <div className="mx-auto pb-20 mt-4 max-w-7xl px-6 lg:px-8">
                                <div className="mx-auto max-w-4xl text-center">
                                    <h1 className="text-base font-semibold leading-8 text-black">
                                        {t('pages.profilePage.billingSection.title')}
                                    </h1>
                                    <p className="mt-2 text-4xl font-bold tracking-tight text-black sm:text-5xl">
                                        {t('pages.profilePage.billingSection.subtitle')}
                                    </p>
                                </div>
                                <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-black-300">
                                    {t('pages.profilePage.billingSection.description')}
                                </p>
                                <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                                    <div className="bg-white ring-1 ring-white/10 rounded-3xl p-8 xl:p-10">
                                        <div className="flex items-center justify-between gap-x-4">
                                            <h2 id="product1" className="text-lg font-semibold leading-8 text-black">
                                                {t('pages.profilePage.billingSection.packageEconomy.title')}
                                            </h2>
                                        </div>
                                        <p className="mt-4 text-sm leading-6 text-black-300">
                                            {t('pages.profilePage.billingSection.packageEconomy.description')}
                                        </p>
                                        <p className="mt-6 flex items-baseline gap-x-1">
                                            <span className="text-4xl font-bold tracking-tight text-black">
                                                {t('pages.profilePage.billingSection.packageEconomy.price')}
                                            </span>
                                            <span className="text-sm font-semibold leading-6 text-black-300"></span>
                                        </p>
                                        <a href="/order"
                                            aria-describedby="product1"
                                            className="bg-black/10 text-black hover:bg-black/20 focus-visible:outline-white mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                            {t('pages.profilePage.billingSection.packageEconomy.priceButton')}
                                        </a>
                                        <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-black-300 xl:mt-10">
                                            <li className="flex gap-x-3">
                                                <GreenCheckIcon />{t('pages.profilePage.billingSection.packageEconomy.features.0')}
                                            </li>
                                            <li className="flex gap-x-3">
                                                <GreenCheckIcon />{t('pages.profilePage.billingSection.packageEconomy.features.1')}
                                            </li>
                                            <li className="flex gap-x-3">
                                                <RedCloseIcon />{t('pages.profilePage.billingSection.packageEconomy.features.2')}
                                            </li>
                                            <li className="flex gap-x-3">
                                                <RedCloseIcon />{t('pages.profilePage.billingSection.packageEconomy.features.3')}
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="bg-white ring-2 ring-[#e6edf7] rounded-3xl p-8 xl:p-10">
                                        <div className="flex items-baseline justify-between gap-x-4">
                                            <h2 id="product2" className="text-lg font-semibold leading-8 text-black">
                                                {t('pages.profilePage.billingSection.packageStandard.title')}
                                            </h2>
                                            <p className="rounded-full bg-indigo-500 px-2.5 py-1 text-xs font-semibold leading-5 text-white">
                                                {t('pages.profilePage.billingSection.mostPopular')}
                                            </p>
                                        </div>
                                        <p className="mt-4 text-sm leading-6 text-black-300">
                                            {t('pages.profilePage.billingSection.packageStandard.description')}
                                        </p>
                                        <p className="mt-6 flex items-baseline gap-x-1">
                                            <span className="text-4xl font-bold tracking-tight text-black">
                                                {t('pages.profilePage.billingSection.packageStandard.price')}
                                            </span>
                                            <span className="text-sm font-semibold leading-6 text-black-300"></span>
                                        </p>
                                        <a href="/order" aria-describedby="product2"
                                            className="bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500 mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                            {t('pages.profilePage.billingSection.packageStandard.priceButton')}
                                        </a>
                                        <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-black-300 xl:mt-10">
                                            <li className="flex gap-x-3">
                                                <GreenCheckIcon />{t('pages.profilePage.billingSection.packageStandard.features.0')}
                                            </li>
                                            <li className="flex gap-x-3">
                                                <GreenCheckIcon />{t('pages.profilePage.billingSection.packageStandard.features.1')}
                                            </li>
                                            <li className="flex gap-x-3">
                                                <GreenCheckIcon />{t('pages.profilePage.billingSection.packageStandard.features.2')}
                                            </li>
                                            <li className="flex gap-x-3">
                                                <RedCloseIcon />{t('pages.profilePage.billingSection.packageStandard.features.3')}
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="ring-1 bg-white ring-[#e6edf7] rounded-3xl p-8 xl:p-10">
                                        <div className="flex items-center justify-between gap-x-4">
                                            <h2 id="product3" className="text-lg font-semibold leading-8 text-black">
                                                {t('pages.profilePage.billingSection.packagePremium.title')}
                                            </h2>
                                        </div>
                                        <p className="mt-4 text-sm leading-6 text-black-300">
                                            {t('pages.profilePage.billingSection.packagePremium.description')}
                                        </p>
                                        <p className="mt-6 flex items-baseline gap-x-1">
                                            <span className="text-4xl font-bold tracking-tight text-black">
                                                {t('pages.profilePage.billingSection.packagePremium.price')}
                                            </span><span className="text-sm font-semibold leading-6 text-black-300"></span>
                                        </p>
                                        <a href="/order" aria-describedby="product3"
                                            className="bg-black/10 text-black hover:bg-black/20 focus-visible:outline-white mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                            {t('pages.profilePage.billingSection.packagePremium.priceButton')}
                                        </a>
                                        <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-black-300 xl:mt-10">
                                            <li className="flex gap-x-3">
                                                <GreenCheckIcon />{t('pages.profilePage.billingSection.packagePremium.features.0')}
                                            </li>
                                            <li className="flex gap-x-3">
                                                <GreenCheckIcon />{t('pages.profilePage.billingSection.packagePremium.features.1')}
                                            </li>
                                            <li className="flex gap-x-3">
                                                <GreenCheckIcon />{t('pages.profilePage.billingSection.packagePremium.features.2')}
                                            </li>
                                            <li className="flex gap-x-3">
                                                <GreenCheckIcon />{t('pages.profilePage.billingSection.packagePremium.features.3')}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
