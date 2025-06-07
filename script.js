
let selectInfo = document.getElementById("pokemonSelect");
let resultDiv = document.getElementById("result");


// show all list of pokemon from API
async function showPokemonList() {   
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/`);   
        if (response.ok) {
            const data = await response.json(); // const data= data from API in JSON
            data.results.forEach(pokemon => {
              const option= document.createElement("option");
              option.value=pokemon.name;
              option.textContent= pokemon.name.toUpperCase();
              selectInfo.append(option);
            });
        } else {
            console.error("Error while loading Pokemon list");
        }
    } catch (error) {
            console.log("Network error:", error);
        }
    }

async function showPokemon() {
     const pokemonName = selectInfo.value;
    if (!pokemonName) return;

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (response.ok) {
            const data = await response.json();
            resultDiv.innerHTML = `
                <h2>${data.name.toUpperCase()}</h2>
                <img src="${data.sprites.front_default}" alt="${data.name}" />
                <img src="${data.sprites.back_default}" alt="${data.name}2" />
                <p>Weight : ${data.weight}</p>
                <p>Height : ${data.height}</p>
            `;
        } else {
            resultDiv.textContent = `Error`;
        }
    } catch (error) {
        console.error("Error :", error);
        resultDiv.textContent = `Error: '${error}'`;
    }
}

document.addEventListener("DOMContentLoaded", showPokemonList);
// "change": event with <select> when value is modified
selectInfo.addEventListener("change", showPokemon);
