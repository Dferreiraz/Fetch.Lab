# 👹 Jujutsu Kaisen API

**Projeto de consumo de API REST com JavaScript**

Aplicação Front-End que explora os personagens de Jujutsu Kaisen com a Jikan API, praticando requisições HTTP, JavaScript assíncrono, manipulação do DOM e tratamento de indisponibilidade da API.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Jikan API](https://img.shields.io/badge/Jikan_API-REST-2E51A2?style=for-the-badge)

---

## 📑 Índice

- [Sobre o projeto](#-sobre-o-projeto)
- [Como funciona o carregamento](#-como-funciona-o-carregamento)
- [Modo demonstração](#-modo-demonstração)
- [Falhas e nova tentativa](#-falhas-e-nova-tentativa)
- [Limitações conhecidas](#-limitações-conhecidas)
- [Como executar e testar](#-como-executar-e-testar)
- [Estrutura de arquivos](#-estrutura-de-arquivos)

---

## 📌 Sobre o projeto

O Jujutsu Kaisen API consome a [Jikan API](https://docs.api.jikan.moe/), uma API REST não oficial do MyAnimeList, para listar os personagens do anime Jujutsu Kaisen. A interface usa HTML5, Tailwind CSS via Play CDN `3.4.17` e JavaScript clássico, sem build.

O projeto faz parte do [Fetch.Lab](../README.md) e é o único do laboratório que possui um modo de demonstração local para continuar útil quando a API está fora do ar.

## 🔄 Como funciona o carregamento

- **Endpoint:** `https://api.jikan.moe/v4/anime/40748/characters`
- **Timeout:** 12 segundos por requisição, controlado com `AbortController`.
- **Limite exibido:** até 20 personagens (`data.data.slice(0, 20)`).
- **Validação:** a resposta precisa conter um array em `data.data`; qualquer outro formato é tratado como contrato inválido.
- **Papéis:** `role === "Main"` vira “Papel Principal”; os demais valores viram “Coadjuvante”.
- **Imagens:** são aceitas `images.jpg.image_url`, `images.webp.image_url` e `images.jpg.large_image_url`, sempre em um quadro de 320 px de altura com `object-contain`.
- **Estado vazio:** se o array vier vazio, a página informa que nenhum feiticeiro foi encontrado.

O container recebe `aria-busy="true"` durante o carregamento e `role="status"` com `aria-live="polite"`. Mensagens de erro usam `role="alert"`.

## 🛡️ Modo demonstração

O modo de demonstração é acionado quando a API **não pode ser consultada**:

- falha de rede (`TypeError` do `fetch`);
- resposta HTTP fora da faixa 2xx;
- tempo esgotado após 12 segundos;
- erro inesperado ao montar a lista.

Ele **não** é acionado quando a API responde com JSON em formato inesperado nem quando a lista vem vazia. Nesses casos o projeto mostra erro de contrato ou estado vazio, porque a API respondeu — apenas com dados que não podem ser usados.

### Personagens exibidos

| Personagem | Papel |
|---|---|
| Yuji Itadori | Papel Principal |
| Megumi Fushiguro | Papel Principal |
| Nobara Kugisaki | Papel Principal |
| Satoru Gojo | Papel Principal |
| Maki Zenin | Coadjuvante |
| Kento Nanami | Coadjuvante |

### Banner e selo

Quando o modo de demonstração entra em cena:

- um **banner** no topo do grid exibe “Modo demonstração”, a causa da falha, o detalhe classificado (`Tempo esgotado`, `Erro HTTP`, `Falha de rede` ou `Erro de execução`) e o aviso de que os personagens são dados locais de exemplo;
- cada card recebe um **selo “Demonstração”** em dourado e uma borda dourada;
- os avatares são SVGs gerados localmente com as iniciais, sem depender de imagens externas;
- o botão **“Tentar carregar a API novamente”** refaz a requisição.

O banner usa `role="status"` e o container deixa de ter `aria-busy`. Nenhum card de demonstração é apresentado como resposta real da Jikan.

## ⚠️ Falhas e nova tentativa

Cada tentativa recebe um `requestId` incremental e um novo `AbortController`. Se uma resposta antiga chegar depois de uma tentativa mais recente, ela é descartada, evitando que dados desatualizados sobrescrevam a tela.

Mensagens exibidas:

| Causa | Mensagem |
|---|---|
| Timeout | “A API Jikan demorou mais de 12 segundos para responder.” |
| HTTP | “A API Jikan respondeu com erro (HTTP *status*).” |
| Rede | “Não foi possível conectar à API Jikan. Verifique sua conexão.” |
| Contrato | “A resposta da API veio em um formato inesperado.” |
| Execução | “Ocorreu um erro inesperado ao montar a lista de feiticeiros.” |

O botão “Tentar novamente” aparece nos estados de erro; no modo demonstração, o rótulo é “Tentar carregar a API novamente”. Ambos têm alvo mínimo de 44 px.

## 🚧 Limitações conhecidas

- A Jikan é um serviço externo e pode ficar indisponível, lenta ou impor limites de uso. O modo demonstração cobre a indisponibilidade, mas não substitui uma resposta real.
- O caminho de sucesso foi validado com resposta sintética no formato documentado, não com uma resposta real durante a etapa de confiabilidade.
- A lista é limitada a 20 personagens e não há busca, filtro ou página de detalhes.
- O Tailwind Play CDN compila em tempo de execução e não é indicado para produção madura.

## ▶️ Como executar e testar

1. Na raiz do repositório, inicie um servidor estático (por exemplo, Live Server no VS Code ou `python -m http.server`).
2. Acesse a pasta `jujutsukaisen/` pelo servidor — não abra o arquivo direto via `file://`.
3. Para testar o modo demonstração, bloqueie `api.jikan.moe` nas ferramentas de desenvolvedor ou fique offline e recarregue a página.
4. Use o botão de nova tentativa para refazer a consulta depois de liberar a API.

## 📂 Estrutura de arquivos

```text
jujutsukaisen/
├── index.html      # marcação, Tailwind e tema
├── scripts.js      # requisição, estados, cards e modo demonstração
├── README.md
└── assets/img/     # logos e favicon
```

## 👨‍💻 Autor

**Davi Ferreira**

Desenvolvedor Front-End em evolução.

[![GitHub](https://img.shields.io/badge/GitHub-Dferreiraz-181717?style=for-the-badge&logo=github)](https://github.com/Dferreiraz)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Perfil-0A66C2?style=for-the-badge&logo=linkedin)](https://br.linkedin.com/in/davirobertoferreira)

---

<p align="center">
  <strong>Expansão de Domínio: Conhecimento Infinito!</strong>
</p>