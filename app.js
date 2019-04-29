/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// let scores, roundScore, activePlayer;

// scores = [0, 0];
// roundScore = 0;
// activePlayer = 0;

// dice = Math.floor(Math.random() * 6) + 1;
// console.log(dice);

// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';


// let x = document.querySelector('#score-0').textContent;
// console.log(x);

// document.querySelector('.dice').style.display = 'none';

// document.querySelector('.btn-roll').addEventListener('click', () => {
//     console.log('button click event wired up')
// })



// let testArray = ['dice-1.jpg', 'dice-2.jpg', 'dice-3.jpg'];
// let displayDice = testArray.filter(img => img.includes(3)).toString();
// console.log(displayDice)

const GAME_VARIABLES = {
    scores: [0, 0],
    roundScore: 0,
    activePlayer: 0
}

document.querySelector('.dice').style.display = 'none';

function watchButtonClick() {
    console.log(GAME_VARIABLES.activePlayer)
    document.querySelector('.btn-roll').addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        rollDice();
    });
    document.querySelector('.btn-hold').addEventListener('click', (e) => {
        console.log('hold button clicked');
        e.stopImmediatePropagation();
        changePlayerScore();
    });
    document.querySelector('.btn-new').addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        console.log('new game button clicked');
    });

}

//this function will roll the dice, calling the change current score function and changing the dice image according to the random number
function rollDice() {
    dice = Math.floor(Math.random() * 6 + 1);
    console.log('dice roll: ', dice)
    changeDisplayedDice(dice);
    changeCurrentScore(dice);
}

function changeDisplayedDice(num) {
    let diceImages = ['dice-1.png', 'dice-2.png', 'dice-3.png', 'dice-4.png', 'dice-5.png', 'dice-6.png'];
    let displayDice = diceImages.filter(img => img.includes(num)).toString();
    document.querySelector('.dice').src = displayDice;
    document.querySelector('.dice').style.display = 'block';
}

function changeCurrentScore(num) {
    console.log('changing score');

    if (num > 1) {
        GAME_VARIABLES.roundScore = GAME_VARIABLES.roundScore + num;
        console.log(GAME_VARIABLES.roundScore)
        document.querySelector('#current-' + GAME_VARIABLES.activePlayer).textContent = GAME_VARIABLES.roundScore;
        watchButtonClick();
    }
    else {
        GAME_VARIABLES.roundScore = 0;
        changeActivePlayer();
    }
}

function changePlayerScore() {
    document.querySelector('.dice').style.display = 'none';
    GAME_VARIABLES.scores[GAME_VARIABLES.activePlayer] = GAME_VARIABLES.scores[GAME_VARIABLES.activePlayer] + GAME_VARIABLES.roundScore;
    document.querySelector('#score-' + GAME_VARIABLES.activePlayer).textContent = GAME_VARIABLES.scores[GAME_VARIABLES.activePlayer];
    changeActivePlayer();
}

function changeActivePlayer() {
    let active = document.querySelector(`.player-${GAME_VARIABLES.activePlayer}-panel`).classList.contains('active');
    GAME_VARIABLES.roundScore = 0;
    document.querySelector('#current-' + GAME_VARIABLES.activePlayer).textContent = GAME_VARIABLES.roundScore;
    if (GAME_VARIABLES.activePlayer === 0 && active) {
        document.querySelector(`.player-${GAME_VARIABLES.activePlayer}-panel`).classList.remove('active');
        GAME_VARIABLES.activePlayer = 1;
        document.querySelector(`.player-${GAME_VARIABLES.activePlayer}-panel`).classList.add('active');

    }
    else if (GAME_VARIABLES.activePlayer === 1 && active) {
        document.querySelector(`.player-${GAME_VARIABLES.activePlayer}-panel`).classList.remove('active');
        GAME_VARIABLES.activePlayer = 0;
        document.querySelector(`.player-${GAME_VARIABLES.activePlayer}-panel`).classList.add('active');
    }
}

watchButtonClick();