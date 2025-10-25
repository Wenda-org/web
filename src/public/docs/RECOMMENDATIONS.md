# Recomendações e Próximos Passos

Este documento resume as alterações recentes, como testar localmente, e recomendações priorizadas para avançarmos com o projeto.

## 1) Resumo das mudanças aplicadas
- Internacionalização (i18n)
  - Adicionado `landing` e várias chaves para `users`, `destinations`, `settings`, `map`, `ml`, `notifications`, `monitoring` em `src/i18n/config.ts` (EN + PT).
  - Importação de `src/i18n/config` inicializada em `src/main.tsx`.
  - Substituídas strings hard-coded por `t('...')` em: `Users.tsx`, `Destinations.tsx`, `Settings.tsx`, `Dashboard.tsx`, `Map.tsx`, `ML.tsx`, `Notifications.tsx`, `Monitoring.tsx`.
- Tema
  - `ThemeContext` já fornece `theme`, `setTheme`, `effectiveTheme` e `toggleTheme`.
  - `Topbar` agora usa `toggleTheme` do contexto.
  - `Landing` e `Topbar` já alternam tema; `Settings.tsx` select de tema foi ligado a `useTheme()`.
- Outros
  - Criado `src/styles.d.ts` (declaração simples `declare module '*.css'`) para aceitar imports de CSS no TS.
  - Removido import inexistente `./index.css` de `src/main.tsx` para evitar erro de compilação.

## 2) Como testar localmente (rápido)
1. Reinicie o servidor TypeScript do editor (caso esteja aberto) para captar a nova `*.d.ts`.
2. No terminal do projeto (`/home/victor-leonel/Documents/wenda/web`):

```bash
npm run dev
```

3. No navegador:
- Verifique o Topbar: alternar tema deve funcionar (cicla entre light/dark/auto se `toggleTheme` configurado assim).
- Abra `Settings` e altere o select de Theme e de Language: ambos devem aplicar imediatamente.
- Navegue pelas páginas: `Users`, `Destinations`, `Settings`, `Dashboard`, `Map`, `ML`, `Notifications`, `Monitoring` — verifique que os títulos, botões e rótulos foram internacionalizados (alterando idioma para `pt`/`en`).

## 3) Problemas conhecidos e observações
- O projeto ainda contém strings fixas em alguns pontos menores; eu converti as principais, mas uma varredura completa pode localizar remanescentes.
- `src/main.tsx` tinha uma importação de `./index.css` que não existia — removida. O `App.tsx` importa `./styles/globals.css` que é o arquivo de estilo correto.
- Caso o editor continue reclamando de imports CSS, reinicie o TS server. Se persistir, posso mover/duplicar a declaração `styles.d.ts` ou ajustar `tsconfig.json` (caso exista).

## 4) Recomendações prioritárias (curto prazo)
1. Varredura automatizada para strings não-i18n: executar grep/ESLint/custom script para encontrar literais visíveis ao usuário e gerar chaves (posso gerar um diff automático para revisão).
2. Completar traduções faltantes: por exemplo, status e severities (`delivered`, `running`, `high/medium/low`) — adicionar chaves `notifications.status.*`, `monitoring.severity.*`, etc.
3. Testes rápidos: criar 2-3 testes unitários/integração (Jest + React Testing Library) para garantir que a troca de idioma e alternância de tema funcionam.
4. Lint/TS: adicione/execute `eslint` e `tsc --noEmit` no pipeline CI para detectar regressões.

## 5) Recomendações (médio prazo)
- Separar traduções em ficheiros JSON por locale (ex.: `src/i18n/locales/en.json`, `pt.json`) e carregar via i18next-xhr-backend ou import estático — facilita manutenção e traduções por colaboradores.
- Padronizar componentes para aceitar `aria-*` props e checar acessibilidade nas principais telas (contrast, tab navigation).
- Adicionar um script `npm run lint` e `npm run typecheck` e integrá-los no CI.

## 6) Recomendações (longo prazo)
- Internacionalização dinâmica / fallback mais robusto para conteúdos vindos de APIs (ex.: campos multilíngues no backend).
- Pipeline de tradução (Crowdin/Locize) se o produto crescer e precisar de traduções profissionais.
- Testes E2E (Cypress/Playwright) para fluxos críticos (login, mudar idioma, criar notificação, publicar destino).

## 7) Pequenos ajustes que posso aplicar agora (se você autorizar)
- Gerar um diff com todas as strings restantes que ainda não usam `t('...')`.
- Adicionar traduções faltantes para status/severities (EN + PT).
- Adicionar um pequeno conjunto de testes unitários para `ThemeContext` e `i18n` initialization.

## 8) Contatos/Notas finais
- Se quiser, eu aplico um dos itens acima agora:
  - (A) varredura automática de strings e diff para revisão;
  - (B) adicionar traduções faltantes (status/severities);
  - (C) criar 2 testes unitários básicos (theme + i18n).

Escolha A, B ou C (ou outra tarefa) e eu continuo.
