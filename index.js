const pokedex = document.getElementById("pokedex");
const buscador = document.querySelector(".input");

// color segun el tipo
/* const typeColors = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#98d7a5",
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5",
  };
 */

// hacemos la llamada a la api de los 150 pokemons
const getPokemon = () => {
  const promesas = [];
  for (let i = 1; i <= 151; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promesas.push(fetch(url).then((res) => res.json()));
    /* for (let i = 1; i < 151; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`
        fetch(url)
          .then(response => response.json())
          .then(pokemon => {
            console.log(pokemon)
        })
    } */
  }

  // cogemos los datos del nombre, id, img y tipo
  Promise.all(promesas).then((resultados) => {
    const pokemons = resultados.map((result) => ({
      name: result.name,
      id: result.id,
      img: result.sprites.front_default,
      type: result.types.map((type) => type.type.name),
    }));

    // creamos el buscador
    buscador.addEventListener("input", () => buscar(pokemons));
    showPokemon(pokemons);
  });
};
// creamos la función buscar y creamos un array vacío para meter las películas filtradas
const buscar = (pokemons) => {
  const pokemonsFiltrados = [];
  for (const pokemon of pokemons) {
    if (pokemon.name.toLowerCase().includes(buscador.value.toLowerCase().trim())) {
      pokemonsFiltrados.push(pokemon);
    }

    showPokemon(pokemonsFiltrados);
  }
};

const showPokemon = (pokemon) => {
  pokedex.innerHTML = ``;

  console.log(pokemon);
  const pokemonHTML = pokemon
    .map(
      (poke) =>
        `<li class="card">
            <img class="card-img" src="${poke.img}"/>
            <h2 class="card-subtitle">${poke.name.toUpperCase()}</h2>
            <p class="card-text">${poke.type}</p>
        </li>`
    )
    .join("");
  pokedex.innerHTML = pokemonHTML;
};

getPokemon();
