
//for manipulating the DOM
  //Updates player scores on the DOM
let playerOneScore = document.querySelector('.firstPlayer');
let playerTwoScore = document.querySelector('.secondPlayer')
const playAgainButton = document.querySelector('#play-again-btn');
const newPlayersButton = document.querySelector('#new-players-btn');
let playerOneName = document.querySelector('#player-one-name')
let playerTwoName = document.querySelector('#player-two-name')

let firstPlayerScore = 0;
let secondPlayerScore = 0;


let playerOneTurn = true;
let playerId = 1;
let turnCount = 0;
let cardsFlipped = 0;


let hasFlippedCard =false;
let lockBoard = false;
let firstCard;
let secondCard;


playerOneScore.textContent = firstPlayerScore;
playerTwoScore.textContent = secondPlayerScore;





// select all cards and create a function that that loops through and attaches an event listener to each card 
const cards = document.querySelectorAll('.card');
cards.forEach(card => card.addEventListener('click', flipCard))



let firstPrompt = prompt('Player One, What is your Name? ');
let secondPrompt = prompt ('Player two, what is your name?');




function alertPlayer () { 
  if (playerOneTurn = true) {
  playerOneName.classList.add("player-one-name-active")
  alert ( firstPrompt + ' ' + 'goes first')
}
}

setTimeout(alertPlayer,1000);

//What is this doing? 
  //Writing the player names at the top of the board
playerOneName.textContent = firstPrompt
playerTwoName.textContent =  secondPrompt

playerOneScore.textContent = `${firstPrompt}:`
playerTwoScore.textContent = `${secondPrompt}:`

shuffle()

// add & remove flip class to card on click
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
        playerOneScore.textContent = `${firstPrompt}: ${firstPlayerScore}` ; 	
      } else {
        secondPlayerScore++
        playerTwoScore.textContent = `${secondPrompt}: ${secondPlayerScore}`;
      }
     
     
    } else {
      unFlipCards()

      //// increase the turn count, switch players.
					turnCount ++;
					setTimeout(currentPlayer,500);

     }

    
    }
  
  
   
      
  


    
   
 
  
//IF its a match, it doesn't allow you to flip again
function disableCards () {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//Unflips card -  if cards don't match if will flip back 
 
function unFlipCards() {
   lockBoard = true; 
    setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();

  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false ];
  [secondCard,firstCard]
}






// Determines whose turn it is 
 function currentPlayer (){

  if (cardsFlipped === 16 ) {

    checkWinner();

  } else if (turnCount %2 === 0) { 
		playerId = 1;
		playerOneName.classList.add("player-one-name-active")
    playerTwoName.classList.remove("player-two-name-active")
   
		
	} else {
		playerId = 2;
    playerOneName.classList.remove("player-one-name-active")
		playerTwoName.classList.add("player-two-name-active")
   
};
}

//CHECKS WINNER

function checkWinner () {


  if (firstPlayerScore > secondPlayerScore) {
    alert( firstPrompt + ' ' + 'has won!')
  } else if ( firstPlayerScore === secondPlayerScore)  {
    alert( ' Its a Tie!')
  } else {
    alert( secondPrompt + ' ' + 'has won!')
  }
}






playAgainButton.addEventListener('click', reStartGame)

function reStartGame () {
  
    //reset score board

    firstPlayerScore = 0
    secondPlayerScore = 0

    //reset cards flipped variable 
    cardsFlipped = 0
  
  //flip cards facedown 
  cards.forEach(card => card.classList.remove('flip')) 
  //need to shuffle card 
  shuffle()


 

  playerOneScore.textContent = `${firstPrompt}: ${firstPlayerScore}` ; 	
  playerTwoScore.textContent = `${secondPrompt}: ${secondPlayerScore}`;

  //set turn back to zero
  turnCount = 0;
  cards.forEach(card => card.addEventListener('click', flipCard))

  playerOneTurn = true
  alertPlayer();
  currentPlayer();
  

  
}


//SHUFFLES CARD

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
};






const setNewPlayers = () => {
 //set promt to ask for new names
 firstPrompt = prompt('Player One, What is your Name? ');
 secondPrompt = prompt ('Player two, what is your name?');

 playerOneName.textContent = firstPrompt
 playerTwoName.textContent =  secondPrompt

 reStartGame()

}

newPlayersButton.addEventListener('click', setNewPlayers)



