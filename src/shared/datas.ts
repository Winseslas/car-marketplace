import { faker } from '@faker-js/faker';

export interface Category {
    id: number;
    name: string;
    icon: string;
}

class Currency {
    code: string;
    symbol: string;

    constructor() {
        this.code = faker.finance.currencyCode();
        this.symbol = faker.finance.currencySymbol();
    }
}

export class Brand {
    id: number;
    name: string;
    country: string;

    constructor() {
        this.id = faker.number.int();
        this.name = faker.vehicle.manufacturer();
        this.country = faker.location.country();
    }
}

class Agency {
    id: number;
    name: string;
    location: string;
    contactNumber: string;
    email: string;

    constructor() {
        this.id = faker.number.int();
        this.name = faker.company.name();
        this.location = faker.location.city();
        this.contactNumber = faker.phone.number();
        this.email = faker.internet.email();
    }
}

class CarFeatures {
    airConditioning: boolean;
    seats: number;
    doors: number;
    transmission: 'Manual' | 'Automatic';
    fuelType: string;
    gps: boolean;
    bluetooth: boolean;
    luggageCapacity: number;

    constructor() {
        this.airConditioning = faker.datatype.boolean();
        this.seats = faker.number.int({ min: 2, max: 7 });
        this.doors = faker.number.int({ min: 2, max: 5 });
        this.transmission = faker.helpers.arrayElement(['Manual', 'Automatic']);
        this.fuelType = faker.vehicle.fuel();
        this.gps = faker.datatype.boolean();
        this.bluetooth = faker.datatype.boolean();
        this.luggageCapacity = faker.number.int({ min: 100, max: 500 });
    }
}

class RentalOptions {
    dailyRate: number;
    weeklyRate?: number;
    monthlyRate?: number;
    currency: Currency;
    available: boolean;
    pickupLocation: Agency;
    dropoffLocation?: Agency;
    mileageLimit: number;
    extraMileageCharge: number;
    insuranceIncluded: boolean;
    fuelPolicy: string;

    constructor(currency: Currency, agency: Agency) {
        this.dailyRate = faker.number.int({ min: 50, max: 200 });
        this.weeklyRate = faker.number.int({ min: 300, max: 1000 });
        this.monthlyRate = faker.number.int({ min: 1000, max: 3000 });
        this.currency = currency;
        this.available = faker.datatype.boolean();
        this.pickupLocation = agency;
        this.dropoffLocation = faker.datatype.boolean() ? agency : undefined;
        this.mileageLimit = faker.number.int({ min: 100, max: 1000 });
        this.extraMileageCharge = faker.number.float({ min: 0.1, max: 1.0 });
        this.insuranceIncluded = faker.datatype.boolean();
        this.fuelPolicy = faker.vehicle.fuel();
    }
}

export class Car {
    id: number;
    name: string;
    model: string;
    brand: Brand;
    year: number;
    price: number;
    sellingPrice: number;
    currency: Currency;
    rentalOptions: RentalOptions;
    features: CarFeatures;
    imageUrl: string;
    description: string;
    category: Category | null;
    condition: string;
    driveType: string;

