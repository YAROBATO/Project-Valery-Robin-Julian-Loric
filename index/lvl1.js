let isPainting = false;
let ListX = [];
let ListY = [];
let x1;
let y1;
let test = true;
let start = false;
const svg = document.getElementById('drawingSpace');
let outroContainer = document.getElementById('outro-container');
svg.setAttribute('width', window.innerWidth);
svg.setAttribute('height', window.innerHeight);
const svgWidth = svg.getAttribute('width');
const svgHeight = svg.getAttribute('height');
const centerX = svgWidth / 2;
const centerY = svgHeight / 2;
console.log(centerX, "x", centerY, "y");
const circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
circle.setAttribute('id', 'centerCircle');
circle.setAttribute("cx", centerX);
circle.setAttribute("cy", centerY);
circle.setAttribute("r", "10");
circle.setAttribute("fill", "red"); 
svg.appendChild(circle);

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

document.addEventListener("mousedown", function (event){   
    if(start){
        if (svg) {
            const circle = svg.querySelector('#centerCircle');
            svg.innerHTML = '';
            if (circle) {
                svg.appendChild(circle); 
            }
        }
        firstPoint(event.clientX, event.clientY)
        isPainting = true;
    }
})

document.addEventListener("mouseup", async function () {
    isPainting = false; 
    let full = fullCircle();
    if(test && full && start){
        let percentageNumber = percentage().toFixed(1);
        if(percentageNumber > 100){ percentageNumber = 99 }
        document.getElementById("scoreboard").textContent = "score " + percentageNumber + " %";
        if(percentageNumber > 90){
            await delay(600);
            outroContainer.style.display = 'block';
            sessionStorage.setItem('index2', '1');
            start = false;
        }
    }
    else if(test == false && start){
        document.getElementById("scoreboard").textContent = "too close to the dot";
    }
    else if (full == false && start){ 
        document.getElementById("scoreboard").textContent = "not a full circle";
    }
    ListY.length = 0;
    ListX.length = 0;
});


document.addEventListener("mousemove", function (event){
    if(isPainting) {
    draw(event.clientX, event.clientY)
    }
})


function draw(x, y) {
    if (svg  && test) {
        const svgRect = svg.getBoundingClientRect();
        const line = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        line.setAttribute('x1', x1 - svgRect.left);
        line.setAttribute('y1', y1 - svgRect.top);
        line.setAttribute('x2', x - svgRect.left);
        line.setAttribute('y2', y - svgRect.top);
        line.setAttribute('stroke', 'white');
        line.setAttribute('stroke-width', '10');
        svg.appendChild(line);
    }
    x1 = x;
    y1 = y;
    ListX.push(x);
    ListY.push(y);
} 


function firstPoint(x, y){
    let xx1 = x - centerX;
    let yy2 = y - centerY;
    let distances = Math.sqrt((xx1**2) + (yy2**2)).toFixed(2);
    if(svg && (distances > 80)){
        const svgRect = svg.getBoundingClientRect();
        const point = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        point.setAttribute('cx', x - svgRect.left);
        point.setAttribute('cy', y - svgRect.top);
        point.setAttribute('r', '5'); 
        point.setAttribute('fill', 'white');
        svg.appendChild(point);
        x1 = x;
        y1 = y;
        ListX.push(x);
        ListY.push(y);
        test = true;
    }
   else{
    console.log("zu nah");
    test = false;    
   }
}


function percentage(){
    let distance = [];
    for(let i = 0; i < ListX.length; i++){
        let xx = parseFloat(ListX[i]) - parseFloat(centerX);
        let yy = parseFloat(ListY[i]) - parseFloat(centerY);
        distance.push((Math.sqrt((xx**2) + (yy**2))).toFixed(2));
    }
    let firstNumber = distance.shift();
    let averagedeviation = AverageDeviation(firstNumber, distance);
    const scaleFactor = 5; 
    let value = 1 / averagedeviation; 
    let score = (value * scaleFactor) * 100; 

    return score;
}

function AverageDeviation(number, numbers) {
    let sum = 0;
    for(let i = 0; i < numbers.length; i++){
        sum += Math.abs(number - numbers[i]);
    }
    let averageDeviation = sum / numbers.length;

    return averageDeviation;
}

function fullCircle(){
    let count = [];
    let w = parseFloat(svgWidth)/2
    let h = parseFloat(svgHeight)/2
    let m = parseFloat(svgHeight)/parseFloat(svgWidth);
    for(let i = 0; i < ListX.length; i++){
        let y = (-m) * parseFloat(ListX[i]) + parseFloat(svgHeight);
        let xp = parseFloat(ListX[i]);
        let yp = parseFloat(ListY[i]);
        if(yp < m*xp){
            if(xp < w){
                if(!count.includes("yellow")){count.push("yellow")};
            }
            if (yp > h){
                if(!count.includes("middle green")){count.push("middle green")};
            }
        }
        if(yp < y){
            if(xp > w){
                if(!count.includes("light green")){count.push("light green")};
            }
            if(yp > h){
                if(!count.includes("red")){count.push("red")};
            }
        }
        if(yp > y){
            if(yp < h){
                if(!count.includes("orange")){count.push("orange")};
            }
            if(xp < w){
                if(!count.includes("rose")){count.push("rose")};
            }
        }
        if(yp > m*xp){
            if(xp > w){
                if(!count.includes("light blue")){count.push("light blue")};
            }
            if(yp < h){
                if(!count.includes("dark blue")){count.push("dark blue")};
            }
        }  
    }
    let xx = parseFloat(ListX[0]) - parseFloat(ListX[ListX.length-1]);
    let yy = parseFloat(ListY[0]) - parseFloat(ListY[ListY.length-1]);
    let distance = ((Math.sqrt((xx**2) + (yy**2))).toFixed(2));
    if (count.length == 8 && distance < 40){
        return true;
    }
    else{
        return false;
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
        start = true;
      });
    }
  });