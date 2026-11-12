const API_URL = "https://dragonball-api.com/api/characters?limit=58"
const REQUEST_TIMEOUT_MS = 15000

const container = document.getElementById("personagens-container")

let activeRequestId = 0
let activeController = null

const escapeHtml = (value) =>
    String(value).replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[char]))

const textOr = (value, fallback) => {
    if (Array.isArray(value)) {
        const items = value.map((item) => textOr(item, "")).filter(Boolean)
        return items.length > 0 ? items.join(", ") : fallback
    }
    if (value && typeof value === "object") return fallback
    const text = value === null || value === undefined ? "" : String(value).trim()
    return text || fallback
}

const fallbackImage = (name) => {
    const initials = escapeHtml((name || "?").trim().slice(0, 2).toUpperCase())
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240"><rect width="320" height="240" fill="#1e1e1e"/><circle cx="160" cy="98" r="42" fill="#2c2c2c"/><text x="160" y="109" font-family="Segoe UI, sans-serif" font-size="30" font-weight="700" fill="#ffcc00" text-anchor="middle">${initials}</text><text x="160" y="176" font-family="Segoe UI, sans-serif" font-size="15" fill="#cccccc" text-anchor="middle">Imagem indisponível</text></svg>`
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

const renderLoading = () => {
    container.setAttribute("aria-busy", "true")
    container.innerHTML = `
        <div class="col-span-full flex flex-col items-center gap-4 rounded-[15px] border-2 border-orange-mid bg-card px-6 py-14 text-center" role="status" aria-live="polite">
            <span class="h-9 w-9 animate-spin rounded-full border-2 border-soft border-t-yellow motion-reduce:animate-none" aria-hidden="true"></span>
            <p class="text-[1rem] font-semibold text-dim">Carregando personagens…</p>
        </div>
    `
}

const renderError = (message, detail) => {
    container.removeAttribute("aria-busy")
    container.innerHTML = `
        <div class="col-span-full flex flex-col items-center gap-4 rounded-[15px] border-2 border-orange-mid bg-card px-6 py-12 text-center" role="alert">
            <p class="text-[1.15rem] font-bold text-yellow">Não foi possível carregar os personagens</p>
            <p class="max-w-[560px] text-[0.95rem] text-dim">${escapeHtml(message)}</p>
            <p class="text-[0.75rem] font-semibold uppercase tracking-[1.2px] text-[#aaa]">${escapeHtml(detail)}</p>
            <button type="button" data-retry class="mt-2 inline-flex min-h-[44px] items-center justify-center rounded-[10px] bg-yellow px-6 py-3 text-[0.95rem] font-bold text-[#1b1b1b] transition duration-200 hover:bg-yellow-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-card">Tentar novamente</button>
        </div>
    `
    container.querySelector("[data-retry]").addEventListener("click", loadCharacters)
}

const renderEmpty = () => {
    container.removeAttribute("aria-busy")
    container.innerHTML = `
        <p class="col-span-full rounded-[15px] border-2 border-orange-mid bg-card px-6 py-12 text-center text-[0.95rem] text-dim" role="status">
            Nenhum personagem foi encontrado na resposta da API.
        </p>
    `
}

const createCard = (personagem) => {
    const name = textOr(personagem?.name, "Nome não informado")
    const race = textOr(personagem?.race, "Não informada")
    const gender = textOr(personagem?.gender, "Não informado")
    const ki = textOr(personagem?.ki, "Não informado")
    const imageUrl = textOr(personagem?.image, "")
    const fallback = fallbackImage(name)

    const card = document.createElement("article")
    card.className = "rounded-[10px] border-2 border-orange-mid bg-card p-3 text-center shadow-[0_0_15px_rgba(255,153,0,0.2)] transition duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,165,0,0.53)] sm:rounded-[15px] sm:p-4"
    card.innerHTML = `
        <img src="${escapeHtml(imageUrl || fallback)}" alt="Imagem de ${escapeHtml(name)}" loading="lazy" decoding="async" class="h-[140px] w-full rounded-[10px] border-[3px] border-yellow object-contain p-1 sm:h-[200px] sm:p-2 lg:h-[250px] lg:p-[10px]">
        <h2 class="mt-[0.8rem] text-[0.95rem] font-bold leading-[1.15] text-yellow sm:text-[1.15rem] lg:text-[1.3rem]">${escapeHtml(name)}</h2>
        <p class="mt-[0.3rem] text-[0.75rem] text-dim sm:text-[0.85rem] lg:text-[0.95rem]">Raça: ${escapeHtml(race)}</p>
        <p class="mt-[0.3rem] text-[0.75rem] text-dim sm:text-[0.85rem] lg:text-[0.95rem]">Gênero: ${escapeHtml(gender)}</p>
        <p class="mt-[0.3rem] text-[0.75rem] text-dim sm:text-[0.85rem] lg:text-[0.95rem]">KI: ${escapeHtml(ki)}</p>
    `

    const image = card.querySelector("img")
    image.addEventListener("error", () => {
        if (image.dataset.fallbackApplied === "true") return
        image.dataset.fallbackApplied = "true"
        image.src = fallback
        image.alt = `Imagem de ${name} indisponível`
    })

    return card
}

const renderCards = (characters) => {
    container.removeAttribute("aria-busy")
    container.innerHTML = ""

    const fragment = document.createDocumentFragment()
    characters.forEach((character) => fragment.appendChild(createCard(character)))
    container.appendChild(fragment)
}

const describeError = (error) => {
    if (error?.name === "AbortError") {
        return {
            message: `A API demorou mais de ${REQUEST_TIMEOUT_MS / 1000} segundos para responder. Nenhum dado foi exibido.`,
            detail: "Tempo esgotado"
        }
    }
    if (error?.kind === "http") {
        return {
            message: `A API respondeu com erro (HTTP ${error.status}). Os personagens não foram carregados.`,
            detail: `Erro HTTP ${error.status}`
        }
    }
    if (error instanceof TypeError) {
        return {
            message: "Não foi possível conectar à API. Verifique sua conexão e tente novamente.",
            detail: "Falha de rede"
        }
    }
    return {
        message: "Ocorreu um erro inesperado ao montar a lista de personagens.",
        detail: "Erro de execução"
    }
}

async function loadCharacters() {
    const requestId = ++activeRequestId
    activeController?.abort()
    activeController = new AbortController()
    const controller = activeController
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

    renderLoading()

    try {
        const response = await fetch(API_URL, {
            signal: controller.signal,
            headers: { Accept: "application/json" }
        })

        if (requestId !== activeRequestId) return

        if (!response.ok) {
            const error = new Error(`HTTP ${response.status}`)
            error.kind = "http"
            error.status = response.status
            throw error
        }

        const data = await response.json()
        if (requestId !== activeRequestId) return

        if (!data || !Array.isArray(data.items)) {
            renderError("A resposta da API veio em um formato inesperado.", "Contrato da API")
            return
        }

        if (data.items.length === 0) {
            renderEmpty()
            return
        }

        renderCards(data.items)
    } catch (error) {
        if (requestId !== activeRequestId) return
        const { message, detail } = describeError(error)
        renderError(message, detail)
        console.error("Falha ao carregar a Dragon Ball API:", error)
    } finally {
        clearTimeout(timeout)
    }
}

loadCharacters()