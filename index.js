const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const cellEl = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageEl = document.getElementById('winning-message');
const winningMessageText = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById("restart-button");
let xTurn;
restartButton.addEventListener("click", startGame);



startGame();

function startGame() {
    xTurn = true;
    cellEl.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true })
    });
    setBoardHoverClass();
    winningMessageEl.classList.remove("show");
}


function handleClick(e) {
    // console.log("clicked");
    const cell = e.target;
    const currentClass = xTurn ? X_CLASS : CIRCLE_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        // console.log("winner");
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (xTurn) {
        board.classList.add(X_CLASS);
    } else {
        board.classList.add(CIRCLE_CLASS);
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellEl[index].classList.contains(currentClass);
        });
    });
}

function endGame(draw) {
    if (draw) {
        winningMessageText.textContent = "Draw";
    } else {
        winningMessageText.textContent = `${xTurn ? "X's" : "O's"} wins!`;
    }
    winningMessageEl.classList.add("show");
}

function isDraw() {
    return [...cellEl].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}


function swapTurns() {
    xTurn = !xTurn;
}


