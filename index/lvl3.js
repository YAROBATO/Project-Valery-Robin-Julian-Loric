let rightOrderNu = [];
let rightOrderNa = [];
let gameInProgress = false;
let outroContainer = document.getElementById('outro-container');
let redLightOne = {
  variable: 0
};
let test = true;

function changeButtonColor(buttonNumber) {
  return new Promise((resolve) => {
    let button = document.getElementById("button" + buttonNumber);
    let originalColor = button.style.backgroundColor;
    button.style.backgroundColor = "green";
    setTimeout(function() {
      button.style.backgroundColor = originalColor;
      resolve(buttonNumber);
    }, 800);
  });
}

function arrayRemove(arr, value) { 
	return arr.filter(function (geeks) { 
		return geeks != value; 
	}); 
} 

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function randomButtonColorChange() {
  let randomButtonNumber = Math.floor(Math.random() * 9) + 1;
  await changeButtonColor(randomButtonNumber);
  rightOrderNu.push(randomButtonNumber);
  rightOrderNa.push("button" + randomButtonNumber);
}

async function levels(times) {
  for (let i = 0; i < times-1; i++) {
    await changeButtonColor(rightOrderNu[i]);
    await delay(800);
  }
  await randomButtonColorChange();
}
async function GoldLightAll(timer) {
  return new Promise(async (resolve) => {
    let buttons = document.getElementsByClassName("round-button");
    const promises = Array.from(buttons).map(async (button) => {
      button.style.backgroundColor = "gold";
    });
    await delay(1000);
    outroContainer.style.display = 'block';
    sessionStorage.setItem('index4', '1');
    
  });
}

async function greenLightAll(round, timer) {
  test = false;
  return new Promise(async (resolve) => {
    let buttons = document.getElementsByClassName("round-button");
    const promises = Array.from(buttons).map(async (button) => {
      let originalColor = window.getComputedStyle(button).backgroundColor;
      button.style.backgroundColor = "green";
      await new Promise(innerResolve => {
        setTimeout(() => {
          button.style.backgroundColor = originalColor;
          document.getElementById("roundText").textContent = "Round: " + round;
          innerResolve();
        }, 1000);
      });
    });
    await Promise.all(promises);
    await delay(1700);
    resolve(timer);
    test = true;
  });
}


async function redLightAll(timer) {
  redLightOne++;
  test = false;
  return new Promise(async (resolve) => {
    let buttons = document.getElementsByClassName("round-button");
    const promises = Array.from(buttons).map(async (button) => {
      let originalColor = window.getComputedStyle(button).backgroundColor;
      button.style.backgroundColor = "red";
      await new Promise(innerResolve => {
        setTimeout(() => {
          button.style.backgroundColor = originalColor;
          document.getElementById("roundText").textContent = "Round: " + 1;
          innerResolve(); 
        }, 1200);
      });
    });
  await Promise.all(promises);
  await delay(1800);
  resolve(timer);
  test = true;
});
}

async function greenLight(buttonNumber, timer) {
  test = false;
  return new Promise((resolve) => {
    let button = document.getElementById("button" + buttonNumber);
    button.style.backgroundColor = "green";
    
    setTimeout(async function () {
      button.style.backgroundColor = "black";  
      resolve(timer);  
    }, 500);
    test = true;
  }); 
}

async function game(ir) {
  redLightOne = 0;
  await levels(ir);
  console.log('Right order:', rightOrderNa);
  let expectedIndex = 0;
  const clickHandler = async function () {
    const button = this; 
    if (button.id == rightOrderNa[expectedIndex] && test) {  
      await greenLight(rightOrderNu[expectedIndex]);
      expectedIndex++;

      if (expectedIndex == rightOrderNa.length && ir != 10) {
        expectedIndex = 0;
        ir = ir + 1;
        await greenLightAll(ir);
        for (let i = 1; i <= 9; i++) {
          const btn = document.getElementById("button" + i);
          btn.removeEventListener("click", clickHandler);
        }
        game(ir);
      }
      else if (expectedIndex == rightOrderNa.length && ir == 10) {
        await GoldLightAll();
      }
    } 
    else if (button.id != rightOrderNa[expectedIndex] && redLightOne < 1 && test) {
      await redLightAll();
      expectedIndex = 0;
      rightOrderNu = [];
      rightOrderNa = [];
      ir = 1;
      for (let i = 1; i <= 9; i++) {
        const btn = document.getElementById("button" + i);
        btn.removeEventListener("click", clickHandler);
      }
      game(ir);
    }
  };

  for (let i = 1; i <= 9; i++) {
    const button = document.getElementById("button" + i);
    button.addEventListener("click", clickHandler);
  }
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
      game(1, 1);
    });
  }
});