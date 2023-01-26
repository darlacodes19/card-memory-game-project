
//MANIPULATING THE DOM
  
  //button variables
const playAgainButton = document.querySelector('#play-again-btn');
const newPlayersButton = document.querySelector('#new-players-btn');
//cards
const cards = document.querySelectorAll('.card');
  // Variables to Updates player scores & names
let playerOneScore = document.querySelector('.firstPlayer');
let playerTwoScore = document.querySelector('.secondPlayer')
let playerOneName = document.querySelector('#player-one-name')
let playerTwoName = document.querySelector('#player-two-name')

//OTHER VARIABLES
  //keeps track of player scores 
let firstPlayerScore = 0;
let secondPlayerScore = 0;

//used to determine which player to give points to 
let playerId = 1;
//used to keep track of whose turn it is 
let turnCount = 0;
  //keeps track of the # of cards flipped - helpful for determining when the game is over 
let cardsFlipped = 0;
  //keeps track of if card was flipped
let hasFlippedCard =false;

let lockBoard = false;


//to keep track of cards being flipped
let firstCard;
let secondCard;


// select all cards and create a function that that loops through and attaches an event listener to each card 
  //the event listener 
cards.forEach(card => card.addEventListener('click', flipCard))


  //1 - The game starts out by prompting each player to submit their names
        // - The value of each answer is saved into a variable to be later used inside the scoreboard 
let firstPrompt = prompt('Player One, What is your Name? ');
let secondPrompt = prompt ('Player two, what is your name?');

 //Writes the player names at the top of the board
 playerOneName.textContent = firstPrompt
 playerTwoName.textContent =  secondPrompt
 
 //Writes name in scoreboard 
 playerOneScore.textContent = `${firstPrompt}:`
 playerTwoScore.textContent = `${secondPrompt}:`

//2- After the first two prompts, the program alerts which player will take the first turn 
function alertPlayer () { 
  
    //player one goes first
  alert ( firstPrompt + ' ' + 'goes first')
  //their name is highlighted 
  playerOneName.classList.add("player-one-name-active")

}

  // the alertPlayer function will play after 1 second 
setTimeout(alertPlayer,1000);

 
//shuffles card at the beggining of each game 
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

  //checks to see if cards match 

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
     
     //if its not a match 
    } else {
      unFlipCards()

      // increase the turn count, switch players.
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



