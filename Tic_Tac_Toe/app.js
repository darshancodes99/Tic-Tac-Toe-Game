let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset-button");
let newGame = document.querySelector("#new-game");
let msg = document.querySelector("#win-msg");
let msgContainer = document.querySelector(".msg");

let turnO = true;
let count = 0;


const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

const resetGame = () => {
    turnO = true;
    anableBoxes();
    msgContainer.classList.add("hide");
    count = 0;
}


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        count++;
        checkWinner();
    })
})

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const anableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerHTML = "";
    }
}

const showWinner = (winner) => {
    msg.innerHTML = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const loseGame = () => {
    msg.innerHTML = `Try again no any winner`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for (pattern of winPattern) {

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return;
            }
        }
    }

    if (count === 9) {
        loseGame();
    }

}

newGame.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
