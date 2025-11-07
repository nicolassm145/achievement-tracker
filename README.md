#  Achievement Tracker - NEXUS

<div align="center">

**Rastreie suas conquistas de jogos em múltiplas plataformas em um único painel unificado.**

[Demo ao Vivo](https://achievement-tracker.vercel.app)

</div>

---

## Sobre

**Achievement Tracker (NEXUS)** é uma aplicação web completa que permite aos gamers rastrear e gerenciar suas conquistas em múltiplas plataformas de jogos, incluindo Xbox, Steam e PlayStation. Navegue por jogos em alta, descubra lançamentos futuros e gerencie seu perfil de jogador tudo em um só lugar.

### Destaques Principais

- **Suporte Multi-Plataforma**: Rastreie conquistas do Xbox, Steam e PlayStation
- **Multi-Idioma**: Suporte completo de internacionalização (Inglês e Português)
- **UI Moderna**: Construído com Tailwind CSS e DaisyUI
- **Autenticação Segura**: Sistema de autenticação baseado em JWT
- **Descoberta de Jogos**: Jogos em alta, próximos lançamentos e mais aguardados com API IGDB
- **Design Responsivo**: Otimizado para desktop e dispositivos móveis

---

## Funcionalidades

### Plataformas de Jogos

- **Integração Xbox**: Visualize conquistas Xbox, jogos com conclusão total e estatísticas de perfil
- **Integração Steam**: Rastreie conquistas Steam, biblioteca de jogos e estatísticas de jogador
- **Integração PlayStation**: Monitore troféus PSN e informações de perfil

### Descoberta de Jogos

- **Jogos em Alta**: Descubra o que está popular no mundo dos games
- **Próximos Lançamentos**: Fique atualizado com os próximos lançamentos de jogos
- **Jogos Aguardados**: Explore títulos altamente aguardados
- **Busca de Jogos**: Pesquise e encontre informações detalhadas sobre qualquer jogo
- **Detalhes de Jogos**: Veja informações completas do jogo incluindo avaliações, datas de lançamento e mais

### Funcionalidades de Usuário

- **Autenticação de Usuário**: Sistema seguro de login e registro
- **Gerenciamento de Perfil**: Gerencie seus perfis de jogos em todas as plataformas
- **Configurações**: Personalize sua experiência e vincule contas de plataformas
- **Conquistas Raras**: Mostre suas conquistas mais raras

### Internacionalização

- Inglês (en)
- Português (pt)

---

## Stack Tecnológica

### Frontend

- **Framework**: [React 19.1.0](https://react.dev/)
- **Linguagem**: [TypeScript 5.8.3](https://www.typescriptlang.org/)
- **Ferramenta de Build**: [Vite 6.3.5](https://vitejs.dev/)
- **Roteamento**: [React Router DOM 7.6.3](https://reactrouter.com/)
- **Estilização**:
  - [Tailwind CSS 4.1.7](https://tailwindcss.com/)
  - [DaisyUI 5.0.38](https://daisyui.com/)
- **Ícones**: [@heroicons/react 2.2.0](https://heroicons.com/)
- **Cliente HTTP**: [Axios 1.10.0](https://axios-http.com/)
- **i18n**: [i18next 25.2.1](https://www.i18next.com/) + [react-i18next 15.5.2](https://react.i18next.com/)

### Ferramentas de Desenvolvimento

- **Linting**: ESLint com Prettier
- **Verificação de Tipos**: TypeScript
- **Formatação de Código**: Prettier com plugin Tailwind CSS

---

## Começando

### Pré-requisitos

- **Node.js** >= 18.x
- **npm** ou **yarn** ou **pnpm**

### Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/nicolassm145/achievement-tracker.git
   cd achievement-tracker
   ```

2. **Instale as dependências**

   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. **Configure as variáveis de ambiente**

   ```bash
   cp .env.example .env
   ```

   Edite o `.env` e adicione a URL da sua API:

   ```env
   VITE_API_BASE_URL=http://localhost:8000
   ```

4. **Inicie o servidor de desenvolvimento**

   ```bash
   npm run dev
   ```

5. **Abra seu navegador**

   Navegue para `http://localhost:5173`

---

## Variáveis de Ambiente

Crie um arquivo `.env` no diretório raiz:

```env
# URL da API Backend
VITE_API_BASE_URL=http://localhost:8000
```

### Ambiente de Produção

Para deploys de produção, crie `.env.production`:

```env
# URL da API de Produção
VITE_API_BASE_URL=https://sua-api-backend.com
```

> **Nota**: Todas as variáveis de ambiente devem ter o prefixo `VITE_` para serem expostas ao código do lado do cliente.

---

##  Estrutura do Projeto

```
achievement-tracker/
├── public/              # Assets estáticos
│   └── _redirects      # Configuração de redirecionamento Netlify
├── src/
│   ├── assets/         # Imagens, fontes, etc.
│   │   └── avatars/    # Imagens de avatar de usuário
│   ├── components/     # Componentes React
│   │   ├── Achievements/    # Componentes relacionados a conquistas
│   │   │   ├── GameCardComponent.tsx
│   │   │   ├── PsnComponent.tsx
│   │   │   ├── RareAchievementsComponent.tsx
│   │   │   ├── SteamComponent.tsx
│   │   │   └── XboxComponent.tsx
│   │   ├── Layout/          # Componentes de layout
│   │   │   └── SystemLayout.tsx
│   │   ├── Loading/         # Estados de carregamento
│   │   │   └── TrendingSkeleton.tsx
│   │   └── ...              # Outros componentes compartilhados
│   ├── contexts/       # Provedores de Contexto React
│   │   └── AuthContext.tsx
│   ├── hooks/          # Hooks React customizados
│   │   ├── useAnticipatedGames.ts
│   │   ├── useGameDetails.ts
│   │   ├── useUpcomingGames.ts
│   │   └── useXboxFullAchievements.ts
│   ├── locales/        # Traduções i18n
│   │   ├── en.json
│   │   └── pt.json
│   ├── pages/          # Componentes de página
│   │   ├── About/
│   │   ├── Anticipated/
│   │   ├── Auth/
│   │   │   ├── Login/
│   │   │   └── Register/
│   │   ├── ComingSoon/
│   │   ├── Games/
│   │   ├── Home/
│   │   ├── NotFound/
│   │   ├── Privacy/
│   │   ├── Profile/
│   │   ├── Search/
│   │   ├── Settings/
│   │   └── Terms/
│   ├── routes/         # Configuração de roteamento
│   │   └── Router.tsx
│   ├── services/       # Serviços de API
│   │   └── api.ts
│   ├── types/          # Definições de tipos TypeScript
│   │   ├── Game.ts
│   │   └── User.ts
│   ├── App.tsx         # Componente principal da aplicação
│   ├── main.tsx        # Ponto de entrada da aplicação
│   ├── i18n.ts         # Configuração i18n
│   └── index.css       # Estilos globais
├── .env.example        # Exemplo de variáveis de ambiente
├── .gitignore          # Regras do Git ignore
├── eslint.config.js    # Configuração ESLint
├── index.html          # Ponto de entrada HTML
├── package.json        # Dependências e scripts
├── tsconfig.json       # Configuração TypeScript
├── tsconfig.app.json   # Configuração TypeScript da aplicação
├── tsconfig.node.json  # Configuração TypeScript do node
├── vite.config.ts      # Configuração Vite
├── vercel.json         # Configuração de deploy Vercel
└── README.md           # Documentação do projeto
```

---

##  Contribuidores

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/nicolassm145">
        <img src="https://github.com/nicolassm145.png" width="100px;" alt="Nicolas"/><br />
        <sub><b>Nicolas</b></sub>
      </a><br />
      <sub>Desenvolvedor Principal</sub>
    </td>
    <td align="center">
      <a href="https://github.com/iampedrin">
        <img src="https://github.com/iampedrin.png" width="100px;" alt="Pedro"/><br />
        <sub><b>Pedro (@iampedrin)</b></sub>
      </a><br />
      <sub>Desenvolvedor Backend</sub>
    </td>
  </tr>
</table>

---

##  Licença

Este projeto está licenciado sob a **Licença MIT** - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

##  Links

- **Repositório**: [github.com/nicolassm145/achievement-tracker](https://github.com/nicolassm145/achievement-tracker)
- **Demo ao Vivo**: [achievement-tracker.vercel.app](https://achievement-tracker.vercel.app)
- **API Backend**: [Render](https://tracker-api-h5uk.onrender.com/docs)

---
