import React, { useState, useRef, useEffect } from 'react';
import { FaGlobe, FaChevronDown, FaCheck } from 'react-icons/fa';
import { useLanguage } from '../i18n/useI18n';
import { Language } from '../i18n/translations';

interface LanguageSelectorProps {
  variant?: 'default' | 'mobile' | 'footer';
  className?: string;
}

// Flags/emojis para cada língua
const languageFlags: Record<Language, string> = {
  pt: '🇵🇹',
  en: '🇺🇸', 
  umb: '🇦🇴',
  kmb: '🇦🇴',
  lun: '🇦🇴'
};

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  variant = 'default',
  className = ''
}) => {
  const { currentLanguage, changeLanguage, availableLanguages, getLanguageName } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (language: Language) => {
    changeLanguage(language);
    setIsOpen(false);
  };

  // Estilos baseados na variante
  const getVariantStyles = () => {
    switch (variant) {
      case 'mobile':
        return {
          container: 'w-full',
          button: 'w-full bg-white/10 border border-white/20 text-white hover:bg-white/20',
          dropdown: 'w-full bg-white/95 backdrop-blur-sm border border-white/20',
          item: 'text-gray-800 hover:bg-green-50'
        };
      case 'footer':
        return {
          container: 'w-auto',
          button: 'bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700',
          dropdown: 'bg-gray-900 border border-gray-700',
          item: 'text-gray-300 hover:bg-gray-800'
        };
      default:
        return {
          container: 'w-auto',
          button: 'bg-white border border-gray-200 text-gray-800 hover:bg-gray-50',
          dropdown: 'bg-white border border-gray-200',
          item: 'text-gray-800 hover:bg-gray-50'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`relative ${styles.container} ${className}`} ref={dropdownRef}>
      {/* Botão Principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-between px-4 py-2 rounded-lg
          transition-all duration-200 min-w-[140px]
          ${styles.button}
        `}
        aria-label="Selecionar idioma"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center gap-2">
          <FaGlobe className="text-sm" />
          <span className="text-sm font-medium">
            {languageFlags[currentLanguage]} {getLanguageName(currentLanguage)}
          </span>
        </div>
        <FaChevronDown 
          className={`text-xs transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div 
          className={`
            absolute top-full mt-1 rounded-lg shadow-lg z-50
            ${styles.dropdown}
            ${variant === 'mobile' ? 'left-0 right-0' : 'left-0'}
          `}
          role="listbox"
          aria-label="Lista de idiomas"
        >
          <div className="py-1">
            {availableLanguages.map((language) => (
              <button
                key={language}
                onClick={() => handleLanguageChange(language)}
                className={`
                  w-full flex items-center justify-between px-4 py-2
                  text-sm transition-colors duration-150
                  ${styles.item}
                  ${currentLanguage === language ? 'bg-green-100 text-green-800' : ''}
                `}
                role="option"
                aria-selected={currentLanguage === language}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">
                    {languageFlags[language]}
                  </span>
                  <span className="font-medium">
                    {getLanguageName(language)}
                  </span>
                </div>
                {currentLanguage === language && (
                  <FaCheck className="text-green-600 text-xs" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};