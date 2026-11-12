// URL da API Jikan para pegar os personagens do anime Jujutsu Kaisen (ID: 40748)
const API_URL = "https://api.jikan.moe/v4/anime/40748/characters"
const REQUEST_TIMEOUT_MS = 12000
const MAX_CHARACTERS = 20

// Fallback local: dados de demonstração usados apenas quando a Jikan está
// indisponível. Nunca são apresentados como resposta real da API.
const DEMO_CHARACTERS = [
    { name: "Yuji Itadori", role: "Papel Principal" },
    { name: "Megumi Fushiguro", role: "Papel Principal" },
    { name: "Nobara Kugisaki", role: "Papel Principal" },
    { name: "Satoru Gojo", role: "Papel Principal" },
    { name: "Maki Zenin", role: "Coadjuvante" },
    { name: "Kento Nanami", role: "Coadjuvante" }
]

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

const isUrl = (value) => typeof value === "string" && /^https?:\/\/\S+$/i.test(value.trim())

const pickImageUrl = (character) => {
    const candidates = [
        character?.images?.jpg?.image_url,
        character?.images?.webp?.image_url,
        character?.images?.jpg?.large_image_url
    ]
    for (const candidate of candidates) {
        if (isUrl(candidate)) return candidate.trim()
    }
    return null
}

