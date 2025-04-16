let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");

// Sound objects
let sounds = {
    red: new Audio("sounds/red.mp3"),
    yellow: new Audio("sounds/yellow.mp3"),
    green: new Audio("sounds/green.mp3"),
    purple: new Audio("sounds/purple.mp3"),
    wrong: new Audio("sounds/wrong.mp3")
};

document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        level = 0;
        gameSeq = [];
        h2.innerText = "Get Ready!";
        setTimeout(() => {
            levelUp();
        }, 1000);
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}

function playSound(color) {
    if (sounds[color]) {
        sounds[color].currentTime = 0;
        sounds[color].play();
    }
}

function levelUp() {
    userSeq = [];
    level++;
    animateLevelChange(level);

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    playSound(randColor);
    gameFlash(randBtn);
}

function animateLevelChange(level) {
    h2.innerText = `Level ${level}`;
    h2.classList.add("level-up");
    setTimeout(() => {
        h2.classList.remove("level-up");
    }, 300);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        playSound("wrong");
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        if (level > highScore) highScore = level;

        h2.innerHTML = `Game Over! Score: <b>${level}</b> | High Score: <b>${highScore}</b><br>Press any key to restart.`;
        reset();
    }
}

function btnPress() {
    let btn = this;
    let userColor = btn.getAttribute("id");

    userSeq.push(userColor);
    playSound(userColor);
    userFlash(btn);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
