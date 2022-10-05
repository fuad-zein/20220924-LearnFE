String.prototype.initCap = function () {
  return this.toLowerCase().replace(/(?:^|\s)[a-z]/g, function (m) {
    return m.toUpperCase();
  });
};

function detail(urlpoke) {
  $.ajax({
    url: urlpoke,
  })
    .done((res) => {
      let innerHTML = "";
      let name = res.name;
      let imageUrl = res.sprites.other.home.front_default;
      let weight = res.weight;
      let height = res.height;
      let base_exp = res.base_experience;
      let abilities = res.abilities.map((x) => {
        return x.ability.name;
      });
      let hp = res.stats[0].base_stat;
      let attack = res.stats[1].base_stat;
      let defense = res.stats[2].base_stat;
      let specialAttack = res.stats[3].base_stat;
      let specialDefanse = res.stats[4].base_stat;
      let speed = res.stats[5].base_stat;
      $.each(res, function () {
        innerHTML = `
          <div>
          <div>
            <h3 class="fw-bold text-capitalize border-bottom border-warning text-warning text-center">${name}</h3>
          </div>
          <div class="d-flex row row-cols-3">
            <div class="d-flex justify-content-center">
              <img src=${imageUrl} class="w-100 align-self-center">
            </div>
            <div class="flex-grow-1 text-center mt-3">
              <div class="">
                <h5 class="border-bottom border-2 fw-bold">Information</h5>
              </div>
              <div class="d-flex justify-content-center row row-cols-2 fs-6 mt-3">
                <div class="fw-bold">
                  <p>Weight</p>
                  <p>Height</p>
                  <p>Base Exp</p>
                  <p>Ability</p>
                </div>
                <div>
                  <p>${weight} gram</p>
                  <p>${height} inci</p>
                  <p>${base_exp}</p>
                  <p>${abilities}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4">
          <h6 class="fw-bold">HP :</h6>
          <div class="progress">
            <div class="progress-bar bg-success fw-bold" role="progressbar" aria-label="Example with label" style="width: ${hp}%;" aria-valuenow="${hp}" aria-valuemin="${hp}" aria-valuemax="${hp}">${hp}%</div>
          </div>
          <h6 class="fw-bold mt-2">Attack :</h6>
          <div class="progress">
            <div class="progress-bar bg-warning fw-bold" role="progressbar" aria-label="Example with label" style="width: ${attack}%;" aria-valuenow="${attack}" aria-valuemin="${attack}" aria-valuemax="${attack}">${attack}%</div>
          </div>
          <h6 class="fw-bold mt-2">Defense :</h6>
          <div class="progress">
            <div class="progress-bar bg-primary fw-bold" role="progressbar" aria-label="Example with label" style="width: ${defense}%;" aria-valuenow="${defense}" aria-valuemin="${defense}" aria-valuemax="${defense}">${defense}%</div>
          </div>
          <h6 class="fw-bold mt-2">Spesial Attack :</h6>
          <div class="progress">
            <div class="progress-bar bg-info fw-bold" role="progressbar" aria-label="Example with label" style="width: ${specialAttack}%;" aria-valuenow="${specialAttack}" aria-valuemin="${specialAttack}" aria-valuemax="${specialAttack}">${specialAttack}%</div>
          </div>
          <h6 class="fw-bold mt-2">Special Defense :</h6>
          <div class="progress">
            <div class="progress-bar bg-danger fw-bold" role="progressbar" aria-label="Example with label" style="width: ${specialDefanse}%;" aria-valuenow="${specialDefanse}" aria-valuemin="${specialDefanse}" aria-valuemax="${specialDefanse}">${specialDefanse}%</div>
          </div>
          <h6 class="fw-bold mt-2">Speed :</h6>
          <div class="progress">
            <div class="progress-bar bg-secondary fw-bold" role="progressbar" aria-label="Example with label" style="width: ${speed}%;" aria-valuenow="${speed}" aria-valuemin="${speed}" aria-valuemax="${speed}">${speed}%</div>
          </div>
        </div>
      `;
      });
      $("#modalBody").html(innerHTML);
    })
    .fail((error) => {
      console.log(error);
    });
  console.log(urlpoke);
}

$(document).ready(function () {
  $("#dataTable").DataTable({
    ajax: {
      url: "https://pokeapi.co/api/v2/pokemon/?limit=30",
      method: "GET",
      dataSrc: "results",
      dataType: "JSON",
    },
    columns: [
      {
        data: null,
        render: function (data, type, row, meta) {
          return meta.row + meta.settings._iDisplayStart + 1;
        },
      },
      {
        data: "",
        render: function (data, type, row) {
          return row.name.initCap();
        },
      },
      {
        data: "",
        render: function (data, type, row) {
          return `<button type="button" onclick="detail('${row.url}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">Detail</button>`;
        },
      },
    ],
  });

  $("#modalBody").on("click", (e) => {
    e.preventDefault();
  });
});
