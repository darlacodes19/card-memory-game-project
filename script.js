
let gameBoard = document.querySelector('.game-display');
let playerOneScore = document.querySelector('.firstPlayer');
let playerTwoScore = document.querySelector('.secondPlayer')
const playerLivesCount = document.querySelector('span');

let firstPlayerScore = 0;
let secondPlayerScore = 0;
let playerLives = 10;
let win = 0;
let playerOneTurn = true;

playerLivesCount.textContent = playerLives;
playerOneScore.textContent = firstPlayerScore;
playerTwoScore.textContent = secondPlayerScore;




// select all cards and create a function that that loops through and attaches an event listener to each card 
const cards = document.querySelectorAll('.card');

let hasFlippedCard =false;
let lockBoard = false;
let firstCard;
let secondCard;

// add/remove flip class to card on click
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
    this.classList.add('flip');
  
    if (!hasFlippedCard) {
      // first click
      hasFlippedCard = true;
      firstCard = this;
    } else {
      // second click
      hasFlippedCard = false;
      secondCard = this;
  
      checkForMatch()
      
    }

  
  }

  function checkForMatch() {

    if (firstCard.dataset.framework === secondCard.dataset.framework) {
      disableCards()
      
    } else {
      unFlipCards()
    }
    
    // isMatch ? disableCards() : unFlipCards();
 
  }

function disableCards () {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    playerLives++
      playerLivesCount.textContent = playerLives;

    resetBoard();
}
 
function unFlipCards() {
   lockBoard = true; 
    setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

   

    playerLives--;
    playerLivesCount.textContent = playerLives;
     
    if (playerLives === 0) {
        playerLivesCount.textContent = 'You Lost'
    } 
    resetBoard();

  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false ];
  [secondCard,firstCard]
}



(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard))