    constructor() {
        this.model = faker.vehicle.model();
        this.name = faker.vehicle.vehicle();
        this.id = faker.number.int();
        this.brand = new Brand();
        this.year = faker.number.int({ min: 2000, max: 2023 });
        this.price = faker.number.int({ min: 1000, max: 10000 });
        this.sellingPrice = faker.number.int({ min: 10000, max: 50000 });
        this.currency = new Currency();
        this.rentalOptions = new RentalOptions(this.currency, new Agency());
        this.features = new CarFeatures();
        this.imageUrl = faker.helpers.arrayElement([
            'https://mediaservice.audi.com/media/live/50900/fly1400x601n1/8wc/2023.png?wid=850',
            'https://mediaservice.audi.com/media/fast/H4sIAAAAAAAAAFvzloG1tIiBOTrayfuvpGh6-m1zJgaGigIGBgZGoDhTtNOaz-I_2DhCHsCEtzEwF-SlMwJZKUycmbmJ6an6QD4_I3taTmV-aUkxO0grD4_mtjdhon8WqzxTuloW9jCg5pKXLgMrUBejG5Bg3gMk-LYBCU5pBjAJMm8qiOgB8ZkcmBkYWCuAjEgGEODjKy3KKUgsSszVK89MKckQ1DAgEgizu7iGOHr6BAMAkhIhZOkAAAA?wid=850',
            'https://stimg.cardekho.com/images/carexteriorimages/630x420/Aston-Martin/DB12/10185/1696480591668/front-left-side-47.jpg?impolicy=resize&imwidth=480',
            'https://stimg.cardekho.com/images/carexteriorimages/630x420/Bentley/Continental/7771/1708637147871/front-left-side-47.jpg?impolicy=resize&imwidth=480',
            'https://stimg.cardekho.com/images/carexteriorimages/630x420/BMW/i7/8972/1675664292256/front-left-side-47.jpg?impolicy=resize&imwidth=480',
            'https://stimg.cardekho.com/images/carexteriorimages/630x420/Bugatti/Bugatti-Veyron/1340/1559125026509/front-left-side-47.jpg?impolicy=resize&imwidth=480',
            'https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Verna/9744/1694602806760/front-left-side-47.jpg?impolicy=resize&imwidth=480',
            'https://stimg.cardekho.com/images/carexteriorimages/630x420/Skoda/Kushaq/11803/Skoda-Kushaq-1.0L-Onyx-AT/1721108476094/front-left-side-47.jpg?impolicy=resize&imwidth=480',
            'https://stimg.cardekho.com/images/carexteriorimages/630x420/Toyota/Fortuner/10903/1695443447797/front-left-side-47.jpg?impolicy=resize&imwidth=480',
            'https://stimg.cardekho.com/images/carexteriorimages/630x420/Nissan/Nissan-Leaf/1351/1550722575097/front-left-side-47.jpg',
            'https://stimg.cardekho.com/images/carexteriorimages/630x420/Mahindra/Thar-ROXX/8438/1723692413550/front-left-side-47.jpg',
            'https://imgd.aeplcdn.com/664x374/n/cw/ec/153319/2023-range-rover-velar-exterior-right-side-view.jpeg?isig=0&q=80',
            'https://imgd.aeplcdn.com/664x374/n/cw/ec/153319/range-rover-velar-exterior-right-front-three-quarter-4.jpeg?isig=0&q=80',
            // 'http://waydex.volkovdesign.com/img/cars/5-1.jpg',
            // 'http://waydex.volkovdesign.com/img/cars/4-1.jpg',
            // 'http://waydex.volkovdesign.com/img/cars/6-1.jpg',
            // 'http://waydex.volkovdesign.com/img/cars/2-1.jpg',
            // 'http://waydex.volkovdesign.com/img/cars/1-1.jpg',
            // 'http://waydex.volkovdesign.com/img/cars/3-1.jpg',
        ]);
        this.description = faker.lorem.paragraph();
        this.category = null;
        this.condition = faker.helpers.arrayElement(['New', 'Used', 'Certified Pre-Owned']) 
        this.driveType = faker.helpers.arrayElement(['FWD', 'RWD', 'AWD', '4WD']);
    }

    async setRandomCategory() {
        try {
            const categories = await readAllCategoriesToJson();
            this.category = faker.helpers.arrayElement(categories);
        } catch (error) {
            console.error('Failed to set random category:', error);
            this.category = null;
        }
    }
}

// Function to create an array of fake car data
function generateFakeCars(numCars: number): Car[] {
    return Array.from({ length: numCars }, () => new Car());
}

// Function to save cars to localStorage
export function saveCarsToLocalStorage(cars: Car[]) {
    localStorage.setItem('cars', JSON.stringify(cars));
}

// Function to get cars from localStorage
export function getCarsFromLocalStorage(): Car[] | null {
    const carsJson = localStorage.getItem('cars');
    return carsJson ? JSON.parse(carsJson) : null;
}

// Function to create fake car data and save to localStorage
export function createFakeCarData(numCars: number = 10) {
    const fakeCars = generateFakeCars(numCars);
    saveCarsToLocalStorage(fakeCars);
    return fakeCars;
}

