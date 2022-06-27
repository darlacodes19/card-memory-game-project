
let gameBoard = document.querySelector('.game-display');
let playerOneScore = document.querySelector('.firstPlayer');
let playerTwoScore = document.querySelector('.secondPlayer')
const playerLivesCount = document.querySelector('span');
let button = document.querySelector('button');

let firstPlayerScore = 0;
let secondPlayerScore = 0;
let playerLives = 10;
// let win = 0;
let playerOneTurn = true;
let playerId = null;
let turnCount = 0;
let cardsFlipped = 0;

playerLivesCount.textContent = playerLives;
playerOneScore.textContent = firstPlayerScore;
playerTwoScore.textContent = secondPlayerScore;

// let isMatch = firstCard.dataset.framework === secondCard.dataset.framework



// select all cards and create a function that that loops through and attaches an event listener to each card 
const cards = document.querySelectorAll('.card');
cards.forEach(card => card.addEventListener('click', flipCard))

let hasFlippedCard =false;
let lockBoard = false;
let firstCard;
let secondCard;


let firstPrompt = prompt('Player One, What is your Name? ');
let secondPrompt = prompt ('Player two, what is your name?')

function alertPlayer () { 
  if (playerOneTurn = true) {
  alert ( firstPrompt + ' ' + 'goes first')
}
}

setTimeout(alertPlayer,2000);



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
   
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    if (isMatch) {
      disableCards()

      cardsFlipped+=2

     

      turnCount ++;
      
      setTimeout(currentPlayer,500);

     

      if (playerId ===1){
        firstPlayerScore++
        playerOneScore.textContent = firstPlayerScore;	
      } else {
        secondPlayerScore++
        playerTwoScore.textContent = secondPlayerScore;
      }
     

         ///// Check to see if the whole board is cleared/matched. If so, declare the winner!     
             
     
    } else {
      unFlipCards()

      //// increase the turn count, switch players.
					turnCount ++;
					setTimeout(currentPlayer,500);
      
      // setTimeout( nextPlayer, 2000)

      // function nextPlayer () {
      //   alert(  'goes next')
      // }

     }

    
    }
  
  
   
      
  


    
    // isMatch ? disableCards() : unFlipCards();
 
  

function disableCards () {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

      // playerLives++
      // playerLivesCount.textContent = playerLives;

    resetBoard();
}
 
function unFlipCards() {
   lockBoard = true; 
    setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

   

    // playerLives--;
    // playerLivesCount.textContent = playerLives;
     
    // if (playerLives === 0) {
    //     playerLivesCount.textContent = 'You Lost'
    // } 

    resetBoard();

  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false ];
  [secondCard,firstCard]
}






////////  whose turn is it? 
let currentPlayer = function(){

  if (cardsFlipped === 16 ) {

    checkWinner();

  } else if (turnCount %2 === 0) { 
		playerId = 1;
		
    alert( firstPrompt + ' ' + 'goes next')
		
	} else {
		playerId = 2;
		
    alert ( secondPrompt + ' ' + 'goes next')
};
}



function checkWinner () {


  if (firstPlayerScore > secondPlayerScore) {
    alert( firstPrompt + ' ' + 'has won!')
  } else if ( firstPlayerScore === secondPlayerScore)  {
    alert( ' Its a Tie!')
  } else {
    alert( secondPrompt + ' ' + 'has won!')
  }
}



function shuffle() {
  resetBoard();
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });

  playerOneScore = 0;
  playerTwoScore = 0;
};
