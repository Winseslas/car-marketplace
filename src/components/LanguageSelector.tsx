import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Define the type for the language options
interface Language {
    code: string;
    label: string;
}

const languages: Language[] = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
];

// Define the props for the LanguageSelector component
interface LanguageSelectorProps {
    formClassName?: string;
    labelClassName?: string;
    selectClassName?: string;
    onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({formClassName = '', labelClassName = '', selectClassName = '', onLanguageChange, }) => {

    const [language, setLanguage] = useState<string>('en');
    const { t, i18n } = useTranslation();

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = e.target.value;
        setLanguage(selectedLanguage);
        i18n.changeLanguage(selectedLanguage);
        onLanguageChange(selectedLanguage);
        console.log(`Langue changée en: ${selectedLanguage}`);
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
                value={language}
                onChange={handleLanguageChange} >
                {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.label}
                    </option>
                ))}
            </select>
        </form>
    );
};

export default LanguageSelector;
