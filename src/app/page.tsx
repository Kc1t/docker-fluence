'use client';

import DockerTerminal from '../components/DockerTerminal';
import { Button } from "@/components/ui/button";

export default function Home() {
  const handleCommandSubmit = async (command: string): Promise<string> => {
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: command }),
      });

      const data = await response.json();
      return data.result.replace(/^`|`$/g, '').trim();
    } catch (error) {
      console.error('Error:', error);
      return 'Error: Failed to execute command';
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] bg-grid-white/[0.02]">
      {/* Header */}
      <header className="w-full border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-[#0DB7ED]" viewBox="0 0 640 512" fill="currentColor">
              <path d="M349.9 236.3h-66.1v-59.4h66.1v59.4zm0-204.3h-66.1v60.7h66.1V32zm78.2 144.8H362v59.4h66.1v-59.4zm-156.3-72.1h-66.1v60.1h66.1v-60.1zm78.1 0h-66.1v60.1h66.1v-60.1zm276.8 100c-14.4-9.7-47.6-13.2-73.1-8.4-3.3-24-16.7-44.9-41.1-63.7l-14-9.3-9.3 14c-18.4 27.8-23.4 73.6-3.7 103.8-8.7 4.7-25.8 11.1-48.4 10.7H2.4c-8.7 50.8 5.8 116.8 44 162.1 37.1 43.9 92.7 66.2 165.4 66.2 157.4 0 273.9-72.5 328.4-204.2 21.4.4 67.6.1 91.3-45.2 1.5-2.5 6.6-13.2 8.5-17.1l-13.3-8.9zm-511.1-27.9h-66v59.4h66.1v-59.4zm78.1 0h-66.1v59.4h66.1v-59.4zm78.1 0h-66.1v59.4h66.1v-59.4zm-78.1-72.1h-66.1v60.1h66.1v-60.1z"/>
            </svg>
            <h1 className="text-2xl font-bold text-[#0DB7ED]">DockerFluence</h1>
          </div>
          <Button variant="outline" className="text-[#0DB7ED] border-[#0DB7ED] hover:bg-[#0DB7ED] hover:text-white">
            Get Started
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-gray-800/50 text-sm text-gray-400">
            Fast & Easy Docker Command Generator
          </div>
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent leading-tight">
            Find the Docker Command<br />You Need Now!
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            The AI-driven solution that helps you quickly find the right command.
            Get started with Docker Command Generator today and save time.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Glow Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0DB7ED] to-[#0077b6] opacity-75 blur"></div>
          <div className="relative">
            <DockerTerminal onCommandSubmit={handleCommandSubmit} />
          </div>
        </div>
      </main>

      {/* Grid Background */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
    </div>
  );
}
