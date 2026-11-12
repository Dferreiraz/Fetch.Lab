# Etapa 1 — Inventário do estado atual

**Projeto:** Fetch.Lab — Laboratório JS  
**Data do inventário:** 12/11/2026  
**Branch:** `docs/etapa-1-baseline`  
**Commit de referência:** `938fab41629ce1899f4b0d25fba9c35f2b7e6f69` (`main` antes da branch)  
**Ambiente de captura:** Windows, Node.js local, Chrome 157.0.8103.51 (headless), servidor estático em `http://127.0.0.1:8765`

> Esta etapa é somente de diagnóstico e registro. Nenhum HTML, CSS ou JavaScript de página foi alterado.

---

## 1. URLs públicas

O site está publicado no GitHub Pages e respondeu HTTP 200 em todas as páginas durante a verificação.

| Página | URL pública | Status |
|---|---|---|
| Home | https://dferreiraz.github.io/Fetch.Lab/ | 200 |
| Naruto | https://dferreiraz.github.io/Fetch.Lab/naruto/ | 200 |
| Jujutsu Kaisen | https://dferreiraz.github.io/Fetch.Lab/jujutsukaisen/ | 200 |
| Rick and Morty | https://dferreiraz.github.io/Fetch.Lab/rickandmorty/ | 200 |
| Dragon Ball | https://dferreiraz.github.io/Fetch.Lab/dragonball/ | 200 |

**Decisão:** todas essas URLs devem ser preservadas. Não haverá migração para SPA, mudança de slug ou renomeação de pasta nesta evolução.

---

## 2. Estrutura real do repositório

```text
Fetch.Lab/
├── index.html
├── README.md
├── css/
│   ├── global.css
│   └── styles.css
├── naruto/
│   ├── index.html
│   ├── scripts.js
│   ├── css/
│   │   ├── global.css
│   │   └── styles.css
│   └── assets/img/
├── jujutsukaisen/
│   ├── index.html
│   ├── scripts.js
│   ├── css/
│   │   ├── global.css
│   │   └── styles.css
│   └── assets/img/
├── rickandmorty/
│   ├── index.html
│   ├── script.js
│   ├── css/
│   │   ├── global.css
│   │   └── style.css
│   └── assets/img/
└── dragonball/
    ├── index.html
    ├── script.js
    ├── css/
    │   ├── global.css
    │   └── style.css
    └── assets/img/
```

### Divergências em relação ao README

| README | Realidade |
|---|---|
| `naruto/script.js` | `naruto/scripts.js` |
| `jujutsukaisen/script.js` | `jujutsukaisen/scripts.js` |
| `dragonball/css/styles.css` | `dragonball/css/style.css` |
| `rickandmorty/css/styles.css` | `rickandmorty/css/style.css` |
| Naruto usa NarutoDB (`narutodb.xyz`) | O código usa `dattebayo-api.onrender.com` |
| Rick and Morty tem paginação e busca | O código busca apenas a primeira página, sem busca |
| Naruto tem estados de loading | Não há loading nem tratamento de erro |
| JJK tem filtragem e detalhes | O código apenas lista até 20 personagens |

---

## 3. Stack e dependências externas

### Stack atual

- HTML5
- CSS3
- JavaScript ES6+
- `fetch` nativo
- Nenhum framework
- Nenhum bundler
- Nenhum `package.json`
- Nenhum build
- Nenhum teste automatizado
- Nenhum workflow de CI

### Recursos externos

| Recurso | Onde é usado | Observação |
|---|---|---|
| Google Fonts | Naruto, JJK, Rick | Múltiplas famílias e pesos |
| Phosphor Icons via `unpkg` | Home | Conjunto completo de ícones |
| Dragon Ball API | Dragon Ball | HTTPS; CORS responde à origem |
| Dattebayo API | Naruto | HTTPS; CORS `*` |
| Jikan API | JJK | HTTPS; indisponível na verificação |
| Rick and Morty API | Rick | HTTPS; CORS `*` |
| Imagens externas | Todos os projetos | Podem falhar, mudar ou bloquear hotlink |

