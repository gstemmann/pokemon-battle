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
let pkmList = JSON.parse(localStorage.getItem("pokemon"));


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
document.getElementById('hp1').innerHTML = '<h1>' + userPokemon.name + '</h1>' + '<p>HP: ' + userPokemon.hp + '/' + userPokemon.fullhp + '</p>';

let aiPokemon = showAiPokemon(false);
sprite2 = document.createElement('img');
sprite2.src = aiPokemon.sprite;
document.getElementById('aiPokemon').appendChild(sprite2);
document.getElementById('hp2').innerHTML = '<h1>' + aiPokemon.name + '</h1>' +  '<p>HP: ' + aiPokemon.hp + '/' + aiPokemon.fullhp + '</p>';

function attack(move, attacker, receiver, hp, owner) {
    document.getElementById('comment').innerHTML = '<p>' + owner + attacker.name + ' used ' + move[0] + '</p>';
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