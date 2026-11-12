# Etapa 2 — Migração para Tailwind-only

**Projeto:** Fetch.Lab — Laboratório JS
**Data:** 12/11/2026
**Branch:** `develop`
**Commit-base:** `300a65a` (Etapa 1 integrada em `develop`)
**Escopo:** remover o CSS próprio e reconstruir as cinco páginas com HTML + Tailwind CSS (Play CDN) + JavaScript puro

> Esta etapa não alterou integrações com APIs, normalizadores, paginação, filtros ou funcionalidades. Os problemas P0 da Etapa 1 continuam documentados para as próximas etapas.

---

## 1. Arquitetura adotada

```text
index.html                  Tailwind CDN + tailwind.config inline + utilities
naruto/index.html           Tailwind CDN + tailwind.config inline + utilities
jujutsukaisen/index.html    Tailwind CDN + tailwind.config inline + utilities
rickandmorty/index.html     Tailwind CDN + tailwind.config inline + utilities
dragonball/index.html       Tailwind CDN + tailwind.config inline + utilities

naruto/scripts.js           lógica de fetch + cards com classes Tailwind
jujutsukaisen/scripts.js    lógica de fetch + cards com classes Tailwind
rickandmorty/script.js      lógica de fetch + cards com classes Tailwind
dragonball/script.js        lógica de fetch + cards com classes Tailwind
```

Regras aplicadas:

- Nenhuma folha de estilo própria permanece no repositório.
- Nenhum bloco `<style>` foi usado como substituto das folhas removidas.
- Todo o visual é declarado por utilities no HTML e por `tailwind.config` inline em cada página.
- O JavaScript continua em arquivos separados e não contém regras de apresentação além das classes Tailwind dos cards que ele próprio cria.

### Integração do Tailwind

Todas as páginas usam a mesma forma de carregamento:

```html
<script src="https://cdn.tailwindcss.com/3.4.17"></script>
<script>
  tailwind.config = {
    theme: { extend: { /* cores, fontes, sombras, animações próprias */ } }
  };
</script>
```

- Versão fixada em `3.4.17` para evitar mudanças silenciosas do CDN.
- Preflight **ativado**: o reset agora vem do Tailwind e substitui o antigo `base.css`.
- A utility `container` do Tailwind não é usada; a largura de conteúdo é declarada explicitamente com `mx-auto w-full max-w-[1160px] px-7`.
- Cada página mantém o seu `tailwind.config` com o mesmo formato (tokens `ink/surface/line/fg/muted/accent`, famílias `display/label/body`, `boxShadow`, `backgroundImage`, `keyframes/animation`), mas com os valores da sua identidade.

---

## 2. Identidades preservadas

| Página | Identidade | Recursos reconstruídos |
|---|---|---|
| Home | Dark anime vibe | gradiente laranja→roxo→ciano, cards com faixa superior colorida, glow radial de fundo, ícone do logo com gradiente, SVGs inline no lugar do Phosphor |
| Naruto | Vila da Folha / pergaminho | paleta `#12151c` + laranja `#ff6a13`, tipografia Kaisei Decol/Rajdhani/Zen Kaku, moldura recortada (`clip-path`) e sombra suave |
| Jujutsu Kaisen | Vazio amaldiçoado | roxo `#8b2fd1`, dourado `#d4af7a`, moldura irregular, animação `curse-pulse` recriada em `keyframes` do Tailwind |
| Rick and Morty | Ciano sobre preto | header ciano, tipografia Poppins, cards `rounded-[50px]` sobre `#1A1A1A`, imagens e ícones originais mantidos |
| Dragon Ball | Esferas do Dragão | header amarelo→laranja, cards com borda `#ff9000` e brilho, grid 2 colunas no mobile e `auto-fit` no desktop |

Animações, hovers, espaçamentos, raios, sombras e breakpoints foram reproduzidos com utilities (`max-[480px]:`, `min-[861px]:`, `sm:`, `lg:`, `hover:`, `group-hover:`, `motion-reduce:`).

### Ícones

O Phosphor Icons era carregado apenas na home. Para não depender de outro CDN, os três selos de tecnologia e o ícone do logo foram substituídos por SVGs inline; o logo usa `linearGradient` com as cores da identidade. O restante das páginas já usava SVGs próprios em `assets/img/`.

---

## 3. Arquivos removidos

### Folhas de estilo próprias (10 arquivos rastreados)

