# 🌍 Wenda - Smart Tourism Platform in Angola

[English](#english) | [Português](#português)

---

## English

### 🚀 Overview

**Wenda** is a smart tourism platform designed to boost Angola's tourism sector by supporting public managers, businesses, and travelers with data-driven insights, forecasts, and personalized recommendations.

This repository contains the **Web Frontend** - an administrative interface for government and tourism operators that displays charts, forecasts, interactive maps, and comprehensive reports.

### 🛠️ Tech Stack

- **React** - UI library for building user interfaces
- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code quality and consistency

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### 🏁 Getting Started

#### 1. Clone the repository

```bash
git clone https://github.com/Wenda-org/web.git
cd web
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production-ready application |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

### 🏗️ Project Structure

```
web/
├── public/           # Static assets
├── src/
│   ├── assets/      # Images, fonts, etc.
│   ├── App.tsx      # Main application component
│   ├── App.css      # Component-specific styles
│   ├── index.css    # Global styles with Tailwind directives
│   └── main.tsx     # Application entry point
├── index.html       # HTML template
├── package.json     # Dependencies and scripts
├── tsconfig.json    # TypeScript configuration
├── vite.config.ts   # Vite configuration
└── tailwind.config.js # Tailwind CSS configuration
```

### 🎨 Customization

This is a base project structure. You can customize it by:

1. **Adding Components** - Create reusable components in `src/components/`
2. **Routing** - Install React Router for navigation: `npm install react-router-dom`
3. **State Management** - Add Redux, Zustand, or other state management libraries
4. **API Integration** - Create services in `src/services/` for backend communication
5. **Styling** - Customize Tailwind configuration in `tailwind.config.js`

### 📝 Next Steps

- [ ] Add routing for different pages (dashboard, maps, reports, etc.)
- [ ] Integrate with backend API
- [ ] Add authentication and authorization
- [ ] Implement data visualization components (charts, maps)
- [ ] Add internationalization (i18n) support

### 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### 📄 License

This project is part of the Wenda tourism platform initiative.

---

## Português

### 🚀 Visão Geral

**Wenda** é uma plataforma inteligente de turismo projetada para impulsionar o setor turístico de Angola, apoiando gestores públicos, empresas e viajantes com insights baseados em dados, previsões e recomendações personalizadas.

Este repositório contém o **Frontend Web** - uma interface administrativa para governo e operadores de turismo que exibe gráficos, previsões, mapas interativos e relatórios abrangentes.

### 🛠️ Stack Tecnológica

- **React** - Biblioteca para construção de interfaces
- **Vite** - Ferramenta de build rápida e servidor de desenvolvimento
- **TypeScript** - JavaScript com tipagem segura
- **Tailwind CSS** - Framework CSS utilitário
- **ESLint** - Qualidade e consistência de código

### 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (v18 ou superior)
- **npm** ou **yarn**

### 🏁 Como Começar

#### 1. Clone o repositório

```bash
git clone https://github.com/Wenda-org/web.git
cd web
```

#### 2. Instale as dependências

```bash
npm install
```

#### 3. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### 📦 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento com hot reload |
| `npm run build` | Gera build de produção |
| `npm run preview` | Visualiza build de produção localmente |
| `npm run lint` | Executa ESLint para verificar qualidade do código |

### 🏗️ Estrutura do Projeto

```
web/
├── public/           # Arquivos estáticos
├── src/
│   ├── assets/      # Imagens, fontes, etc.
│   ├── App.tsx      # Componente principal da aplicação
│   ├── App.css      # Estilos específicos de componentes
│   ├── index.css    # Estilos globais com diretivas Tailwind
│   └── main.tsx     # Ponto de entrada da aplicação
├── index.html       # Template HTML
├── package.json     # Dependências e scripts
├── tsconfig.json    # Configuração TypeScript
├── vite.config.ts   # Configuração Vite
└── tailwind.config.js # Configuração Tailwind CSS
```

### 🎨 Personalização

Este é um projeto base. Você pode personalizá-lo:

1. **Adicionando Componentes** - Crie componentes reutilizáveis em `src/components/`
2. **Roteamento** - Instale React Router para navegação: `npm install react-router-dom`
3. **Gerenciamento de Estado** - Adicione Redux, Zustand ou outras bibliotecas
4. **Integração com API** - Crie serviços em `src/services/` para comunicação com backend
5. **Estilização** - Personalize a configuração do Tailwind em `tailwind.config.js`

### 📝 Próximos Passos

- [ ] Adicionar roteamento para diferentes páginas (dashboard, mapas, relatórios, etc.)
- [ ] Integrar com API backend
- [ ] Adicionar autenticação e autorização
- [ ] Implementar componentes de visualização de dados (gráficos, mapas)
- [ ] Adicionar suporte à internacionalização (i18n)

### 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para enviar um Pull Request.

### 📄 Licença

Este projeto faz parte da iniciativa da plataforma de turismo Wenda.

---

**Desenvolvido com ❤️ para o turismo em Angola 🇦🇴**

