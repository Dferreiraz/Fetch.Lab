# Fetch.Lab

<h1 align="center">
  🌐 Fetch.Lab
</h1>

<p align="center">
  <strong>Laboratório de Consumo de APIs REST com JavaScript</strong><br>
  <em>Front-End • Vanilla JavaScript • Fetch API • Em evolução</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/JavaScript-ES6%2B-yellow?style=flat&logo=javascript&logoColor=black" alt="JavaScript ES6+">
  <img src="https://img.shields.io/badge/Fetch_API-005571?style=flat&logo=googlechrome&logoColor=white" alt="Fetch API">
  <img src="https://img.shields.io/badge/Status-Em%20desenvolvimento-orange" alt="Status">
</p>

<p align="center">
  <a href="#-sobre-o-projeto">Sobre</a> •
  <a href="#-projetos">Projetos</a> •
  <a href="#-como-executar-o-projeto">Como executar</a> •
  <br>
  <a href="#-conceitos-praticados">Conceitos</a> •
  <a href="#-tecnologias">Tecnologias</a> •
  <a href="#-estrutura-do-projeto">Estrutura</a> •
  <a href="#-autor">Autor</a>
</p>

---

## 💻 Sobre o projeto

O **Fetch.Lab** é um laboratório de estudos dedicado ao consumo de APIs REST e à manipulação dinâmica do DOM utilizando JavaScript Vanilla.

O repositório reúne aplicações temáticas desenvolvidas para praticar requisições HTTP, consumo e tratamento de dados JSON, programação assíncrona e renderização dinâmica de interfaces a partir de informações obtidas de APIs externas.

Cada projeto utiliza um universo diferente para explorar conceitos do desenvolvimento Front-End na prática, conectando interfaces web a fontes de dados externas.

A proposta é avançar dos fundamentos da lógica de programação para aplicações capazes de buscar, processar, filtrar e apresentar dados de forma dinâmica, construindo uma base para projetos mais complexos e para o uso futuro de frameworks modernos.

### 🎯 Objetivos do projeto

- Aprender a consumir APIs REST utilizando a Fetch API.
- Compreender requisições HTTP e respostas de endpoints.
- Praticar `Promises`, `async/await` e tratamento de erros.
- Manipular e interpretar dados no formato JSON.
- Trabalhar com arrays, objetos e métodos de iteração e filtragem.
- Renderizar listas, cards e detalhes dinamicamente no DOM.
- Desenvolver funcionalidades de busca, filtros e paginação.
- Implementar estados de carregamento e tratamento de falhas nas requisições.
- Construir interfaces responsivas utilizando HTML5 e Tailwind CSS.
- Consolidar conhecimentos de JavaScript por meio de projetos práticos.

---

## 🚀 Projetos

O laboratório reúne quatro aplicações independentes, cada uma utilizando uma API temática para praticar diferentes aspectos do desenvolvimento Front-End.

| Projeto | API utilizada | Conceitos principais | Acessar |
|---|---|---|---|
| **Dragon Ball** | Dragon Ball API | Requisições GET, renderização de listas e cards de personagens. | [Abrir projeto](./dragonball/) |
| **Jujutsu Kaisen** | Jujutsu Kaisen API | Filtragem de dados, manipulação de arrays e exibição de detalhes. | [Abrir projeto](./jujutsukaisen/) |
| **Naruto** | Naruto API | Consumo de endpoints, tratamento de imagens e estados de carregamento. | [Abrir projeto](./naruto/) |
| **Rick and Morty** | Rick and Morty API | Paginação, busca avançada e manipulação de objetos aninhados. | [Abrir projeto](./rickandmorty/) |

Além das aplicações individuais, o repositório possui uma página principal que reúne os projetos em cards temáticos, facilitando a navegação pelo laboratório.

---

## 🧠 Conceitos praticados

Ao longo dos projetos, o laboratório aborda conceitos fundamentais para o desenvolvimento de aplicações web que consomem dados externos.

**Consumo de APIs**

- Requisições HTTP com `fetch()`.
- Métodos HTTP, com foco em `GET`.
- Endpoints e respostas de APIs REST.
- Conversão de respostas para JSON.
- Tratamento de respostas e erros de requisição.

**JavaScript assíncrono**

- `Promises`.
- `async/await`.
- Encadeamento e controle de requisições assíncronas.
- Tratamento de exceções com `try/catch`.
- Estados de carregamento e falhas de comunicação.

**Manipulação de dados e DOM**

- Arrays e objetos JavaScript.
- Métodos como `map()`, `filter()` e `find()`, conforme a necessidade de cada aplicação.
- Seleção e manipulação de elementos HTML.
- Criação dinâmica de cards e listas.
- Eventos de interação e funcionalidades de busca.
- Paginação e atualização dos resultados exibidos.

**Desenvolvimento Front-End**