// Function to read all cars from the JSON server
export async function readAllCarsToJson(): Promise<Car[]> {
    try {
        const response = await fetch('http://localhost:3000/cars');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const cars = await response.json();
        return cars;
    } catch (error) {
        console.error('Error fetching all cars:', error);
        return [];
    }
}

// Function to read a car by ID from the JSON server
export async function readCarByIdToJson(id: number): Promise<Car | null> {
    try {
        const response = await fetch(`http://localhost:3000/cars/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const car = await response.json();
        return car;
    } catch (error) {
        console.error('Error fetching car by ID:', error);
        return null;
    }
}

// Function to delete a car by ID from the JSON server
export async function deleteCarByIdToJson(id: number): Promise<void> {
    try {
        const response = await fetch(`http://localhost:3000/cars/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error deleting car by ID:', error);
    }
}

export async function saveCarsToJson(cars: Car[]) {
    // Mock function to simulate saving cars to a JSON file
    try {
        await fetch('http://localhost:3000/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cars),
        });
    } catch (error) {
        console.error('Error saving cars:', error);
    }
}

// Function to update a car by ID on the JSON server
export async function updateCarByIdToJson(id: number, updatedCar: Partial<Car>): Promise<Car | null> {
    try {
        const response = await fetch(`http://localhost:3000/cars/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCar),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const car = await response.json();
        return car;
    } catch (error) {
        console.error('Error updating car by ID:', error);
        return null;
    }
}

// Function to create an array of fake brand data
function generateFakeBrands(numBrands: number): Brand[] {
    return Array.from({ length: numBrands }, () => new Brand());
}

// Function to save brands to localStorage
export function saveBrandsToLocalStorage(brands: Brand[]) {
    localStorage.setItem('brands', JSON.stringify(brands));
}

// Function to get brands from localStorage
export function getBrandsFromLocalStorage(): Brand[] | null {
    const carsJson = localStorage.getItem('cars');
    if (!carsJson) return null;

    const cars: Car[] = JSON.parse(carsJson);
    const brands = cars.map(car => car.brand);

    // Remove duplicates and sort alphabetically
    const uniqueSortedBrands = Array.from(new Set(brands.map(brand => brand.name)))
        .sort()
        .map(name => brands.find(brand => brand.name === name)!);

    return uniqueSortedBrands;
}

// Function to create fake brand data and save to localStorage
export function createFakeBrandData(numBrands: number) {
    const brands = generateFakeBrands(numBrands);
    saveBrandsToLocalStorage(brands);
    return brands;
}

// Function to read all brands from the JSON server
export async function readAllBrandsToJson(): Promise<Brand[]> {
    try {
        const response = await fetch('http://localhost:3000/brands');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const brands = await response.json();
        return brands;
    } catch (error) {
        console.error('Error fetching all brands:', error);
        return [];
    }
}

// Function to read a brand by ID from the JSON server
export async function readBrandByIdToJson(id: number): Promise<Brand | null> {
    try {
        const response = await fetch(`http://localhost:3000/brands/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const brand = await response.json();
        return brand;
    } catch (error) {
        console.error('Error fetching brand by ID:', error);
        return null;
    }
}

// Function to update a brand by ID on the JSON server
export async function updateBrandByIdToJson(id: number, updatedBrand: Partial<Brand>): Promise<Brand | null> {
    try {
        const response = await fetch(`http://localhost:3000/brands/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBrand),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const brand = await response.json();
        return brand;
    } catch (error) {
        console.error('Error updating brand by ID:', error);
        return null;
    }
}

// Function to delete a brand by ID from the JSON server
export async function deleteBrandByIdToJson(id: number): Promise<void> {
    try {
        const response = await fetch(`http://localhost:3000/brands/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error deleting brand by ID:', error);
    }
}

// Function to convert price to XAF
export function convertToXAF(price: number, currency: Currency): number {
    const conversionRates: { [key: string]: number } = {
        USD: 600,
        EUR: 655,
        GBP: 750,
        JPY: 5,
        CAD: 450,
        AUD: 400,
        CNY: 90,
        INR: 8,
        ZAR: 32,
        NGN: 1.30,
        GHS: 100,
        XAF: 1,
        XOF: 1,
        CHF: 670,
        BRL: 110,
        RUB: 8,
        SEK: 60,
        NOK: 63,
        DKK: 88,
        MXN: 30,
        AED: 163,
        KES: 5.5,
        SAR: 160,
        TRY: 22,
        SGD: 440,
        HKD: 75,
        KRW: 0.5,
        NZD: 370,
        BDT: 7,
        PLN: 150,
        ARS: 2,
    };

    const rate = conversionRates[currency.code] || 1;
    return price * rate;
}

// Function to read all categories from the JSON server
export async function readAllCategoriesToJson(): Promise<Category[]> {
    try {
        const response = await fetch('http://localhost:3000/categories');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const categories = await response.json();
        return categories;
    } catch (error) {
        console.error('Error fetching all categories:', error);
        return [];
    }
}

// Function to read a category by ID from the JSON server
export async function readCategoryByIdToJson(id: number): Promise<Category | null> {
    try {
        const response = await fetch(`http://localhost:3000/categories/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const category = await response.json();
        return category;
    } catch (error) {
        console.error('Error fetching category by ID:', error);
        return null;
    }
}

// Function to create a new category on the JSON server
export async function createCategoryToJson(newCategory: Category): Promise<Category | null> {
    try {
        const response = await fetch('http://localhost:3000/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCategory),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const category = await response.json();
        return category;
    } catch (error) {
        console.error('Error creating category:', error);
        return null;
    }
}

// Function to update a category by ID on the JSON server
export async function updateCategoryByIdToJson(id: number, updatedCategory: Partial<Category>): Promise<Category | null> {
    try {
        const response = await fetch(`http://localhost:3000/categories/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCategory),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const category = await response.json();
        return category;
    } catch (error) {
        console.error('Error updating category by ID:', error);
        return null;
    }
}

// Function to delete a category by ID from the JSON server
export async function deleteCategoryByIdToJson(id: number): Promise<void> {
    try {
        const response = await fetch(`http://localhost:3000/categories/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error deleting category by ID:', error);
    }
}

// Function to format a price with thousands separators and two decimal places
export function formatPrice(price: number): string {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XAF',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(price);
}

export interface Testimonial {
    id: number;
    name: string;
    rating: number;
    comment: string;
}

// Function to read all testimonials from the JSON server
export async function readAllTestimonialsToJson(): Promise<Testimonial[]> {
    try {
        const response = await fetch('http://localhost:3000/testimonials');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const testimonials = await response.json();
        return testimonials;
    } catch (error) {
        console.error('Error fetching all testimonials:', error);
        return [];
    }
}

// Function to read a testimonial by ID from the JSON server
export async function readTestimonialByIdToJson(id: number): Promise<Testimonial | null> {
    try {
        const response = await fetch(`http://localhost:3000/testimonials/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const testimonial = await response.json();
        return testimonial;
    } catch (error) {
        console.error('Error fetching testimonial by ID:', error);
        return null;
    }
}

// Function to create a new testimonial on the JSON server
export async function createTestimonialToJson(newTestimonial: Testimonial): Promise<Testimonial | null> {
    try {
        const response = await fetch('http://localhost:3000/testimonials', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTestimonial),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const testimonial = await response.json();
        return testimonial;
    } catch (error) {
        console.error('Error creating testimonial:', error);
        return null;
    }
}

// Function to update a testimonial by ID on the JSON server
export async function updateTestimonialByIdToJson(id: number, updatedTestimonial: Partial<Testimonial>): Promise<Testimonial | null> {
    try {
        const response = await fetch(`http://localhost:3000/testimonials/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTestimonial),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const testimonial = await response.json();
        return testimonial;
    } catch (error) {
        console.error('Error updating testimonial by ID:', error);
        return null;
    }
}

// Function to delete a testimonial by ID from the JSON server
export async function deleteTestimonialByIdToJson(id: number): Promise<void> {
    try {
        const response = await fetch(`http://localhost:3000/testimonials/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error deleting testimonial by ID:', error);
    }
}