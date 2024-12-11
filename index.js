const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
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

//see a list of all valid Pokémon names, id numbers, and URLs
const pokemonAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

//where {name-or-id} is the Pokémon's name or id number.
const pokemonNameOrId =
  "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/{name-or-id}";
// Note: Pokémon names should be in lowercase,
// have special characters removed,
// and be dash separated.
// Also, if the Pokémon has either ♀ or ♂ as part of its name,
// the format is {name-f} or {name-m}, respectively.

const fetchData = async () => {
  try {
    const res = await fetch(pokemonAPI);
    const data = await res.json();

    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

fetchData();
