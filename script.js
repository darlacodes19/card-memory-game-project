// const myTimeout = setTimeout(myGreeting,3000)

// function myGreeting() {
//     let greeting = document.createTextNode ('Welcome to the game!');
//     document.body.appendChild(greeting) 
    
// }

// function stopGreeting () {
//     clearTimeout(myTimeout)
// }


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

    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    
    isMatch ? disableCards() : unFlipCards();
 
  }

function disableCards () {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}
 
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

// (function shuffle(){
//   cards.forEach(card => {
//     let random = Math.floor(Math.random()*12);
//     cards.style.order = random;
//   });
// })();

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard))




// let playerOneScore = 0;
// let playerTwoScore =0; 



