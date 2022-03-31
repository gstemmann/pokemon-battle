class Pokemon {
    constructor(name, sprite, hp, moves) {
        this.name = name;
        this.sprite = sprite;
        this.hp = hp;
        this.fullhp = hp;
        this.moves = moves;
    }
}

let pkmList = [
['Charizard', 'https://img.pokemondb.net/sprites/black-white/normal/charizard.png', 360, [
    ['Flamethrower', 'fire', 95, 0.95],
    ['Dragon Claw', 'dragon', 100, 0.95],
    ['Air slash', 'fly', 75, 0.85],
    ['Slash', 'normal', 70, ]
]],
['Blastoise', 'https://img.pokemondb.net/sprites/black-white/normal/blastoise.png', 362, [
    ['Surf', 'water', 90, 0.95],
    ['Crunch', 'normal', 80, 0.95],
    ['Ice punch', 'ice', 75, 0.95],
    ['Flash cannon', 'steel', 80, 0.95]
]],
['Venusaur', 'https://img.pokemondb.net/sprites/black-white/normal/venusaur-f.png', 364, [
    ['Petal Blizzard', 'grass', 90, 0.95],
    ['Sludge bomb', 'poison', 90, 0.95],
    ['Earthquake', 'ground', 100, 0.95],
    ['Body Slam', 'normal', 85, 0.95]
]]
];
let typeMatch = {
'Charizard': [
    ['ground'],
    ['water', 'rock'],
    ['fire', 'grass', 'steel']
],
'Blastoise': [
    [''],
    ['grass'],
    ['fire', 'water']
],
'Venusaur': [
    ['poison'],
    ['fire', 'fly', 'ice', 'steel'],
    ['grass', 'water']
],
}

function showPokemon(boolean) {
let p = pkmList[Math.floor(Math.random() * pkmList.length)];
let pkm = new Pokemon(p[0], p[1], p[2], p[3]);
if (boolean) {
    for (i = 0; i < 4; i++) {
        document.getElementById('m' + i).value = pkm.moves[i][0];
    }
}
return pkm;

}
let userPokemon = showPokemon(true);
sprite1 = document.createElement('img');
sprite1.src = userPokemon.sprite;
document.getElementById('userPokemon').appendChild(sprite1);
document.getElementById('hp1').innerHTML = '<p>HP: ' + userPokemon.hp + '/' + userPokemon.fullhp + '</p>';
let aiPokemon = showPokemon(false);
sprite2 = document.createElement('img');
sprite2.src = aiPokemon.sprite;
document.getElementById('aiPokemon').appendChild(sprite2);
document.getElementById('hp2').innerHTML = '<p>HP: ' + aiPokemon.hp + '/' + aiPokemon.fullhp + '</p>';


for (i = 0; i < 4; i++) {
let btn = document.getElementById('m' + i);
let move = userPokemon.moves[i];

function handleAttacks(btn, move, userPokemon, aiPokemon) {
    btn.addEventListener('click', function(e) {
        attack(move, userPokemon, aiPokemon, 'hp2', '');
        setTimeout(attack, 2000, aiPokemon.moves[Math.floor(Math.random() * 3)], aiPokemon, userPokemon, 'hp1', 'Enemy');
    });
}
handleAttacks(btn, move, userPokemon, aiPokemon);
}

function attack(move, attacker, receiver, hp, owner) {
document.getElementById('comment').innerHTML = '<p>' + owner + attacker.name + ' used ' + move[0] + '</p>';
let successfulHit = Math.floor(Math.random()*150);
receiver.hp -= Math.floor(successfulHit)
document.getElementById(hp).innerHTML = '<p>HP: ' + receiver.hp + '/' + receiver.fullhp + '</p>';
checkWinner(hp);
}

function checkWinner(hp) {
let f = (userPokemon.hp <= 0) ? userPokemon : (aiPokemon.hp <= 0) ? aiPokemon : false;
if (f != false) {
    alert('GAME OVER: ' + f.name + ' fainted!');
    document.getElementById(hp).innerHTML = '<p>HP: 0/' + f.fullhp + '</p>';
    setTimeout(function() {
        location.reload();
    }, 1500)
}

}