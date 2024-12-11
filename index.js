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

const reset = () => {
  pokemonName.textContent = "";
  pokemonId.textContent = "";
  weight.textContent = "";
  height.textContent = "";
  spriteContainer.innerHTML = "";
  types.innerHTML = "";
  hp.textContent = "";
  attack.textContent = "";
  defense.textContent = "";
  specialAttack.textContent = "";
  specialDefense.textContent = "";
  speed.textContent = "";
};

const fetchPokemonData = async (searchTerm) => {
  try {
    const response = await fetch(`${pokemonAPI}/${searchTerm}`);
    if (!response.ok) {
      throw new Error("Pokémon not found.");
    }
    return await response.json();
  } catch (error) {
    console.error("An error occurred:", error.message);
    return null;
  }
};

const pokemonDetails = (data) => {
  pokemonName.textContent = data.name.toUpperCase();
  pokemonId.textContent = `#${data.id}`;
  weight.textContent = `${data.weight}`;
  height.textContent = `${data.height}`;
  spriteContainer.innerHTML = data.sprites?.front_default
    ? `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">`
    : `<p>No sprite available</p>`;
};

const displayTypes = (data) => {
  types.innerHTML = "";
  data.types.forEach((typeInfo) => {
    const typeElement = document.createElement("div");
    typeElement.textContent = typeInfo.type.name.toUpperCase();
    types.appendChild(typeElement);
  });
};

const displayStats = (data) => {
  hp.textContent = `${data.stats[0]?.base_stat || ""}`;
  attack.textContent = `${data.stats[1]?.base_stat || ""}`;
  defense.textContent = `${data.stats[2]?.base_stat || ""}`;
  specialAttack.textContent = `${data.stats[3]?.base_stat || ""}`;
  specialDefense.textContent = `${data.stats[4]?.base_stat || ""}`;
  speed.textContent = `${data.stats[5]?.base_stat || ""}`;
};

const searchPokemon = async () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  if (!searchTerm) {
    alert("Please enter a Pokémon name or ID.");
    return;
  }

  const data = await fetchPokemonData(searchTerm);

  if (data) {
    pokemonDetails(data);
    displayTypes(data);
    displayStats(data);
  } else {
    reset();
    alert("Pokémon not found.");
  }
};

const initEvents = () => {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchPokemon();
  });
};

initEvents();
