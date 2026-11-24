# AGENTS.md — HairDay

Instruções para o agente de IA (OpenCode, Claude Code ou similar) que desenvolve o **HairDay**, uma SPA de agendamentos para salão/barbearia.

## Contexto do projeto

- Stack obrigatória: **React 19 + Vite + TypeScript** (modo `strict`).
- Estilização: **CSS puro** em `src/styles/global.css`, com variáveis em `:root`. Não adicionar Tailwind, styled-components ou bibliotecas de UI.
- Ícones: `lucide-react`. Não adicionar outras dependências sem pedir antes.
- Idioma da interface, mensagens de erro e comentários: **português do Brasil**.
- Referência visual: protótipo HairDay no Figma — formulário (sidebar) à esquerda e agenda à direita; tema escuro com destaque amarelo.

## Estrutura

```
src/
  types/appointment.ts        # tipos Appointment, NewAppointment, Period, FormErrors...
  constants/schedule.ts       # PERIODS (Manhã, Tarde, Noite) e horários disponíveis
  context/AppointmentsContext # Provider com useState (lista + data filtrada)
  hooks/useAppointments.ts    # acesso ao contexto
  hooks/useDailySchedule.ts   # filter -> sort -> reduce por período
  utils/date.ts               # todayISO, isPast, getPeriodId
  utils/validation.ts         # validateAppointment
  components/                 # componentes de UI reutilizáveis
  styles/global.css
```

## Regras de negócio

1. Agendamento = nome do cliente + data (`YYYY-MM-DD`) + horário (`HH:mm`).
2. Horários disponíveis (ordem crescente):
   - **Manhã** 09:00–12:00 · **Tarde** 13:00–18:00 · **Noite** 19:00–21:00.
3. Não permitir: data passada, horário que já passou, horário já ocupado na mesma data, nome vazio/curto (< 3) ou com caracteres que não sejam letras.
4. Após agendar, o item aparece **imediatamente** na agenda (a data filtrada muda para a data do agendamento).
5. A agenda mostra apenas os agendamentos da data selecionada, agrupados nos três períodos.
6. Período sem itens mostra: “Nenhum agendamento para este período”.
7. Botão de lixeira remove o agendamento na hora.
8. Os dados são persistidos em `localStorage` (`@hairday:appointments`).

## Convenções de código

- Componentes funcionais com **Props tipadas** por `interface`; um componente por arquivo, nome em PascalCase.
- Estado global somente via `AppointmentsProvider` + `useAppointments()`; nada de prop drilling profundo.
- Usar `map()` para renderizar listas, `filter()` para filtrar/remover e `reduce()` para agrupar por período.
- Não usar `any`. Tipos novos vão em `src/types/`.
- Acessibilidade: `label` ligado aos inputs, `aria-label` nos botões de ícone, foco visível.
- Layout responsivo: em telas < 860px a sidebar fica acima da agenda.

## Ferramentas MCP

Os servidores já estão configurados em `opencode.json` (OpenCode) e `.mcp.json` (Claude Code). O passo a passo para gerar as evidências está em `docs/EVIDENCIAS.md`.


- **Context7 MCP**: antes de usar APIs de React, Vite, TypeScript ou lucide-react, consulte a documentação atualizada (ex.: `resolve-library-id react` → `query-docs /facebook/react "useContext"`).
- **Playwright MCP**: após cada etapa, abra `http://localhost:5173` e valide:
  - cadastrar agendamento válido e vê-lo no período correto;
  - mensagens de erro ao enviar formulário vazio;
  - horário ocupado fica desabilitado;
  - trocar a data do filtro altera a lista;
  - excluir pela lixeira;
  - screenshots em 1440×900 (desktop) e 375×812 (mobile) salvos em `docs/screenshots/`.

## Fluxo de trabalho

1. Pegar a próxima tarefa do Board no Notion (A fazer → Em andamento).
2. Consultar a documentação no Context7 se necessário.
3. Implementar em passos pequenos; rodar `npm run build` (deve passar sem erros de tipo).
4. Testar com Playwright MCP (Em teste) e só então marcar como Concluído.
5. Commits pequenos e descritivos em português (ex.: `feat: agrupa agendamentos por período`).
