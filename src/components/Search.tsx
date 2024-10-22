/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CiSearch } from 'react-icons/ci';
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { convertToXAF, createFakeCarData, formatPrice, getBrandsFromLocalStorage, getCarsFromLocalStorage } from '../shared/datas';
import { Car, Brand } from '../shared/datas';

const Search: React.FC = () => {

    const { t } = useTranslation();
    const [cars, setCars] = useState<Car[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);

    useEffect(() => {
        const loadCarData = async () => {
            localStorage.removeItem('cars'); 
            let cars = getCarsFromLocalStorage();
            if (!cars || cars.length === 0) {
                cars = await createFakeCarData(100); 
            }
            // Sort cars alphabetically by model and model
            cars.sort((a, b) => {
                const nameA = `${a.name} - ${a.model}`.toLowerCase();
                const nameB = `${b.name} - ${b.model}`.toLowerCase();
                return nameA.localeCompare(nameB);
            });
            setCars(cars);
        };

        const loadBrandData = () => {
            const brands = getBrandsFromLocalStorage();
            if (brands) {
                setBrands(brands);
            }
        };

        loadCarData();
        loadBrandData();
    }, []);

    // useEffect(() => {
    //     console.log("Données des voitures:", cars.length);
    //     console.log("Données des marques:", brands.length);
    // }, [cars, brands]);

    return (
        <div style={{ background: 'radial-gradient(circle, #e0f7fa, #ffffff)' }} className="p-2 rounded-lg flex flex-col md:flex-row grap-10 px-7 w-[60%] items-center shadow-lg">
            <Select>
                <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg elevation-5">
                    <SelectValue placeholder={t('components.search.placeholderCars')} />
                </SelectTrigger>
                <SelectContent className='h-[150px] overflow-y-auto'>
                    {cars.map(car => (
                        <SelectItem key={car.id} value={`${car.name} - ${car.model}`}>
                            {`${car.name} - ${car.model}`}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Separator orientation="vertical" className="hidden md:block ml-1" style={{ height: '90%', backgroundColor: '#afe8ff' }} />

            <Select>
                <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg ml-1">
                    <SelectValue placeholder={t('components.search.placeholderCarMakes')} />
                </SelectTrigger>
                <SelectContent className='h-[150px] overflow-y-auto'>
                    {brands.map(brand => (
                        <SelectItem key={brand.id} value={brand.name}>{brand.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Separator orientation="vertical" className="hidden md:block ml-1 mr-1" style={{ height: '90%', backgroundColor: '#afe8ff' }} />

            <Select>
                <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
                    <SelectValue placeholder={t('components.search.placeholderPrice')} />
                </SelectTrigger>
                <SelectContent className='h-[150px] overflow-y-auto'>
                    {cars
                        .map(car => ({
                            id: car.id,
                            priceInXAF: convertToXAF(car.price, car.currency)
                        }))
                        .sort((a, b) => a.priceInXAF - b.priceInXAF)
                        .map(car => (
                            <SelectItem key={car.id} value={`${car.priceInXAF} XAF`}>
                                {formatPrice(car.priceInXAF)}
                            </SelectItem>
                        ))}
                </SelectContent>
            </Select>

            <Separator orientation="vertical" className="hidden md:block ml-1 mr-1" style={{ height: '90%', backgroundColor: '#afe8ff' }} />
            <div className='mr-0 ml-4 sm:mt-2'>
                <CiSearch className='font-bold text-[30px] rounded-full p-2 hover:scale-105 transition-all cursor-pointer bg-primary' style={{ color: 'white' }} />
            </div>

        </div>
    );
};

export default Search;