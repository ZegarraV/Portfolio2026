import React, { createContext, useState, useContext, useEffect } from 'react';
import translations from '@/data/translations.json';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('portfolioLanguage');
    return savedLanguage || 'pt-BR';
  });

  useEffect(() => {
    localStorage.setItem('portfolioLanguage', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'pt-BR' ? 'en-US' : 'pt-BR'));
  };

  const t = (path, options = {}) => {
    const keys = path.split('.');
    let current = translations[language];

    for (const key of keys) {
      if (current === undefined || current[key] === undefined) {
        console.warn(`Translation key not found: ${path} for language: ${language}`);
        return path; // Fallback to key path if not found
      }
      current = current[key];
    }

    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};