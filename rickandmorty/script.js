const container = document.getElementById("personagens-container")

fetch("https://rickandmortyapi.com/api/character")
    .then((res) => res.json())
    .then((data) => {
        console.log(data.results)

        data.results.forEach(personagem => {
        const card = document.createElement("div")
        card.className = "flex flex-col rounded-[50px] bg-black p-[30px]"
        card.innerHTML = `
        <img src="${personagem.image}" alt="Imagem do personagem" class="h-auto w-full">
        <h2 class="text-[24px] font-bold leading-[normal]">${personagem.name}</h2>
       <div class="flex items-center gap-[5px]">
            <img src="./assets/img/iconAlien.svg" alt="Icon alien">
            <p>${personagem.species}</p>
        </div>
        <div class="flex items-center gap-[5px]">
            <img src="./assets/img/Vector.svg" alt="Icon Alive">
            <p>${personagem.status}</p>
        </div>
        <div class="flex items-center gap-[5px]">
            <img src="./assets/img/planet.svg" alt="Icon planet">
            <p>${personagem.origin.name}</p>
        </div>
    `
    container.appendChild(card)
    });
    
})