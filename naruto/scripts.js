const container = document.getElementById("cards-grid")

fetch("https://dattebayo-api.onrender.com/characters")
    .then((res) => res.json())
    .then((data) => {
        console.log(data.characters)

        data.characters.forEach(personagem => {
            const card = document.createElement("div")
            card.className = "container"
            card.innerHTML = `
            <div class="div-card">
          
          <div class="div-capa">
            <img src="${personagem.images}" alt="Imagem do personagem">   
          </div>

          <div class="div-corpo">
            <h3 class="h3-nome">${personagem.name}</h3>
            <p class="p-vila">${personagem.personal.affiliation[0]}</p>
            <p class="p-cla">${personagem.personal.clan}</p>
          </div>
        </div>
        `
            container.appendChild(card)
        });

    })