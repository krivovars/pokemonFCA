const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const pokemonWeight = document.getElementById('weight');
const pokemonHeight = document.getElementById('height');
const pokemonTypes = document.getElementById('types');
const pokemonHp = document.getElementById('hp');
const pokemonAttack = document.getElementById('attack');
const pokemonDefense = document.getElementById('defense');
const pokemonSpecialAttack = document.getElementById('special-attack');
const pokemonSpecialDefense = document.getElementById('special-defense');
const pokemonSpeed = document.getElementById('speed');
const pokemonImg = document.getElementById('sprite')

const SearchBtn = document.getElementById('search-button')
const SearchInput = document.getElementById('search-input')

const PokemonUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/"


const mainFunction = () => {
    let pokemon = SearchInput.value;
    pokemonName.textContent = "";
    pokemonId.textContent = "";
    pokemonWeight.textContent = "";
    pokemonHeight.textContent = "";
    pokemonHp.textContent = "";
    pokemonAttack.textContent = "";
    pokemonDefense.textContent = "";
    pokemonSpecialAttack.textContent = "";
    pokemonSpecialDefense.textContent = "";
    pokemonSpeed.textContent = ""
    pokemonImg.src = ""
    if (typeof pokemon === 'string') {
        // Convert string to lowercase
        pokemon = pokemon.toLowerCase();
    } else {Number(pokemon)}
    fetchData(pokemon)
    SearchInput.value = "";
}

const fetchData = async (pokemonQuery) => { // Renamed parameter to pokemonQuery
    try {
        const res = await fetch(PokemonUrl + pokemonQuery + "/");
        const data = await res.json()
        pokemonOutput(data)
    } catch (err) {
        console.log(err)
        alert("Pokémon not found");
    }
};

const pokemonOutput = (data) => {
    const {
        name,
        id,
        weight,
        height,
        stats,
        sprites
    } = data
    
    const {front_default} = sprites
    
    
    stats.forEach(item=>{
        switch(item.stat.name) {
            case 'hp':
                pokemonHp.textContent = `HP: ${item.base_stat}`;
                break;
            case 'attack':
                pokemonAttack.textContent = `Attack: ${item.base_stat}`;
                break;
            case 'defense':
                pokemonDefense.textContent = `Defense: ${item.base_stat}`;
                break;
            case 'special-attack':
                pokemonSpecialAttack.textContent = `Special Attack: ${item.base_stat}`;
                break;
            case 'special-defense':
                pokemonSpecialDefense.textContent = `Special Defense: ${item.base_stat}`;
                break;
            case 'speed':
                pokemonSpeed.textContent = `Speed: ${item.base_stat}`;
                break;
            default:
                console.log("Something wrong")
        }
    })


    pokemonName.textContent = `Name: ${name.toUpperCase()}`;
    pokemonId.textContent = `ID: ${id}`;
    pokemonWeight.textContent = `Weight: ${weight}`;
    pokemonHeight.textContent = `Height: ${height}`;
    console.log(front_default)
    pokemonImg.src = front_default
    

}

SearchBtn.addEventListener('click', mainFunction)
