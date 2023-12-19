let boxes = document.querySelectorAll(".box");
let resetbutton = document.querySelector("#resetbutton");
let newgame = document.querySelector("#newbutton");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let winSound = document.getElementById("winSound");
let drawSound = document.getElementById("drawSound");
let clickSound = document.getElementById("clicksound");

let count = 0;
let turnO = true;

const winprob = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    [1, 4, 7],
];

const reset = () => {
    turnO = true;
    enableBoxes();
    msgcontainer.classList.add("hide");
};

const enableBoxes = () => {
    count = 0;
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};
function playClickSound() {
    if (clickSound && typeof clickSound.play === 'function') {
        clickSound.pause();
        clickSound.currentTime = 0;
        clickSound.play();
    }
    setTimeout(() => {
        clickSound.pause();
        clickSound.currentTime = 0;
    }, 2000);
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        count++;
        playClickSound();
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkwinner();

        if (count >= 9) {
            showWin("Draw");
        }
    });
});

const disabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const playSound = (sound) => {
    if (sound && typeof sound.play === "function") {
        sound.pause();
        sound.currentTime = 0;
        sound.play();
    }
};

const showWin = (winner) => {
    if (winner === "Draw") {
        msg.innerText = `Match is Draw!`;
        playSound(drawSound);
    } else {
        msg.innerText = `Congratulations! Winner is ${winner}`;
        playSound(winSound);
    }
    msgcontainer.classList.remove("hide");
    disabledBoxes();
};

const checkwinner = () => {
    for (let winprober of winprob) {
        let pv1 = boxes[winprober[0]].innerText;
        let pv2 = boxes[winprober[1]].innerText;
        let pv3 = boxes[winprober[2]].innerText;

        if (pv1 !== "" && pv2 !== "" && pv3 !== "") {
            if (pv1 === pv2 && pv1 === pv3) {
                showWin(pv1);
            }
        }
    }
};

newgame.addEventListener("click", reset);
resetbutton.addEventListener("click", reset);
