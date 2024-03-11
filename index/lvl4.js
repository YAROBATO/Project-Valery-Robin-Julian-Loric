let solutions = [];
let CountCapit = {
    "Albanien": "Tirana",
    "Andorra": "Andorra la Vella",
    "Belgien": "Brussels",
    "Bosnien_Herzegowina": "Sarajevo",
    "Bulgarien": "Sofia",
    "Dänemark": "Copenhagen",
    "Deutschland": "Berlin",
    "Estland": "Tallinn",
    "Finnland": "Helsinki",
    "Frankreich": "Paris",
    "Griechenland": "Athens",
    "Irland": "Dublin",
    "Island": "Reykjavik",
    "Italien": "Rome",
    "Kasachstan": "Nur-Sultan",
    "Kosovo": "Pristina",
    "Kroatien": "Zagreb",
    "Lettland": "Riga",
    "Litauen": "Vilnius",
    "Luxemburg": "Luxembourg",
    "Mazedonien": "Skopje",
    "Moldawien": "Chisinau",
    "Monaco": "Monaco",
    "Montenegro": "Podgorica",
    "Niederlande": "Amsterdam",
    "Norwegen": "Oslo",
    "Österreich": "Vienna",
    "Polen": "Warsaw",
    "Portugal": "Lisbon",
    "Rumänien": "Bucharest",
    "Russland": "Moscow",
    "San_Marino": "San Marino",
    "Schweden": "Stockholm",
    "Schweiz": "Bern",
    "Serbien": "Belgrade",
    "Slowakei": "Bratislava",
    "Slowenien": "Ljubljana",
    "Spanien": "Madrid",
    "Tschechien": "Prague",
    "Türkei": "Ankara",
    "Ukraine": "Kyiv",
    "Ungarn": "Budapest",
    "Vatikanstadt": "Vatican City",
    "Vereinigtes_Königreich": "London",
    "Weißrussland": "Minsk",
    "Zypern": "Nicosia"
};
let round = 0;
let wrong = 0;
let CountArr = Object.keys(CountCapit);
const map = document.getElementById("map");
let isDelayInProgress = false;
let test = false;
const outroContainer = document.getElementById('outro-container');
outroContainer.style.display = 'none';

function randomCountPick() {
    let randomNum = Math.floor(Math.random() * CountArr.length);
    remember = CountArr[randomNum];
    CountArr.splice(randomNum, 1);
    console.log(CountArr);
    return remember;
}

function setCapi(){
    let Capital = document.getElementById("capital");
    if (Capital) {
        rando = randomCountPick();
        solutions.push(rando);
        Capital.textContent = CountCapit[rando];
    }

}

function delay(ms) {
    isDelayInProgress = true;
    return new Promise(resolve => setTimeout(() => {
        isDelayInProgress = false;
        resolve();
    }, ms));
}

function removeHeart(heartId){
    const heart = document.getElementById("heart" +heartId);
    if (heart) {
        heart.remove();
    }
}

function restoreHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    for (let i = 1; i <= 5; i++) {
        const heart = document.createElement('div');
        heart.id = 'heart' + i;
        heart.className = 'heart';
        heartsContainer.appendChild(heart);
    }
}

async function game(event){
    const clickedPath = event.target.closest('path');
    const Round = document.getElementById("round");
    const rightOne = document.getElementById(solutions[round]);
    if(clickedPath.id ==  solutions[round]){
        event.target.classList.add('highlightGreen');
        await delay(1000);
        if (round<9){
            setCapi();
        }
        event.target.classList.remove("highlightGreen");
        round++;
        if(Round && round<10){
            Round.textContent = round+1;
        }
    }
    else{
        removeHeart((wrong +1));
        event.target.classList.add('highlightRed');
        await delay(1000);
        event.target.classList.remove('highlightRed');
        wrong ++;
    }
    if(wrong == 5){
        round = 0;
        rightOne.classList.add('highlightYellow');
        await delay(800);
        rightOne.classList.remove('highlightYellow');
        if(Round){
            Round.textContent = round+1;
        }
        restoreHearts();
        CountArr = Object.keys(CountCapit);
        solutions = [];
        wrong = 0;
        setCapi();
    }
    if(round == 10){
        outroContainer.style.display = 'block';
        sessionStorage.setItem('index5', '1');
    }
}



document.addEventListener('DOMContentLoaded', function() {
setCapi();
map.addEventListener("click", function(event) {
    if (!isDelayInProgress) {
        game(event);
    }
});

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
      test = true;
    });
  }
});