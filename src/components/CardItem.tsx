import { Car, convertToXAF, formatPrice } from '../shared/datas';
import { Separator } from '@radix-ui/react-select';
import { LuFuel } from 'react-icons/lu';
import { GiGearStickPattern } from 'react-icons/gi';
import { TbBrandSpeedtest, TbCurrencyXrp } from 'react-icons/tb';
import { MdOpenInNew } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const badgeStyle = {
    position: 'absolute' as const,
    top: '10px',
    left: '10px',
    backgroundColor: 'green',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
    zIndex: 1,
    transform: 'rotate(15deg)',
};

export default function CardItem({ car, isNew }: { car: Car, isNew: boolean }) {
    const { t } = useTranslation();

    return (
        <div className="relative bg-white shadow rounded-lg p-2 cursor-pointer">
            <div className="mb-2 relative">
                <img
                    src={car.imageUrl}
                    alt={car.name}
                    width={'100%'}
                    height={250}
                    className="w-full h-48 object-cover rounded-t-xl"
                />
                {isNew && <span style={badgeStyle}>{t('navigation.new')}</span>}
            </div>

            <div className="pb-5 pt-2">
                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{car.name}</h5>
                <Separator style={{ border: '1px solid black', height: '2px' }} />
                <div className="flex items-center justify-between mt-2">
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
                <Separator className="mt-3" style={{ height: '0.5px', backgroundColor: 'black' }} />
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center font-bold">
                        <TbCurrencyXrp />
                        &nbsp;
                        <span>{formatPrice(convertToXAF(car.price, car.currency))}</span>
                    </div>

                    <div>
                        <Link className="flex items-center justify-between" to={'/'}>
                            <MdOpenInNew />
                            &nbsp;{t('components.popularCars.viewDetails')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

