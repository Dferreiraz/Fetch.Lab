# 🐉 Dragon Ball API

**Projeto de consumo de API REST com JavaScript**

Aplicação Front-End que explora personagens do universo Dragon Ball com a Dragon Ball API, praticando requisições HTTP, renderização de listas e layout responsivo.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Dragon Ball API](https://img.shields.io/badge/Dragon_Ball_API-REST-FFCC00?style=for-the-badge)

---

## 📑 Índice

- [Sobre o projeto](#-sobre-o-projeto)
- [Como funciona o carregamento](#-como-funciona-o-carregamento)
- [Layout responsivo](#-layout-responsivo)
- [Falhas e nova tentativa](#-falhas-e-nova-tentativa)
- [Limitações conhecidas](#-limitações-conhecidas)
- [Como executar](#-como-executar)

---

## 📌 Sobre o projeto

O Dragon Ball API consome a [Dragon Ball API](https://web.dragonball-api.com/) para listar personagens do universo Dragon Ball. A interface usa HTML5, Tailwind CSS via Play CDN `3.4.17` e JavaScript clássico, sem build, e faz parte do [Fetch.Lab](../README.md).

## 🔄 Como funciona o carregamento

- **Endpoint:** `https://dragonball-api.com/api/characters?limit=58`
- **Timeout:** 15 segundos, controlado com `AbortController` (a API é mais lenta que as demais do laboratório).
- **Validação:** a resposta precisa conter um array em `items`; outros formatos são tratados como contrato inválido.
- **Conteúdo:** nome, raça, gênero e KI de cada personagem.
- **Estado vazio:** se o array vier vazio, a página informa que nenhum personagem foi encontrado.

## 📱 Layout responsivo

O grid usa 2 colunas no mobile, **3 no tablet** (`sm:grid-cols-3`) e `auto-fit` a partir de `lg`. As imagens têm altura fixa por breakpoint (140/200/250 px) com `object-contain`.

## ⚠️ Falhas e nova tentativa

O projeto diferencia tempo esgotado, erro HTTP, falha de rede, contrato da API e erro de execução. Cada tentativa recebe um `requestId` e um novo `AbortController`; respostas antigas são descartadas.

Estados:

- carregamento com `role="status"`, `aria-live` e `aria-busy`;
- erro com `role="alert"` e botão **“Tentar novamente”**;
- estado vazio com mensagem própria;
- fallback SVG com as iniciais do personagem quando a imagem falha.

## 🚧 Limitações conhecidas

- A API é externa e pode ficar indisponível ou lenta.
- A listagem carrega 58 personagens em uma única requisição, sem paginação, busca ou filtros.
- O Tailwind Play CDN compila em tempo de execução e não é indicado para produção madura.

## ▶️ Como executar

1. Na raiz do repositório, inicie um servidor estático (Live Server, `python -m http.server` ou equivalente).
2. Acesse a pasta `dragonball/` pelo servidor — não abra o arquivo direto via `file://`.
3. Para testar o timeout, bloqueie `dragonball-api.com` nas ferramentas de desenvolvedor e recarregue a página.

## 👨‍💻 Autor

**Davi Ferreira**

Desenvolvedor Front-End em evolução.

[![GitHub](https://img.shields.io/badge/GitHub-Dferreiraz-181717?style=for-the-badge&logo=github)](https://github.com/Dferreiraz)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Perfil-0A66C2?style=for-the-badge&logo=linkedin)](https://br.linkedin.com/in/davirobertoferreira)

---

<p align="center">
  <strong>Que a energia do KI acompanhe cada requisição!</strong>
</p>