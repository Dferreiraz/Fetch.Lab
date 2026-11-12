# Baseline visual — Etapa 1

**Data:** 12/11/2026  
**Commit de referência:** `938fab41629ce1899f4b0d25fba9c35f2b7e6f69`  
**Servidor de captura:** `http://127.0.0.1:8765`  
**Browser:** Chrome 157.0.8103.51 headless  
**Formato:** JPEG, qualidade 85

---

## Objetivo

Registrar o estado visual real das cinco páginas antes de qualquer alteração de arquitetura, CSS ou JavaScript. Este baseline serve para comparar a evolução e detectar regressões visuais.

---

## Viewports

| Nome | Largura | Altura | Escala | Mobile |
|---|---:|---:|---:|---|
| Desktop | 1440 px | 900 px | 1 | Não |
| Mobile | 390 px | 844 px | 2 | Sim |

A captura usou full-page quando a altura do conteúdo era menor que 15.000 px. Caso contrário, foi capturado o viewport.

---

## Imagens

| Página | Desktop | Mobile |
|---|---|---|
| Home | [`desktop/home.jpg`](./desktop/home.jpg) | [`mobile/home.jpg`](./mobile/home.jpg) |
| Naruto | [`desktop/naruto.jpg`](./desktop/naruto.jpg) | [`mobile/naruto.jpg`](./mobile/naruto.jpg) |
| Jujutsu Kaisen | [`desktop/jujutsukaisen.jpg`](./desktop/jujutsukaisen.jpg) | [`mobile/jujutsukaisen.jpg`](./mobile/jujutsukaisen.jpg) |
| Rick and Morty | [`desktop/rickandmorty.jpg`](./desktop/rickandmorty.jpg) | [`mobile/rickandmorty.jpg`](./mobile/rickandmorty.jpg) |
| Dragon Ball | [`desktop/dragonball.jpg`](./desktop/dragonball.jpg) | [`mobile/dragonball.jpg`](./mobile/dragonball.jpg) |

---

## Métricas

| Página | Viewport | `scrollWidth` | `clientWidth` | Cards | Altura do conteúdo | Modo |
|---|---|---:|---:|---:|---:|---|
| Home | Desktop | 1425 | 1425 | 0 | 1343 | Full-page |
| Naruto | Desktop | 1425 | 1425 | 20 | 4082 | Full-page |
| JJK | Desktop | 1425 | 1425 | 0 | 1244 | Full-page |
| Rick | Desktop | **1485** | 1425 | 20 | 3645 | Full-page |
| Dragon Ball | Desktop | 1425 | 1425 | 58 | 6980 | Full-page |
| Home | Mobile | 390 | 390 | 0 | 1912 | Full-page |
| Naruto | Mobile | 390 | 390 | 20 | 8929 | Full-page |
| JJK | Mobile | 390 | 390 | 0 | 1624 | Full-page |
| Rick | Mobile | **969** | 390 | 20 | 3645 | Full-page |
| Dragon Ball | Mobile | **1160** | 390 | 58 | 7053 | Full-page |

Metadados completos, incluindo estado do texto e imagens: [`metadata.json`](./metadata.json).

---

## Observações de captura

- A home não possui cards dinâmicos; a captura aguardou fontes e imagens.
- Naruto exibiu 20 cards. Parte das imagens é composta por URLs inválidas com vírgulas, resultando em placeholders 404.
- JJK exibiu o estado de erro, pois a API não respondeu. A captura não representa o loading.
- Rick e Dragon Ball exibem overflow horizontal no mobile. As imagens foram limitadas à largura do viewport, por isso o conteúdo lateral aparece cortado.
- O cache do navegador foi desabilitado.
- O perfil do Chrome era limpo; extensões e barras do navegador não fazem parte do site.

---

## Como repetir a captura

1. Sirva a raiz do repositório com um servidor estático.
2. Abra cada página no Chrome.
3. Use os viewports de 1440 × 900 e 390 × 844.
4. Aguarde o carregamento dos cards, fontes e imagens.
5. Capture full-page quando possível.
6. Registre `scrollWidth`, `clientWidth`, altura do conteúdo e quantidade de cards.

A automação usada nesta etapa foi temporária e não faz parte do repositório, para não introduzir dependências de build.

---

## Critério de comparação

Ao final de cada etapa, as capturas devem ser comparadas com este baseline considerando:

- identidade visual preservada;
- ausência de overflow;
- imagens carregando corretamente;
- estados de loading/erro visíveis e acessíveis;
- consistência de navegação;
- legibilidade e contraste;
- ausência de regressões nos heros e temas.