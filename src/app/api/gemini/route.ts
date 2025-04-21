import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

type Language = 'pt-BR' | 'en';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'SUA_API_KEY');

export async function POST(request: Request) {
    let language: Language = 'pt-BR';
    
    try {
        const data = await request.json() as { prompt: string; language?: Language };
        const { prompt } = data;
        language = data.language || 'pt-BR';

        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const promptByLanguage = {
            'pt-BR': `Você é um especialista em Docker. Responda com o comando Docker correto para: ${prompt}. 
                     Forneça apenas o comando, sem explicações adicionais.`,
            'en': `You are a Docker expert. Respond with the correct Docker command for: ${prompt}. 
                  Provide only the command, without additional explanations.`
        };

        const result = await model.generateContent(promptByLanguage[language]);

        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ result: text });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: language === 'pt-BR' ? 'Erro ao processar a requisição' : 'Error processing request' },
            { status: 500 }
        );
    }
} 