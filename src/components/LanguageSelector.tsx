import { useTranslation } from 'react-i18next';
import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from './LanguageContext';
import Flags from "country-flag-icons/react/3x2";

// Define the type for the language options
interface Language {
    code: string;
    label: string;
    flag: React.ElementType;  // Type for the flag component
}

// List of languages with their respective labels and flags
const languages: Language[] = [
    { code: 'en', label: 'English', flag: Flags.GB },
    { code: 'fr', label: 'Français', flag: Flags.FR },
];

// Define the props for the LanguageSelector component
interface LanguageSelectorProps {
    formClassName?: string;
    labelClassName?: string;
    selectClassName?: string;
    onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ formClassName = '', labelClassName = '', selectClassName = '', onLanguageChange, }) => {
    const [, setLanguage] = useState<string>('en');
    const { t, i18n } = useTranslation();
    const languageContext = useContext(LanguageContext);
    
    // We will directly render the selected flag based on the current language context
    const currentLanguage = languageContext?.language || 'en';
    const CurrentFlag = languages.find((lang) => lang.code === currentLanguage)?.flag || null;
    
    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = e.target.value;
        setLanguage(selectedLanguage);
        i18n.changeLanguage(selectedLanguage);
        onLanguageChange(selectedLanguage);
        // console.log(`Langue changée en: ${selectedLanguage}`);
    };

    useEffect(() => {
        console.log(i18n.dir());
        document.body.dir = i18n.dir();
    }, [i18n, i18n.language]);

    return (
        <form className={formClassName}>
            <label htmlFor="language-select" className={labelClassName}>
                {t('components.footer.languageLabel')}
            </label>
            <select
                id="language-select"
                name="language"
                className={selectClassName}
                value={currentLanguage}
                onChange={handleLanguageChange} >
                {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                       {lang.label}
                       {/* {CurrentFlag && <CurrentFlag className="flag-icon me-2" />}  */}
                    </option>
                ))}
            </select>
        </form>
    );
};

export default LanguageSelector;
