    let number = 1;
    let result = 0;
    let delay = 1000;
    let enter_ = document.getElementById("myInput"); 
    let enter_status = 1;
    let answer_ready = false;
    let start_status = 1;
    let status_check = false;
    let answer = document.createElement("input")
    let check_for_new_round = false;
    let onStart_start_status = false;
    let i = 1;
    let j = 1;
    let game_condition = 1;



    function sleep(ms){
        return new Promise((resolve)=>setTimeout(resolve, ms))
    }

    function start(){
        if (onStart_start_status) {
            if (start_status == 1) {
                start_status = 0;
                document.getElementById("start").style.display ="none";
                setTimeout(loop, delay)
            }

        }

    }

    async function check(){
        if(answer.value == result){
            enter_status = 0;
            result = 0;
            document.getElementById("answer").remove()
            document.getElementById("start").style.display="block";
            document.getElementById("start").textContent="Correct";
            document.getElementById("start").style.display="flex";
            document.getElementById("start").style.alignItems="center";
            document.getElementById("start").style.justifyContent="center";
            document.getElementById("start").style.fontFamily="Lucida Sans Typewriter";
            await sleep(1000)
            document.getElementById("start").style.display="none"
            await sleep(200)
            check_for_new_round = true;
        } else{
        // RESTART
        game_condition = 0;
        restart();
        }
    }
        
    function Knopf_pressed(){
        location.reload()
    }


    async function enter(event){
        if (enter_status == 0 && event && event.keyCode == 13) {
                    check()
                }
            }
        

    function create_target() {
        let r_number = Math.floor(Math.random() * 9) + 1; //random Number from 1-9
        let target = document.createElement("div");
        target.id ="target"
        target.textContent = r_number
        result += r_number
        document.body.appendChild(target)
        
    }

    async function wrong(){
        console.log("execute wrong")
        document.getElementById("answer").remove()
        let wrong = document.createElement("div")
        wrong.id ="wrong"
        wrong.textContent = "False";
        document.body.appendChild(wrong)
        wrong.style.display="flex";
        await sleep(delay);
        wrong.style.display="none"
        await sleep(200)
    }

    async function restart(){
        await wrong();
        game_condition = 1
        number = 1;
        result = 0;
        delay = 1000;
        enter_ = document.getElementById("myInput"); 
        enter_status = 1;
        answer_ready = false;
        start_status = 1;
        status_check = false;
        answer = document.createElement("input")
        check_for_new_round = false;
        onStart_start_status = false;
        i = 1;
        console.log(i, j + " wrong")
        loop();
        
        
    }




async function round(j){
    if(game_condition == 1){
        answer = document.createElement("input")
        document.body.appendChild(answer)
        answer.id="answer"
        answer.type="number"
        answer.placeholder="result"
        document.getElementById("answer").style.display ="none";
        check_for_new_round = false;
        result = 0;
        for(let i = 1; i <= j; i++){  
            console.log("round" + j)
            await sleep(200)
            create_target();
            await sleep(1000)
            document.getElementById("target").remove();
        } 
        await sleep(200)
        await wait_for_answer()
        while (check_for_new_round == false){
            await sleep(10)
            }

    } else{
        return
    }
    
}
        





    async function loop(){ 
        const roundLabel = document.getElementById('roundText');
        if (game_condition == 1) {
            for(let i = 1; i < 10; i++){   
                console.log("loop" + i)
                roundLabel.innerHTML = "Round: "+ i;
                await round(i)
                }
            const outroContainer = document.getElementById('outro-container');
            outroContainer.style.display = 'block';
            sessionStorage.setItem('index7', '1');
            gameActive = false;
            } else{
                return
        }
    }


        
    async function wait_for_answer() {
        enter_status = 0;
        document.getElementById("answer").style.display="block";
        while (await enter()){
            await sleep(10) 
        }
    }

    function onSatrtClick() { 
        let introContainer = document.querySelector('.intro-container');
        if (introContainer) {
            introContainer.style.display = 'none';
            document.getElementById("startButton").style.display = "none";
            document.getElementById("Knopf").style.display ="block";
        }
        let gameContainer = document.querySelector('.game-container');
        if (gameContainer) {
            gameContainer.style.display = 'block';
        }
        onStart_start_status = true; 
        document.addEventListener("keydown", enter)
    }
    
    function onReady() {
        let startButton = document.getElementById('startButton');
        if (startButton) {
            startButton.addEventListener('click', onSatrtClick);
        }
    }
    


    document.addEventListener('DOMContentLoaded', onReady); 

    document.addEventListener('DOMContentLoaded', function() {
        const outroContainer = document.getElementById('outro-container');
        outroContainer.style.display = 'none';
    });
