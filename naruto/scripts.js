const API_URL = "https://dattebayo-api.onrender.com/characters"
const REQUEST_TIMEOUT_MS = 12000

const container = document.getElementById("cards-grid")

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

// A API devolve `images` como array (às vezes com mais de uma URL). Alguns
// registros podem vir como string ou objeto, então aceitamos os três formatos.
const pickImageUrl = (images) => {
    const candidates = Array.isArray(images) ? images : [images]
    const isUrl = (value) => typeof value === "string" && /^https?:\/\/\S+$/i.test(value.trim())

    for (const candidate of candidates) {
        if (isUrl(candidate)) return candidate.trim()
        if (candidate && typeof candidate === "object") {
            const nested = [candidate.jpg?.image_url, candidate.image_url, candidate.url]
            for (const url of nested) {
                if (isUrl(url)) return url.trim()
            }
        }
    }
    return null
}

const fallbackImage = (name) => {
    const initials = escapeHtml((name || "?").trim().slice(0, 2).toUpperCase())
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="#1b1f28"/><circle cx="200" cy="124" r="52" fill="#2a2f3b"/><text x="200" y="136" font-family="Georgia, serif" font-size="34" fill="#cfc2a6" text-anchor="middle">${initials}</text><text x="200" y="214" font-family="Arial, sans-serif" font-size="17" fill="#cfc2a6" text-anchor="middle">Imagem indisponível</text></svg>`
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

const renderLoading = () => {
    container.setAttribute("aria-busy", "true")
    container.innerHTML = `
        <div class="col-span-full flex flex-col items-center gap-4 rounded-[14px] border border-line bg-surface/60 px-6 py-14 text-center" role="status" aria-live="polite">
            <span class="h-9 w-9 animate-spin rounded-full border-2 border-line border-t-accent motion-reduce:animate-none" aria-hidden="true"></span>
            <p class="font-label text-[16px] font-semibold tracking-[0.4px] text-muted">Carregando personagens…</p>
        </div>
    `
}

const renderError = (message, detail) => {
    container.removeAttribute("aria-busy")
    container.innerHTML = `
        <div class="col-span-full flex flex-col items-center gap-4 rounded-[14px] border border-line bg-surface px-6 py-12 text-center" role="alert">
            <p class="font-display text-[22px] leading-[1.2]">Não foi possível carregar os personagens</p>
            <p class="max-w-[560px] text-[15px] text-muted">${escapeHtml(message)}</p>
            <p class="font-label text-[13px] font-semibold uppercase tracking-[1.2px] text-muted/80">${escapeHtml(detail)}</p>
            <button type="button" data-retry class="mt-2 inline-flex min-h-[44px] items-center justify-center rounded-md bg-accent px-6 py-3 font-label text-[16px] font-semibold tracking-[0.5px] text-ink transition duration-150 hover:-translate-y-0.5 hover:bg-accent-dark hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink">Tentar novamente</button>
        </div>
    `
    container.querySelector("[data-retry]").addEventListener("click", loadCharacters)
}

const renderEmpty = () => {
    container.removeAttribute("aria-busy")
    container.innerHTML = `
        <p class="col-span-full rounded-[14px] border border-line bg-surface px-6 py-12 text-center text-[15px] text-muted" role="status">
            Nenhum personagem foi encontrado na resposta da API.
        </p>
    `
}

const createCard = (character) => {
    const name = textOr(character?.name, "Personagem sem nome")
    const village = textOr(character?.personal?.affiliation?.[0], "Afiliação não informada")
    const clan = textOr(character?.personal?.clan, "Clã não informado")
    const imageUrl = pickImageUrl(character?.images)
    const fallback = fallbackImage(name)

    const card = document.createElement("article")
    card.className = "relative flex flex-col overflow-hidden rounded-[14px] border border-line bg-surface transition duration-200 hover:-translate-y-1.5 hover:border-accent hover:shadow-soft"
    card.innerHTML = `
        <div class="relative aspect-[4/3] w-full overflow-hidden bg-ink/40">
            <img src="${escapeHtml(imageUrl || fallback)}" alt="Imagem de ${escapeHtml(name)}" loading="lazy" decoding="async" class="h-full w-full object-contain">
        </div>

        <div class="flex flex-col gap-2 p-7">
            <h3 class="font-display text-[22px] leading-[1.15]">${escapeHtml(name)}</h3>
            <p class="font-label text-[14px] font-semibold tracking-[0.4px] text-accent">${escapeHtml(village)}</p>
            <p class="mb-2 text-[15px] font-semibold text-accent">${escapeHtml(clan)}</p>
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

        // Uma resposta antiga nunca deve sobrescrever a requisição mais recente.
        if (requestId !== activeRequestId) return

        if (!response.ok) {
            const error = new Error(`HTTP ${response.status}`)
            error.kind = "http"
            error.status = response.status
            throw error
        }

        const data = await response.json()
        if (requestId !== activeRequestId) return

        if (!data || !Array.isArray(data.characters)) {
            renderError("A resposta da API veio em um formato inesperado.", "Contrato da API")
            return
        }

        if (data.characters.length === 0) {
            renderEmpty()
            return
        }

        renderCards(data.characters)
    } catch (error) {
        if (requestId !== activeRequestId) return
        const { message, detail } = describeError(error)
        renderError(message, detail)
        console.error("Falha ao carregar a Naruto API:", error)
    } finally {
        clearTimeout(timeout)
    }
}

loadCharacters()