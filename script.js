const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "X";
let gameActive = true;
let gameState = Array(9).fill("");

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Pemenang: ${currentPlayer}`;
    gameActive = false;
  } else if (!gameState.includes("")) {
    statusText.textContent = "Hasil: Seri!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Giliran: ${currentPlayer}`;
  }
}

function checkWinner() {
  return winningCombos.some(combo => {
    return combo.every(i => gameState[i] === currentPlayer);
  });
}

function resetGame() {
  gameState.fill("");
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = "Giliran: X";
  document.querySelectorAll(".cell").forEach(cell => (cell.textContent = ""));
}

function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }
}

resetBtn.addEventListener("click", resetGame);
createBoard();
