let reactionTime;
let secondTime;
let space_counter = 0;
let test = true;
let r_counter = 0; //"r" counter
let C_Counter = 0; // How many times the "Click" page has shown
let f_counter = 0;
let n_list = 0;
let list_values = [];
let space_status = true; //too fast_status...




// FUNCTIONS




function Loop() {
    r_counter = 0; //redefine var for next rounds.
    C_Counter = 0; // same
    let randomDelay = Math.floor(Math.random() * 4000) + 1000; // Delay def.


    if (test){
        test = false; //Should run Loop() only once. 
    if (space_counter > 1) {
        toofast(); //if clicked too fast, too fast gets "printed".
        return;
        }
    else{
        Wait();
        } 

    setTimeout(() => { // Delay action
        if (space_counter > 1) {
            toofast();
            return;
        }
        Click();
        space_counter = 0;
        C_Counter ++;

        
        }, randomDelay); // Delay closed
            return;
        

        }

let stop = Stop()

if (space_counter >= 1 && stop <= randomDelay ){ //if you clicked once, and your reactiontime record was after the delay ended:
    Stop() //show result
    
}
else{
    toofast()
}
    
}
    

function reset(event){
    if(r_counter == 0){
        if(event.keyCode == 82){
            space_counter = 0; //set variables back on starting value.
            C_Counter = 0;
            f_counter = 0;
            space_status = true;
            test = true;
            document.getElementById("targetElement").style.backgroundColor = "rgba(45,45,45,255)";
            document.getElementById("targetElement").textContent = "start" 
            
        }
    }
}


    

function Wait(){
    document.getElementById("targetElement").style.backgroundColor = "rgba(207,39,54,255)";
    document.getElementById("targetElement").textContent = "Wait..."    
}


function Click(){
    if (C_Counter == 0){
    space_status = false;
    document.getElementById("targetElement").style.backgroundColor = "rgba(75,218,107,255)";
    document.getElementById("targetElement").textContent = "Click!";
    reactionTime = new Date().getTime();
    
    }
}



function Stop(){
    if (f_counter == 0){
        f_counter++;
        secondTime = new Date().getTime();
        if ((secondTime - reactionTime) >= 0 && space_status == false){ //if not NaN & too fast cant be shown: 
            n_list++;
            document.getElementById("targetElement").style.backgroundColor ="rgba(45,45,45,255)"
            document.getElementById("targetElement").textContent = (secondTime - reactionTime) + "ms";
            document.getElementById("List").innerHTML += (n_list) + ". " + (secondTime - reactionTime) + "ms <br>";
            list_values.push(secondTime - reactionTime);
            C_Counter = 1;
            
            list_values.sort(function(a, b){
                return a - b; 
            });
            
            

            
            return(secondTime - reactionTime);


        } else{
            return; 
        }
        
    

    }   else if ((secondTime - reactionTime) < 231){ //if you get under ... Reactiontime, then you solved the level
        CZ();
        r_counter = 1; //not able to reset anymore
        return;
        
        }
        
    } 
    



function Onclick(){
    space_counter += 1
    
    }

function toofast(){
    if (space_status == true){
        document.getElementById("targetElement").style.backgroundColor = "rgba(45,45,45,255)";
        document.getElementById("targetElement").textContent = "too fast!"
    } else{
        return;
    }
    
    
    }

function space(event){
    if(r_counter == 0){
        if(event.keyCode == 32){
            Onclick()
            Loop()
        }
    }
}



function CZ(){
    C_Counter = 1;
    document.getElementById("targetElement").style.backgroundColor = "rgba(75,218,107,255)";
    document.getElementById("targetElement").textContent = "Solved!" ;
    document.getElementById("Best").textContent = "Best Score: " + list_values[0] + "ms"
    document.getElementById("r_to_reset").textContent = "" //make text disappear
    sessionStorage.setItem('index6', '1');
}

function Knopf_pressed(){
    location.reload()
}

function onSatrtClick() { 
    let introContainer = document.querySelector('.intro-container');
    if (introContainer) {
        introContainer.style.display = 'none';
        document.getElementById("Score").style.display = "flex"
        document.getElementById("Resetall").style.display = "flex"
        document.getElementById("Knopf").style.display = "flex"
    }
    let gameContainer = document.querySelector('.game-container');
    if (gameContainer) {
        gameContainer.style.display = 'block';
    }
    document.addEventListener("keydown", reset)
    document.addEventListener("keydown", space)
}

function onReady() {
    let startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.addEventListener('click', onSatrtClick);
    }
}

document.addEventListener('DOMContentLoaded', onReady); 
