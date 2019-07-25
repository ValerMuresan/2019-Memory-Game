//Create a list that holds all of your cards
let picturesList = [
  "fas fa-fighter-jet",
  "fas fa-fighter-jet",
  "fas fa-bus",
  "fas fa-bus",
  "fas fa-car",
  "fas fa-car",
  "fas fa-motorcycle",
  "fas fa-motorcycle",
  "fas fa-plane",
  "fas fa-plane",
  "fas fa-shuttle-van",
  "fas fa-shuttle-van",
  "fas fa-truck",
  "fas fa-truck",
  "fas fa-truck-pickup",
  "fas fa-truck-pickup"
];

 // Create the pack of cards
let cardsHolder = document.querySelector(".pack");
//Create the turned on cards array
let turnedOnCards = [];
//Create the fitted cards array
let fittedCards = [];
// Create the first time clicked variable
let firstTimeClicked = true;
/*
*Variables for time counting
*/
let seconds = 0;
let minutes = 0;
let hours = 0;

//Define variables that holds the "timer" values
let timerSeconds = 0;
let timerMinutes = 0;
let timerHours = 0;

//Create a variable to hold setInterval() function
let interval = null;

//Define moves variable
let moves = document.getElementById('clicks');
// Define moves counter
let counter = 0;

// Define performance variables
let atomsContainer = document.querySelector('.atoms');
let atom = `<li><i class="fas fa-atom"></i></li>`;

// Define the undo variable
let undoBtn = document.querySelector('.undo i');

/*
*define the instructions variables
*/
const instructionsBtn = document.querySelector('.inst-button');
const instructionsModal = document.querySelector('.instructions-modal');
const closeInstructions = document.querySelector('.close');

/*
*Define the end modal variables
*/
let endMessage = document.getElementById('end-message');
const closeModal = document.querySelector('.close-modal');
const newGame = document.getElementById('new-game');
const quitGame = document.getElementById('quit-game');

//Create the  build cards function
function createCards() {
  //Create the cards
for (let i = 0; i < picturesList.length; i++) {
  const card = document.createElement('li');
  card.classList.add('card');
  card.innerHTML = `<i class="${picturesList[i]}"></i>`;
  cardsHolder.appendChild(card);
  pressTheCards(card);
}
}

//Create timeCount function
function timeCount() {
  seconds++;
  //logic to increment next value
  if (seconds / 60 === 1){
    seconds = 0;
    minutes++;
    if (minutes / 60 === 1){
      minutes = 0;
      hours++;
    }
  }
  //when time values are only a digit, add a before 0
  if (seconds < 10){
    timerSeconds = "0" + seconds.toString();
  }
  else{
    timerSeconds = seconds;
  }
  if (minutes < 10){
    timerMinutes = "0" + minutes.toString();
  }
  else{
    timerMinutes = minutes;
  }
  if (hours < 10){
    timerHours = "0" + hours.toString();
  }
  else{
    timerHours = hours;
  }
  document.getElementById('timer').innerHTML = timerHours + ":" + timerMinutes + ":" + timerSeconds;
}
// Create startTimer function
function startTimer() {
//Starting the time counter by calling the setInterval() function
interval = window.setInterval(timeCount, 1000);
}
// Creating the stopTimer function
function stopTimer() {
  window.clearInterval(interval);
}
//Create the click on card event function
function pressTheCards(card) {
  card.addEventListener('click', function() {
    // Starting the timer at first click
    if(firstTimeClicked) {
      startTimer();
      firstTimeClicked = false;
    }
    let initialCard = turnedOnCards[0];
    let futureCard = this;
    if(turnedOnCards.length === 1) {
      card.classList.add("turnOn", "display", "disable");
      turnedOnCards.push(this);
      checkEquivalence(initialCard, futureCard);
    } else {
      futureCard.classList.add("turnOn", "display", "disable");
      turnedOnCards.push(this);
    }
  });
}

//Create click performance function
function clickPerformance() {

if(counter < 17) {
  atomsContainer.innerHTML = atom + atom + atom + atom + atom;
} else if(counter < 24) {
  atomsContainer.innerHTML = atom + atom + atom + atom;
} else if(counter < 29) {
    atomsContainer.innerHTML = atom + atom + atom;
} else if(counter < 35) {
  atomsContainer.innerHTML = atom + atom;
} else if(counter < 45) {
    atomsContainer.innerHTML = atom;

  } else if(counter > 46) {
    atomsContainer.innerHTML = "";
  }
}

// Creating the clicks counter when the card is clicked
function addClicksNumber() {
counter += 1;
moves.innerHTML = counter;
document.getElementById('clicks').innerHTML = 'Clicks: '+ counter;
// Calling the click performance function
clickPerformance();
}
// Clearing the cards clicks function
function clearClicks() {
moves.innerHTML = counter;
counter = 0;
document.getElementById('clicks').innerHTML = 'Clicks: '+ counter;
}

  function checkEquivalence(initialCard, futureCard) {
    //Setting the fitting of cards
    if(initialCard.innerHTML === futureCard.innerHTML) {
      //The cards are fitted
      initialCard.classList.add("fit");
      futureCard.classList.add("fit");
      fittedCards.push(initialCard, futureCard);
      turnedOnCards = [];
      gameEnd();
    } else {
      //Setting the time for fitting the cards
      setTimeout(function() {
        initialCard.classList.remove("turnOn", "display", "disable");
        futureCard.classList.remove("turnOn", "display", "disable");
      }, 600);
      turnedOnCards = [];
    }
      addClicksNumber();
    }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
//Setting the restart game function
function replayGame() {
  turnedOnCards = [];
  fittedCards = [];
  counter = 0;
  clearClicks();
  clickPerformance();
  stopTimer();
  seconds = 0;
  minutes = 0;
  hours = 0;
  firstTimeClicked = true;
  document.getElementById('timer').innerHTML = "00:00:00";
  launchGame();
}
//Setting the restart button
undoBtn.addEventListener('click', function() {
  cardsHolder.innerHTML = [''];
  replayGame();
});
//Set the instruction button
instructionsBtn.addEventListener('click', function() {
instructionsModal.style.display = 'block';
cardsHolder.innerHTML = [''];
replayGame();
});
//Set the close icon from instruction
closeInstructions.addEventListener('click', function() {
instructionsModal.style.display = 'none';
})

//Create the last message function
function lastGameMessage() {
endMessage.style.display = 'block';
closeModal.addEventListener('click', function() {
  endMessage.style.display = 'none';
});
newGame.addEventListener('click', function() {
  endMessage.style.display = 'none';
  cardsHolder.innerHTML = [''];
  replayGame();
});
quitGame.addEventListener('click', function() {
  window.close();
});

let modalAtoms = atomsContainer.innerHTML;
document.querySelector('.modal-atoms').innerHTML = `Atoms: ${modalAtoms}`;
let modalClicks = document.querySelector('.modal-clicks');
modalClicks.innerHTML = `Clicks: ${counter + 1}`;
let modalTime = document.querySelector('.modal-time');
modalTime.innerHTML = `Time: ${timerHours + ":" + timerMinutes + ":" + timerSeconds}`;
}
// Create the game end function
function gameEnd() {
  if(fittedCards.length === picturesList.length) {
    stopTimer();
    lastGameMessage();
  }
}
//Create the game launch function
function launchGame() {
  shuffle(picturesList);
  createCards();
}
//Call for game launching function
launchGame();
