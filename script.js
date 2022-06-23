// select all cards and create a function that that loops through and attaches an event listener to each card 
const cards = document.querySelectorAll('.card');
// add/remove flip class to card on click
function flipCard() {
    this.classList.toggle('flip')
   }

cards.forEach(card => card.addEventListener('click', flipCard ));



