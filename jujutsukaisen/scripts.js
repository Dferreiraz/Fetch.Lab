// URL da API Jikan para pegar os personagens do anime Jujutsu Kaisen (ID: 40748)
const API_URL = "https://api.jikan.moe/v4/anime/40748/characters"
 
async function fetchJujutsuCharacters() {
  const container = document.getElementById("cards-grid")
 
  // Mensagem de carregando enquanto a API responde
  container.innerHTML = '<p class="loading">Carregando feiticeiros...</p>'
 
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
      card.className = "card"
      card.innerHTML = `
        <div class="card-imagem">
          <img src="${charImage}" alt="Imagem de ${charName}">
        </div>
 
        <div class="card-corpo">
          <h3 class="card-nome">${charName}</h3>
          <p class="card-escola">Jujutsu Kaisen</p>
          <p class="card-grau">${charRole}</p>
        </div>
      `
 
      // Adiciona o card na tela
      container.appendChild(card)
    })
  } catch (error) {
    console.error("Erro ao buscar dados:", error)
    container.innerHTML = '<p class="loading">Erro ao carregar os dados. Tente atualizar a página.</p>'
  }
}
 
// Executa a função assim que a página carrega
window.onload = fetchJujutsuCharacters