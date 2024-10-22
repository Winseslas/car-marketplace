import { useTranslation } from 'react-i18next';

export default function InfoSection() {
    const { t } = useTranslation();

    return (
        <div>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <div className="max-w-3xl">
                    <h2 className="text-3xl font-bold sm:text-4xl">
                        {t("components.infoSection.title")}
                    </h2>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                    <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full">
                        <img
                            alt={t("components.infoSection.image.altText")}
                            title={t("components.infoSection.image.altText")}
                            src="https://imgd.aeplcdn.com/664x374/n/cw/ec/153319/2023-range-rover-velar-exterior-right-side-view.jpeg?isig=0&q=80"
                            className="inset-0 h-full w-full object-cover rounded-4xl"
                            width={'100%'}
                            height={250}
                        />
                    </div>

                    <div className="lg:py-16">
                        <article className="space-y-4 text-gray-600">
                            <figure className="max-w-screen-md mx-auto text-center">
                                <svg className="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                                    <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                                </svg>
                                <blockquote>
                                    <p className="text-2xl italic font-medium text-gray-900 dark:text-white">
                                        "{t("components.infoSection.content.paragraph1")}
                                        <br />
                                        {t("components.infoSection.content.paragraph2")}"
                                    </p>
                                </blockquote>
                            </figure>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    )
}
