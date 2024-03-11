let wordsE = [
  "elephant",
  "rainbow",
  "computer",
  "gardening",
  "mountain",
  "sunshine",
  "baseball",
  "butterfly",
  "strawberry",
  "adventure",
  "elevator",
  "happiness",
  "waterfall",
  "fireplace",
  "alligator",
  "backpack",
  "chocolate",
  "dinosaur",
  "whispering",
  "lighthouse",
  "watermelon",
  "blackberry",
  "television",
  "dragonfly",
  "hedgehog",
  "skateboard",
  "exploration",
  "pineapple",
  "helicopter",
  "christmas",
  "microphone",
  "headphones",
  "basketball",
  "sunglasses",
  "waterproof",
  "flashlight",
  "fireworks",
  "hamburger",
  "notebook",
  "umbrella",
  "caterpillar",
  "kangaroo",
  "landscape",
  "motorcycle",
  "volleyball",
  "watercolor",
  "friendship",
  "jellyfish",
  "mermaid",
  "newspaper",
  "banana",
  "window",
  "table",
  "pencil",
  "guitar",
  "printer",
  "keyboard",
  "laptop",
  "jacket",
  "camera",
  "mirror",
  "bottle",
  "pillow",
  "candle",
  "tissue",
  "wallet",
  "charger",
  "cupcake",
  "blanket",
  "cupboard"
];
let wordsD = [
  "erdbeere",
  "abenteuer",
  "glücklich",
  "wasserfall",
  "feuerstelle",
  "alligator",
  "rucksack",
  "schokolade",
  "dinosaurier",
  "flüstern",
  "leuchtturm",
  "wassermelone",
  "skateboard",
  "erkundung",
  "ananas",
  "hubschrauber",
  "weihnachten",
  "mikrofon",
  "kopfhörer",
  "basketball",
  "sonnenbrille",
  "wasserdicht",
  "taschenlampe",
  "feuerwerk",
  "hamburger",
  "notizbuch",
  "regenschirm",
  "raupe",
  "känguru",
  "landschaft",
  "motorrad",
  "volleyball",
  "wasserfarbe",
  "freundschaft",
  "qualle",
  "meerjungfrau",
  "zeitung",
  "schmetter",
  "sonntag",
  "buchstabe",
  "krokodil",
  "paprika",
  "schule",
  "reise",
  "musik",
  "regen",
  "geburt",
  "kuchen",
  "wasser",
  "fenster",
  "lampe",
  "blumen",
  "computer",
  "bildschirm",
  "drucker",
  "bett",
  "schrank",
  "tasche",
  "stecker",
  "werkzeug",
  "fahrrad",
  "kühlschrank",
  "fensterbank",
  "kaffeemaschine",
  "gitarre",
  "brille",
  "kamera",
  "handtuch"
];
let list = wordsE;
const outroContainer = document.getElementById('outro-container');
const wordMatrix = document.getElementById('word-matrix');
const wrongLetters = document.getElementById('wrong-Letters')
const hangman = document.getElementById('hangman');
const retryContainer = document.getElementById('retry-container');
const language = document.getElementById('language-toggle');
let word;
let rightLetters = [];
let wrongTimes = 0;

function randomWord(){
  let randomWordNumber = Math.floor(Math.random() * list.length);
  word = list[randomWordNumber];
  return word;
}
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function linePrint(word){
  console.log(word);
  for(i = 0; i < word.length; i++){
    const underline = document.createElement("span");
    underline.textContent = "_";
    underline.classList.add("letter");
    wordMatrix.appendChild(underline);
  }
}
function keyPressed(word, pressedLetter) {
  for (let letter of word) {
    if (!pressedLetter.includes(letter)) {
      return false;
    }
  }
  return true;
}
function whereLetter(word, letter) {
  const where = [];
  let index = word.indexOf(letter);
  
  while (index != -1) {
    where.push(index);
    index = word.indexOf(letter, index + 1);
  }
  
  return where;
}
async function checkLetter(key){
  if (/^[a-zA-ZäöüÄÖÜ]$/.test(key) && wrongTimes <= 5) {
    if(word.includes(key)){
      let positions = whereLetter(word, key);
      console.log(positions);
      for (let i = 0; i < positions.length; i++) {
        const childPosition = wordMatrix.children[positions[i]];
        childPosition.textContent = key;
      }
      rightLetters.push(key);
      if(keyPressed(word, rightLetters)){
        outroContainer.style.display = "block";
        sessionStorage.setItem('index9', '1');
        wrongTimes = 10;
      }
    }
    else{
      const wrongLetter = document.createElement("li");
      wrongLetter.textContent = key;
      wrongLetter.classList.add("wrong");
      wrongLetters.appendChild(wrongLetter);
      const hang = document.createElement("img");
      hang.src = "img8/" + (wrongTimes+1) + "wrong.png"
      hang.classList.add("hangPic");
      hangman.appendChild(hang);
      wrongTimes++;
      if(wrongTimes == 6){
        const firstPic = document.querySelector("#hangman #firstPic");
        firstPic.remove();
        await delay(800);
        retryContainer.style.display = "block";
      }
    }
  }
}
function retry(){
  for(let i = 0; i < word.length; i++){
    wordMatrix.removeChild(wordMatrix.firstChild);
  }
  const images = hangman.querySelectorAll("img");
  for(let l = 0; l < images.length; l++) {
    hangman.removeChild(images[l]);
  }
  const hang = document.createElement("img");
  hang.src = "img8/0wrong.png"
  hang.classList.add("hangPic");
  hang.id = "firstPic";
  hangman.appendChild(hang);
  retryContainer.style.display = "none";
  wrongLetters.textContent = "";  
  const title = document.createElement("h2");
  title.textContent = "wrong letters";
  wrongLetters.appendChild(title);
  wrongTimes = 0;
  rightLetters = [];
  linePrint(randomWord());
}
outroContainer.style.display = "none";
retryContainer.style.display = "none";
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
        linePrint(randomWord(wordsE));
    });
  }
});
document.addEventListener("keydown", function(event){
  checkLetter(event.key);
});
language.addEventListener("change", function(event){
  if(event.target.checked && wrongTimes <=5){
    list = wordsD;
    retry();
  }
  else if (wrongTimes <= 5){
    list = wordsE;
    retry();
  }
  else if (event.target.checked && wrongTimes ==6){
    list = wordsD;
  }
  else if (wrongTimes == 6){
    list = wordsE;
  }
});