const colors = [
  {
    primaryColor: "#5D93E1",
    secondaryColor: "#ECF3FC",
  },
  {
    primaryColor: "#F9D288",
    secondaryColor: "#FEFAF1",
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

const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

// Capitalize Text
String.prototype.initCap = function () {
  return this.toLowerCase().replace(/(?:^|\s)[a-z]/g, function (m) {
    return m.toUpperCase();
  });
};

// Fetch All Pokemon
fetch(baseUrl)
  .then(function (res) {
    res.json().then(function (data) {
      // console.log(data.results);
      const pokemons = data.results;
      pokemons.forEach((pokemon) => {
        document.getElementById("card").insertAdjacentHTML(
          "beforeend",
          `<div class="card m-2" style="width: 13rem; height: 9rem; border-color: #5D93E1; border-width: 2px; background-color: #ECF3FC;">
            <img src="${fetch(pokemon.url).then(function (res) {
              res.json().then(function (image) {
                image.sprites.front_default;
              });
            })}" class="card-img-top mt-4" id="img" alt="pokemon">
            <div class="card-body text-center">
              <h5 class="fw-bold fs-6 mt-2">${pokemon.name.initCap()}</h5>
            </div>
          </div>`
        );
      });
    });
  })
  .catch(function (err) {
    console.log(err);
  });

function fetchPokemonData(pokemon) {
  let url = pokemon.url;
  fetch(url)
    .then((res) => res.json())
    .then(function (pokeData) {
      renderPokemon(pokeData);
    });
}
