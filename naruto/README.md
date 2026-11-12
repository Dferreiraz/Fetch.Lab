# 🍥 Naruto API

**Projeto de consumo de API REST com JavaScript**

Aplicação Front-End que explora personagens do universo Naruto com a Dattebayo API, praticando requisições HTTP, normalização de dados e renderização dinâmica de cards.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Dattebayo API](https://img.shields.io/badge/Dattebayo_API-REST-FF6A13?style=for-the-badge)

---

## 📑 Índice

- [Sobre o projeto](#-sobre-o-projeto)
- [Como funciona o carregamento](#-como-funciona-o-carregamento)
- [Tratamento de dados e imagens](#-tratamento-de-dados-e-imagens)
- [Falhas e nova tentativa](#-falhas-e-nova-tentativa)
- [Limitações conhecidas](#-limitações-conhecidas)
- [Como executar](#-como-executar)

---

## 📌 Sobre o projeto

O Naruto API consome a [Dattebayo API](https://dattebayo-api.onrender.com/characters) para listar personagens do anime. A interface usa HTML5, Tailwind CSS via Play CDN `3.4.17` e JavaScript clássico, sem build, e faz parte do [Fetch.Lab](../README.md).

## 🔄 Como funciona o carregamento

- **Endpoint:** `https://dattebayo-api.onrender.com/characters`
- **Timeout:** 12 segundos, controlado com `AbortController`.
- **Validação:** a resposta precisa conter um array em `characters`; outros formatos são tratados como contrato inválido.
- **Renderização:** cada personagem vira um `article` com nome, afiliação e clã.
- **Estado vazio:** se o array vier vazio, a página informa que nenhum personagem foi encontrado.

## 🖼️ Tratamento de dados e imagens

- O campo `images` é sempre tratado como **array**, mas o código também aceita string e objeto com `jpg.image_url`, `image_url` ou `url`.
- A primeira URL `http(s)` válida é usada em um quadro `4:3` com `object-contain`, preservando a proporção original.
- Se a imagem falhar, um SVG local com as iniciais do personagem substitui a imagem, sem novo loop de erro.
- `personal.clan` nulo vira **“Clã não informado”**.
- `personal.affiliation` ausente vira **“Afiliação não informada”**.
- Nenhum campo é inventado: apenas rótulos de indisponibilidade são usados.

## ⚠️ Falhas e nova tentativa

O projeto diferencia tempo esgotado, erro HTTP, falha de rede, contrato da API e erro de execução. Cada tentativa recebe um `requestId` e um novo `AbortController`; respostas antigas são descartadas.

Estados:

- carregamento com `role="status"`, `aria-live` e `aria-busy`;
- erro com `role="alert"` e botão **“Tentar novamente”**;
- estado vazio com mensagem própria.

## 🚧 Limitações conhecidas

- A API é externa e pode ficar indisponível ou lenta.
- As imagens ficam na wikia do Naruto; alguns ambientes de linha de comando recebem `403`, embora o Chrome carregue normalmente. A validação visual depende do navegador.
- A única imagem de Jiraiya responde `404`; a wikia devolve um placeholder que ainda decodifica, então o fallback SVG não é acionado.
- A listagem exibe apenas os personagens retornados pela resposta atual (20), sem paginação, busca ou filtros.
- O Tailwind Play CDN compila em tempo de execução e não é indicado para produção madura.

## ▶️ Como executar

1. Na raiz do repositório, inicie um servidor estático (Live Server, `python -m http.server` ou equivalente).
2. Acesse a pasta `naruto/` pelo servidor — não abra o arquivo direto via `file://`.
3. Para testar o erro e o retry, bloqueie `dattebayo-api.onrender.com` nas ferramentas de desenvolvedor e recarregue a página.

## 👨‍💻 Autor

**Davi Ferreira**

Desenvolvedor Front-End em evolução.

[![GitHub](https://img.shields.io/badge/GitHub-Dferreiraz-181717?style=for-the-badge&logo=github)](https://github.com/Dferreiraz)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Perfil-0A66C2?style=for-the-badge&logo=linkedin)](https://br.linkedin.com/in/davirobertoferreira)

---

<p align="center">
  <strong>Acredite! O conhecimento está a um fetch de distância.</strong>
</p>