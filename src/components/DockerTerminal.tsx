import React, { useState, useRef, useEffect } from 'react';
import CopyButton from './CopyButton';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

interface TerminalLine {
    type: 'command' | 'output' | 'loading';
    content: string;
    isApiResponse?: boolean;
    isSystemMessage: boolean;
}

const LoadingDots = () => {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.');
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return <span className="text-gray-400">{dots}</span>;
};

const TypewriterText = ({ text }: { text: string }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, 20);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text]);

    return <span>{displayText}</span>;
};

const DockerTerminal = () => {
    const { language } = useLanguage();
    const t = translations[language];
    const [command, setCommand] = useState('');
    const [history, setHistory] = useState<TerminalLine[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const terminalEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const isFirstRender = useRef(true);

    // Inicializa o histórico na primeira renderização
    useEffect(() => {
        if (isFirstRender.current) {
            setHistory([
                { type: 'output', content: t.welcomeMessage, isApiResponse: false, isSystemMessage: true },
                { type: 'output', content: t.inputPlaceholder, isApiResponse: false, isSystemMessage: true },
                { type: 'output', content: '', isApiResponse: false, isSystemMessage: false }
            ]);
            isFirstRender.current = false;
        }
    }, [t]);

    // Atualiza as mensagens do sistema quando o idioma muda
    useEffect(() => {
        if (!isFirstRender.current) {
            setHistory(prev => prev.map(line => {
                if (line.content === translations['pt-BR'].welcomeMessage ||
                    line.content === translations['en'].welcomeMessage) {
                    return { ...line, content: t.welcomeMessage };
                }
                if (line.content === translations['pt-BR'].inputPlaceholder ||
                    line.content === translations['en'].inputPlaceholder) {
                    return { ...line, content: t.inputPlaceholder };
                }
                return line;
            }));
        }
    }, [language, t]);

    const scrollToBottom = () => {
        terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [history]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!command.trim() || isProcessing) return;

        const trimmedCommand = command.trim();
        setHistory(prev => [...prev, { type: 'command', content: trimmedCommand, isApiResponse: false, isSystemMessage: false }]);
        setCommand('');
        setIsProcessing(true);
        setHistory(prev => [...prev, {
            type: 'loading',
            content: language === 'pt-BR' ? 'Processando requisição' : 'Processing request',
            isApiResponse: false,
            isSystemMessage: true
        }]);

        try {
            const response = await fetch('/api/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: trimmedCommand, language }),
            });

            const data = await response.json();
            setHistory(prev => {
                const newHistory = [...prev];
                newHistory.pop();
                return [...newHistory, {
                    type: 'output',
                    content: data.result,
                    isApiResponse: true,
                    isSystemMessage: false
                }];
            });
        } catch {
            setHistory(prev => {
                const newHistory = [...prev];
                newHistory.pop();
                return [...newHistory, {
                    type: 'output',
                    content: language === 'pt-BR' ? 'Erro: Falha ao executar o comando' : 'Error: Failed to execute command',
                    isApiResponse: false,
                    isSystemMessage: true
                }];
            });
        } finally {
            setIsProcessing(false);
            setHistory(prev => [...prev, {
                type: 'output',
                content: '',
                isApiResponse: false,
                isSystemMessage: false
            }]);
        }
    };

    const handleTerminalClick = () => {
        inputRef.current?.focus();
    };

    const getCurrentPath = () => {
        return '/docker $ ';
    };

    return (
        <div
            onClick={handleTerminalClick}
            className="w-full rounded-lg overflow-hidden border border-gray-800 bg-[#1E1E1E] font-mono"
        >
            {/* Terminal Header */}
            <div className="flex items-center px-4 py-2 bg-[#2D2D2D] border-b border-gray-800">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                </div>
                <div className="ml-4 flex items-center space-x-2">
                    <svg className="w-5 h-5 text-[#00B5E2]" viewBox="0 0 640 512" fill="currentColor">
                        <path d="M349.9 236.3h-66.1v-59.4h66.1v59.4zm0-204.3h-66.1v60.7h66.1V32zm78.2 144.8H362v59.4h66.1v-59.4zm-156.3-72.1h-66.1v60.1h66.1v-60.1zm78.1 0h-66.1v60.1h66.1v-60.1zm276.8 100c-14.4-9.7-47.6-13.2-73.1-8.4-3.3-24-16.7-44.9-41.1-63.7l-14-9.3-9.3 14c-18.4 27.8-23.4 73.6-3.7 103.8-8.7 4.7-25.8 11.1-48.4 10.7H2.4c-8.7 50.8 5.8 116.8 44 162.1 37.1 43.9 92.7 66.2 165.4 66.2 157.4 0 273.9-72.5 328.4-204.2 21.4.4 67.6.1 91.3-45.2 1.5-2.5 6.6-13.2 8.5-17.1l-13.3-8.9zm-511.1-27.9h-66v59.4h66.1v-59.4zm78.1 0h-66.1v59.4h66.1v-59.4zm78.1 0h-66.1v59.4h66.1v-59.4zm-78.1-72.1h-66.1v60.1h66.1v-60.1z" />
                    </svg>
                    <span className="text-sm text-gray-400">docker-terminal</span>
                </div>
            </div>

            {/* Terminal Content */}
            <div className="p-4 bg-[#0D1117] h-[400px] overflow-y-auto text-sm leading-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-gray-600">
                <div className="space-y-1">
                    {history.map((line, index) => (
                        <div key={index} className="text-white group">
                            {line.type === 'command' ? (
                                <div className="flex">
                                    <span className="text-[#00B5E2] mr-2">{getCurrentPath()}</span>
                                    <span>{line.content}</span>
                                </div>
                            ) : line.type === 'loading' ? (
                                <div className="flex items-center text-gray-400">
                                    <span className="mr-2">→</span>
                                    <span>{line.content}</span>
                                    <LoadingDots />
                                </div>
                            ) : (
                                <div className="flex justify-between items-start text-gray-300 whitespace-pre-wrap pl-0 group">
                                    <TypewriterText text={line.content} />
                                    {line.content && line.isApiResponse && !line.isSystemMessage && (
                                        <CopyButton text={line.content.replace(/^`|`$/g, '').trim()} />
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="flex items-center">
                        <span className="text-[#00B5E2] mr-2">{getCurrentPath()}</span>
                        <form onSubmit={handleSubmit} className="flex-1">
                            <input
                                ref={inputRef}
                                type="text"
                                value={command}
                                onChange={(e) => setCommand(e.target.value)}
                                className="w-full bg-transparent text-white outline-none"
                                disabled={isProcessing}
                                autoFocus
                            />
                        </form>
                    </div>
                </div>
                <div ref={terminalEndRef} />
            </div>
        </div>
    );
};

export default DockerTerminal; 