---

## 4. Verificação das APIs

Arquivo completo: [`api-check.json`](./api-check.json).

| Projeto | Endpoint | Resultado | Dados observados |
|---|---|---|---|
| Dragon Ball | `https://dragonball-api.com/api/characters?limit=58` | HTTP 200 em ~741 ms | 58 itens; `items`; 1 página |
| Naruto | `https://dattebayo-api.onrender.com/characters` | HTTP 200 em ~214 ms | 20 itens; total 1.431; `pageSize` 20; `currentPage` 1 |
| Jujutsu Kaisen | `https://api.jikan.moe/v4/anime/40748/characters` | Falha de conexão em ~10,5 s | Sem status HTTP; `fetch failed` |
| Rick and Morty | `https://rickandmortyapi.com/api/character` | HTTP 200 em ~66 ms | 20 itens; 826 no total; 42 páginas |

### Observações

- **Dragon Ball** e **Rick and Morty** responderam normalmente.
- **Naruto** respondeu normalmente, mas o código consome apenas a primeira página.
- **Jujutsu Kaisen** não respondeu a partir deste ambiente. Isso confirma o cenário de indisponibilidade, mas não permite afirmar que o serviço esteja permanentemente fora do ar.
- A falha da Jikan foi de conexão, não uma resposta HTTP 4xx/5xx. Pode ser indisponibilidade do serviço, bloqueio de rede ou instabilidade temporária.

---

## 5. Funcionalidades implementadas

| Projeto | Implementado | Não implementado / divergente |
|---|---|---|
| Home | Hero, badges, quatro cards temáticos, links, footer | Cards sem `h3`; status de API ausente; links repetidos “Acessar Projeto” |
| Dragon Ball | Header, logo, grid de 58 cards, nome, raça, gênero e KI | Loading, erro, paginação, labels em português, alt específico, link de volta |
| Naruto | Hero, grid de 20 cards, nome, vila e clã | Imagens corretas, tratamento de clã nulo/array, loading/erro, paginação, link de volta |
| Jujutsu Kaisen | Hero, grid de até 20 cards, `try/catch`, mensagem de erro | API disponível, fallback local, retry, loading estilizado, banner de demo |
| Rick and Morty | Hero, grid de 20 cards, espécie, status e origem | Layout responsivo, paginação, busca, loading/erro, link de volta |

---

## 6. Baseline visual

### Como foi capturado

- Servidor estático local servindo a raiz do repositório.
- Chrome headless via DevTools Protocol.
- Cache desabilitado.
- Espera por cards, fontes e imagens antes da captura.
- Desktop: 1440 × 900, escala 1.
- Mobile: 390 × 844, escala 2.
- Captura full-page quando a altura era menor que 15.000 px; caso contrário, viewport.
- O banner de cookies/extensões não faz parte do site; as capturas usam um perfil limpo do Chrome headless.

### Imagens

| Página | Desktop | Mobile |
|---|---|---|
| Home | [`desktop/home.jpg`](./baseline/desktop/home.jpg) | [`mobile/home.jpg`](./baseline/mobile/home.jpg) |
| Naruto | [`desktop/naruto.jpg`](./baseline/desktop/naruto.jpg) | [`mobile/naruto.jpg`](./baseline/mobile/naruto.jpg) |
| Jujutsu Kaisen | [`desktop/jujutsukaisen.jpg`](./baseline/desktop/jujutsukaisen.jpg) | [`mobile/jujutsukaisen.jpg`](./baseline/mobile/jujutsukaisen.jpg) |
| Rick and Morty | [`desktop/rickandmorty.jpg`](./baseline/desktop/rickandmorty.jpg) | [`mobile/rickandmorty.jpg`](./baseline/mobile/rickandmorty.jpg) |
| Dragon Ball | [`desktop/dragonball.jpg`](./baseline/desktop/dragonball.jpg) | [`mobile/dragonball.jpg`](./baseline/mobile/dragonball.jpg) |

