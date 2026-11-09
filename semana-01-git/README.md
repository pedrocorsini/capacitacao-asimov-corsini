# Semana 01 Git & GitHub

Capacitação da semana 01 sobre Git e GitHub. 
  
 - README principal na main adicionado;
 - Índice da capacitação será atualizado no README principal a cada entrega;
 - Branch `semana-01-git` criada;
 - Commits pequenos e regulares usando o Conventional Commits -> [Ver todos os commits](https://github.com/pedrocorsini/capacitacao-asimov-corsini/commits/semana-01-git/);
 - Tabela do Conventional Commits adicionada no README semanal;
 - Arquivo .gitignore adicionado;
 - Conflito de merge solucionado por meio de [Issues](https://github.com/pedrocorsini/capacitacao-asimov-corsini/issues) e [PRs](https://github.com/pedrocorsini/capacitacao-asimov-corsini/pulls?q=is%3Apr+state%3Aclosed);
  
## Objetivos
- Praticar Git e GitHub;
-  Versionamento, Branches, Pull Requests ;
-  Markdown. 🤑

## Conflito de merge

O conflito ocorreu porque duas branches alteraram a mesma linha do objetivo
da semana a partir de uma versão comum.

Após integrar o primeiro Pull Request à main, executei
`git merge origin/main` na segunda branch. O Git identificou versões
diferentes para a mesma linha e solicitou uma resolução manual.

Resolvi o conflito combinando as duas propostas e removendo os marcadores
de conflito. Depois, revisei o arquivo e concluí o merge com um commit.

## Conventional Commits

| Tipo | Quando usar | Exemplo |
| --- | --- | --- |
| `feat` | Adicionar uma funcionalidade | `feat: adicionar login com Google` |
| `fix` | Corrigir um bug | `fix: corrigir validação de e-mail` |
| `docs` | Alterar documentação | `docs: atualizar README` |
| `style` | Ajustar formatação do código sem mudar o comportamento | `style: padronizar indentação` |
| `refactor` | Reorganizar código sem adicionar funcionalidades ou corrigir bugs | `refactor: simplificar validação de usuário` |
| `perf` | Melhorar desempenho | `perf: otimizar consulta de produtos` |
| `test` | Adicionar ou alterar testes | `test: cobrir autenticação de usuário` |
| `build` | Alterar dependências ou o processo de build | `build: atualizar versão do Angular` |
| `ci` | Alterar integração e entrega contínuas | `ci: configurar testes no GitHub Actions` |
| `chore` | Realizar manutenção que não se encaixa nos demais tipos | `chore: atualizar gitignore` |
| `revert` | Reverter um commit anterior | `revert: desfazer alteração no login` |
