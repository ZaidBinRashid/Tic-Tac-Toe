const EMPTY = '';
const PLAYER_X = 'X';
const PLAYER_O = 'O';

let currentPlayer = PLAYER_X;
let gameBoard = Array(9).fill(EMPTY);
const boardElement = document.getElementById('board');

// Initialize the game board
function initializeBoard() {
  boardElement.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    boardElement.appendChild(cell);
  }
  updateBoard();
}

// Update the visual representation of the board
function updateBoard() {
  gameBoard.forEach((value, index) => {
    const cell = boardElement.children[index];
    cell.textContent = value;
  });
}

// Handle cell click event
function handleCellClick(event) {
  const index = event.target.getAttribute('data-index');
  if (gameBoard[index] === EMPTY) {
    gameBoard[index] = currentPlayer;
    updateBoard();

    if (checkWinner()) {
      alert(`${currentPlayer} wins!`);
      resetGame();
    } else if (isBoardFull()) {
      alert('It\'s a draw!');
      resetGame();
    } else {
      currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
    }
  }
}

// Check for a winner
function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] !== EMPTY && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
      return true;
    }
  }

  return false;
}

// Check if the board is full
function isBoardFull() {
  return gameBoard.every(cell => cell !== EMPTY);
}

// Reset the game
function resetGame() {
  currentPlayer = PLAYER_X;
  gameBoard = Array(9).fill(EMPTY);
  updateBoard();
}

// Initialize the game on page load
initializeBoard();