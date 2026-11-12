# Etapa 1 — Decisões técnicas

**Projeto:** Fetch.Lab — Laboratório JS  
**Data:** 12/11/2026  
**Branch:** `docs/etapa-1-baseline`  
**Status:** decisões aprovadas para orientar as próximas etapas

---

## Contexto

O Fetch.Lab é um laboratório educacional de consumo de APIs REST com JavaScript. A evolução deve preservar a simplicidade, a publicação estática no GitHub Pages e a identidade visual de cada universo.

A decisão central é **não introduzir build, React ou bundler**. A organização virá de CSS compartilhado mínimo, módulos ES nativos e convenções claras.

---

## ADR-001 — Manter HTML, CSS e JavaScript vanilla

**Decisão:** o projeto continua multi-página, com HTML independente para a home e para cada laboratório, CSS próprio por projeto e JavaScript vanilla.

**Motivos:**

- O projeto tem cinco páginas e nenhum estado compartilhado complexo.
- O objetivo educacional é consumir APIs e manipular o DOM com JavaScript.
- React adicionaria runtime, build, roteamento e complexidade sem resolver os problemas atuais.
- A arquitetura multi-página preserva URLs reais, SEO e simplicidade de hospedagem.

**Consequências:**

- Não haverá SPA, React Router ou hidratação.
- O header/footer será estático e poderá ser duplicado entre páginas.
- Não haverá estado global.
- A navegação será por links HTML reais.

---

## ADR-002 — Adotar Tailwind CSS via Play CDN, com CSS próprio como camada essencial

**Decisão:** usar o Play CDN do Tailwind para utilitários de layout, sem build, mas manter o CSS próprio como responsável pela estrutura essencial, identidade visual, componentes e usabilidade.

**Motivos:**

- Elimina build e dependências.
- Permite padronizar layout, espaçamento, grid, flex e breakpoints.
- Mantém o projeto publicável diretamente no GitHub Pages.
- Preserva a identidade visual de cada projeto.

**Regras de uso:**

- Tailwind é usado para layout e utilitários simples.
- Cores temáticas, tipografia, animações, heros e efeitos ficam no CSS próprio.
- HTML gerado dinamicamente usa classes semânticas próprias, não dezenas de utilitários Tailwind.
- O funcionamento básico não pode depender do CDN.
- O CSS local deve cobrir o layout crítico e a usabilidade mínima.

**Limitações documentadas:**

- O Play CDN é voltado principalmente a desenvolvimento e prototipagem.
- A compilação acontece no navegador, em runtime.
- Não há purge/minificação no fluxo do projeto.
- Há risco de FOUC e custo de carregamento.
- Pode haver restrição em ambientes com CSP rígida.
- O site depende de rede para carregar o CDN.

**Mitigações:**

- CSS próprio para o essencial.
- Teste com o CDN bloqueado.
- Versão do CDN registrada.
- Uso restrito a utilitários.
- Componentes dinâmicos com classes próprias.

**Pendente:** definir a versão exata do Play CDN e a estratégia de preflight/reset.

---

## ADR-003 — Usar módulos ES nativos

**Decisão:** organizar o JavaScript em módulos ES nativos, sem bundler.

**Motivos:**

- Separação clara entre HTTP, DOM, estados e componentes.
- Reutilização real sem criar um framework interno.
- Suporte nativo nos navegadores modernos.
- Funciona no GitHub Pages.

**Consequências:**

- O desenvolvimento local exige um servidor estático, como Live Server.
- Abrir os arquivos via `file://` não será o fluxo suportado.
- O README foi atualizado para registrar essa exigência.
- Importações devem usar caminhos relativos, compatíveis com o subdiretório do GitHub Pages.
- Não haverá `import` absoluto a partir da raiz.

**Pendente:** confirmar se a abertura via `file://` precisa continuar funcionando. Se sim, será necessário usar scripts clássicos em vez de módulos.

---

## ADR-004 — Compartilhar apenas o que é realmente comum

**Decisão:** criar uma camada compartilhada mínima para:

- reset e base CSS;
- componentes estruturais;
- shell do laboratório;
- HTTP com timeout e erros;
- estados de loading/erro/vazio/demo;
- card de personagem.

**Regra dos normalizadores:** cada projeto mantém seu próprio normalizador de dados. O componente compartilhado recebe apenas dados já normalizados e não conhece detalhes das APIs.

**Motivos:**

- Quatro projetos repetem HTTP, estados e cards.
- Heros, temas e animações são específicos e devem continuar separados.
- Evita um “framework interno” e abstrações prematuras.

**O que não será compartilhado:**

- Heros e composições visuais.
- Paletas, fontes e animações temáticas.
- Markup de header/footer.
- Cards da home.
- Lógica específica de cada API além do modelo normalizado.
- Roteamento ou estado global.

---

## ADR-005 — Preservar identidade visual e URLs públicas

