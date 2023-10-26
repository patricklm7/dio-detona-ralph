const state = {
    view:{ /*visuais*/
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time"),
        score: document.querySelector("#score")
    },

    values:{ /*valores*/
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        countDownTimerId: setInterval(countTime, 1000),

    },

};

function countTime (){ /*função regressão tempo*/
    state.values.currentTime --;
    state.view.timeLeft.textContent = state.values.currentTime;
    if (state.values.currentTime <= 0){
        clearInterval(state.values.countDownTimerId)
        clearInterval(state.values.timerId)
        alert("o seu tempo acabou, o seu resultado foi"+ state.values.result)
    }
};

function playAudio(){ /*função play audio*/
    let audio = new Audio("./src/audios/hit.m4a");
    audio.play();
}

function randomSquare(){ /*função div randomica*/
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });
    let randomNumber=Math.floor(Math.random()*9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
};

function moveEnemy(){ /*move elemente enemy*/
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
};

function addListenerHitBox(){ /*coloca um listener para uma ação*/
    state.view.squares.forEach((square)=> {
        square.addEventListener("mousedown", ()=> {
            if(square.id === state.values.hitPosition){
                state.values.result ++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playAudio;
            }
        });
    });
};

function init() {
    moveEnemy();
    addListenerHitBox();
}

init();