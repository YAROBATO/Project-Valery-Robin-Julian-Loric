t = 30;
s = 0;
m = 0;
check = 0;
let aimTrain = false;

async function aimtrainStart()
{
    check +=1
    if (check == 1){
    let levelInfoElement = document.querySelector('.LevelInfo')
    if(levelInfoElement){
        levelInfoElement.remove();
    }

    targetTile();
    aimTrain = true;
        let restart = document.createElement('button');
        restart.setAttribute('class', 'restart');
        restart.setAttribute('onclick', 'restart()');
        restart.innerHTML = "Restart";
        document.body.appendChild(restart);

    function updateTimer() {
            if(aimTrain){
                t--;
                document.getElementById('clock').innerHTML = 'Time: ' + t;
            }
            

    if (t <= 0 | aimTrain==false) {
         clearInterval(timerInterval);
            if(t <= 0) {
                endScreen();
            }
            aimTrain = false;
            }
        }
    }
    const timerInterval = setInterval(updateTimer, 1000);
}

function hit(){
    if(aimTrain == true) {
        s+=1 
        document.getElementById('score').innerHTML = 'Hits: ' + s;
        targetTile();
        let tileElement = document.querySelector(".tile");
        if (tileElement) {
            tileElement.remove();
        }
    }
}

function miss() {
    if(aimTrain == true) {
        m+=1 
        document.getElementById('score').innerHTML = 'Hits: ' + s;
    }
}

function targetTile() {
    let tile = document.createElement('div');
    let tileY = getRandomNumber(20, 70);
    let tileX = getRandomNumber(20.8, 76);
    let tilex = tileX + "%"
    let tiley = tileY + "%"
    tile.style.width = '3.2%';
    tile.style.height = '6%';
    tile.style.left = tilex;
    tile.style.top = tiley;
    tile.setAttribute('class', 'tile'); 
    tile.setAttribute('onclick', 'hit()'); 
    document.body.appendChild(tile);
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function endScreen(){
    if(s != 0){
        q = s/(s+m) *100 
        qu = q.toFixed(0)
    } else {
        qu = 0
    }

    let tileElement = document.querySelector('.tile'); 
    if(tileElement) {
        tileElement.remove();  
    }


    let div = document.createElement("div");
    div.innerHTML = "Hits: " + s + " Misses: " + m + " Accuracy: " + qu + "%";
    div.setAttribute('class', 'endScreen');
    document.body.appendChild(div);

    if(s>=40 && qu >= 90){
        pass = "Congratulations, you've completed level 2!!!  Press the logo to return to the menu"
        sessionStorage.setItem('index3', '1');
    }else{
        pass = "Unfortunately, that's not enough!"
    }

    let LevelInfo = document.createElement("div");
    LevelInfo.innerHTML = pass;
    LevelInfo.setAttribute('class', 'LevelInfo');
    document.body.appendChild(LevelInfo);
    endScreenCheck = true;
}

function restart(){
        let endScreenElement = document.querySelector('.endScreen'); 
        let levelInfoElement = document.querySelector('.LevelInfo')
        let tileElement = document.querySelector('.tile'); 

        if (endScreenElement) {
            endScreenElement.remove(); 
        }
        if(levelInfoElement){
            levelInfoElement.remove();
        }
        if(tileElement) {
            tileElement.remove();  
        }

        aimTrain = false;
        t = 30;
        s = 0;
        m = 0;
        check = 0;
        
        document.getElementById('clock').innerHTML = 'Time: ' + t;
        document.getElementById('score').innerHTML = 'Hits: ' + s;

        let start = document.createElement('button');
        start.setAttribute('class', 'button2');
        start.setAttribute('onclick', 'aimtrainStart()');
        start.innerHTML = "Start";
        document.body.appendChild(start);

        let LevelInfo = document.createElement("div");
        LevelInfo.innerHTML = "Try to reach 40 hits with a hit accuracy of over 90%.";
        LevelInfo.setAttribute('class', 'LevelInfo');
        document.body.appendChild(LevelInfo);

}