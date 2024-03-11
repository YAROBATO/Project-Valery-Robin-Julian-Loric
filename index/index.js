const body = document.body;
let index2 = 0;
let index3 = 0;
let index4 = 0;
let index5 = 0;
let index6 = 0;
let index7 = 0;
let index8 = 0;
function check(page){
    if (event && !event.currentTarget.classList.contains('locked')) {
        location.href = page;
        
    }
}
function cheat(){
    for(let i = 2; i < 9; i++){
        sessionStorage.setItem('index' + i, '1');
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
async function win(){
    let index8 = parseInt(sessionStorage.getItem('index9')) || 0;
    if(index8 === 1){
        const confetti = document.createElement("img");
        confetti.src = "img0/confetti.gif";
        confetti.id = "confetti";
        body.appendChild(confetti);
        await delay(10000);
        confetti.remove();
        sessionStorage.setItem('index9', '0');
    }
}
document.addEventListener('DOMContentLoaded', function() {
    index2 = parseInt(sessionStorage.getItem('index2')) || 0;
    index3 = parseInt(sessionStorage.getItem('index3')) || 0;
    index4 = parseInt(sessionStorage.getItem('index4')) || 0;
    index5 = parseInt(sessionStorage.getItem('index5')) || 0;
    index6 = parseInt(sessionStorage.getItem('index6')) || 0;
    index7 = parseInt(sessionStorage.getItem('index7')) || 0;
    index8 = parseInt(sessionStorage.getItem('index8')) || 0;
    let indexes = [index2, index3, index4, index5, index6, index7, index8]
    for (let i = 2; i <= 8; i++) {
        if (indexes[i-2] === 1 ) {
            let button = document.getElementById('button' + i);
            if (button) {
                button.classList.remove('locked');
            }
        }
    }
});

if (parseInt(sessionStorage.getItem('intTest'))!= true){
    const intro = document.createElement("video");
    intro.autoplay = true;
    intro.id = "intro";
    intro.muted = true;
    let source = document.createElement("source");
    source.src = "img0/intro.mp4";
    source.type = "video/mp4";
    intro.appendChild(source);
    document.body.appendChild(intro);
    intro.addEventListener("ended", function() {
        document.body.removeChild(intro);
        sessionStorage.setItem('intTest', '1');
    });
    }
win();
    