**Decisão:** nenhuma padronização pode descaracterizar Dragon Ball, Naruto, Jujutsu Kaisen ou Rick and Morty. As URLs públicas devem ser preservadas integralmente.

**Regras:**

- Manter as pastas `naruto/`, `jujutsukaisen/`, `rickandmorty/` e `dragonball/` na raiz.
- Manter os heros, logos, paletas e efeitos de cada projeto.
- Componentes compartilhados definem apenas estrutura; o tema vem do CSS do projeto.
- Usar um contrato de tokens `--ui-*` para que o mesmo componente funcione com temas diferentes.
- Não transformar os quatro projetos em páginas visualmente iguais.

---

## ADR-006 — Renomeação gradual e verificação de dependências

**Decisão:** a padronização para `js/main.js` pode acontecer gradualmente. Nenhum arquivo ou referência existente será removido sem antes verificar suas dependências.

**Procedimento obrigatório antes de renomear:**

1. Localizar referências no HTML, CSS, JS e README.
2. Verificar imports, links, scripts e caminhos de assets.
3. Verificar se a URL pública depende do caminho.
4. Atualizar todas as referências na mesma alteração.
5. Testar no servidor local e no subdiretório do GitHub Pages.
6. Só então remover o arquivo antigo.

**Motivo:** evitar links quebrados, scripts não carregados e regressões silenciosas.

---

## ADR-007 — GitHub Pages sem build

**Decisão:** publicar diretamente os arquivos estáticos no GitHub Pages, sem `dist/`, sem CI de build e sem bundler.

**Regras:**

- Todos os caminhos devem ser relativos.
- Não usar caminhos absolutos como `/assets/...`, pois o site vive em `/Fetch.Lab/`.
- O CSS e o JS compartilhados devem ser acessíveis por caminhos relativos a partir de cada página.
- Testar sempre no contexto do subdiretório, não apenas em `localhost` na raiz.
- `.nojekyll` pode ser adicionado para evitar processamento desnecessário do Jekyll, mas não é obrigatório para o funcionamento atual.

**Consequências:**

- Não há etapa de build para falhar.
- Não há artefato gerado.
- A publicação é a própria árvore do repositório.
- Cache e versionamento de assets precisam ser gerenciados manualmente, se necessário.

---

## ADR-008 — Validação manual nesta primeira rodada

**Decisão:** não introduzir suíte de testes automatizados, ESLint, Prettier ou Playwright nesta etapa. A validação será manual e baseada em checklist.

**Motivos:**

- A decisão é evitar dependências e build.
- O projeto é pequeno.
- Aprioridade é corrigir problemas visíveis e estruturais.

**Validações previstas:**

- W3C Nu HTML Checker.
- Lighthouse no Chrome DevTools.
- Console e rede do navegador.
- Teste com CDN bloqueado.
- Teste com servidor local para módulos.
- Teste no GitHub Pages dentro de `/Fetch.Lab/`.
- Navegação por teclado.
- Viewports de 320 a 1440 px.
- Teste de falha de API.

**Backlog:** automação pode ser reavaliada depois, sem alterar a decisão de não ter build no site publicado.

---

## Decisões pendentes

| Pendência | Por que importa | Quando decidir |
|---|---|---|
| Versão exata do Play CDN | Evita mudanças inesperadas de comportamento | Antes da Etapa 2 |
| Preflight do Tailwind | Pode conflitar com o reset compartilhado | Durante a Etapa 2 |
| Estratégia de fallback de fonte/ícone | Performance e independência de CDN | Etapa 2 ou 6 |
| Dados de demonstração do JJK | Define o conteúdo do fallback | Etapa 5 |
| Quantidade de personagens do JJK | Evita página vazia ou pesada | Etapa 5 |
| Paginação/busca do Rick | Funcionalidade prometida no README, mas inexistente | Backlog ou Etapa 4 |
| Paginação do Naruto | Existem 1.431 personagens, mas só 20 são exibidos | Backlog |
| Otimização dos SVGs grandes | Performance e peso do repositório | Etapa 2 ou 7 |
| Nomenclatura final dos JS | Organização interna, sem impacto em URL | Etapa 4, gradualmente |
| Abertura via `file://` | Define se módulos ES são viáveis | Antes da Etapa 2 |

---

## Guardrails para as próximas etapas

- Não migrar para React.
- Não introduzir Vite, Webpack, Tailwind CLI, `package.json` ou `dist/`.
- Não alterar as URLs públicas.
- Não remover funcionalidades sem justificativa.
- Não substituir a identidade visual dos projetos por um tema único.
- Não fazer o site depender exclusivamente do Play CDN.
- Não remover arquivos sem verificar dependências.
- Não avançar para a Etapa 2 sem aprovação explícita.
- Não resolver todos os problemas de uma vez; seguir a prioridade do inventário.

---

## Referências

- [Inventário da Etapa 1](./inventario.md)
- [Baseline visual](./baseline/README.md)
- [Verificação das APIs](./api-check.json)