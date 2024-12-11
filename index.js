const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const pokemonName = document.querySelector("#pokemon-name");
const pokemonId = document.querySelector("#pokemon-id");
const spriteContainer = document.querySelector("#sprite-container");
const weight = document.querySelector("#weight");
const height = document.querySelector("#height");
const types = document.querySelector("#types");
const hp = document.querySelector("#hp");
const attack = document.querySelector("#attack");
const defense = document.querySelector("#defense");
const specialAttack = document.querySelector("#special-attack");
const specialDefense = document.querySelector("#special-defense");
const speed = document.querySelector("#speed");

const pokemonAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const fetchPokemonData = async (searchTerm) => {
  try {
    const response = await fetch(`${pokemonAPI}/${searchTerm}`);
    if (!response.ok) {
      throw new Error("Pokémon not found.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error.message);
    console.error("An error occurred:", error.message);
    return null;
  }
};

const displayPokemonData = (data) => {
  if (!data) {
    pokemonName.textContent = "Name: Not Found";
    pokemonId.textContent = "";
    spriteContainer.innerHTML = `<p>No sprite available</p>`;
    weight.textContent = "Weight: N/A";
    height.textContent = "Height: N/A";
    types.textContent = "Types: N/A";
    hp.textContent = "HP: N/A";
    attack.textContent = "Attack: N/A";
    defense.textContent = "Defense: N/A";
    specialAttack.textContent = "Special Attack: N/A";
    specialDefense.textContent = "Special Defense: N/A";
    speed.textContent = "Speed: N/A";
    return;
  }

  pokemonName.textContent = `${data.name}`;
  pokemonId.textContent = `#${data.id}`;
  weight.textContent = `Weight: ${data.weight}`;
  height.textContent = `Height: ${data.height}`;
  spriteContainer.innerHTML = data.sprites?.front_default
    ? `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">`
    : `<p>No sprite available</p>`;

  types.innerHTML = "";
  data.types.forEach((typeInfo) => {
    const typeElement = document.createElement("div");
    typeElement.textContent = typeInfo.type.name.toUpperCase();
    types.appendChild(typeElement);
  });

  if (data.stats) {
    hp.textContent = `${data.stats[0]?.base_stat || "N/A"}`;
    attack.textContent = `${data.stats[1]?.base_stat || "N/A"}`;
    defense.textContent = `${data.stats[2]?.base_stat || "N/A"}`;
    specialAttack.textContent = `${data.stats[3]?.base_stat || "N/A"}`;
    specialDefense.textContent = `${data.stats[4]?.base_stat || "N/A"}`;
    speed.textContent = `${data.stats[5]?.base_stat || "N/A"}`;
  } else {
    hp.textContent = "HP: N/A";
    attack.textContent = "Attack: N/A";
    defense.textContent = "Defense: N/A";
    specialAttack.textContent = "Special Attack: N/A";
    specialDefense.textContent = "Special Defense: N/A";
    speed.textContent = "Speed: N/A";
  }
};

const searchPokemon = async () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  if (!searchTerm) {
    console.log("Please enter a Pokémon name or ID.");
    return;
  }

  const data = await fetchPokemonData(searchTerm);
  displayPokemonData(data);
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchPokemon();
});
