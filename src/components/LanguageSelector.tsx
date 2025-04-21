'use client';

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-[#1E1E1E] border border-gray-800 rounded-lg p-2 space-y-2">
      <button
        onClick={() => setLanguage('pt-BR')}
        className={`w-8 h-8 flex items-center justify-center rounded ${
          language === 'pt-BR' ? 'bg-[#00B5E2] text-white' : 'text-gray-400 hover:text-white'
        }`}
        title="Português"
      >
        🇧🇷
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`w-8 h-8 flex items-center justify-center rounded ${
          language === 'en' ? 'bg-[#00B5E2] text-white' : 'text-gray-400 hover:text-white'
        }`}
        title="English"
      >
        🇺🇸
      </button>
    </div>
  );
};

export default LanguageSelector; 