import React, { useEffect, useState } from 'react';
import { Car, getCarsFromLocalStorage } from '../../data/datas';
import CardItem from './CardItem';
import Autoplay from "embla-carousel-autoplay"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./../../components/ui/carousel"


function PopularCars() {
    const [cars, setCars] = useState<Car[]>([]);

    useEffect(() => {
        const fetchCars = () => {
            const storedCars = getCarsFromLocalStorage();
            if (storedCars && storedCars.length > 0) {
                setCars(storedCars.slice(0, 12));
            }
        };

        fetchCars();
    }, []);

    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    return (
        <div className="container mx-auto mt-0 pb-20">
            <Carousel plugins={[plugin.current]} className="relative w-full">
                <CarouselContent>
                    {cars.map((car) => (
                        <CarouselItem key={car.id} className='sm:basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4'>
                            <CardItem car={car} isNew={Math.random() < 0.5} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}

export default PopularCars;