| Arquivo | Conteúdo removido |
|---|---|
| `css/global.css` | tokens da home |
| `css/styles.css` | header, logo, cards e footer da home |
| `naruto/css/global.css` | tokens, reset e container do Naruto |
| `naruto/css/styles.css` | header, hero, cards e footer do Naruto |
| `jujutsukaisen/css/global.css` | tokens, reset e container do JJK |
| `jujutsukaisen/css/styles.css` | header, hero, animação, cards e footer do JJK |
| `rickandmorty/css/global.css` | tokens do Rick |
| `rickandmorty/css/style.css` | header, main, cards e footer do Rick |
| `dragonball/css/global.css` | tokens do Dragon Ball |
| `dragonball/css/style.css` | header, grid, cards e footer do Dragon Ball |

As pastas `css/`, `naruto/css/`, `jujutsukaisen/css/`, `rickandmorty/css/` e `dragonball/css/` ficaram vazias e foram removidas.

### Fundação híbrida da tentativa anterior (não rastreada)

| Arquivo | Motivo da remoção |
|---|---|
| `shared/css/base.css` | reset agora vem do preflight do Tailwind |
| `shared/css/components.css` | `.container` e componentes `ui-*` substituídos por utilities |
| `shared/css/lab.css` | shell da home substituído por utilities |
| `shared/` | pasta vazia após a remoção |

### Outros

| Arquivo | Decisão |
|---|---|
| `.nojekyll` | **Removido.** O site é estático e não possui arquivos ou pastas com `_` que o Jekyll ignoraria; o GitHub Pages publica o conteúdo normalmente sem ele. A remoção foi validada em subdiretório. |
| `Phosphor Icons` (CDN) | **Removido** da home; substituído por SVGs inline. |

### Verificação antes da remoção

- Nenhum HTML referencia `.css` após a migração (`Select-String -Pattern '\.css'` sem resultados).
- Nenhum JS referencia nomes de classes das folhas removidas.
- Todas as imagens e ícones continuam em `assets/img/` e são referenciados por caminhos relativos.

### Preservados

- Os quatro arquivos JavaScript e todos os `assets/`.
- Nomes públicos dos arquivos HTML e URLs das páginas.
- Integrações com as APIs, estados de loading/erro e a lógica de renderização.

---

## 4. JavaScript

Somente as strings de classe dos cards e das mensagens de estado mudaram. A lógica permaneceu intacta:

- `naruto/scripts.js`: `fetch` na Dattebayo API, iteração de `data.characters`, cards Tailwind.
- `jujutsukaisen/scripts.js`: `fetch` na Jikan, `slice(0, 20)`, `try/catch`, mensagens de loading e erro com classes Tailwind.
- `rickandmorty/script.js`: `fetch` na Rick and Morty API, cards Tailwind com `p-[30px]` e informações aninhadas.
- `dragonball/script.js`: `fetch` com `limit=58`, cards Tailwind com variantes `sm:`/`lg:`.

Nenhuma função, endpoint, filtro, paginação ou evento foi alterado.

---

## 5. Validação

### Método

- Chrome `157.0.8103.51` headless via DevTools Protocol.
- Cache desabilitado.
- Desktop: 1440 × 900, escala 1.
- Mobile: 390 × 844, escala 2, touch emulado.
- Captura full-page após espera por cards, fontes e imagens.
- Verificação de `window.tailwind`, `link[rel=stylesheet]`, overflow horizontal e erros de console.
- Teste adicional servindo o repositório sob `http://127.0.0.1:8766/Fetch.Lab/`.

### Resultado — raiz do servidor

| Página | Viewport | Altura baseline → nova | Largura baseline → nova | Overflow | Cards |
|---|---|---:|---:|---:|---:|
| Home | Desktop | 1343 → 1345 | 1425 → 1425 | 0 | 0 |
| Naruto | Desktop | 4082 → 4082 | 1425 → 1425 | 0 | 20 |
| JJK | Desktop | 1244 → 1218 | 1425 → 1425 | 0 | 0 (+ estado de loading) |
| Rick | Desktop | 3645 → 3214 | 1485 → 1425 | 0 | 20 |
| Dragon Ball | Desktop | 6980 → 6980 | 1425 → 1425 | 0 | 58 |
| Home | Mobile | 1912 → 1914 | 390 → 390 | 0 | 0 |
| Naruto | Mobile | 8929 → 8929 | 390 → 390 | 0 | 20 |
| JJK | Mobile | 1624 → 1598 | 390 → 390 | 0 | 0 (+ estado de loading) |
| Rick | Mobile | 3645 → 10255–11283* | 969 → 390 | 0 | 20 |
| Dragon Ball | Mobile | 7053 → 8774 | 1160 → 390 | 0 | 58 |

