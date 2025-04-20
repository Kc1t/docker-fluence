import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'SUA_API_KEY');

export async function POST(request: Request) {
    try {
        const { prompt } = await request.json();

        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const result = await model.generateContent(
            `Você é um especialista em Docker. Responda com o comando Docker correto para: ${prompt}. 
      Forneça apenas o comando, sem explicações adicionais.`
        );

        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ result: text });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Erro ao processar a requisição' },
            { status: 500 }
        );
    }
} 