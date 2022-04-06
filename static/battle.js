//pkmlist is set up to make a new isntance of this pokemon
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
['Dragonite', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/149.svg', 366, [
    ['Dragon Dance', 'electric', 20, 0.99],
    ['Swift', 'electric', 100, 0.88],
    ['Ice Beam', 'normal', 90, 0.90],
    ['Fire Spin', 'normal', 80, 0.95]
]],
['Charizard', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/6.svg', 360, [
    ['Flamethrower', 'fire', 95, 0.95],
    ['Dragon Claw', 'dragon', 100, 0.95],
    ['Air slash', 'fly', 75, 0.85],
    ['Slash', 'normal', 70, ]
]],
['Blastoise', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/9.svg', 362, [
    ['Surf', 'water', 90, 0.95],
    ['Crunch', 'normal', 80, 0.95],
    ['Ice punch', 'ice', 75, 0.95],
    ['Flash cannon', 'steel', 80, 0.95]
]],
['Venusaur', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg', 364, [
    ['Petal Blizzard', 'grass', 90, 0.95],
    ['Sludge bomb', 'poison', 90, 0.95],
    ['Earthquake', 'ground', 100, 0.95],
    ['Body Slam', 'normal', 85, 0.95]
]],
['Gengar', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/94.svg', 361, [
    ['Confusion', 'electric', 20, 0.99],
    ['Hypnosis', 'electric', 100, 0.88],
    ['Dream Eater', 'normal', 90, 0.90],
    ['Night Shade', 'normal', 80, 0.95]
]],
['Nidoking', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/34.svg', 366, [
    ['Stomp', 'electric', 20, 0.99],
    ['Fury Attack', 'electric', 100, 0.88],
    ['Seismic Toss', 'normal', 90, 0.90],
    ['Toxic', 'normal', 80, 0.95]
]],
['Pidgeot', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/18.svg', 368, [
    ['Wing Attack', 'electric', 20, 0.99],
    ['Sand Attack', 'electric', 100, 0.88],
    ['Peck', 'normal', 90, 0.90],
    ['Quick Attack', 'normal', 80, 0.95]
]],
['Gyarados', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/130.svg', 370, [
    ['Thrash', 'electric', 20, 0.99],
    ['Hyper Fang', 'electric', 100, 0.88],
    ['Hydro Pump', 'normal', 90, 0.90],
    ['Ice Beam', 'normal', 80, 0.95]
]],
['Snorlax', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/143.svg', 377, [
    ['Rest', 'electric', 20, 0.99],
    ['Rage', 'electric', 100, 0.88],
    ['Scratch', 'normal', 90, 0.90],
    ['Leftovers', 'normal', 80, 0.95]
]],
['Alakazam', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/65.svg', 359, [
    ['Kenesis', 'electric', 20, 0.99],
    ['Psybeam', 'electric', 100, 0.88],
    ['Psywave', 'normal', 90, 0.90],
    ['Poison Gas', 'normal', 80, 0.95]
]],
['Chansey', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/113.svg', 369, [
    ['Pound', 'electric', 20, 0.99],
    ['Double Slap', 'electric', 100, 0.88],
    ['Softboiled', 'normal', 90, 0.90],
    ['Headbutt', 'normal', 80, 0.95]
]],
['Mewtwo', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/150.svg', 364, [
    ['Psychic', 'electric', 20, 0.99],
    ['Mega Punch', 'electric', 100, 0.88],
    ['Blizzard', 'normal', 90, 0.90],
    ['Fire Blast', 'normal', 80, 0.95]
]],
];


function showUserPokemon(boolean) {
    let p = pkmList[0];
    let userPokemon = new Pokemon(p[0], p[1], p[2], p[3]);
    if (boolean) {
        for (i = 0; i < 4; i++) {
            document.getElementById('m' + i).value = userPokemon.moves[i][0];
        }
    }
    return userPokemon;
    }
    
function showAiPokemon(boolean) {
    let p = pkmList[Math.floor(Math.random() * pkmList.length)];
    let aiPokemon = new Pokemon(p[0], p[1], p[2], p[3]);
    if (boolean) {
        for (i = 0; i < 4; i++) {
            document.getElementById('m' + i).value = aiPokemon.moves[i][0];
        }
    }
    return aiPokemon;
    }

let userPokemon = showUserPokemon(true);
sprite1 = document.createElement('img');
sprite1.src = userPokemon.sprite;
document.getElementById('userPokemon').appendChild(sprite1);
document.getElementById('hp1').innerHTML = '<p>HP: ' + userPokemon.hp + '/' + userPokemon.fullhp + '</p>';

let aiPokemon = showAiPokemon(false);
sprite2 = document.createElement('img');
sprite2.src = aiPokemon.sprite;
document.getElementById('aiPokemon').appendChild(sprite2);
document.getElementById('hp2').innerHTML = '<p>HP: ' + aiPokemon.hp + '/' + aiPokemon.fullhp + '</p>';

function attack(move, attacker, receiver, hp, owner) {
    document.getElementById('comment').innerHTML = '<p>' + owner + attacker.name + ' used ' + move[0] + '</p>';
    let successfulHit = Math.floor(Math.random()*150);
    receiver.hp -= Math.floor(successfulHit)
    document.getElementById(hp).innerHTML = '<p>HP: ' + receiver.hp + '/' + receiver.fullhp + '</p>';
    checkWinner(hp);
}

function getAttacks() {
    for (i = 0; i < 4; i++) {
        let btn = document.getElementById('m' + i);
        let move = userPokemon.moves[i];

        function handleAttacks(btn, move, userPokemon, aiPokemon) {
            btn.addEventListener('click', function(e) {
                attack(move, userPokemon, aiPokemon, 'hp2', '');
                setTimeout(attack, 2000, aiPokemon.moves[Math.floor(Math.random() * 3)], aiPokemon, userPokemon, 'hp1', 'Enemy ');
                });
            }
            handleAttacks(btn, move, userPokemon, aiPokemon);
    }
}
getAttacks()


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