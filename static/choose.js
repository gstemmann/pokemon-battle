const base_url = 'https://pokeapi.co/api/v2';
const mainDiv = document.getElementById('main-div');
const photoContainer = document.getElementById('photo-container');
const moveList = document.getElementById('move-list');
const typeList = document.getElementById('types');
const showButton = document.getElementById('show');
const removeButton = document.getElementById('remove');

async function getPokemonData() {
	let inputValue = document.getElementById('text').value;
	const response = await axios({
		url    : `${base_url}/pokemon/${inputValue}/`,
		method : 'GET'
	});

	let sprite = response.data.sprites.other.dream_world.front_default;
	photoContainer.innerHTML = `<h1> ${inputValue}`
	appendNewPhoto(sprite);
	
	moveList.innerHTML = '<h2>Moves:</h2>';

	response.data.moves.splice(0, 4).map(function(c) {
		appendMoves(c.move.name);
	});
	moveSet = response.data.moves.splice(0, 4).map(function(c) {
		return c.move.name;
	});
	console.log(moveSet);

	typeList.innerHTML = '<h2>Type:<h2>'
	let types = response.data.types;
	for (let i = 0; i < types.length; i++) {
		appendType(types[i].type.name);
	}

	let battleArray = [];
	 battleArray.push(inputValue) 
	 battleArray.push(sprite)
	 battleArray.push(moveSet);
	localStorage.setItem('pokemon', JSON.stringify(battleArray));
		console.log(battleArray)
	
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

removeButton.addEventListener('click', function() {
	photoContainer.remove();
	typeList.remove();
	moveList.remove();
});

showButton.addEventListener('click', function(e) {
	e.preventDefault();
	getPokemonData();
});

