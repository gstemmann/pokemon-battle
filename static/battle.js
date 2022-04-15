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
let aiPkmList = [
    ['charizard', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/6.svg', 360, [
        ['Flamethrower'],
        ['Dragon Claw'],
        ['Air slash'],
        ['Slash']
    ]],
    ['blastoise', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/9.svg', 362, [
        ['Surf'],
        ['Crunch'],
        ['Ice punch'],
        ['Flash cannon']
    ]],
    ['venusaur', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg', 364, [
        ['Petal Blizzard'],
        ['Sludge bomb'],
        ['Earthquake'],
        ['Body Slam']
    ]],
    ['alakazam', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/65.svg', 375, [
    ['mega-kick'],
    ['psychic'],
    ['psybeam'], 
    ['kenesis']
    ]],

    ['electabuzz', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/125.svg', 375, [
        ['Petal Blizzard'],
        ['Sludge bomb'],
        ['Earthquake'],
        ['Body Slam']
    ]],
    ['dragonite', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/149.svg', 364, [
        ['hyper-beam'],
        ['psybeam'],
        ['fire-blast'],
        ['Body Slam']
    ]],
    ['wartortle', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/8.svg', 364, [
        ['surf'],
        ['hydro pump'],
        ['bite'],
        ['tackle']
    ]],
    ['charmeleon', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/5.svg', 364, [
        ['flamethrower'],
        ['slash'],
        ['fire-blast'],
        ['rage']
    ]],
    ['ivysaur', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg', 364, [
        ['solarbeam'],
        ['razor-leaf'],
        ['poisonpowder'],
        ['leech seed']
    ]],
    ['butterfree', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/12.svg', 364, [
        ['confusion'],
        ['swift'],
        ['sleep powder'],
        ['stun spore']
    ]],
    ['beedrill', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/15.svg', 364, [
        ['pin missle'],
        ['fury attack'],
        ['string shot'],
        ['swords dance']
    ]],
    ['pidgeot', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/18.svg', 364, [
        ['razor-wind'],
        ['gust'],
        ['sand-attack'],
        ['whirlwind']
    ]]
    
];


let userPkmList = JSON.parse(localStorage.getItem("pokemon"));

function showUserPokemon(boolean) {
    let userPokemon = new Pokemon(userPkmList[0], userPkmList[1], userPkmList[2], userPkmList[3]);
    if (boolean) {
        for (i = 0; i < 4; i++) {
            document.getElementById('m' + i).value = userPokemon.moves[i];
        }
    }
    return userPokemon;
    }
    
function showAiPokemon(boolean) {
    let p = aiPkmList[Math.floor(Math.random() * aiPkmList.length)];
    let aiPokemon = new Pokemon(p[0], p[1], p[2], p[3]);
    if (boolean) {
        for (i = 0; i < 4; i++) {
            document.getElementById('m' + i).value = aiPokemon.moves[i];
        }
    }
    return aiPokemon;
    }

let userPokemon = showUserPokemon(true);
sprite1 = document.createElement('img');
sprite1.src = userPokemon.sprite;
document.getElementById('userPokemon').appendChild(sprite1)
document.getElementById('hp1').innerHTML = '<h1>' + userPokemon.name + '</h1>' + '<p>HP: ' + userPokemon.hp + '/' + userPokemon.fullhp + '</p>';

let aiPokemon = showAiPokemon(false);
sprite2 = document.createElement('img');
sprite2.src = aiPokemon.sprite;
document.getElementById('aiPokemon').appendChild(sprite2);
document.getElementById('hp2').innerHTML = '<h1>' + aiPokemon.name + '</h1>' +  '<p>HP: ' + aiPokemon.hp + '/' + aiPokemon.fullhp + '</p>';

function attack(move, attacker, receiver, hp, owner) {
    document.getElementById('comment').innerHTML = '<p>' + owner + attacker.name + ' used ' + move + '</p>';
    let successfulHit = Math.floor(Math.random()*150);
    receiver.hp -= Math.floor(successfulHit)
    document.getElementById(hp).innerHTML = '<h1>' + receiver.name + '</h1>' + '<p>HP: ' + receiver.hp + '/' + receiver.fullhp + '</p>';
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