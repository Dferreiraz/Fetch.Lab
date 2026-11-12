# 🛸 Rick and Morty API

**Projeto de consumo de API REST com JavaScript**

Aplicação Front-End que explora personagens de Rick and Morty com a Rick and Morty API, praticando requisições HTTP, leitura de objetos aninhados e renderização dinâmica.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Rick and Morty API](https://img.shields.io/badge/Rick_and_Morty-API-97CE4C?style=for-the-badge)

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

O Rick and Morty API consome a [Rick and Morty API](https://rickandmortyapi.com/) para listar personagens da série. A interface usa HTML5, Tailwind CSS via Play CDN `3.4.17` e JavaScript clássico, sem build, e faz parte do [Fetch.Lab](../README.md).

## 🔄 Como funciona o carregamento

- **Endpoint:** `https://rickandmortyapi.com/api/character`
- **Timeout:** 12 segundos, controlado com `AbortController`.
- **Validação:** a resposta precisa conter um array em `results`; outros formatos são tratados como contrato inválido.
- **Conteúdo:** nome, espécie, status e origem de cada personagem.
- **Estado vazio:** se o array vier vazio, a página informa que nenhum personagem foi encontrado.

## 🖼️ Tratamento de dados e imagens

- Objetos aninhados são lidos com segurança (`origin.name`, por exemplo).
- Quando `origin.name` é exatamente `"unknown"`, a interface mostra **“Origem desconhecida”**.
- Campos ausentes recebem rótulos de indisponibilidade.
- As imagens usam um quadro quadrado com `object-cover`, preservando o recorte original.
- Se a imagem falhar, um SVG local com as iniciais do personagem substitui a imagem.
- Os ícones de espécie, status e origem são decorativos (`alt=""` e `aria-hidden="true"`), pois o texto ao lado já descreve o dado.

## ⚠️ Falhas e nova tentativa

O projeto diferencia tempo esgotado, erro HTTP, falha de rede, contrato da API e erro de execução. Cada tentativa recebe um `requestId` e um novo `AbortController`; respostas antigas são descartadas.

Estados:

- carregamento com `role="status"`, `aria-live` e `aria-busy`;
- erro com `role="alert"` e botão **“Tentar novamente”**;
- estado vazio com mensagem própria.

## 🚧 Limitações conhecidas

- A API é externa e pode ficar indisponível ou lenta.
- A página carrega apenas a primeira página da API (20 personagens). Não há paginação, busca ou filtros nesta versão.
- O Tailwind Play CDN compila em tempo de execução e não é indicado para produção madura.

## ▶️ Como executar

1. Na raiz do repositório, inicie um servidor estático (Live Server, `python -m http.server` ou equivalente).
2. Acesse a pasta `rickandmorty/` pelo servidor — não abra o arquivo direto via `file://`.
3. Para testar o erro e o retry, bloqueie `rickandmortyapi.com` nas ferramentas de desenvolvedor e recarregue a página.

## 👨‍💻 Autor

**Davi Ferreira**

Desenvolvedor Front-End em evolução.

[![GitHub](https://img.shields.io/badge/GitHub-Dferreiraz-181717?style=for-the-badge&logo=github)](https://github.com/Dferreiraz)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Perfil-0A66C2?style=for-the-badge&logo=linkedin)](https://br.linkedin.com/in/davirobertoferreira)

---

<p align="center">
  <strong>Wubba lubba dub dub! Mais uma API explorada.</strong>
</p>