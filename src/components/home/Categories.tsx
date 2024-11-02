import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { readAllCategoriesToJson, Category } from '../../data/datas';

// Constantes de style
const iconButtonStyles = "inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-0 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none";

function Categories() {
    const { t } = useTranslation();
    const [categories, setCategories] = useState<Category[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const itemsPerPage = 8; 

    useEffect(() => {
        const fetchCategories = async () => {
            if (categories.length === 0) {
                const data = await readAllCategoriesToJson();
                const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
                setCategories(sortedData);
            }
        };

        fetchCategories();
    }, [categories]);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setActiveIndex((prevIndex) => (prevIndex + 1) % categories.length);
    //     }, 2000); 
    //     return () => clearInterval(interval); 
    // }, [categories.length]);

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? categories.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % categories.length);
    };

    const visibleCategories = [
        ...categories.slice(activeIndex, activeIndex + itemsPerPage),
        ...categories.slice(0, Math.max(0, activeIndex + itemsPerPage - categories.length))
    ];

    return (
        <div className="container mx-auto mt-10 pb-20">
            <p className='font-bold text-3xl text-center mb-10'>{t('components.categories.title')}</p>
            <div id="animation-carousel" className="relative w-full" data-carousel="static">
                <div className="flex overflow-hidden rounded-xl">
                    {visibleCategories.map((category) => (
                        <div
                            key={category.id}
                            className="flex-shrink-0 flex-grow p-2"
                            title={category.name}
                        >
                            <div className="bg-white shadow rounded-lg p-4 text-center border-2 border-gray-300 hover:shadow-md">
                                <div className="mb-2">{category.icon}</div>
                                <div>{category.name}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Previous button */}
                <button
                    type="button"
                    className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    onClick={handlePrev}
                    title={t('components.categories.previous')}
                    style={{ border: 'none' }}
                >
                    <span className={iconButtonStyles}>
                        <svg
                            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 1L1 5l4 4"
                            />
                        </svg>
                        <span className="sr-only">{t('components.categories.previous')}</span>
                    </span>
                </button>

                {/* Next button */}
                <button
                    type="button"
                    className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    onClick={handleNext}
                    title={t('components.categories.next')}
                    style={{ border: 'none' }}
                >
                    <span className={iconButtonStyles}>
                        <svg
                            className="w-4 h-4 text-white dark:text-gray-800"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 9l4-4-4-4"
                            />
                        </svg>
                        <span className="sr-only">{t('components.categories.next')}</span>
                    </span>
                </button>
            </div>
        </div>
    );
}

export default Categories;
