const container = document.getElementById("cards-grid")

fetch("https://dattebayo-api.onrender.com/characters")
    .then((res) => res.json())
    .then((data) => {
        console.log(data.characters)

        data.characters.forEach(personagem => {
            const card = document.createElement("div")
            card.className = "px-7"
            card.innerHTML = `
            <div class="relative flex flex-col overflow-hidden rounded-[14px] border border-line bg-surface transition duration-200 hover:-translate-y-1.5 hover:border-accent hover:shadow-soft">
          
          <div class="relative">
            <img src="${personagem.images}" alt="Imagem do personagem" class="block h-auto w-full">   
          </div>

          <div class="flex flex-col gap-2 p-7">
            <h3 class="font-display text-[22px] leading-[1.15]">${personagem.name}</h3>
            <p class="font-label text-[14px] font-semibold tracking-[0.4px] text-accent">${personagem.personal.affiliation[0]}</p>
            <p class="mb-2 text-[15px] font-semibold text-accent">${personagem.personal.clan}</p>
          </div>
        </div>
        `
            container.appendChild(card)
        });

    })