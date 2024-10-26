
import { PlusIcon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Car, getCarsFromLocalStorage, readAllCategoriesToJson, Category, Brand } from '../shared/datas';
import CustomFormField from './CustomFormField';
import { useTranslation } from "react-i18next";


export interface SelectProps {
    id: number;
    name: string;
}


function SaveCarModal() {
    const { t } = useTranslation();
    const [, setCars] = useState<Car[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [models, setModels] = useState<SelectProps[]>([]);

    useEffect(() => {
        /**
         * Fetches the list of cars from local storage and populates the brands and models states.
         * Only the first 5 items are taken.
         */
        const fetchCars = () => {
            const storedCars = getCarsFromLocalStorage();
            if (storedCars && storedCars.length > 0) {
                setCars(storedCars);
                const uniqueBrands = Array.from(new Set(storedCars.map(car => car.brand.name)))
                    .map(name => storedCars.find(car => car.brand.name === name)?.brand)
                    .filter((brand): brand is Brand => brand !== undefined);
                setBrands(uniqueBrands);

                const uniqueModels = Array.from(new Set(storedCars.map(car => car.model)))
                    .map(name => storedCars.find(car => car.model === name)?.model)
                    .filter((model): model is string => model !== undefined);
                setModels(uniqueModels.map((model, index) => ({ id: index, name: model })));
            }
        };

        fetchCars();
    }, []);

    useEffect(() => {
        /**
         * Fetches the list of categories from local storage and populates the state.
         * Only the first 5 items are taken and sorted alphabetically.
         */
        const fetchCategories = async () => {
            if (categories.length === 0) {
                const data = await readAllCategoriesToJson();
                const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
                setCategories(sortedData);
            }
        };

        fetchCategories();
    }, [categories]);

    const conditions: SelectProps[] = [
        { id: 1, name: 'New' },
        { id: 2, name: 'Used' },
        { id: 3, name: 'Certified Pre-Owned' }
    ];

    const fuelTypes: SelectProps[] = [
        { id: 1, name: 'Petrol' },
        { id: 2, name: 'Diesel' },
        { id: 3, name: 'Electric' },
        { id: 4, name: 'Hybrid' }
    ];

    const transmissions: SelectProps[] = [
        { id: 1, name: 'Automatic' },
        { id: 2, name: 'Manual' },
        { id: 3, name: 'CVT' }
    ];

    const driveTypes: SelectProps[] = [
        { id: 1, name: 'FWD' },
        { id: 2, name: 'RWD' },
        { id: 3, name: 'AWD' },
        { id: 4, name: '4WD' }
    ];

    const featuresList = [
        { id: 'gps', name: `${t('pages.profilePage.createCar.carForm.features.gps')}` },
        { id: 'air-conditioning', name: `${t('pages.profilePage.createCar.carForm.features.airConditioning')}` },
        { id: 'bluetooth', name: `${t('pages.profilePage.createCar.carForm.features.bluetooth')}` },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [usernameTouched, setUsernameTouched] = useState(false);

    const [price, setPrice] = useState('');
    const [priceError, setPriceError] = useState(false);
    const [priceTouched, setPriceTouched] = useState(false);

    const [sellingPrice, setSellingPrice] = useState('');
    const [sellingPriceError, setSellingPriceError] = useState(false);
    const [sellingPriceTouched, setSellingPriceTouched] = useState(false);

    const [category, setCategory] = useState('');
    const [categoryError, setCategoryError] = useState(false);
    const [categoryTouched, setCategoryTouched] = useState(false);

    const [condition, setCondition] = useState('');
    const [conditionError, setConditionError] = useState(false);
    const [conditionTouched, setConditionTouched] = useState(false);

    const [year, setYear] = useState('');
    const [yearError, setYearError] = useState(false);
    const [yearTouched, setYearTouched] = useState(false);

    const [fuelType, setFuelType] = useState('');
    const [fuelTypeError, setFuelTypeError] = useState(false);
    const [fuelTypeTouched, setFuelTypeTouched] = useState(false);

    const [transmission, setTransmission] = useState('');
    const [transmissionError, setTransmissionError] = useState(false);
    const [transmissionTouched, setTransmissionTouched] = useState(false);

    const [make, setMake] = useState('');
    const [model, setModel] = useState('');

    const [driveType, setDriveType] = useState('');
    const [driveTypeError, setDriveTypeError] = useState(false);
    const [driveTypeTouched, setDriveTypeTouched] = useState(false);

    const [description, setDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState(false);
    const [descriptionTouched, setDescriptionTouched] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setUsername(e.target.value);
    };


    const handleUsernameBlur = () => {
        try {
            setUsernameTouched(true);
            setUsernameError(username === null || username === undefined || (username.length > 0 && username.length < 3));
        } catch (error) {
            console.error('Error handling username blur:', error);
        }
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setPrice(e.target.value);
    };

    const handlePriceBlur = () => {
        setPriceTouched(true);
        const priceValue = parseFloat(price || '0');
        const sellingPriceValue = parseFloat(sellingPrice || '0');
        setPriceError(price.length > 0 && (priceValue <= 0 || priceValue < sellingPriceValue));
    };

    const handleSellingPriceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setSellingPrice(e.target.value);
    };

    const handleSellingPriceBlur = () => {
        setSellingPriceTouched(true);
        const priceValue = parseFloat(price || '0');
        const sellingPriceValue = parseFloat(sellingPrice || '0');
        setSellingPriceError(sellingPrice.length > 0 && (isNaN(sellingPriceValue) || sellingPriceValue <= 0 || sellingPriceValue > priceValue));
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setCategory(e.target.value);
    };

    const handleCategoryBlur = () => {
        try {
            setCategoryTouched(true);
            setCategoryError(category === null || category === '');
        } catch (error) {
            console.error('Error handling category blur:', error);
        }
    };

    const handleConditionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setCondition(e.target.value);
    };

    const handleConditionBlur = () => {
        try {
            setConditionTouched(true);
            setConditionError(condition === null || condition === '');
        } catch (error) {
            console.error('Error handling condition blur:', error);
        }
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setYear(e.target.value);
    };

    const handleYearBlur = () => {
        try {
            setYearTouched(true);
            setYearError(year.length > 0 && (parseInt(year, 10) < 1886 || parseInt(year, 10) > new Date().getFullYear()));
        } catch (error) {
            console.error('Error handling year blur:', error);
        }
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleDescriptionBlur = () => {
        setDescriptionTouched(true);
        try {
            setDescriptionError(description.length > 0 && description.length < 10);
        } catch (error) {
            console.error('Error handling description blur:', error);
        }
    };

    const handleFuelTypeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFuelType(e.target.value);
    };

    const handleFuelTypeBlur = () => {
        try {
            setFuelTypeTouched(true);
            setFuelTypeError(!fuelType);
        } catch (error) {
            console.error('Error handling fuel type blur:', error);
        }
    };

    const handleTransmissionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setTransmission(e.target.value);
    };

    const handleTransmissionBlur = () => {
        if (transmission === null || transmission === undefined) {
            console.error('Error handling transmission blur: transmission is null or undefined');
            return;
        }
        setTransmissionTouched(true);
        setTransmissionError(transmission === '');
    };

    const handleDriveTypeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setDriveType(e.target.value);
    };

    const handleDriveTypeBlur = () => {
        if (driveType === null || driveType === undefined) {
            console.error('Error handling drive type blur: driveType is null or undefined');
            return;
        }
        setDriveTypeTouched(true);
        setDriveTypeError(driveType === '');
    };

    /**
     * Given a form input value, error status, and touched status, returns a tailwindcss class string that
     * represents the input's validity status. If the input is untouched or empty, returns a grayish class.
     * If the input has an error, returns a reddish class. If the input has no error, returns a greenish class.
     * @param value the input's value
     * @param error whether the input has an error
     * @param touched whether the input has been interacted with
     * @returns a tailwindcss class string
     */
    const getInputClass = (value: string, error: boolean, touched: boolean): string => {
        if (!touched || value === '') return 'bg-gray-50 border-gray-300';
        return error ? 'bg-red-50 border-red-500 text-red-900' : 'bg-green-50 border-green-500 text-green-900';
    };

    /**
     * Checks if the form data is valid according to the following rules:
     * - username must be at least 3 characters
     * - price must be a positive number
     * - selling price must be less than the price
     * - category, condition, drive type, transmission, and fuel type must be non-empty strings
     * - year must be a number between 1886 and the current year
     * - description must be at least 20 characters
     * @returns true if the form data is valid, false otherwise
     */
    const isFormValid = (): boolean => {
        return (
            username.length >= 3 &&
            price.length > 0 && parseFloat(price) > 0 &&
            sellingPrice.length > 0 && parseFloat(sellingPrice) < parseFloat(price) &&
            category !== '' &&
            condition !== '' &&
            year.length > 0 && parseInt(year) >= 1886 && parseInt(year) <= new Date().getFullYear() &&
            driveType !== '' &&
            transmission !== '' &&
            fuelType !== '' &&
            description.length >= 20
        );
    };

    const handleSubmit = () => {
        // Logique de soumission ici
        // Par exemple, vous pouvez vérifier si tous les champs sont valides avant de soumettre
    };

    /**
     * Resets the form to its initial state.
     * This function is called when the "Cancel" button is clicked.
     * It resets all the fields to empty strings and sets the touched state of each field to false.
     */
    const resetForm = (): void => {
        setUsername('');
        setPrice('');
        setSellingPrice('');
        setCategory('');
        setCondition('');
        setYear('');
        setDriveType('');
        setTransmission('');
        setFuelType('');
        setMake('');
        setModel('');
        setDescription('');

        setUsernameTouched(false);
        setPriceTouched(false);
        setSellingPriceTouched(false);
        setCategoryTouched(false);
        setConditionTouched(false);
        setYearTouched(false);
        setDriveTypeTouched(false);
        setTransmissionTouched(false);
        setFuelTypeTouched(false);
        setDescriptionTouched(false);
    };

    /**
     * Handles the "Cancel" button click event.
     * If the form has been touched at least once, resets the form to its initial state.
     * Otherwise, toggles the modal open/closed state.
     * @returns {void}
     */
    const handleReset = (): void => {
        try {
            if (typeof hasFormBeenTouched !== 'undefined' && hasFormBeenTouched) {
                resetForm();
            } else {
                toggleModal();
            }
        } catch (error) {
            console.error('Error handling reset:', error);
        }
    };

    const hasFormBeenTouched =
        username !== '' ||
        price !== '' ||
        sellingPrice !== '' ||
        category !== '' ||
        condition !== '' ||
        year !== '' ||
        driveType !== '' ||
        transmission !== '' ||
        fuelType !== '' ||
        make !== '' ||
        model !== '' ||
        description !== '';

    interface AccordionItem {
        id: number;
        divClassName: string;
        buttonClassName: string;
        accordionHeading: string;
        accordionBody: React.ReactNode;
    }

    const accordionItems: AccordionItem[] = [
        {
            id: 1,
            buttonClassName: "flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3",
            accordionHeading: `${t('pages.profilePage.createCar.carForm.generalInfo')}`,
            divClassName: "p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900",
            accordionBody: (
                <>
                    <div className='flex items-start space-x-4'>
                        <div className="mb-2 w-1/2">
                            <CustomFormField label={t('pages.profilePage.createCar.carForm.carName')}
                                type="text"
                                name="username"
                                value={username}
                                onChange={handleUsernameChange}
                                touched={usernameTouched}
                                error={usernameError}
                                onBlur={handleUsernameBlur}
                                placeholder={t('pages.profilePage.createCar.carForm.placeholders.carName')}
                                inputClassName={`${getInputClass(username, usernameError, usernameTouched)} border text-sm rounded-lg focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600`}
                                labelClassName="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                                errorMessage='Username already taken!'
                                isRequired />
                        </div>
                    </div>

                    <div className='flex items-start space-x-4'>
                        <div className="mb-2 w-1/2">
                            <CustomFormField label={t('pages.profilePage.createCar.carForm.originalPrice')}
                                type="number"
                                name="originalPrice"
                                value={price}
                                onChange={handlePriceChange}
                                touched={priceTouched}
                                error={priceError}
                                hasAddon={true}
                                addonContent='XAF'
                                onBlur={handlePriceBlur}
                                placeholder={t('pages.profilePage.createCar.carForm.placeholders.originalPrice')}
                                inputClassName={`${getInputClass(price, priceError, priceTouched)} border text-sm rounded-lg focus:outline-none block w-full p-2.5 pl-12 dark:bg-gray-700 dark:border-gray-600`}
                                labelClassName="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                                errorMessage='Original price must be greater than selling price!'
                                isRequired />
                        </div>
                        <div className="mb-5 w-1/2">
                            <CustomFormField label={t('pages.profilePage.createCar.carForm.sellingPrice')}
                                type="number"
                                name="sellingPrice"
                                value={sellingPrice}
                                onChange={handleSellingPriceChange}
                                touched={sellingPriceTouched}
                                error={sellingPriceError}
                                hasAddon={true}
                                addonContent='XAF'
                                onBlur={handleSellingPriceBlur}
                                placeholder={t('pages.profilePage.createCar.carForm.placeholders.sellingPrice')}
                                inputClassName={`${getInputClass(sellingPrice, sellingPriceError, sellingPriceTouched)} border text-sm rounded-lg focus:outline-none block w-full p-2.5 pl-12 dark:bg-gray-700 dark:border-gray-600`}
                                labelClassName="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                                errorMessage='Selling price must be less than original price!'
                                isRequired />
                        </div>
                    </div>

                    <div className='flex items-start space-x-4'>
                        <div className="mb-5 w-1/2">
                            <CustomFormField label={t('pages.profilePage.createCar.carForm.category')}
                                type="select"
                                name="category"
                                value={category}
                                onChange={handleCategoryChange}
                                error={categoryError}
                                touched={categoryTouched}
                                onBlur={handleCategoryBlur}
                                placeholder={t('pages.profilePage.createCar.carForm.placeholders.category')}
                                inputClassName={`${getInputClass(category, categoryError, categoryTouched)} border text-sm rounded-lg focus:outline-none w-full p-2.5 dark:bg-gray-700 dark:border-gray-600`}
                                options={categories}
                                labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                errorMessage='Please select a category!'
                                isRequired />
                        </div>
                        <div className="mb-5 w-1/2">
                            <CustomFormField label={t('pages.profilePage.createCar.carForm.condition')}
                                type="select"
                                name="condition"
                                value={condition}
                                onChange={handleConditionChange}
                                error={conditionError}
                                touched={conditionTouched}
                                onBlur={handleConditionBlur}
                                placeholder={t('pages.profilePage.createCar.carForm.placeholders.condition')}
                                inputClassName={`${getInputClass(condition, conditionError, conditionTouched)} border text-sm rounded-lg focus:outline-none w-full p-2.5 dark:bg-gray-700 dark:border-gray-600`}
                                options={conditions}
                                labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                errorMessage='Please select a condition!'
                                isRequired />
                        </div>
                    </div>

                    <div className='flex items-start space-x-4'>
                        <div className="mb-5 w-1/2">
                            <CustomFormField label={t('pages.profilePage.createCar.carForm.year')}
                                type="number"
                                name="year"
                                value={year}
                                onChange={handleYearChange}
                                touched={yearTouched}
                                error={yearError}
                                onBlur={handleYearBlur}
                                placeholder={t('pages.profilePage.createCar.carForm.placeholders.year')}
                                inputClassName={`${getInputClass(year, yearError, yearTouched)} border text-sm rounded-lg focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600`}
                                labelClassName="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                                errorMessage='Invalid year!'
                                isRequired />
                        </div>

                        <div className="mb-5 w-1/2">
                            <CustomFormField label={t('pages.profilePage.createCar.carForm.driverType')}
                                type="select"
                                name="driveType"
                                value={driveType}
                                onChange={handleDriveTypeChange}
                                error={driveTypeError}
                                touched={driveTypeTouched}
                                onBlur={handleDriveTypeBlur}
                                placeholder={t('pages.profilePage.createCar.carForm.placeholders.driverType')}
                                inputClassName={`${getInputClass(driveType, driveTypeError, driveTypeTouched)} border text-sm rounded-lg focus:outline-none w-full p-2.5 dark:bg-gray-700 dark:border-gray-600`}
                                options={driveTypes}
                                labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                errorMessage='Please select a driver type!'
                                isRequired />
                        </div>
                    </div>

                    <div className='flex items-start space-x-4'>
                        <div className="mb-5 w-1/2">
                            <CustomFormField label={t('pages.profilePage.createCar.carForm.transmission')}
                                type="select"
                                name="transmission"
                                value={transmission}
                                onChange={handleTransmissionChange}
                                error={transmissionError}
                                touched={transmissionTouched}
                                onBlur={handleTransmissionBlur}
                                placeholder={t('pages.profilePage.createCar.carForm.placeholders.transmission')}
                                inputClassName={`${getInputClass(transmission, transmissionError, transmissionTouched)} border text-sm rounded-lg focus:outline-none w-full p-2.5 dark:bg-gray-700 dark:border-gray-600`}
                                options={transmissions}
                                labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                errorMessage='Please select a transmission!'
                                isRequired />
                        </div>

                        <div className="mb-5 w-1/2">
                            <CustomFormField label={t('pages.profilePage.createCar.carForm.fuelType')}
                                type="select"
                                name="fuelType"
                                value={fuelType}
                                onChange={handleFuelTypeChange}
                                error={fuelTypeError}
                                touched={fuelTypeTouched}
                                onBlur={handleFuelTypeBlur}
                                placeholder={t('pages.profilePage.createCar.carForm.placeholders.fuelType')}
                                inputClassName={`${getInputClass(fuelType, fuelTypeError, fuelTypeTouched)} border text-sm rounded-lg focus:outline-none w-full p-2.5 dark:bg-gray-700 dark:border-gray-600`}
                                options={fuelTypes}
                                labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                errorMessage='Please select a fuel type!'
                                isRequired />
                        </div>

                    </div>
                </>)
        },
        {
            id: 2,
            buttonClassName: "flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3",
            accordionHeading: `${t('pages.profilePage.createCar.carForm.vehicleDetails')}`,
            divClassName: "p-5 border border-b-0 border-gray-200 dark:border-gray-700",
            accordionBody: (
                <>
                    <div className='flex items-start space-x-4'>
                        <div className="mb-5 w-1/2">
                            <CustomFormField label={t('pages.profilePage.createCar.carForm.make')}
                                type="select"
                                name="make"
                                value={make}
                                onChange={(e) => setMake(e.target.value)}
                                placeholder={t('pages.profilePage.createCar.carForm.placeholders.model')}
                                inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                options={brands}
                                labelClassName="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300" />
                        </div>
                        <div className="mb-5 w-1/2">
                            <CustomFormField label={t('pages.profilePage.createCar.carForm.model')}
                                type="select"
                                name="model"
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                placeholder={t('pages.profilePage.createCar.carForm.placeholders.model')}
                                inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                options={models}
                                labelClassName="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300" />
                        </div>
                    </div>
                    <div className='flex items-start space-x-4'>
                        <div className="mb-5 w-full">
                            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">{t('pages.profilePage.createCar.carForm.featuresSection')}</h3>
                            <div className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                {featuresList.map((tech) => (
                                    <div key={tech.id} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input
                                                id={tech.id}
                                                type="checkbox"
                                                value=""
                                                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label htmlFor={tech.id} className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{tech.name}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>)
        },
        {
            id: 3,
            buttonClassName: "flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3",
            accordionHeading: `${t('pages.profilePage.createCar.carForm.descriptionSection')}`,
            divClassName: "p-5 border border-t-0 border-gray-200 dark:border-gray-700",
            accordionBody: (
                <>
                    <div className='flex items-start space-x-4'>
                        <div className="mb-5 w-full">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                {t('pages.profilePage.createCar.carForm.description')}<span style={{ color: 'red' }}>&nbsp;*</span>
                            </label>
                            <textarea
                                id="description"
                                rows={8}
                                value={description}
                                onChange={handleDescriptionChange}
                                onBlur={handleDescriptionBlur}
                                className={`${getInputClass(description, descriptionError, descriptionTouched)} block w-full px-0 text-sm text-gray-800 rounded-md bg-white border-1 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 max-h-14 min-h-14`}
                                placeholder={t('pages.profilePage.createCar.carForm.placeholders.description')}
                                required
                            />
                            {descriptionTouched && descriptionError && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Description is too short!</p>
                            )}
                        </div>
                    </div>
                </>)
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(1);
    
    /**
     * Toggle the open state of the accordion at the given index.
     *
     * @param index - The index of the accordion to toggle.
     */
    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div>
            <div className="block space-y-4 md:flex md:space-y-0 md:space-x-4 rtl:space-x-reverse">
                <Button variant="default"
                    size="icon"
                    asChild
                    data-modal-target="extralarge-modal" data-modal-toggle="extralarge-modal"
                    onClick={toggleModal}
                    className="block w-full md:w-auto text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" type="button"
                >
                    <PlusIcon style={{ fontWeight: 'bolder', padding: '0.4rem', color: 'white' }} />
                </Button>
            </div>

            {isModalOpen && (
                <div id="large-modal" tabIndex={-1} className="fixed inset-0 z-50 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto h-[calc(100%-1rem)] max-h-full">
                    <div className="relative w-full max-w-4xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                    {t('pages.profilePage.createCar.title')}
                                </h3>
                                <button onClick={toggleModal} type="button" className="text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white hover:border-transparent">
                                    X
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-5 space-y-4">
                                <form className="mx-auto">

                                    <div id="accordion-color" data-accordion="collapse">
                                        {accordionItems.map((item) => (
                                            <div key={item.id}>
                                                <h2 id={`accordion-color-heading-${item.id}`}>
                                                    <button
                                                        type="button"
                                                        className={`${item.buttonClassName}`}
                                                        onClick={() => toggleAccordion(item.id)}
                                                        aria-expanded={openIndex === item.id}
                                                        aria-controls={`accordion-color-body-${item.id}`}
                                                    >
                                                        <span>{item.accordionHeading}</span>
                                                        <svg
                                                            className={`w-3 h-3 transform ${openIndex === item.id ? 'rotate-180' : ''} shrink-0`}
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 10 6"
                                                        >
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                                                        </svg>
                                                    </button>
                                                </h2>
                                                <div
                                                    id={`accordion-color-body-${item.id}`}
                                                    className={`${openIndex === item.id ? 'block' : 'hidden'}`}
                                                    aria-labelledby={`accordion-color-heading-${item.id}`}
                                                >
                                                    <div className={`${item.divClassName}`}>
                                                        {item.accordionBody}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </form>
                            </div>
                            <div className="flex items-center justify-between p-4 md:p-5 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button
                                    onClick={handleSubmit}
                                    type="button"
                                    className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${!isFormValid() ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={!isFormValid()}
                                >
                                    {t('pages.profilePage.createCar.carForm.acceptButton')}
                                </button>
                                <button onClick={handleReset} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-white focus:outline-none bg-red-600 rounded-lg border border-red-200 hover:border-red-200 hover:bg-red-600 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                    {t('pages.profilePage.createCar.carForm.declineButton')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SaveCarModal;
