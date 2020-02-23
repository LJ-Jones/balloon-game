//SETTING THE VARIABLES - colors contains an array
let colors = ['yellow', 'red', 'blue', 'violet', 'green'];
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight
let body = document.body;
let scores = document.querySelectorAll('.score');
let num = 0;
let total = 100;
let currentBalloon = 0;
let gameOver = false;
let totalShadow = document.querySelector('.total-shadow');
let startBtn = document.querySelector('.start-game-button');
// SETTING THE FUNCTION TO ENABLE CREATING THE BALLOON AND SETTING IT TO GENERATE RANDOM COLOUR BALLOONS IN RANDOM PLACES ======
function createBalloon(){
  let div = document.createElement('div');
  let rand = Math.floor(Math.random() * colors.length);
  div.className = 'balloon balloon-' + colors[rand];

  rand = Math.floor(Math.random() * (windowWidth - 100));
  div.style.left = rand + 'px';
  //using a special attribute called dataset, this will give each balloon a data number, e.g. data1, data2 and so on. to set another number for a currentBalloon++
  div.dataset.number = currentBalloon;
  currentBalloon++;

  body.appendChild(div);
  //to run animate balloon we need to run animateBalloon with the div as the argument
  animateBalloon(div);
}
// CREATING THE ANIMATION OF THE BALLOON - move up the screen // the variable called interval is created
//this variable (animateBalloon) runs the function called setInterval calls function frame executed each 10ms. Below we see the function called frame, this function checks whether the position of the balloon is greater than or equal to the height of the browser screen + 200px which is the height of the balloon, if the position is equal to this then it means the balloon is out of the edge of the browser screen, therefore the program stops the animation, with the help of the function called clearInterval, but if the position of a balloon is still not equal to the height of the browser screen plus 200px then variable pos is increased by 1px the program sets new position for a balloon which is equal to height of the windowHeight - the value of the variable pos, at the end we have px to get the result in pixels.
function animateBalloon(elem) {
  let pos = 0;
  let random = Math.floor(Math.random() * 6 - 3);
  let interval = setInterval(frame, 12 - Math.floor(num / 10) + random);

  function frame(){
    if(pos >= (windowHeight + 200)&& (document.querySelector('[data-number="'+elem.dataset.number+'"]')!== null)) {
      clearInterval(interval);
      gameOver = true;
      //here we are going to function called deleteBalloon with elem (element) in the parenthesis ===
    } else {
      pos++;
      elem.style.top = windowHeight - pos + 'px';
    }
  }
}

//Create function deleteBalloon - as an argument of this function we write elem that is the balloon that has to be deleted, then apply the function remove to the element.
function deleteBalloon(elem) {
  elem.remove();
  num++;
  updateScore();
  playBallSound();
}

function playBallSound(){
  let audio = document.createElement('audio');
  audio.src = 'sounds/pop.mp3';
  audio.play();
}

function updateScore() {
  for(let i = 0; i < scores.length; i++) {
    scores[i].textContent = num;
  }
}
//In console run the function with the name createBalloon() you see in the html the div tag balloon is removed once the balloon reaches the top

//variable called balloons, then we add the querySelectorAll function, since there are many balloons we need to use a for loop upto a balloons.length, with the loop step i++, we write that for each balloon we want to add an eventListener, when a user clicks a balloon then an eventListener has to be executed, then we write deleteBalloon as an argument

//let balloons = document.querySelectorAll('.balloon');
//for(let i = 0; i < balloons.length; i++) {
//  balloons[i].addEventListener('click', function(){
//    deleteBalloon(balloons[i]);
//  })
//}

// However this does not work, as you cannot add an eventListener to the balloon.

//Instead we can add eventDelegation, in order to use this you have to attach an eventListener to the whole webpage

// eventDelegation - to enable the popping of the balloons by the user.

//this adds an eventListener to the whole webpage if you run console.log('Click'); Click is displayed in console each time. How can we track that a user clicked on a balloon.

//track by writing event as the argument of this function. Event is a special object that keeps track of all actions used by your users, e.g. a user clicks on a button, then this action is saved in this object called event, if later on the user clicks on a link then this action will be saved in the argument called event.
//A mouseEvent object has been created, open it and we are particularly interested in the target: body, then we click on the div score block, each balloon is a div called balloon, if a user clicked on a balloon we would see in console, target: div-balloon, then we are going to write if the value of the property with the name target = div class name balloon then the has to delete the balloon.

//eventDelegation   =====
//Adds an eventListener to the whole webpage, then runs an if statement to check if in the event object against the class list and if it contains balloon then run function deleteBalloon.

// write the code to increase the number in the you popped 0 balloons (written in as a span tag with class called score, note it repeats twice on the webpage, so the number has to be updated simultaneousely in both cases).

// Search for all elements with class name score

function startGame() {
  restartGame();
  let timeout = 0;

  let loop = setInterval(function() {
    timeout = Math.floor(Math.random() * 600 - 100)
    if(!gameOver && num !== total) {
      createBalloon();
    } else if(num !== total){
      clearInterval(loop);
      totalShadow.style.display = 'flex';
      totalShadow.querySelector('.lose').style.display = 'block';
    } else {
      clearInterval(loop);
      totalShadow.style.display = 'flex';
      totalShadow.querySelector('.win').style.display = 'block';
    }
  }, 800);
}

function restartGame() {
  let forRemoving = document.querySelectorAll('.balloon');
  for(let i = 0; i < forRemoving.length; i++) {
    forRemoving[i].remove();
  }
  gameOver = false;
  num = 0;
  updateScore();
}
document.addEventListener('click', function(event){
  if(event.target.classList.contains('balloon')) {
    deleteBalloon(event.target);
  }
})

// finalise the game by adding the play again function using an eventListener (using 2 arguments, first 'click' sencond function ----  and then finally adding the sounds
document.querySelector('.restart').addEventListener('click', function() {
 totalShadow.style.display = 'none';
 totalShadow.querySelector('.win').style.display = 'none';
 totalShadow.querySelector('.lose').style.display = 'none';
 startGame();
})
document.querySelector('.cancel').addEventListener('click', function() {
  totalShadow.style.display = 'none';
})

startBtn.addEventListener('click', function() {
  startGame();
  document.querySelector('.bg-music').play();
  document.querySelector('.start-game-window').style.display = 'none';
});