Metadados completos: [`baseline/metadata.json`](./baseline/metadata.json).

### Métricas de layout observadas

| Página | Viewport | `scrollWidth` | `clientWidth` | Cards | Estado |
|---|---|---:|---:|---:|---|
| Home | Desktop | 1425 | 1425 | 0 | OK |
| Naruto | Desktop | 1425 | 1425 | 20 | Imagens parcialmente quebradas |
| JJK | Desktop | 1425 | 1425 | 0 | Erro de API |
| Rick | Desktop | **1485** | 1425 | 20 | Overflow horizontal |
| Dragon Ball | Desktop | 1425 | 1425 | 58 | OK no desktop |
| Home | Mobile | 390 | 390 | 0 | OK |
| Naruto | Mobile | 390 | 390 | 20 | Imagens parcialmente quebradas |
| JJK | Mobile | 390 | 390 | 0 | Erro de API |
| Rick | Mobile | **969** | 390 | 20 | Overflow grave |
| Dragon Ball | Mobile | **1160** | 390 | 58 | Overflow grave |

### Observação sobre o JJK

A captura do JJK representa o **estado de erro** após a tentativa de conexão com a Jikan. Não é o estado de loading. Isso é intencional: o baseline registra a experiência real de indisponibilidade.

### Observação sobre Rick e Dragon Ball no mobile

As capturas foram limitadas à largura do viewport. Como o conteúdo real é mais largo (`969 px` no Rick e `1160 px` no Dragon Ball), as imagens mostram o corte lateral e a consequente perda de conteúdo.

---

## 7. Problemas conhecidos

### P0 — Críticos

#### 1. Naruto: imagens quebradas em 11 de 20 cards

- A API retorna `images` como array em todos os 20 personagens.
- O JavaScript faz `src="${personagem.images}"`.
- Em arrays com mais de uma imagem, o navegador transforma o array em uma string separada por vírgulas.
- Essa URL composta retorna 404 e o navegador exibe uma imagem placeholder cinza.
- 11 personagens têm mais de uma imagem; 9 têm apenas uma e funcionam por acidente.
- Evidência visual: [`desktop/naruto.jpg`](./baseline/desktop/naruto.jpg).

#### 2. Naruto: clã nulo ou array

- 8 personagens têm `personal.clan` ausente/nulo e exibem `undefined`.
- 1 personagem tem `clan` como array e exibe os valores concatenados.
- Evidência visual: cards de Orochimaru, Jiraiya, Yamato, Might Guy, Minato e outros.

#### 3. Naruto: HTML inválido

- A `<div class="container">` da seção de cards não é fechada antes de `</section>`.
- O navegador corrige, mas o HTML não é válido.

#### 4. Jujutsu Kaisen: página sem fallback

- A API não respondeu.
- A página exibe “Erro ao carregar os dados. Tente atualizar a página.”
- Não há retry, skeleton, cache ou dados locais.
- A classe `.loading` usada no JS não existe no CSS.
- Não há indicação de que os dados poderiam ser demonstrativos.
- Evidência visual: [`desktop/jujutsukaisen.jpg`](./baseline/desktop/jujutsukaisen.jpg).

#### 5. Rick and Morty: overflow horizontal

- Desktop: `scrollWidth` 1485 contra `clientWidth` 1425.
- Mobile: `scrollWidth` 969 contra `clientWidth` 390.
- Grid fixo de 4 colunas e larguras fixas (`500px`, `450px`, `430px`).
- Sem media queries.
- Evidência visual: [`desktop/rickandmorty.jpg`](./baseline/desktop/rickandmorty.jpg) e [`mobile/rickandmorty.jpg`](./baseline/mobile/rickandmorty.jpg).

#### 6. Dragon Ball: overflow horizontal no mobile

