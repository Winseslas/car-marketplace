import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from './../ui/button';
import Search from './Search';
import heroImage from '/hero-section-background-image-blue.png';
import { useUser } from '@clerk/clerk-react';
const Hero: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { isSignedIn } = useUser();

    const handleSignInClick = () => {
        navigate('/sign-in');
    };

    return (
        <div className="rounded-lg relative bg-cover bg-center overflow-hidden">
            <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-center">
                    {t('components.hero.title')}
                </h1>
                <p className="text-lg md:text-xl text-white mb-8 max-w-2xl text-center">
                    {t('components.hero.subtitle')}
                </p>
                {!isSignedIn &&(<Button variant="default" size="lg" onClick={handleSignInClick} className='hover:scale-105 transition-all cursor-pointer hover:bg-primary border-none'>
                    {t('navigation.signIn')}
                </Button>)}

                <div className="mt-4 w-full flex justify-center">
                    <Search />
                </div>
            </div>
            <img src={heroImage} alt="Hero Image" className="mt-10 w-full object-cover" />
        </div>
    );
};

export default Hero;