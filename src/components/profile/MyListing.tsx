import { useEffect, useRef, useState } from "react";
import { Car, convertToXAF, formatPrice, getCarsFromLocalStorage } from "../../data/datas";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { throttle } from 'lodash';
import PaginationListing from "./PaginationListing";
import ConfirmModal from "../modals/ConfirmModal";

/**
 * Component that displays a table with all the cars in the database,
 * ordered by year, transmission and fuelType, and price. It also allows
 * the user to delete a car from the database.
 *
 * @returns A component that displays a table with all the cars in the database.
 */
export default function MyListing() {
    const itemsPerPage = 4;
    const { t } = useTranslation();
    const [cars, setCars] = useState<Car[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

    useEffect(() => {
        const fetchCars = () => {
            const storedCars = getCarsFromLocalStorage();
            if (storedCars && storedCars.length > 0) {
                setCars(storedCars);
            }
        };

        fetchCars();
    }, []);

    const indexOfLastCar = currentPage * itemsPerPage;
    const indexOfFirstCar = indexOfLastCar - itemsPerPage;

    const sortedCars = [...cars].sort((a, b) => {
        if (!sortConfig) return 0;
        const { key, direction } = sortConfig;
        const order = direction === 'asc' ? 1 : -1;

        const getValue = (car: Car, key: string) => {
            switch (key) {
                case 'year':
                    return car.year;
                case 'features.transmission':
                    return car.features.transmission;
                case 'features.fuelType':
                    return car.features.fuelType;
                case 'price':
                    return convertToXAF(car.price, car.currency);
                default:
                    return '';
            }
        };

        const aValue = getValue(a, key);
        const bValue = getValue(b, key);

        return aValue > bValue ? order : aValue < bValue ? -order : 0;
    });

    const currentCars = sortedCars.slice(indexOfFirstCar, indexOfLastCar);

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const scrollbarRef = useRef<HTMLDivElement | null>(null);
    const isDragging = useRef(false);
    const [scrollbarPosition, setScrollbarPosition] = useState(0);

    const smoothScroll = (targetPosition: number, duration: number) => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        const startPosition = scrollContainer.scrollLeft;
        const distance = targetPosition - startPosition;
        let startTime: number | null = null;

        const animation = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            scrollContainer.scrollLeft = run;
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        requestAnimationFrame(animation);
    };

    const handleDrag = (e: MouseEvent) => {
        if (!isDragging.current) return;

        const scrollbar = scrollbarRef.current;
        const scrollContainer = scrollContainerRef.current;
        if (!scrollbar || !scrollContainer) return;

        const rect = scrollbar.parentElement!.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;

        let newPosition = (mouseX / rect.width) * 100;
        newPosition = Math.max(0, Math.min(newPosition, 100));

        setScrollbarPosition(newPosition);

        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        const targetPosition = (newPosition / 100) * maxScroll;
        scrollContainer.scrollLeft = targetPosition;
    };

    const startDrag = () => {
        isDragging.current = true;
    };

    const stopDrag = () => {
        isDragging.current = false;
    };

    const handleScrollbarClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const scrollbar = scrollbarRef.current;
        const scrollContainer = scrollContainerRef.current;
        if (!scrollbar || !scrollContainer) return;

        const rect = scrollbar.parentElement!.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;

        let newPosition = (mouseX / rect.width) * 100;
        newPosition = Math.max(0, Math.min(newPosition, 100));

        setScrollbarPosition(newPosition);

        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        const targetPosition = (newPosition / 100) * maxScroll;
        smoothScroll(targetPosition, 500);
    };

    const handleDragThrottled = throttle((e: MouseEvent) => {
        handleDrag(e);
    }, 50);

    useEffect(() => {
        window.addEventListener("mousemove", handleDrag);
        window.addEventListener("mouseup", stopDrag);

        return () => {
            window.removeEventListener("mousemove", handleDrag);
            window.removeEventListener("mouseup", stopDrag);
        };
    }, []);

    useEffect(() => {
        window.addEventListener("mousemove", handleDragThrottled);
        window.addEventListener("mouseup", stopDrag);

        return () => {
            window.removeEventListener("mousemove", handleDragThrottled);
            window.removeEventListener("mouseup", stopDrag);
        };
    }, [handleDragThrottled]);

    const requestSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div>
            <div className="bg-white p-4 text-surface dark:bg-neutral-700 dark:text-white dark:shadow-black/30 rounded-xl shadow"
                style={{ backgroundColor: '#e6edf7' }}>
                <div className="overflow-hidden"
                    ref={scrollContainerRef}>
                    <table id="default-table" className="w-[565px] md:w-full text-start text-sm font-light text-surface dark:text-white">
                        <thead>
                            <tr>
                                <th className="text-start px-2">
                                    {t('pages.profilePage.table.cars')}
                                </th>
                                <th className="cursor-pointer" onClick={() => requestSort('year')}>
                                    <span className="flex items-center">
                                        {t('pages.profilePage.table.year')}
                                        <svg className="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 15 4 4 4-4m0-6-4-4-4 4" />
                                        </svg>
                                    </span>
                                </th>
                                <th className="cursor-pointer" onClick={() => requestSort('features.transmission')}>
                                    <span className="flex items-center">
                                        {t('pages.profilePage.table.transmission')}
                                        <svg className="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 15 4 4 4-4m0-6-4-4-4 4" />
                                        </svg>
                                    </span>
                                </th>
                                <th className="cursor-pointer" onClick={() => requestSort('features.fuelType')}>
                                    <span className="flex items-center">
                                        {t('pages.profilePage.table.fuelType')}
                                        <svg className="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 15 4 4 4-4m0-6-4-4-4 4" />
                                        </svg>
                                    </span>
                                </th>
                                <th className="cursor-pointer" onClick={() => requestSort('price')}>
                                    <span className="flex items-end justify-end">
                                        {t('pages.profilePage.table.price')}
                                        <svg className="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 15 4 4 4-4m0-6-4-4-4 4" />
                                        </svg>
                                    </span>
                                </th>
                                <th className="text-right" title={t('pages.profilePage.table.actions')}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCars.map((car) => (
                                <tr key={car.id} className="border-b transition-all duration-500 ease-in-out hover:bg-gray-100">
                                    <td className="py-2 max-w-80">
                                        <div className="flex items-center">
                                            <img
                                                alt={car.name}
                                                src={car.imageUrl}
                                                title={car.name}
                                                className="w-20 h-25 object-cover rounded-lg mr-4"
                                            />
                                            <span className="font-medium max-w-20">
                                                <Link to={`/car/${car.id}`} style={{ color: 'black', fontWeight: 'bold' }}>{car.name}</Link>
                                            </span>
                                        </div>
                                    </td>
                                    <td className="max-w-20">{car.year}</td>
                                    <td className="max-w-20">{car.features.transmission}</td>
                                    <td className="max-w-20">{car.features.fuelType}</td>
                                    <td className="max-w-20 text-right font-bold italic">{formatPrice(convertToXAF(car.price, car.currency))}</td>
                                    <td className="max-w-20 text-right" style={{ textAlign: "center" }}>
                                        <center>
                                            <ConfirmModal
                                                title="Delete this item?"
                                                message="Are you sure you want to delete this product?"
                                                confirmText="Yes, delete it"
                                                cancelText="No, keep it"
                                            />
                                        </center>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="w-full rounded-full h-1.5 md:hidden cursor-pointer"
                    style={{ backgroundColor: "#a9a1a1" }}
                    onClick={handleScrollbarClick}
                >
                    <div className="bg-blue-600 h-1.5 rounded-full"
                        style={{
                            width: '50%',
                            backgroundColor: "#646cff",
                            transform: `translateX(${scrollbarPosition}%)`,
                            transition: isDragging.current ? 'none' : 'transform 0.5s ease'
                        }}
                        onMouseDown={startDrag}
                        ref={scrollbarRef}
                    ></div>
                </div>
            </div>

            <PaginationListing cars={cars}
                setCars={setCars}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itemsPerPage={itemsPerPage}
                backgroundColor={'#e6edf7'}
            />
        </div>
    )
}
