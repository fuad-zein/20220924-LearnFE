let animals = [
  { name: "dory", species: "fish", class: { name: "invertebrata" } },
  { name: "garfield", species: "cat", class: { name: "mamalia" } },
  { name: "nemo", species: "fish", class: { name: "invertebrata" } },
  { name: "tom", species: "cat", class: { name: "mamalia" } },
  { name: "mhs", species: "cat", class: { name: "mamalia" } },
];

// satu
// cara 1
let kucing = [];

for (let i = 0; i < animals.length; i++) {
  if (animals[i].species == "cat") {
    kucing.push(animals[i]);
  }
}

console.log("satu", kucing);
// cara 2
let kucing2 = animals.filter((animals) => animals.species == "cat");
console.log("cara 2", kucing2);

// cara 2
let kucing3 = animals.map((x) => {
  return {
    name: x.name,
    species: x.species,
    class: {
      name: x.species == "fish" ? "non-mamalia" : "bukan fish",
    },
    isCat: x.species === "cat",
  };
});

console.log(kucing3);

console.log();

// dua
let nemo = [];

for (let i = 0; i < animals.length; i++) {
  if (animals[i].species == "fish") {
    animals[i].class.name = "non-mamalia";
    nemo.push(animals[i]);
  }
}

console.log("dua", nemo);
