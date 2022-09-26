let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=10";

  String.prototype.initCap = function () {
    return this.toLowerCase().replace(/(?:^|\s)[a-z]/g, function (m) {
      return m.toUpperCase();
    });
  };

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".list-group");

    let listPokemon = document.createElement("ul");
    listPokemon.classList.add("group-list-item");
    let button = document.createElement("button");
    button.innerText = pokemon.name.initCap();
    button.classList.add("btn", "btn-primary", "my-1");
    pokemonList.appendChild(listPokemon);
    listPokemon.appendChild(button);
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          // console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.other.home.front_default;

        item.types = details.types;
        item.height = details.height;
        item.weight = details.weight;
        item.base_exp = details.abilities.base_experience;
        item.abilities = details.abilities.map((x) => {
          return x.ability.name;
        });

        item.hp = details.stats[0].base_stat;
        item.attack = details.stats[1].base_stat;
        item.defense = details.stats[2].base_stat;
        item.specialAttack = details.stats[3].base_stat;
        item.specialDefanse = details.stats[4].base_stat;
        item.speed = details.stats[5].base_stat;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function showModal(item) {
    const modalContainer = document.querySelector("#myModal");
    const modalBody = document.querySelector("#myModal .modal-body");
    const modalTitle = document.querySelector("#myModal .modal-title");

    modalContainer.classList.add("is-visible");

    $("#myModal").modal("show");
    // Clear all existing modal content
    // modalContainer.innerHTML = '';
    modalBody.innerHTML = `
      <div>
        <div class="d-flex row row-cols-3">
          <div class="d-flex justify-content-center">
            <img src=${item.imageUrl} class="w-100 align-self-center">
          </div>
          <div class="flex-grow-1 text-center border border-3">
            <div class="">
              <h5 class="border-bottom border-2 fw-bold">Information</h5>
            </div>
            <div class="d-flex justify-content-center row row-cols-2 fs-6">
              <div class="fw-bold">
                <p>Weight</p>
                <p>Height</p>
                <p>Base Exp</p>
                <p>Ability</p>
              </div>
              <div>
                <p>${item.weight}</p>
                <p>${item.height}</p>
                <p>${item.base_exp}</p>
                <p>${item.abilities}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <h6 class="fw-bold">HP :</h6>
        <div class="progress">
          <div class="progress-bar bg-success fw-bold" role="progressbar" aria-label="Example with label" style="width: ${item.hp}%;" aria-valuenow="${item.hp}" aria-valuemin="${item.hp}" aria-valuemax="${item.hp}">${item.hp}%</div>
        </div>
        <h6 class="fw-bold mt-2">Attack :</h6>
        <div class="progress">
          <div class="progress-bar bg-warning fw-bold" role="progressbar" aria-label="Example with label" style="width: ${item.attack}%;" aria-valuenow="${item.attack}" aria-valuemin="${item.attack}" aria-valuemax="${item.attack}">${item.attack}%</div>
        </div>
        <h6 class="fw-bold mt-2">Defense :</h6>
        <div class="progress">
          <div class="progress-bar bg-primary fw-bold" role="progressbar" aria-label="Example with label" style="width: ${item.defense}%;" aria-valuenow="${item.defense}" aria-valuemin="${item.defense}" aria-valuemax="${item.defense}">${item.defense}%</div>
        </div>
        <h6 class="fw-bold mt-2">Spesial Attack :</h6>
        <div class="progress">
          <div class="progress-bar bg-info fw-bold" role="progressbar" aria-label="Example with label" style="width: ${item.specialAttack}%;" aria-valuenow="${item.specialAttack}" aria-valuemin="${item.specialAttack}" aria-valuemax="${item.specialAttack}">${item.specialAttack}%</div>
        </div>
        <h6 class="fw-bold mt-2">Special Defense :</h6>
        <div class="progress">
          <div class="progress-bar bg-danger fw-bold" role="progressbar" aria-label="Example with label" style="width: ${item.specialDefanse}%;" aria-valuenow="${item.specialDefanse}" aria-valuemin="${item.specialDefanse}" aria-valuemax="${item.specialDefanse}">${item.specialDefanse}%</div>
        </div>
        <h6 class="fw-bold mt-2">Speed :</h6>
        <div class="progress">
          <div class="progress-bar bg-secondary fw-bold" role="progressbar" aria-label="Example with label" style="width: ${item.speed}%;" aria-valuenow="${item.speed}" aria-valuemin="${item.speed}" aria-valuemax="${item.speed}">${item.speed}%</div>
        </div>
      </div>
    `;
    modalContainer.addEventListener("click", (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });

    let modal = document.createElement("div");
    let container = document.querySelector("#image-container");

    modalTitle.innerText =
      item.name.initCap() +
      " : " +
      item.types.map((x) => {
        return x.type.name;
      });

    // let myImage = document.createElement("img");
    // myImage.src = item.imageUrl;
    // myImage.className = "w-25";

    // modal.appendChild(myImage);
    modalBody.appendChild(modal);
  }

  function hideModal() {
    let modalContainer = document.querySelector("#myModal");
    modalContainer.classList.remove("is-visible");
  }

  window.addEventListener("keydown", (e) => {
    let modalContainer = document.querySelector("#myModal");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
