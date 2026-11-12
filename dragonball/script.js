const container = document.getElementById("personagens-container")

fetch("https://dragonball-api.com/api/characters?limit=58")
.then((res) => res.json())
.then((data) => {
    console.log(data.items)

    data.items.forEach(personagem => {
        const card = document.createElement("div")
        card.className = "rounded-[10px] border-2 border-orange-mid bg-card p-3 text-center shadow-[0_0_15px_rgba(255,153,0,0.2)] transition duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,165,0,0.53)] sm:rounded-[15px] sm:p-4"
        card.innerHTML = `
        <img src="${personagem.image}" alt="Imagem do Goku" class="h-[140px] w-full rounded-[10px] border-[3px] border-yellow object-contain p-1 sm:h-[200px] sm:p-2 lg:h-[250px] lg:p-[10px]">
        <h2 class="mt-[0.8rem] text-[0.95rem] font-bold leading-[1.15] text-yellow sm:text-[1.15rem] lg:text-[1.3rem]">${personagem.name}</h2>
        <p class="mt-[0.3rem] text-[0.75rem] text-dim sm:text-[0.85rem] lg:text-[0.95rem]">Raça: ${personagem.race}</p>
        <p class="mt-[0.3rem] text-[0.75rem] text-dim sm:text-[0.85rem] lg:text-[0.95rem]">Gênero: ${personagem.gender}</p>
        <p class="mt-[0.3rem] text-[0.75rem] text-dim sm:text-[0.85rem] lg:text-[0.95rem]">KI: ${personagem.ki}</p>

    `
    container.appendChild(card)
    });
    
})
