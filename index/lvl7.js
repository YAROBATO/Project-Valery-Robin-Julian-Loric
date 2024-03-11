let images = ["book", "eraser", "headphones", "laptop", "marker", "pen", "pencil-sharpener", "post-it", "scissor", "smartphone", "triangle", "sd-card", "backpack", "ruler", "mouse"];
let imagesToG ={
  "book": "buch",
    "eraser": "radiergummi",
    "headphones": "kopfhörer",
    "laptop": "laptop",
    "marker": "marker",
    "pen": "stift",
    "pencil-sharpener": "spitzer",
    "post-it": "post-it",
    "scissor": "schere",
    "smartphone": "smartphone",
    "triangle": "dreieck",
    "sd-card": "sd-karte",
    "backpack": "rucksack",
    "ruler": "lineal",
    "mouse": "maus"
};
let solutions = [];
let countdownDuration = 30;
let countdownInterval;
const progressBar = document.getElementById('progress-bar');
const background = document.getElementById('background');
const outroContainer = document.getElementById('outro-container');
const round = document.getElementById('roundText');
let imagesCop;

function randomImgs(number){
  imagesCop = [...images];
  solutions = [];
  for(let i = 1; i <= number; i++){
    let rando = Math.floor(Math.random() * imagesCop.length);
    createImg(imagesCop[rando], 80, background);
    let index = imagesCop.indexOf(imagesCop[rando]);
    solutions.push(imagesCop[rando]);
    imagesCop.splice(index, 1);
  } 
  console.log(solutions);
}

function removeImg(imgID, parent){
  const img = document.getElementById(imgID);
  if(img){
    parent.removeChild(img);
  }
}

function createImg(imgID, width, parent){
  const img = document.createElement('img');
  img.src = "img7/" + imgID + ".png";
  img.id = imgID;
  img.width = width;
  parent.appendChild(img)
}

function extra(){
  let random = Math.floor(Math.random() * (imagesCop.length));
  createImg(imagesCop[random], 80, background);
}

function changeImgsComp(){
  for(let n = 0; n < images.length; n++){
      removeImg(images[n], background);
  }
  randomImgs(12);
}


function changeImgs(start, end){
  for(let l = 0; l < start; l++){
    removeImg(solutions[l], background);
  }
  for(let m = 1; m <= end; m++){
    let random = Math.floor(Math.random() * (solutions.length));
    createImg(solutions[random], 80, background);
    let index = solutions.indexOf(solutions[random]);
    solutions.splice(index, 1);
  }
  console.log(solutions);
}

function countdown(numbers, numbers2) {
  return new Promise(resolve => {
    const progress = (countdownDuration / 30) * 100;
    progressBar.style.width = `${progress}%`;
    countdownDuration--;

    if (countdownDuration >= 0) {
      setTimeout(() => {
        countdown(numbers, numbers2).then(resolve);
      }, 1000);
    } else {
      progressBar.style.width = '0%';
      changeImgs(numbers, numbers2);
      resolve(); 
    }
  });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function input(){
  const lineBreak = document.createElement('br');
  background.appendChild(lineBreak);
  const inputBox = document.createElement('input');
    inputBox.type = 'text'; 
    inputBox.id = "input";
    inputBox.placeholder = "what's missing?...";
    background.appendChild(inputBox);
}

async function check() {
  return new Promise(resolve => {
    const inputBox = document.getElementById('input');
    inputBox.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        if (inputBox.value.toLowerCase() === solutions[0] || inputBox.value.toLowerCase() === imagesToG[solutions[0]]) {
          createImg("checkmark", 160, document.body);
          resolve();
        }
        else {
          createImg("cross", 160, document.body);
          (async () => {
            await delay(800);
            removeImg("cross", document.body);
          })();
        }
      }
    });
  });
}



function stuff(numRou){
  return new Promise(resolve => {
  removeImg("checkmark", document.body);
  removeImg("input", background);
  round.innerHTML = "Round: "+ numRou;
  changeImgsComp();
  countdownDuration = 30;
  resolve();
  });
}

async function game(){
  randomImgs(10);
  await countdown(10, 9);
  input();
  await check();
  await delay(1000);
  await stuff(2);
  await countdown(12, 11);
  input();
  await check();
  await delay(1000);
  await stuff(3);
  await countdown(12,11);
  extra();
  input();
  await check();
  removeImg("checkmark", document.body);
  sessionStorage.setItem('index8', '1');
  outroContainer.style.display = 'block'
}


outroContainer.style.display = 'none';
document.addEventListener('DOMContentLoaded', function() {
  let startButton = document.getElementById('startButton');
  if (startButton) {
    startButton.addEventListener('click', function() {
      let introContainer = document.querySelector('.intro-container');
      if (introContainer) {
        introContainer.style.display = 'none';
      }
      let gameContainer = document.querySelector('.game-container');
      if (gameContainer) {
        gameContainer.style.display = 'block';
      }
      game();
    });
  }
});

document.getElementById("retry").addEventListener('click', function () {
  location.reload();
});