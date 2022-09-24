// Fetch All Pokemon
fetch("https://pokeapi.co/api/v2/pokemon/")
  .then(function (res) {
    if (res.status != 200) {
      console.log("Error = " + res.status);
      return;
    }
    res.json().then(function (data) {
      // console.log(data.results);
      const pokemons = data.results;
      pokemons.forEach((pokemon) => {
        document
          .getElementById("pokemonList")
          .insertAdjacentHTML(
            "beforeend",
            `<li onclick='detail("${pokemon.url}")'>${pokemon.name}</li>`
          );
      });
    });
  })
  .catch(function (err) {
    console.log(err);
  });

function detail(url) {
  fetch(url).then(function (res) {
    res.json().then(function (pokemon) {
      console.log(pokemon);
      document.getElementById("detail").innerHTML = "";
      document.getElementById("detail").insertAdjacentHTML(
        "beforeend",
        `<h3>${pokemon.name}</h3>
          <img src='${pokemon.sprites.front_default}'>
          <p>Jurus : ${pokemon.moves[0].move.name}</p>
          <p>Tinggi : ${pokemon.height}</p>
          <p>Berat : ${pokemon.weight}</p>
        `
      );
    });
  });
}
