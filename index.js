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

const pokemonNameOrId = searchInput.value.toLowerCase();

// Note: Pokémon names should be in lowercase,
// have special characters removed,
// and be dash separated.
// Also, if the Pokémon has either ♀ or ♂ as part of its name,
// the format is {name-f} or {name-m}, respectively.

API_DATA = {
  count: 1302,
  results: [
    {
      id: 1,
      name: "bulbasaur",
      url: "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/1/",
    },
    {
      id: 2,
      name: "ivysaur",
      url: "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/2/",
    },
    {
      id: 3,
      name: "venusaur",
      url: "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/3/",
    },
    {
      id: 4,
      name: "charmander",
      url: "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/4/",
    },
    {
      id: 5,
      name: "charmeleon",
      url: "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/5/",
    },
    {
      id: 6,
      name: "charizard",
      url: "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/6/",
    },
    {
      id: 7,
      name: "squirtle",
      url: "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/7/",
    },
    {
      id: 8,
      name: "wartortle",
      url: "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/8/",
    },
    {
      id: 9,
      name: "blastoise",
      url: "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/9/",
    },
    {
      id: 10,
      name: "caterpie",
      url: "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/10/",
    },
  ],
};
const fetchData = async () => {
  try {
    const pokemonNameOrId = searchInput.value.trim().toLowerCase();
    const res = await fetch(`${pokemonAPI}/${pokemonNameOrId}`);
    if (!res.ok) throw new Error("Pokémon not found in API.");
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Using mock data due to API error.");
    return API_DATA.results;
  }
};

const searchPokemon = async () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  if (!searchTerm) {
    console.log("Please enter a Pokémon name or ID.");
    return;
  }

  const data = await fetchData();

  if (Array.isArray(data)) {
    const foundPokemon = data.find(
      (pokemon) =>
        pokemon.name === searchTerm || String(pokemon.id) === searchTerm
    );

    if (foundPokemon) {
      console.log("Pokémon Found (Mock Data):");
      console.log(`Name: ${foundPokemon.name}`);
      console.log(`ID: ${foundPokemon.id}`);
      console.log(`URL: ${foundPokemon.url}`);

      pokemonName.textContent = `Name: ${foundPokemon.name}`;
      pokemonId.textContent = `ID: ${foundPokemon.id}`;
      weight.textContent = "Weight: N/A";
      height.textContent = "Height: N/A";
    } else {
      console.log("No Pokémon found with that name or ID.");
      pokemonName.textContent = "Name: Not Found";
      pokemonId.textContent = "";
    }
  } else {
    console.log("Pokémon Found (API Data):");
    console.log(data);

    pokemonName.textContent = `Name: ${data.name}`;
    pokemonId.textContent = `ID: ${data.id}`;
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;
  }
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchPokemon();
});
