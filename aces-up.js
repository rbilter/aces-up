// Define the piles and the foundation
let piles = [[], [], [], []];
let foundation = [];
let deck = [];

// Function to create a deck
function createDeck() {
    let suits = ['H', 'D', 'C', 'S'];
    let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    for (let suit of suits) {
        for (let value of values) {
            deck.push({suit, value});
        }
    }
    return deck;
}

// Function to deal the cards
function dealCards() {
    // Prior to each move, check if the game is over
    if (isGameOver()) {
        if (hasPlayerWon()) {
            // If the player has won, display a "You Won!" message
            document.getElementById('game-status').textContent = 'Congrats, you won!, would you like to ';
        } else {
            // If the player has not won, display a "Try Again" message and show the "Try Again" button
            document.getElementById('game-status').textContent = 'Better luck next time, would you like to ';
        }
        document.getElementById('deal-button').style.display = 'none';
        document.getElementById('play-again-button').style.display = 'block';
        return;
    }    

    // Deal the top four cards from the deck to the piles
    for (let i = 0; i < 4; i++) {
        piles[i].push(deck.pop());
    }
    
    updateGameBoard();
}

function hasPlayerWon() {
    for (let i = 0; i < piles.length; i++) {
        let pile = piles[i];
        // Check if the pile has exactly one card
        if (pile.length !== 1) {
            return false;
        }
        // Check if the card is an Ace
        let card = pile[0];
        if (card.value !== 14) {
            return false;
        }
    }
    // If all piles have exactly one card and that card is an Ace, the player has won
    return true;
}

function isGameOver() {
    return deck.length === 0;
}

function moveCard(sourcePileIndex, destPileIndex) {
    let sourcePile = piles[sourcePileIndex];
    let destPile = piles[destPileIndex];

    if (sourcePile.length > 1 && destPile.length === 0) {
        // Move the top card from the source pile to the destination pile
        let card = sourcePile.pop();
        destPile.push(card);
    }
}

function getPileIndex(pileId) {
    // Extract the index from the ID
    let index = parseInt(pileId.split('-')[1]);
    return index;
}

// Function to remove a card from a pile
function removeCard(pileIndex) {
    piles[pileIndex].pop();
}

function removeIfGreaterCardExists(pileIndex) {
    let pile = piles[pileIndex];
    if (pile.length === 0) {
        // The pile is empty, nothing to remove
        return;
    }

    let topCard = pile[pile.length - 1];

    for (let i = 0; i < piles.length; i++) {
        if (i !== pileIndex && piles[i].length > 0) {
            let otherTopCard = piles[i][piles[i].length - 1];
            if (otherTopCard.suit === topCard.suit && otherTopCard.value > topCard.value) {
                // Found a card of the same suit with a greater value, remove the original card
                pile.pop();

                // Update the HTML of the pile
                let pileElement = document.getElementById('pile-' + pileIndex);
                pileElement.removeChild(pileElement.lastChild);
                
                updateGameBoard();
                break;
            }
        }
    }
}

// Function to shuffle the deck
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Function to start the game
function startGame() {
    deck = createDeck();
    shuffleDeck();
    dealCards();
    updateGameBoard();
}

// Function to update the game board
function updateGameBoard() {
    for (let i = 0; i < 4; i++) {
        let pileElement = document.getElementById('pile-' + i);
        let pile = piles[i];
        if (pile.length > 0) {
            let card = pile[pile.length - 1];
            let cardImage = document.createElement('img');
            cardImage.src = "images/" + card.value + card.suit[0].toUpperCase() + '.png';
            pileElement.innerHTML = '';
            pileElement.appendChild(cardImage);
        } else {
            pileElement.innerHTML = '';
        }
    }
}

// Start the game
startGame();