Leitura das diferenças:

- **Home +2 px**: arredondamento de line-height do título e do rodapé; nenhuma seção mudou de posição relativa.
- **JJK −26 px**: o baseline foi capturado com a mensagem de erro da Jikan (duas linhas no desktop), enquanto a nova captura registrou `Carregando feiticeiros...` (uma linha). A diferença é exatamente uma linha de texto do estado da API, não de layout. O `try/catch` continua exibindo a mensagem de erro quando a requisição falha.
- **Rick desktop −431 px e mobile +6610 px**: o grid antigo tinha 4 colunas fixas e estourava 60 px no desktop e 579 px no mobile (largura de 969 px em uma tela de 390 px). O grid novo é `1 → 2 → 4` colunas e zera o overflow; o mobile passa a empilhar os cards, o que alonga a página corretamente.
- **Rick mobile (\*)**: a altura oscila entre ~10255 e ~11283 px conforme quais imagens externas da API terminam de carregar. Duas imagens não carregaram em uma das capturas, reduzindo a altura; a estrutura (1 coluna, overflow 0) não mudou.
- **Dragon Ball mobile +1721 px**: o grid antigo tinha 4 colunas fixas e estourava 770 px (largura de 1160 px em 390 px). O novo grid usa 2 colunas no mobile e `auto-fit` no desktop, zerando o overflow. Com os cards em 2 colunas, o texto de apoio subiu de 11,2 px para 12 px para manter a legibilidade; o título continua em 15,2 px e nenhuma linha quebra.
- **Naruto e Dragon Ball desktop**: geometria idêntica ao baseline.

### Resultado — subdiretório `/Fetch.Lab/`

- As dez capturas carregaram Tailwind (`window.tailwind` presente) e todos os assets por caminhos relativos.
- Nenhuma referência local quebrada: os HTMLs não carregam mais CSS próprio, e todos os `script.js`/`scripts.js` e imagens responderam com 200.
- Mesma geometria e mesmo comportamento de overflow do teste na raiz.
- Confirma que a remoção do `.nojekyll` não afeta a publicação em subpasta.

### Console

- Home, Naruto, Rick e Dragon Ball: nenhum erro.
- JJK: a Jikan pode falhar ou demorar; quando falha, o `catch` registra o erro e mostra a mensagem de fallback. O comportamento é o mesmo do baseline e não foi introduzido por esta etapa.

---

## 6. Limitações e riscos

| Item | Situação |
|---|---|
| Tailwind Play CDN | compila em runtime, depende de rede e não é indicado para produção madura |
| FOUC | possível enquanto o CDN compila; mitigado pela ordem `script` no `<head>` |
| CSP | uma política rígida pode bloquear `cdn.tailwindcss.com` |
| `preflight` | ativado; qualquer HTML futuro precisa contar com o reset do Tailwind |
| Conteúdo dinâmico | novas classes criadas por JS precisam existir no HTML ou no `tailwind.config`, pois o Play CDN observa o DOM em runtime |
| Build de produção | fora do escopo; a versão fixada do CDN é a mitigação atual |
| Overflow do Rick e do Dragon Ball | resolvido nesta etapa |
| Imagens quebradas e clãs nulos do Naruto | permanecem (P0 da Etapa 1) |
| Fallback do JJK | permanece |
| Testes automatizados | fora do escopo |

---

## 7. Comparação com o baseline

- Identidade visual preservada nas cinco páginas, incluindo paletas, fontes, heros, animações e componentes.
- Home, Naruto e Dragon Ball mantêm a geometria desktop; Naruto mantém também a mobile.
- Rick e Dragon Ball tiveram a responsividade corrigida de forma intencional, eliminando overflow histórico.
- Nenhuma URL pública foi alterada.
- Nenhuma funcionalidade, endpoint ou arquivo JavaScript foi removido.
- Nenhum arquivo CSS permanece no repositório.

---

## 8. Referências

- [Inventário da Etapa 1](../etapa-1/inventario.md)
- [Decisões da Etapa 1](../etapa-1/decisoes.md)
- [Baseline da Etapa 1](../etapa-1/baseline/README.md)
- [Validação da Etapa 2](./validation.json)
- [README](../../README.md)