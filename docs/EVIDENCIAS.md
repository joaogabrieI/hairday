# Evidências de uso dos MCPs

Os servidores MCP já estão configurados no projeto:

| Agente | Arquivo |
| --- | --- |
| OpenCode | `opencode.json` |
| Claude Code | `.mcp.json` |

Servidores configurados:

- **Context7** (`@upstash/context7-mcp`): documentação atualizada de React, Vite, TypeScript e lucide-react.
- **Playwright** (`@playwright/mcp`): controla um navegador para testar a aplicação. Screenshots sem nome explícito vão para `docs/screenshots/`.

## 1. Preparar

```bash
npm install
npm run dev
```

Deixe o servidor rodando em http://localhost:5173 e abra **uma nova sessão** do agente nesta pasta (`opencode` ou `claude`). Na primeira vez, aprove os servidores MCP do projeto. O `npx` baixa os pacotes; se o Playwright pedir o navegador, rode `npx playwright install chromium`.

Confira se os servidores estão ativos: no OpenCode, `opencode mcp list`; no Claude Code, `/mcp`.

## 2. Evidência do Context7

Envie ao agente:

> Use o Context7 MCP para consultar a documentação do React sobre `createContext` e `useContext` e do Vite sobre `vite build`. Depois compare com o que fizemos em `src/context/AppointmentsContext.tsx` e `src/hooks/useAppointments.ts` e diga se seguimos as recomendações.

Tire print das chamadas `resolve-library-id` e `query-docs` aparecendo no chat e salve em `docs/evidencias/context7-*.png`.

## 3. Evidência do Playwright

Envie ao agente:

> Use o Playwright MCP para testar o HairDay em http://localhost:5173, seguindo o roteiro do AGENTS.md:
> 1. Em 1440x900, clique em Agendar com o formulário vazio e confirme as mensagens de erro.
> 2. Escolha a data de amanhã, cadastre: 09:00 Júlia Martins, 11:00 Ryan Dorwart, 13:00 Livia Curtis, 16:00 Randy Calzoni e 21:00 Maria Herwitz. Confirme que cada um aparece no período certo, em ordem de horário, e que o horário usado fica desabilitado.
> 3. Mude o filtro da agenda para outra data e confirme a mensagem "Nenhum agendamento para este período".
> 4. Volte para amanhã, exclua o agendamento das 11:00 pela lixeira e confirme que sumiu.
> 5. Salve `docs/screenshots/desktop.png` (1440x900, página inteira).
> 6. Redimensione para 375x812 e salve `docs/screenshots/mobile.png` (página inteira).
> Ao final, liste cada passo com OK ou FALHOU.

Tire print das chamadas `browser_navigate`, `browser_click`, `browser_take_screenshot` etc. no chat e salve em `docs/evidencias/playwright-*.png`.

## 4. Versionar

```bash
git add docs
git commit -m "docs: adiciona screenshots e evidências de testes"
```
