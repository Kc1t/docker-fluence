import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CopyButtonProps {
  text: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 rounded-md transition-all duration-200 hover:bg-gray-700/50 group"
      title="Copiar comando"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-500 animate-in fade-in duration-300" />
      ) : (
        <Copy className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
      )}
    </button>
  );
};

export default CopyButton; 