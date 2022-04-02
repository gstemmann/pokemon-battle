const base_url = 'https://pokeapi.co/api/v2';
const pokedex = document.getElementById('pokedex');
const mainDiv = document.getElementById('main-div');
const photoContainer = document.getElementById('photo-container');
const moveList = document.getElementById('move-list');
const typeList = document.getElementById('types');
const showButton = document.getElementById('show');
const removeButton = document.getElementById('remove');

const fetchPokemon = () => {
	// make empty array called promises
    const promises = [];
	// run a loop 151 times to make 151 api calls
    for (let i = 1; i <= 151; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
		// for each iteration, push the data to the empty array called 'promises'
        promises.push(fetch(url).then((res) => res.json()));
    }
	// use built in function in JS called "promise"
    Promise.all(promises).then((results) => {
        //create a variable to make an array of objects of pokemon
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites.other.dream_world['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        console.log(results);
		console.log(pokemon)
		displayPokemon(pokemon)
    });
	
};
fetchPokemon();


const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <li class="card">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle">Type: ${pokeman.type}</p>
			<button type'submit'> choose this pokemon </button>
        </li>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

// displayPokemon();


async function getPokemonData() {
	let inputValue = document.getElementById('text').value;
	const response = await axios({
		url    : `${base_url}/pokemon/${inputValue}/`,
		method : 'GET'
	});
	console.log(response.data.sprites);
	photoContainer.append(inputValue);
	appendNewPhoto(response.data.sprites.other.dream_world.front_default);

	let movesTitle = document.createTextNode('Moves:');
	moveList.append(movesTitle);
	response.data.moves.splice(0, 4).map(function(c) {
		appendMoves(c.move.name);
	});
	let typeTitle = document.createTextNode('Type:');
	typeList.append(typeTitle);
	let types = response.data.types;
	for (let i = 0; i < types.length; i++) {
		appendType(types[i].type.name);
	}
}

async function appendNewPhoto(res) {
	let img = document.createElement('img');
	img.src = res;
	photoContainer.append(img);
	mainDiv.append(photoContainer);
}

async function appendType(res) {
	let newDiv = document.createElement('div');
	newDiv.append(res);
	typeList.append(newDiv);
	mainDiv.append(typeList);
}

async function appendMoves(res) {
	let newDiv = document.createElement('div');
	newDiv.append(res);
	moveList.append(newDiv);
	mainDiv.append(moveList);
}

removeButton.addEventListener('click', function(e) {
	e.preventDefault();
	photoContainer.remove();
	typeList.remove();
	moveList.remove();
});

showButton.addEventListener('click', function(e) {
	e.preventDefault();
	getPokemonData();
});

// after removal of the first input for some reason it will save and the second input gets added
// also you can add more stats... like