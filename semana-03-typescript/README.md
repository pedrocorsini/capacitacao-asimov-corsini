# Semana 03 TypeScript

Capacitação da semana 03 sobre TypeScript.

- Aplicação desenvolvida em [lista-tarefas/](lista-tarefas/).
- Branch `semana-03-typescript` criada. [Ver todos os commits](https://github.com/pedrocorsini/capacitacao-asimov-corsini/commits/semana-03-typescript/).
- Cadastro, edição, conclusão e remoção de tarefas.
- Organização por status e filtro por prioridade.
- Persistência dos dados no navegador com `localStorage`.
- Testes unitários com Vitest e workflow de compilação e publicação no GitHub Actions.

## Lista de tarefas

A aplicação organiza as tarefas nas colunas Pendentes, Em andamento e Concluídas.
Cada tarefa tem título obrigatório, descrição opcional, prioridade e data de criação.
A data da última edição aparece quando a tarefa é alterada ou concluída.

O formulário permite escolher o status e a prioridade da tarefa. O filtro por
prioridade se aplica às três colunas. O `localStorage` guarda as tarefas entre
recarregamentos da página.

### Como executar localmente

Com Node.js e npm instalados, execute os comandos a partir da raiz do repositório.

```bash
cd semana-03-typescript/lista-tarefas
npm ci
npx tsc
```

Inicie o Live Server do VS Code na pasta do projeto e acesse
[`src/index.html`](lista-tarefas/src/index.html) pelo servidor. A página carrega
o JavaScript compilado de `dist/`.

### Testes e lint

Execute os comandos abaixo na pasta `lista-tarefas/`.

```bash
npm test
npm run lint
```

## Tecnologias utilizadas

| Tecnologia | Aplicação |
| --- | --- |
| TypeScript | Modelos tipados, serviço de tarefas e interação com o HTML |
| HTML e CSS | Estrutura e estilos do formulário e do quadro de tarefas |
| `localStorage` | Armazenamento das tarefas no navegador |
| Vitest | Testes unitários do serviço de tarefas |
| Oxlint e Prettier | Análise estática e formatação |
| GitHub Actions | Automação do lint, da compilação e da publicação no GitHub Pages |