const avatar = (name, label) => {
    const initials = escapeHtml((name || "?").trim().slice(0, 2).toUpperCase())
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#2b2438"/><stop offset="100%" stop-color="#131019"/></linearGradient></defs><rect width="300" height="400" fill="url(#g)"/><circle cx="150" cy="168" r="66" fill="#2b2438" stroke="#8b2fd1" stroke-opacity="0.5" stroke-width="2"/><text x="150" y="184" font-family="Georgia, serif" font-size="44" fill="#d4af7a" text-anchor="middle">${initials}</text><text x="150" y="290" font-family="Arial, sans-serif" font-size="16" fill="#b7aec4" text-anchor="middle">${escapeHtml(label)}</text></svg>`
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

const renderLoading = () => {
    container.setAttribute("aria-busy", "true")
    container.innerHTML = `
        <div class="col-span-full flex flex-col items-center gap-4 rounded-[14px] border border-line bg-surface/60 px-6 py-14 text-center" role="status" aria-live="polite">
            <span class="h-9 w-9 animate-spin rounded-full border-2 border-line border-t-accent motion-reduce:animate-none" aria-hidden="true"></span>
            <p class="font-label text-[16px] font-semibold tracking-[0.6px] text-muted">Carregando feiticeiros…</p>
            <p class="max-w-[520px] text-[14px] text-muted/80">Consultando a API Jikan. Se ela não responder, exibiremos dados de demonstração.</p>
        </div>
    `
}

const renderError = (message, detail) => {
    container.removeAttribute("aria-busy")
    container.innerHTML = `
        <div class="col-span-full flex flex-col items-center gap-4 rounded-[14px] border border-line bg-surface px-6 py-12 text-center" role="alert">
            <p class="font-display text-[22px] leading-[1.2]">Não foi possível carregar os feiticeiros</p>
            <p class="max-w-[560px] text-[15px] text-muted">${escapeHtml(message)}</p>
            <p class="font-label text-[13px] font-semibold uppercase tracking-[1.2px] text-muted/80">${escapeHtml(detail)}</p>
            <button type="button" data-retry class="mt-2 inline-flex min-h-[44px] items-center justify-center rounded-md bg-accent px-6 py-3 font-label text-[17px] font-semibold tracking-[0.8px] text-fg transition duration-150 hover:-translate-y-0.5 hover:bg-accent-dark hover:shadow-curse focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink">Tentar novamente</button>
        </div>
    `
    container.querySelector("[data-retry]").addEventListener("click", loadCharacters)
}

const renderEmpty = () => {
    container.removeAttribute("aria-busy")
    container.innerHTML = `
        <p class="col-span-full rounded-[14px] border border-line bg-surface px-6 py-12 text-center text-[15px] text-muted" role="status">
            Nenhum feiticeiro foi encontrado na resposta da API.
        </p>
    `
}

const createCard = (item) => {
    const name = textOr(item?.character?.name, "Personagem sem nome")
    const role = item?.role === "Main" ? "Papel Principal" : "Coadjuvante"
    const imageUrl = pickImageUrl(item?.character)
    const fallback = avatar(name, "Imagem indisponível")

    const card = document.createElement("article")
    card.className = "group relative flex flex-col overflow-hidden rounded-[14px] border border-line bg-surface transition duration-200 hover:-translate-y-1.5 hover:border-accent hover:shadow-curse"
    card.innerHTML = `
        <div class="relative h-[320px] w-full overflow-hidden bg-surface">
            <img src="${escapeHtml(imageUrl || fallback)}" alt="Imagem de ${escapeHtml(name)}" loading="lazy" decoding="async" class="h-full w-full object-contain object-top transition duration-300 group-hover:scale-105">
        </div>

        <div class="flex flex-col gap-2 p-7">
            <h3 class="font-display text-[22px] leading-[1.15]">${escapeHtml(name)}</h3>
            <p class="font-label text-[15px] font-semibold tracking-[0.6px] text-accent">Jujutsu Kaisen</p>
            <p class="mb-2 text-[15px] font-semibold text-gold">${escapeHtml(role)}</p>
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

const createDemoCard = (demo) => {
    const card = document.createElement("article")
    card.className = "group relative flex flex-col overflow-hidden rounded-[14px] border border-gold/40 bg-surface transition duration-200 hover:-translate-y-1.5 hover:border-gold"
    card.innerHTML = `
        <div class="relative h-[320px] w-full overflow-hidden bg-surface">
            <img src="${avatar(demo.name, "Dados de demonstração")}" alt="Avatar de demonstração de ${escapeHtml(demo.name)}" class="h-full w-full object-contain">
        </div>

        <div class="flex flex-col gap-2 p-7">
            <span class="inline-flex w-fit items-center rounded-full border border-gold/40 bg-gold/10 px-3 py-1 font-label text-[12px] font-semibold uppercase tracking-[1.2px] text-gold">Demonstração</span>
            <h3 class="font-display text-[22px] leading-[1.15]">${escapeHtml(demo.name)}</h3>
            <p class="font-label text-[15px] font-semibold tracking-[0.6px] text-accent">Jujutsu Kaisen</p>
            <p class="mb-2 text-[15px] font-semibold text-gold">${escapeHtml(demo.role)}</p>
        </div>
    `
    return card
}

const renderCards = (characters) => {
    container.removeAttribute("aria-busy")
    container.innerHTML = ""

    const fragment = document.createDocumentFragment()
    characters.forEach((character) => fragment.appendChild(createCard(character)))
    container.appendChild(fragment)
}

const renderDemo = (message, detail) => {
    container.removeAttribute("aria-busy")
    container.innerHTML = ""

    const banner = document.createElement("div")
    banner.className = "col-span-full flex flex-col items-center gap-3 rounded-[14px] border border-gold/40 bg-surface px-6 py-6 text-center"
    banner.setAttribute("role", "status")
    banner.innerHTML = `
        <p class="font-label text-[13px] font-semibold uppercase tracking-[1.6px] text-gold">Modo demonstração</p>
        <p class="max-w-[620px] text-[15px] text-muted">${escapeHtml(message)}</p>
        <p class="font-label text-[13px] font-semibold uppercase tracking-[1.2px] text-muted/80">${escapeHtml(detail)}</p>
        <p class="max-w-[620px] text-[14px] text-muted/80">Os personagens abaixo são dados locais de exemplo, não uma resposta da API Jikan.</p>
        <button type="button" data-retry class="mt-1 inline-flex min-h-[44px] items-center justify-center rounded-md border-[1.5px] border-accent bg-transparent px-6 py-3 font-label text-[17px] font-semibold tracking-[0.8px] text-fg transition duration-150 hover:-translate-y-0.5 hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink">Tentar carregar a API novamente</button>
    `

    const fragment = document.createDocumentFragment()
    fragment.appendChild(banner)
    DEMO_CHARACTERS.forEach((demo) => fragment.appendChild(createDemoCard(demo)))
    container.appendChild(fragment)

    container.querySelector("[data-retry]").addEventListener("click", loadCharacters)
}

const describeError = (error) => {
    if (error?.name === "AbortError") {
        return {
            message: `A API Jikan demorou mais de ${REQUEST_TIMEOUT_MS / 1000} segundos para responder.`,
            detail: "Tempo esgotado"
        }
    }
    if (error?.kind === "http") {
        return {
            message: `A API Jikan respondeu com erro (HTTP ${error.status}).`,
            detail: `Erro HTTP ${error.status}`
        }
    }
    if (error instanceof TypeError) {
        return {
            message: "Não foi possível conectar à API Jikan. Verifique sua conexão.",
            detail: "Falha de rede"
        }
    }
    return {
        message: "Ocorreu um erro inesperado ao montar a lista de feiticeiros.",
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

        // Impede que uma resposta antiga sobrescreva a tentativa mais recente.
        if (requestId !== activeRequestId) return

        if (!response.ok) {
            const error = new Error(`HTTP ${response.status}`)
            error.kind = "http"
            error.status = response.status
            throw error
        }

        const data = await response.json()
        if (requestId !== activeRequestId) return

        if (!data || !Array.isArray(data.data)) {
            renderError("A resposta da API veio em um formato inesperado.", "Contrato da API")
            return
        }

        if (data.data.length === 0) {
            renderEmpty()
            return
        }

        renderCards(data.data.slice(0, MAX_CHARACTERS))
    } catch (error) {
        if (requestId !== activeRequestId) return
        const { message, detail } = describeError(error)
        renderDemo(message, detail)
        console.error("Falha ao carregar a API Jikan:", error)
    } finally {
        clearTimeout(timeout)
    }
}

loadCharacters()