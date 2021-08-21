console.log("Tic Tac Toe")

const statusDisplay = document.querySelector('.gameStatus');
let gameActive = false;
let player1 = "";
let player2 = "";
let player1WinCounter = 0;
let player2WinCounter = 0;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningMessage = (playerName) => `${playerName} has won!`;
const drawMessage = () => `Game ended in a Draw!`;
const currentPlayerTurn = (playerName) => `It's ${playerName}'s turn`;


function handleCellClick(clickedCellEvent) {   
        const clickedCell = clickedCellEvent.target;
        //console.log("Clicked = "+JSON.stringify(clickedCell));
        //console.log("cell attribute = "+clickedCell.getAttribute('data-cell-index'));
        const clickedCellIndex = parseInt(
          clickedCell.getAttribute('data-cell-index')
        );

        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }
 
        handleCellPlayed(clickedCell, clickedCellIndex);
        resultVal();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
}

function findPlayerName() {

    let playerName = "";
    if (currentPlayer === 'X'){
        playerName = player1;
        //console.log("Player Name 1 now = "+playerName);
    } else {
        playerName = player2;
        //console.log("Player Name 2 now = "+playerName);
    }

    return playerName;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    let playerName = findPlayerName();
    statusDisplay.innerHTML = currentPlayerTurn(playerName);
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function resultVal() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        let playerName = findPlayerName();
        statusDisplay.innerHTML = winningMessage(playerName);
        incrementWinCounter();
        console.log("Player1 Win Counter = "+player1WinCounter);
        console.log("Player2 Win Counter = "+player2WinCounter);
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function incrementWinCounter(){
    if (currentPlayer === 'X'){
        player1WinCounter++;
    } else {
        player2WinCounter++;
    }
    updateScores();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    let playerName = findPlayerName();
    statusDisplay.innerHTML = currentPlayerTurn(playerName);
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
}


document.getElementById("play-btn").addEventListener('click', checkPlayerNames)

function checkPlayerNames() {
    player1 = document.getElementById("player1text").value;
    player2 = document.getElementById("player2text").value;
    console.log("Player1 name = "+player1); 
    console.log("Player2 name = "+player2); 

    if (player1 === "Enter Player 1 Name" || player1 === ""){
        alert("Please enter a Player 1 name");
    }
    else if ((player2 === "Enter Player 2 Name" || player2 === "")){
        alert("Please enter a Player 2 name");
    } else {
        alert("Game can start")
        player1 = document.getElementById("player1text").value;
        player2 = document.getElementById("player2text").value;
        console.log("player1 after play start = "+player1);
        console.log("player2 after play start = "+player2);
        let playerName = findPlayerName();
        statusDisplay.innerHTML = currentPlayerTurn(playerName);
        gameActive = true;
        updateScores();
        
    }
}

console.log("Is the main line before click event");
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.gameRestart').addEventListener('click', handleRestartGame);
const player1Count = document.querySelector('.player1Count');
const player2Count = document.querySelector('.player2Count');

function updateScores(){
    player1Count.innerHTML = `${player1}: ${player1WinCounter}`
    player2Count.innerHTML = `${player2}: ${player2WinCounter}`
}

