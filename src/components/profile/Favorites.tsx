import { useEffect, useState } from "react";
import { Car, convertToXAF, formatPrice, getCarsFromLocalStorage } from "../../data/datas";
import { useTranslation } from "react-i18next";
import PaginationListing from "./PaginationListing";
import { GiGearStickPattern } from "react-icons/gi";
import { TbBrandSpeedtest } from "react-icons/tb";
import { LuFuel } from "react-icons/lu";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function Favorites() {
    const itemsPerPage = 6;
    const { t } = useTranslation();
    const [cars, setCars] = useState<Car[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchCars = () => {
            const storedCars = getCarsFromLocalStorage();
            if (storedCars && storedCars.length > 0) {
                setCars(storedCars.slice(0, 58));
            }
        };

        fetchCars();
    }, []);

    return (
        <div className="bg-white text-surface dark:bg-neutral-700 dark:text-white dark:shadow-black/30 rounded-xl shadow p-5"
            style={{ backgroundColor: '#e6edf7' }}>
            <div className="overflow-x-auto">
                <div className="md:w-full text-start text-sm font-light text-surface dark:text-white flex justify-center">
                    {cars.length === 0 ? (
                        <div className="text-center py-10">
                            <div className="text-center p-10">
                                <h1 className="font-bold text-4xl mb-4">{t('pages.profilePage.noCars')}</h1>
                                <h1 className="text-3xl">{t('pages.profilePage.noCarsExplanation')}</h1>
                            </div>
                        </div>
                    ) : (
                        <section className="w-full grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-y-10 gap-x-8 mt-5 mb-5 px-5">
                            {cars.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((car) => (
                                <div key={car.id} className="w-full bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                                    <div className="flex items-center justify-center h-48 bg-gray-100 rounded-t-xl overflow-hidden">
                                        <img src={car.imageUrl}
                                            alt={car.name}
                                            className="h-full w-full object-cover" />
                                    </div>
                                    <div className="px-4 py-3">
                                        <div className="flex items-center justify-between">
                                            <p className="text-lg font-bold text-black truncate capitalize">{car.name}</p>
                                            <span className="text-sm text-gray-500 font-bold border border-dashed border-[#189cf4] px-4 py-1 rounded-xl">
                                                {car.year}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-around mt-4 py-2">
                                            <div className="flex items-center" style={{ color: 'green' }}>
                                                <LuFuel />
                                                &nbsp;
                                                <span>{car.rentalOptions.fuelPolicy}</span>
                                            </div>

                                            <div className="flex items-center" style={{ color: 'red' }}>
                                                <TbBrandSpeedtest />
                                                &nbsp;
                                                <span>{car.features.fuelType}</span>
                                            </div>

                                            <div className="flex items-center" style={{ color: 'orange' }}>
                                                <GiGearStickPattern />
                                                &nbsp;
                                                <span>{car.features.transmission}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mt-4 border-t-2 border-gray-200 pt-3">
                                            <p className="text-lg font-semibold text-black">{formatPrice(convertToXAF(car.price, car.currency))}</p>
                                            <div className="flex items-center">
                                                <span title={t('pages.profilePage.favoritesSection.like')}>
                                                    <FavoriteBorderIcon className="mr-2 bg-pink-200 rounded-t-md rounded-b-md p-1 cursor-pointer"
                                                        style={{ color: 'red', width: '35px', height: '35px' }} />
                                                </span>
                                                <button className="bg-blue-500 text-white py-2 px-4 rounded flex items-center justify-center h-8">
                                                    {t('pages.profilePage.favoritesSection.rentNow')}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </section>
                    )}
                </div>
            </div>

            {cars.length > 0 && (<div className="p-5">
                <PaginationListing cars={cars}
                    setCars={setCars}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    backgroundColor={'white'}
                />
            </div>)}
        </div>
    )
}
