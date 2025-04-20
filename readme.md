# 🐳 DockerFluence


<div align="center">
  <img src="public/docker-icon.png" alt="DockerFluence Logo" width="120" />
  <p><strong>Fast & Easy Docker Command Generator</strong></p>
</div>

## 📝 Sobre o Projeto

DockerFluence é um gerador de comandos Docker baseado em IA, inspirado no excelente [GitFluence](https://www.gitfluence.com). Este projeto foi desenvolvido como meu primeiro "vibe code" completo usando o Cursor IDE, com o objetivo de praticar e aprender novas tecnologias.

> **Nota**: Este é um projeto de estudo e prática, inspirado no GitFluence para fins educacionais.

> **Fato Engraçado** 🙈: Em um momento peak "vibe code", as chaves da API Gemini foram acidentalmente commitadas. Menos mal que eram temporárias! Lição aprendida: mesmo no flow mais intenso do "vibe code", sempre double check seus .envs!

## 🚀 Tecnologias Utilizadas

- [Next.js 14](https://nextjs.org/) - Framework React com App Router
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Gemini API](https://deepmind.google/technologies/gemini/) - Modelo de IA para geração de comandos
- [Shadcn/ui](https://ui.shadcn.com/) - Componentes React reutilizáveis
- [Cursor](https://cursor.sh/) - IDE com suporte a IA

## ⚙️ Configuração do Projeto

1. Clone o repositório:
```bash
git clone https://github.com/Kc1t/docker-fluence.git
cd docker-fluence
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

4. Adicione sua chave da API Gemini no arquivo .env.local:
```env
GEMINI_API_KEY=sua_chave_aqui
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🎯 Funcionalidades

- Interface moderna e responsiva
- Geração de comandos Docker usando IA
- Terminal interativo com histórico de comandos
- Suporte a temas claro/escuro
- Animações suaves e feedback visual

## ⏱️ Tempo de Desenvolvimento

O projeto foi desenvolvido em apenas 30 minutos usando o Cursor IDE, demonstrando o poder do "vibe code" e desenvolvimento assistido por IA. O fluxo de desenvolvimento foi:

- 10min: Setup inicial e estrutura do projeto
- 10min: Desenvolvimento da interface e componentes
- 5min: Integração com a API Gemini e lógica do terminal
- 5min: Refinamentos e documentação

> **Nota**: Este tempo surpreendentemente rápido foi possível graças ao uso do Cursor IDE e sua integração com IA, além de componentes reutilizáveis do Shadcn/ui.

## 🤝 Contribuição

Este é um projeto de estudo, mas sugestões são sempre bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- [GitFluence](https://www.gitfluence.com) - Por servir como inspiração para este projeto
- [Cursor](https://cursor.sh/) - Pela excelente IDE que tornou o desenvolvimento mais produtivo
- [Docker](https://www.docker.com/) - Pela tecnologia incrível que inspirou este projeto

---

<div align="center">
  Desenvolvido com 💙 por <a href="https://github.com/Kc1t">Kc1t</a>
</div>
