import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Language, Translations, translations, languageNames } from './translations';

// Contexto para o sistema de internacionalização
interface I18nContextType {
  currentLanguage: Language;
  t: Translations;
  changeLanguage: (language: Language) => void;
  availableLanguages: Language[];
  getLanguageName: (language: Language) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Função para detectar a língua do sistema
const detectSystemLanguage = (): Language => {
  if (typeof window === 'undefined') return 'pt'; // Padrão para SSR
  
  const browserLang = navigator.language.toLowerCase();
  
  // Mapear códigos de língua do navegador para nossas línguas suportadas
  const languageMapping: Record<string, Language> = {
    'pt': 'pt',
    'pt-br': 'pt',
    'pt-pt': 'pt',
    'pt-ao': 'pt',  // Português de Angola
    'en': 'en',
    'en-us': 'en',
    'en-gb': 'en',
    'en-ca': 'en',
    'en-au': 'en',
    'umb': 'umb',   // Umbundu
    'kmb': 'kmb',   // Kimbundu
    'lun': 'lun'    // Lunda
  };
  
  // Tentar correspondência exata primeiro
  if (languageMapping[browserLang]) {
    return languageMapping[browserLang];
  }
  
  // Tentar correspondência por prefixo (ex: 'pt-XX' -> 'pt')
  const langPrefix = browserLang.split('-')[0];
  if (languageMapping[langPrefix]) {
    return languageMapping[langPrefix];
  }
  
  // Se for Angola, preferir português
  if (browserLang.includes('ao') || browserLang.includes('angola')) {
    return 'pt';
  }
  
  // Padrão para português
  return 'pt';
};

// Função para salvar a língua selecionada
const saveLanguagePreference = (language: Language) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('farm-navigators-language', language);
  }
};

// Função para carregar a língua salva
const loadLanguagePreference = (): Language | null => {
  if (typeof window === 'undefined') return null;
  
  const saved = localStorage.getItem('farm-navigators-language');
  if (saved && Object.keys(translations).includes(saved)) {
    return saved as Language;
  }
  
  return null;
};

// Provider do contexto de internacionalização
interface I18nProviderProps {
  children: ReactNode;
  initialLanguage?: Language;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ 
  children, 
  initialLanguage 
}) => {
  // Determinar a língua inicial
  const getInitialLanguage = (): Language => {
    // 1. Usar língua explicitamente definida
    if (initialLanguage) return initialLanguage;
    
    // 2. Usar língua salva nas preferências
    const savedLanguage = loadLanguagePreference();
    if (savedLanguage) return savedLanguage;
    
    // 3. Detectar língua do sistema
    return detectSystemLanguage();
  };

  const [currentLanguage, setCurrentLanguage] = useState<Language>(getInitialLanguage);

  const changeLanguage = (language: Language) => {
    setCurrentLanguage(language);
    saveLanguagePreference(language);
    
    // Atualizar o atributo lang do documento
    if (typeof window !== 'undefined') {
      document.documentElement.lang = language;
    }
  };

  const getLanguageName = (language: Language): string => {
    return languageNames[language] || language;
  };

  // Efeito para definir a língua do documento na inicialização
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = currentLanguage;
    }
  }, [currentLanguage]);

  const value: I18nContextType = {
    currentLanguage,
    t: translations[currentLanguage],
    changeLanguage,
    availableLanguages: Object.keys(translations) as Language[],
    getLanguageName
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

// Hook para usar o sistema de internacionalização
export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n deve ser usado dentro de um I18nProvider');
  }
  return context;
};

// Hook simplificado para apenas traduções
export const useTranslations = (): Translations => {
  const { t } = useI18n();
  return t;
};

// Hook para mudança de língua
export const useLanguage = () => {
  const { currentLanguage, changeLanguage, availableLanguages, getLanguageName } = useI18n();
  
  return {
    currentLanguage,
    changeLanguage,
    availableLanguages,
    getLanguageName
  };
};