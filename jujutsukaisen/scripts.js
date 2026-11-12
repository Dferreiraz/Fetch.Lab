// URL da API Jikan para pegar os personagens do anime Jujutsu Kaisen (ID: 40748)
const API_URL = "https://api.jikan.moe/v4/anime/40748/characters"
 
async function fetchJujutsuCharacters() {
  const container = document.getElementById("cards-grid")
 
  // Mensagem de carregando enquanto a API responde
  container.innerHTML = '<p class="text-fg">Carregando feiticeiros...</p>'
 
  try {
    // Faz a requisição para a API
    const response = await fetch(API_URL)
 
    if (!response.ok) {
      throw new Error(`Erro na resposta da API: ${response.status}`)
    }
 
    const data = await response.json()
 
    // Limpa a mensagem de "Carregando"
    container.innerHTML = ""
 
    // Pega a lista de personagens do resultado
    const characters = data.data
 
    // Limita a exibição aos 20 primeiros para não travar a tela
    characters.slice(0, 20).forEach(item => {
      const charName = item.character.name
      const charImage = item.character.images.jpg.image_url
      const charRole = item.role === "Main" ? "Papel Principal" : "Coadjuvante"
 
      // Cria o elemento HTML do Card
      const card = document.createElement("div")
      card.className = "group relative flex flex-col overflow-hidden rounded-[14px] border border-line bg-surface transition duration-200 hover:-translate-y-1.5 hover:border-accent hover:shadow-curse"
      card.innerHTML = `
        <div class="relative h-[320px] w-full overflow-hidden bg-surface">
          <img src="${charImage}" alt="Imagem de ${charName}" class="h-full w-full object-contain object-top transition duration-300 group-hover:scale-105">
        </div>
 
        <div class="flex flex-col gap-2 p-7">
          <h3 class="font-display text-[22px] leading-[1.15]">${charName}</h3>
          <p class="font-label text-[15px] font-semibold tracking-[0.6px] text-accent">Jujutsu Kaisen</p>
          <p class="mb-2 text-[15px] font-semibold text-gold">${charRole}</p>
        </div>
      `
 
      // Adiciona o card na tela
      container.appendChild(card)
    })
  } catch (error) {
    console.error("Erro ao buscar dados:", error)
    container.innerHTML = '<p class="text-fg">Erro ao carregar os dados. Tente atualizar a página.</p>'
  }
}
 
// Executa a função assim que a página carrega
window.onload = fetchJujutsuCharacters