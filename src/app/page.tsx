'use client';

import DockerTerminal from '../components/DockerTerminal';
import LanguageSelector from '../components/LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-[#0D1117] bg-grid-white/[0.02]">
      {/* Header */}
      <header className="w-full border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-white" viewBox="0 0 640 512" fill="currentColor">
              <path d="M349.9 236.3h-66.1v-59.4h66.1v59.4zm0-204.3h-66.1v60.7h66.1V32zm78.2 144.8H362v59.4h66.1v-59.4zm-156.3-72.1h-66.1v60.1h66.1v-60.1zm78.1 0h-66.1v60.1h66.1v-60.1zm276.8 100c-14.4-9.7-47.6-13.2-73.1-8.4-3.3-24-16.7-44.9-41.1-63.7l-14-9.3-9.3 14c-18.4 27.8-23.4 73.6-3.7 103.8-8.7 4.7-25.8 11.1-48.4 10.7H2.4c-8.7 50.8 5.8 116.8 44 162.1 37.1 43.9 92.7 66.2 165.4 66.2 157.4 0 273.9-72.5 328.4-204.2 21.4.4 67.6.1 91.3-45.2 1.5-2.5 6.6-13.2 8.5-17.1l-13.3-8.9zm-511.1-27.9h-66v59.4h66.1v-59.4zm78.1 0h-66.1v59.4h66.1v-59.4zm78.1 0h-66.1v59.4h66.1v-59.4zm-78.1-72.1h-66.1v60.1h66.1v-60.1z" />
            </svg>
            <h1 className="text-2xl font-bold text-white">DockerFluence</h1>
          </div>
          <a 
            href="https://github.com/Kc1t/docker-fluence" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </header>

      {/* Language Selector */}
      <LanguageSelector />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-gray-800/50 text-sm text-gray-400">
            {t.badge}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 py-2 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent leading-tight">
            {t.title}<br />{t.subtitle}
          </h2>
          <p className="text-gray-400 text-base md:text-lg mb-8 max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Glow Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#fff] to-[#fff] opacity-5 blur"></div>
          <div className="relative">
            <DockerTerminal />
          </div>
        </div>
      </main>

      {/* Grid Background */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
    </div>
  );
}
