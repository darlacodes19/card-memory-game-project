let gameBoard = document.querySelector('.game-display');
let playerOneScore = document.querySelector('.firstPlayer');
let playerTwoScore = document.querySelector('.secondPlayer')
const playerLivesCount = document.querySelector('span');
const playAgainButton = document.querySelector('#play-again-btn');
const newPlayersButton = document.querySelector('#new-players-btn');
let playerOneName = document.querySelector('#player-one-name')
let playerTwoName = document.querySelector('#player-two-name')

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
let secondPrompt = prompt ('Player two, what is your name?');




function alertPlayer () { 
  if (playerOneTurn = true) {
  playerOneName.classList.add("player-one-name-active")
  alert ( firstPrompt + ' ' + 'goes first')
}
}

setTimeout(alertPlayer,1000);

//What is this doing? 
playerOneName.textContent = firstPrompt
playerTwoName.textContent =  secondPrompt

playerOneScore.textContent = `${firstPrompt}:`
playerTwoScore.textContent = `${secondPrompt}:`

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
      
      // setTimeout( nextPlayer, 2000)

      // function nextPlayer () {
      //   alert(  'goes next')
      // }

     }

    
    }
  
  
   
      
  


    
    // isMatch ? disableCards() : unFlipCards();
 
  
//IF its a match, it doesn't allow you to flip again
function disableCards () {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

      // playerLives++
      // playerLivesCount.textContent = playerLives;

    resetBoard();
}

//Unflips card -  if cards don't match if will flip back 
 
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






// Determines whose turn it is 
 function currentPlayer (){

  if (cardsFlipped === 16 ) {

    checkWinner();

  } else if (turnCount %2 === 0) { 
		playerId = 1;
		playerOneName.classList.add("player-one-name-active")
    playerTwoName.classList.remove("player-two-name-active")
    // alert( firstPrompt + ' ' + 'goes next')
		
	} else {
		playerId = 2;
    playerOneName.classList.remove("player-one-name-active")
		playerTwoName.classList.add("player-two-name-active")
    // alert ( secondPrompt + ' ' + 'goes next')
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
  


 
 
 

  



  // shuffle();

  // let firstPrompt = prompt('Player One, What is your Name? ');
  // let secondPrompt = prompt ('Player two, what is your name?');

  // setTimeout(alertPlayer,2000);

  // flipCard();

  
}


//SHUFFLES CARD

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
};




newPlayersButton.addEventListener('click', setNewPlayers)