- Estruturação semântica com HTML5.
- Estilização utilitária com Tailwind CSS.
- Layouts responsivos com Flexbox e Grid.
- Organização e reutilização de estilos por meio de utilities e configuração de tema.
- Separação entre estrutura, apresentação e comportamento.

---

## 🛠️ Tecnologias

As seguintes tecnologias e ferramentas são utilizadas no desenvolvimento do Fetch.Lab.

### Front-End

- **HTML5** — Estruturação e semântica das páginas.
- **Tailwind CSS** — Estilização utilitária, layouts responsivos e identidade visual, carregada via Play CDN (`3.4.17`).
- **JavaScript ES6+** — Lógica, interatividade, manipulação do DOM e consumo de APIs.
- **Fetch API** — Realização de requisições HTTP para obtenção de dados externos.
- **JSON** — Formato utilizado para representar e manipular os dados recebidos das APIs.

### Ferramentas

- **Visual Studio Code** — Ambiente de desenvolvimento.
- **Live Server** — Execução local das páginas durante o desenvolvimento.
- **Git** — Controle de versão.
- **GitHub** — Hospedagem do código e acompanhamento da evolução dos projetos.

### APIs utilizadas

- [Dragon Ball API](https://web.dragonball-api.com/)
- **Jujutsu Kaisen:** [Jikan API](https://api.jikan.moe/v4/anime/40748/characters)
- [Naruto API](https://narutodb.xyz/)
- [Rick and Morty API](https://rickandmortyapi.com/)

*Os serviços externos podem sofrer alterações, ficar indisponíveis ou modificar seus endpoints. Os links acima servem como referências para as APIs e podem não corresponder exatamente às versões utilizadas originalmente em cada projeto.*

---

## ⚡ Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Dferreiraz/Fetch.Lab.git
```

### 2. Entre na pasta do projeto

```bash
cd Fetch.Lab
```

### 3. Abra o projeto no Visual Studio Code

```bash
code .
```

### 4. Execute com um servidor estático

Sirva a pasta raiz do repositório com um servidor estático e acesse `index.html` pelo endereço local gerado. A extensão **Live Server** no VS Code é a opção mais simples; alternativas incluem `python -m http.server` ou qualquer servidor estático de sua preferência.

> **Importante:** a evolução do projeto adota **módulos ES nativos**. A partir da introdução desses módulos, abrir os arquivos diretamente via `file://` não será o fluxo suportado, pois o navegador bloqueia imports de módulos nesse protocolo. O desenvolvimento local deve ser feito com um servidor estático, como o Live Server.

> **Observação:** como os projetos dependem de APIs externas, é necessário ter conexão com a internet. A disponibilidade dos dados também depende do funcionamento de cada serviço e das configurações de acesso da respectiva API.

---

## 📂 Estrutura do projeto

```text
Fetch.Lab/
│
├── index.html
├── README.md
│
├── naruto/
│   ├── index.html
│   ├── scripts.js
│   └── assets/
│
├── jujutsukaisen/
│   ├── index.html
│   ├── scripts.js
│   └── assets/
│
├── rickandmorty/
│   ├── index.html
│   ├── script.js
│   └── assets/
│
└── dragonball/
    ├── index.html
    ├── script.js
    └── assets/
```

A estrutura é **Tailwind-only**: não há folhas de estilo próprias. Cada `index.html` carrega o Tailwind Play CDN e declara um `tailwind.config` inline com as cores, famílias tipográficas, sombras e animações da sua identidade. O restante da apresentação usa utilities diretamente nas classes dos elementos.

O JavaScript permanece em arquivos separados (`scripts.js` / `script.js`) e cuida apenas de dados, eventos e renderização — os cards criados dinamicamente recebem classes Tailwind no próprio `innerHTML`.

Essa estrutura permite desenvolver, testar e evoluir cada projeto de forma independente dentro do mesmo repositório.

---

## 🧭 Decisões e baseline

A evolução do projeto é documentada em etapas. A Etapa 1 registra o estado atual, as decisões arquiteturais e o baseline visual. A Etapa 2 registra a migração para a arquitetura Tailwind-only e a validação visual.

- [Inventário da Etapa 1](./docs/etapa-1/inventario.md)
- [Decisões técnicas](./docs/etapa-1/decisoes.md)
- [Baseline visual](./docs/etapa-1/baseline/README.md)
- [Verificação das APIs](./docs/etapa-1/api-check.json)
- [Migração Tailwind-only da Etapa 2](./docs/etapa-2/fundacao.md)
- [Validação da Etapa 2](./docs/etapa-2/validation.json)

---

## 👨‍💻 Autor

Desenvolvido por **Davi Ferreira** como parte da jornada de aprendizado em desenvolvimento Front-End, com foco em JavaScript, consumo de APIs REST e construção de aplicações web interativas.

<p>
  <a href="https://github.com/Dferreiraz">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="https://br.linkedin.com/in/davirobertoferreira">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
</p>

---

<p align="center">
  <em>Aprendendo na prática, uma requisição de cada vez.</em>

