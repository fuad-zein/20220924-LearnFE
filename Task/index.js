const colors = [
  {
    primaryColor: "#6C757D",
    secondaryColor: "#E9ECEF",
  },
  {
    primaryColor: "#5D93E1",
    secondaryColor: "#ECF3FC",
  },
  {
    primaryColor: "#F27C1A",
    secondaryColor: "#FCE5D0",
  },
  {
    primaryColor: "#5DC250",
    secondaryColor: "#F2FAF1",
  },
  {
    primaryColor: "#F48687",
    secondaryColor: "#FDF1F1",
  },
  {
    primaryColor: "#B964F7",
    secondaryColor: "#F3F0FD",
  },
];

// Capitalize Text
String.prototype.initCap = function () {
  return this.toLowerCase().replace(/(?:^|\s)[a-z]/g, function (m) {
    return m.toUpperCase();
  });
};

const cardContainer = document.getElementById("card");
const limitPokemon = 24;

const fetchPokemons = async () => {
  for (let i = 1; i <= limitPokemon; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const baseUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(baseUrl);
  const pokemon = await res.json();
  createCard(pokemon);
};

function createCard(pokemon) {
  const pokemonElm = document.createElement("div");
  pokemonElm.className = "card m-2 justify-content-center";
  pokemonElm.style = `width: 10rem; height: 10rem; border-color: ${
    colors[pokemon.id % 6].primaryColor
  }; border-width: 4px; background-color: ${
    colors[pokemon.id % 6].secondaryColor
  };`;
  pokemonElm.classList.add("pokemon");

  const pokeInnerHTML = `
      <img src="${
        pokemon.sprites.other.home.front_default
      }" class="card-img-top mt-4 w-50 align-self-center" id="img" alt="pokemon">
      <div class="card-body text-center">
        <h5 class="card-title fw-bold fs-6" style="color:${
          colors[pokemon.id % 6].primaryColor
        }">${pokemon.id}. ${pokemon.name.initCap()}</h5>
        <small class="card-subtitle text-center" style="color:${
          colors[pokemon.id % 6].primaryColor
        }"; font-size: 5px; font-family: Arial, Helvetica, sans-serif;>Type: <span>${pokemon.types[0].type.name.initCap()}</span> </small>
      </div>
  `;

  pokemonElm.innerHTML = pokeInnerHTML;

  cardContainer.appendChild(pokemonElm);
}

fetchPokemons();
