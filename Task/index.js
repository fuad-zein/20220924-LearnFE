// import * as bootstrap from "bootstrap";

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
  const pokemonElm = document.createElement("button");
  pokemonElm.className = "m-2 justify-content-center";
  pokemonElm.style = `width: 10rem; height: 10rem; border-color: ${
    colors[pokemon.id % 6].primaryColor
  }; border-width: 4px; background-color: ${
    colors[pokemon.id % 6].secondaryColor
  };`;
  pokemonElm.type = "button";
  // pokemonElm.onclick = showModal;
  pokemonElm.classList.add("pokemon");

  const pokeInnerHTML = `
      <div class="p-2">
        <img src="${
          pokemon.sprites.other.home.front_default
        }" class="w-75 align-self-center" id="img" alt="pokemon">
        <div class="justify-content-center text-center center">
          <h5 class="fw-bold fs-6 text-center mt-1" style="color:${
            colors[pokemon.id % 6].primaryColor
          }">${pokemon.name.initCap()}</h5>
          <small class="text-center" style="color:${
            colors[pokemon.id % 6].primaryColor
          }";>Type: <span>${pokemon.types[0].type.name.initCap()}</span> </small>
          <p>${pokemon.abilities.map((x) => {
            return x.ability.name;
          })}</p>
          </div>
      </div>
  `;

  pokemonElm.innerHTML = pokeInnerHTML;

  cardContainer.appendChild(pokemonElm);
}

fetchPokemons();

// let modalWrap = null;
// const showModal = () => {
//   if (modalWrap !== null) {
//     modalWrap.remove();
//   }
//   modalWrap = document.createElement("div");

//   const modalInnerHTML = `
//   <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//     <div class="modal-dialog">
//       <div class="modal-content">
//         <div class="modal-header">
//           <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
//           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//         </div>
//         <div class="modal-body">
//           ...
//         </div>
//         <div class="modal-footer">
//           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//           <button type="button" class="btn btn-primary">Save changes</button>
//         </div>
//       </div>
//     </div>
//   </div>
//   `;

//   modalWrap.innerHTML = modalInnerHTML;
//   document.body.append(modalWrap);

//   let modal = new bootstrap.Modal(modalWrap.querySelector(".modal"));
//   modal.show();
// };
