const deck = [
    ["2_of_clubs.png", 2],
    ["2_of_diamonds.png", 2],
    ["2_of_hearts.png", 2],
    ["2_of_spades.png", 2],
    ["3_of_clubs.png", 3],
    ["3_of_diamonds.png", 3],
    ["3_of_hearts.png", 3],
    ["3_of_spades.png", 3],
    ["4_of_clubs.png", 4],
    ["4_of_diamonds.png", 4],
    ["4_of_hearts.png", 4],
    ["4_of_spades.png", 4],
    ["5_of_clubs.png", 5],
    ["5_of_diamonds.png", 5],
    ["5_of_hearts.png", 5],
    ["5_of_spades.png", 5],
    ["6_of_clubs.png", 6],
    ["6_of_diamonds.png", 6],
    ["6_of_hearts.png", 6],
    ["6_of_spades.png", 6],
    ["7_of_clubs.png", 7],
    ["7_of_diamonds.png", 7],
    ["7_of_hearts.png", 7],
    ["7_of_spades.png", 7],
    ["8_of_clubs.png", 8],
    ["8_of_diamonds.png", 8],
    ["8_of_hearts.png", 8],
    ["8_of_spades.png", 8],
    ["9_of_clubs.png", 9],
    ["9_of_diamonds.png", 9],
    ["9_of_hearts.png", 9],
    ["9_of_spades.png", 9],
    ["10_of_clubs.png", 10],
    ["10_of_diamonds.png", 10],
    ["10_of_hearts.png", 10],
    ["10_of_spades.png", 10],
    ["jack_of_clubs.png", 10],
    ["jack_of_diamonds.png", 10],
    ["jack_of_hearts.png", 10],
    ["jack_of_spades.png", 10],
    ["queen_of_clubs.png", 10],
    ["queen_of_diamonds.png", 10],
    ["queen_of_hearts.png", 10],
    ["queen_of_spades.png", 10],
    ["king_of_clubs.png", 10],
    ["king_of_diamonds.png", 10],
    ["king_of_hearts.png", 10],
    ["king_of_spades.png", 10],
    ["ace_of_clubs.png", 0],
    ["ace_of_diamonds.png", 0],
    ["ace_of_hearts.png", 0],
    ["ace_of_spades.png", 0]
];
const playButton = document.getElementById("playButton");
const hitButton = document.getElementById("hitButton");
const standButton = document.getElementById("standButton");
const dealerCard1 = document.getElementById("dealerCard1");
const dealerCard2 = document.getElementById("dealerCard2");
const playerCard1 = document.getElementById("playerCard1");
const playerCard2 = document.getElementById("playerCard2");
const playerScoreText = document.getElementById("playerScore");
const dealerScoreText = document.getElementById("dealerScore");
const winsLossesTiestext = document.getElementById("winsLossesTies");
const dealerCardSpace = document.getElementById("playespaceDealer");
const playerCardSpace = document.getElementById("playspacePlayer");
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let playerTurn = false;
let wins = 0;
let losses = 0;
let ties = 0;

// Returns a random number up to but not including max
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Gets a random card from the deck
function getRandomCard() {
    return deck[getRandomInt(52)];
}

// Update the wins losses and ties
function updateWinsLossesTies() {
    winsLossesTiestext.innerHTML = `Wins: ${wins} ---- Losses: ${losses} ---- Ties: ${ties}`;
}

// Iniates a new game of blackjack
function playFunction() {
    playerHand = [];
    dealerHand = [];
    for (let i = 0; i < 4; i++) {
        if (i % 2 == 0) {
            playerHand.push(getRandomCard());
        }
        else {
            dealerHand.push(getRandomCard());
        }
    }
    
    playerCard1.src = "images/" + playerHand[0][0];
    playerCard2.src = "images/" + playerHand[1][0];
    dealerCard1.src = "images/" + dealerHand[0][0];
    // dealerCard2.src = "images/" + dealerHand[1][0];
    playerTurn = true;

    playerScore = calculatePlayerScore();
    dealerScore = calculateDealerScore();
    playerScoreText.innerHTML = `Player: ${playerScore}`;
    dealerScoreText.innerHTML = `Dealer: ${dealerScore}`;
}

// The player stands, the dealer takes their turn
function standFunction() {
    if (playerTurn == false) {
        return;
    }
    playerTurn = false;
    dealerTurn();
}

// The player hits, if their score is over 21, they immediately lose
function hitFunciton() {
    if (playerTurn == false) {
        return;
    }
    
    playerHand.push(getRandomCard());
    playerScore = calculatePlayerScore();
    playerScoreText.innerHTML = `Player: ${playerScore}`;

    if (playerScore > 21) {
        alert("You lose!");
        playerTurn = false;
        losses++;
        updateWinsLossesTies();
    }
}

// Calculates the score based on the player and dealer hands, and then updates the screen 
function calculatePlayerScore() {
    let aces = 0;
    let playerScore = 0;
    for (let i = 0; i < playerHand.length; i++) {
        let value = playerHand[i][1];
        if (value == 0) {
            aces += 1;
        }
        else {
            playerScore += value;
        }
    }

    if (aces != 0) { // aces are in the hand
        if (playerScore + 11 + (aces - 1) <= 21) {
            playerScore = playerScore + 11 + (aces - 1);
        }
        else {
            playerScore += aces;
        }
    }

    return playerScore;
}

// Calculates the dealer score
function calculateDealerScore() {
    let dealerScore = 0;
    if (playerTurn == true) { // Only show first card
        let value = dealerHand[0][1];
        if (value == 0) {value = 11;}
        dealerScore += value;
    }
    else {
        let aces = 0;
        for (let i = 0; i < dealerHand.length; i++) {
            let value = dealerHand[i][1];
            if (value == 0) {
                aces += 1;
            }
            else {
                dealerScore += value;
            }
        }

        if (aces != 0) { // aces are in the hand
            if (dealerScore + 11 + (aces - 1) <= 21) {
                dealerScore = dealerScore + 11 + (aces - 1);
            }
            else {
                dealerScore += aces;
            }
        }
    }
    return dealerScore;
}

// The turn for the dealer
function dealerTurn() {

}

playButton.addEventListener("click", playFunction);
hitButton.addEventListener("click", hitFunciton);
standButton.addEventListener("click", standFunction);