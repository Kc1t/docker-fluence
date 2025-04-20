import React from 'react';
import { Check, Copy } from 'lucide-react';

interface CommandResultProps {
  command: string;
  result: string;
}

const CommandResult: React.FC<CommandResultProps> = ({ command, result }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="w-full rounded-lg overflow-hidden border border-gray-800 bg-[#1E1E1E]">
      {/* Command Header */}
      <div className="px-4 py-3 bg-[#2D2D2D] border-b border-gray-800">
        <div className="flex items-center text-gray-400">
          <span className="text-[#0DB7ED] font-mono mr-2">$</span>
          <span className="font-mono">{command}</span>
        </div>
      </div>

      {/* Command Result */}
      <div className="p-4 bg-gradient-to-b from-[#1E1E1E] to-[#0D1117]">
        <div className="relative group">
          <pre className="font-mono text-white whitespace-pre-wrap bg-[#0D1117] rounded p-4">
            {result}
          </pre>
          <button
            onClick={copyToClipboard}
            className="absolute top-2 right-2 p-2 rounded-md bg-gray-800/50 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-700"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommandResult; 