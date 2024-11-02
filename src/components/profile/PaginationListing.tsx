import { useEffect, useRef, useState } from "react";
import { Car, getCarsFromLocalStorage } from "../../data/datas";
import { useTranslation } from "react-i18next";
import { throttle } from 'lodash';

interface PaginationListingProps {
  cars: Car[];
  setCars: React.Dispatch<React.SetStateAction<Car[]>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
  backgroundColor: string;
}

export default function PaginationListing({ cars, setCars, currentPage, setCurrentPage, itemsPerPage, backgroundColor }: PaginationListingProps) {
  const { t } = useTranslation();
  const totalPages = Math.ceil(cars.length / itemsPerPage); 

  const indexOfLastCar = currentPage * itemsPerPage;
  const indexOfFirstCar = indexOfLastCar - itemsPerPage;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 3;

    if (totalPages <= maxPageNumbersToShow + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <li key={i} onClick={() => setCurrentPage(i)} className="cursor-pointer">
            <a style={{ color: currentPage === i ? 'blue' : 'black' }} className={`flex items-center justify-center px-4 h-10 leading-tight ${currentPage === i ? 'font-bold border border-blue-300 bg-blue-100' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'}`}>
              {i}
            </a>
          </li>
        );
      }
    } else {
      pageNumbers.push(
        <li key={1} onClick={() => setCurrentPage(1)} className="cursor-pointer">
          <a style={{ color: currentPage === 1 ? 'blue' : 'black' }} className={`flex items-center justify-center px-4 h-10 leading-tight ${currentPage === 1 ? 'font-bold border border-blue-300 bg-blue-100' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'}`}>
            1
          </a>
        </li>
      );

      if (currentPage > 4) {
        pageNumbers.push(
          <li key="left-ellipsis">
            <a style={{ color: "black" }} className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}>
              ...
            </a>
          </li>
        );
      }
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pageNumbers.push(
          <li key={i} onClick={() => setCurrentPage(i)} className="cursor-pointer">
            <a style={{ color: currentPage === i ? 'blue' : 'black' }} className={`flex items-center justify-center px-4 h-10 leading-tight ${currentPage === i ? 'font-bold border border-blue-300 bg-blue-100' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'}`}>
              {i}
            </a>
          </li>
        );
      }

      if (currentPage < totalPages - 3) {
        pageNumbers.push(
          <li key="left-ellipsis">
            <a style={{ color: "black" }} className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}>
              ...
            </a>
          </li>
        );
      }

      pageNumbers.push(
        <li key={totalPages} onClick={() => setCurrentPage(totalPages)} className="cursor-pointer">
          <a style={{ color: currentPage === totalPages ? 'blue' : 'black' }} className={`flex items-center justify-center px-4 h-10 leading-tight ${currentPage === totalPages ? 'font-bold border border-blue-300 bg-blue-100' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'}`}>
            {totalPages}
          </a>
        </li>
      );
    }
    return pageNumbers;
  };

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollbarRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const [, setScrollbarPosition] = useState(0);


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

  const stopDrag = () => {
    isDragging.current = false;
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

  useEffect(() => {
    const fetchCars = () => {
      const storedCars = getCarsFromLocalStorage();
      if (storedCars && storedCars.length > 0) {
        setCars(storedCars);
      }
    };

    fetchCars();
  }, [setCars]);

  return (
    <div>
      <div className="bg-white text-surface dark:bg-neutral-700 dark:text-white dark:shadow-black/30 rounded-xl shadow mt-6"
        style={{ backgroundColor: backgroundColor }}>
        <div className="flex items-center justify-between border-gray-200 px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between md:hidden">
            <div className="flex items-center mr-6">
              <p className="text-sm text-black text-center">
                {t('pages.profilePage.pagination.showing')} <span className="font-medium italic">{indexOfFirstCar + 1}</span> {t('pages.profilePage.pagination.to')} <span className="font-medium italic">{Math.min(indexOfLastCar, cars.length)}</span> {t('pages.profilePage.pagination.of')}
                <span className="font-medium italic">{cars.length}</span> {t('pages.profilePage.pagination.results')}
              </p>
            </div>

            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="flex items-center justify-center px-4 h-10 me-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white shadow"
              style={{ color: currentPage === 1 ? 'white' : 'black', border: 'none', backgroundColor: currentPage === 1 ? '#a9a1a1' : '#e0f2fe', fontWeight: currentPage === 1 ? 'normal' : 'bolder' }}
            >
              <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
              </svg>
              {t('components.categories.previous')}
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white shadow"
              style={{ color: currentPage === totalPages ? 'white' : 'black', border: 'none', backgroundColor: currentPage === totalPages ? '#a9a1a1' : '#e0f2fe', fontWeight: currentPage === totalPages ? 'normal' : 'bolder' }}
            >
              {t('components.categories.next')}
              <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </button>
          </div>
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                {t('pages.profilePage.pagination.showing')} <span className="font-medium">{indexOfFirstCar + 1}</span> {t('pages.profilePage.pagination.to')} <span className="font-medium">{Math.min(indexOfLastCar, cars.length)}</span> {t('pages.profilePage.pagination.of')}
                <span className="font-medium">{cars.length}</span> {t('pages.profilePage.pagination.results')}
              </p>
            </div>
            <nav aria-label="Pagination" className="isolate inline-flex -space-x-px h-10 text-sm rounded-md shadow-sm">
              <ul className="flex items-center -space-x-px h-10 text-base">
                <li className="cursor-pointer">
                  <a
                    onClick={handlePreviousPage}
                    className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    style={{ color: "black" }}
                  >
                    <span className="sr-only">{t('components.categories.previous')}</span>
                    <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                    </svg>
                  </a>
                </li>
                {renderPageNumbers()}
                <li className="cursor-pointer">
                  <a
                    onClick={handleNextPage}
                    className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                    style={{ color: "black" }}
                  >
                    <span className="sr-only">{t('components.categories.next')}</span>
                    <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}