- `scrollWidth` 1160 contra `clientWidth` 390.
- O `<main>` é um flex item com `margin: auto`, `display: grid` e `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`; o grid acaba calculando uma largura próxima de 1160 px em vez de encolher para o viewport.
- Evidência visual: [`mobile/dragonball.jpg`](./baseline/mobile/dragonball.jpg).

### P1 — Importantes

#### 7. Dragon Ball: contraste do header

- `h1` com `color: rgb(255, 255, 255)` sobre gradiente `#ffcc00 → #ff6600`.
- O contraste é insuficiente, principalmente sobre o amarelo.
- A regra `header p` existe no CSS, mas o HTML usa `h1`, então a correção não se aplica.

#### 8. Ausência de loading/erro em três projetos

- Dragon Ball, Naruto e Rick não têm estado de loading nem `catch`.
- Em falha de API, a página fica vazia ou indefinidamente sem conteúdo.
- O README afirma que o Naruto tem estados de loading; não tem.

#### 9. Navegação sem retorno ao laboratório

- Nenhum projeto tem link “voltar para Fetch.Lab”.
- O logo do header aponta para `#`.
- O usuário depende do botão “voltar” do navegador.

#### 10. Botões inertes

- “Veja agora” e “Saiba mais” não fazem nada no Naruto, JJK e Rick.
- No Rick, são links para `#`.
- Expectativa de interação frustrada.

#### 11. Documentação divergente

- Nomes de arquivos, endpoint do Naruto e funcionalidades prometidas não correspondem ao código.
- Rick e JJK têm funcionalidades descritas que não existem.

#### 12. Assets muito pesados

| Asset | Tamanho | Uso |
|---|---:|---|
| `naruto/assets/img/naruto.svg` | ~3,4 MB | Hero |
| `jujutsukaisen/assets/img/img-jujutsukaisen.svg` | ~874 KB | Hero |
| `jujutsukaisen/assets/img/jujutsukaisen-logo.svg` | ~234 KB | Logo |
| `rickandmorty/assets/img/img-rick.svg` | ~1,5 MB | Hero |
| `rickandmorty/assets/img/img-card.svg` | ~6,5 MB | **Não referenciado** |
| Total aproximado | **~12,4 MB** | — |

Os SVGs grandes contêm imagens raster em base64; não são vetores eficientes.

### P2 — Melhorias

- Cards da home sem `h3` e com links repetidos.
- `alt` genérico ou incorreto (“Imagem do personagem”, “Imagem do Goku”).
- Falta de `focus-visible` em links e cards.
- Falta de `aria-live` nos estados dinâmicos.
- Falta de skip link, favicon, `meta description` e Open Graph.
- `@import` encadeado nos CSS.
- Cinco resets duplicados.
- CSS morto (`.hero__badge`, `.hero-selo`, `.project-card h3`, `.content-cards`, `.mensagem`).
- Classe `.loading` ausente no JJK.
- Uso de `innerHTML` com dados de API.
- Falta de fallback de imagem.
- Falta de `loading="lazy"` e dimensões explícitas.
- Fontes externas em excesso.
- Phosphor completo carregado para poucos ícones.

---

## 8. O que deve ser preservado

- As cinco URLs públicas.
- A identidade visual de Dragon Ball, Naruto, Jujutsu Kaisen e Rick and Morty.
- Os heros, logos, paletas e animações específicas.
- As integrações com Dragon Ball, Naruto e Rick.
- A tentativa de integração com a Jikan.
- Os links para o GitHub e os créditos do autor.
- O caráter educacional do projeto.
- A possibilidade de abrir cada projeto de forma independente.
- A publicação estática no GitHub Pages.

---

## 9. Fora do escopo da Etapa 1

- Criar CSS compartilhado.
- Adicionar Tailwind Play CDN.
- Criar módulos JavaScript.
- Corrigir imagens do Naruto.
- Implementar fallback do JJK.
- Alterar layout responsivo.
- Reestruturar páginas.
- Renomear arquivos.
- Instalar dependências.
- Configurar build.

Esses itens pertencem às etapas seguintes e dependem de aprovação explícita.