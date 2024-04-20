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

// Function to shuffle the deck
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Function to deal the cards
function dealCards() {
    for (let i = 0; i < 4; i++) {
        piles[i].push(deck.pop());
    }
    updateGameBoard();
}

// Function to remove a card from a pile
function removeCard(pileIndex) {
    piles[pileIndex].pop();
}

// Function to move a card to the foundation
function moveToFoundation(pileIndex) {
    foundation.push(piles[pileIndex].pop());
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

// Function to play the game
function playGame() {
    deck = createDeck();
    shuffleDeck();
    dealCards();
    updateGameBoard();
    // Add game logic here
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

function moveCard(sourcePileIndex, destPileIndex) {
    let sourcePile = piles[sourcePileIndex];
    let destPile = piles[destPileIndex];

    if (sourcePile.length > 1 && destPile.length === 0) {
        // Move the top card from the source pile to the destination pile
        let card = sourcePile.pop();
        destPile.push(card);
    }
}

function getCardPileIndex(cardId) {
    for (let i = 0; i < piles.length; i++) {
        let pile = piles[i];
        for (let j = 0; j < pile.length; j++) {
            let card = pile[j];
            if (card.id === cardId) {
                return i;
            }
        }
    }
    return -1; // Return -1 if the card is not found in any pile
}

function getPileIndex(pileId) {
    // Extract the index from the ID
    let index = parseInt(pileId.split('-')[1]);
    return index;
}

// Start the game
playGame();