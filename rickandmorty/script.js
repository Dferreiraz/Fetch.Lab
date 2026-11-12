const API_URL = "https://rickandmortyapi.com/api/character"
const REQUEST_TIMEOUT_MS = 12000

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
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="300" height="300" fill="#1A1A1A"/><circle cx="150" cy="128" r="52" fill="#262626"/><text x="150" y="140" font-family="Poppins, sans-serif" font-size="34" font-weight="700" fill="#11B0C8" text-anchor="middle">${initials}</text><text x="150" y="218" font-family="Poppins, sans-serif" font-size="15" fill="#ffffff" text-anchor="middle">Imagem indisponível</text></svg>`
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

const renderLoading = () => {
    container.setAttribute("aria-busy", "true")
    container.innerHTML = `
        <div class="col-span-full flex flex-col items-center gap-4 rounded-[50px] bg-black px-[30px] py-14 text-center" role="status" aria-live="polite">
            <span class="h-9 w-9 animate-spin rounded-full border-2 border-panel border-t-rm motion-reduce:animate-none" aria-hidden="true"></span>
            <p class="text-[18px] text-white">Carregando personagens…</p>
        </div>
    `
}

const renderError = (message, detail) => {
    container.removeAttribute("aria-busy")
    container.innerHTML = `
        <div class="col-span-full flex flex-col items-center gap-4 rounded-[50px] bg-black px-[30px] py-12 text-center" role="alert">
            <p class="text-[22px] font-bold text-white">Não foi possível carregar os personagens</p>
            <p class="max-w-[560px] text-[16px] text-[#d4d4d4]">${escapeHtml(message)}</p>
            <p class="text-[12px] font-semibold uppercase tracking-[1.2px] text-[#9a9a9a]">${escapeHtml(detail)}</p>
            <button type="button" data-retry class="mt-2 inline-flex min-h-[44px] items-center justify-center rounded-[10px] bg-rm px-6 py-3 text-[16px] font-bold text-black transition duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black">Tentar novamente</button>
        </div>
    `
    container.querySelector("[data-retry]").addEventListener("click", loadCharacters)
}

const renderEmpty = () => {
    container.removeAttribute("aria-busy")
    container.innerHTML = `
        <p class="col-span-full rounded-[50px] bg-black px-[30px] py-12 text-center text-[16px] text-[#d4d4d4]" role="status">
            Nenhum personagem foi encontrado na resposta da API.
        </p>
    `
}

const createCard = (personagem) => {
    const name = textOr(personagem?.name, "Nome não informado")
    const species = textOr(personagem?.species, "Espécie não informada")
    const status = textOr(personagem?.status, "Status não informado")
    const originName = textOr(personagem?.origin?.name, "Origem desconhecida")
    const origin = originName.toLowerCase() === "unknown" ? "Origem desconhecida" : originName
    const imageUrl = textOr(personagem?.image, "")
    const fallback = fallbackImage(name)

    const card = document.createElement("article")
    card.className = "flex flex-col rounded-[50px] bg-black p-[30px]"
    card.innerHTML = `
        <div class="aspect-square w-full overflow-hidden bg-panel">
            <img src="${escapeHtml(imageUrl || fallback)}" alt="Imagem de ${escapeHtml(name)}" loading="lazy" decoding="async" class="h-full w-full object-cover">
        </div>
        <h2 class="text-[24px] font-bold leading-[normal]">${escapeHtml(name)}</h2>
        <div class="flex items-center gap-[5px]">
            <img src="./assets/img/iconAlien.svg" alt="" aria-hidden="true">
            <p>${escapeHtml(species)}</p>
        </div>
        <div class="flex items-center gap-[5px]">
            <img src="./assets/img/Vector.svg" alt="" aria-hidden="true">
            <p>${escapeHtml(status)}</p>
        </div>
        <div class="flex items-center gap-[5px]">
            <img src="./assets/img/planet.svg" alt="" aria-hidden="true">
            <p>${escapeHtml(origin)}</p>
        </div>
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

        if (!data || !Array.isArray(data.results)) {
            renderError("A resposta da API veio em um formato inesperado.", "Contrato da API")
            return
        }

        if (data.results.length === 0) {
            renderEmpty()
            return
        }

        renderCards(data.results)
    } catch (error) {
        if (requestId !== activeRequestId) return
        const { message, detail } = describeError(error)
        renderError(message, detail)
        console.error("Falha ao carregar a Rick and Morty API:", error)
    } finally {
        clearTimeout(timeout)
    }
}

loadCharacters()