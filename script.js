const displayController = (() => {
  const renderMessage = (message) => {
    document.getElementById('message').innerHTML = message;
  }
  return{
    renderMessage,
  }
})();

const Gameboard = (() => {
  let gameBoard = ['', '', '', '', '', '', '', '', '']

  const render = () => {
    let boardHTML  = '';
    gameBoard.forEach((square, index) => {
      boardHTML += `<div class='square' id='square-${index}'> ${square}</div>`
    })
    document.getElementById('gameboard').innerHTML = boardHTML;
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
      square.addEventListener('click', Game.handleClick);
    })
  }

  const update = (index, value) => {
    gameBoard[index] = value;
    render();
  };

  const getGameBoard = () => gameBoard;
 
  return {
    render,
    update,
    getGameBoard
  }
})();

const  createPlayer = (name, mark) => {
  return {
    name,
    mark
  }
}

const Game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;

  const start = () => {
    players = [
      createPlayer(document.getElementById('player1').value, 'X'),
      createPlayer(document.getElementById('player2').value, 'O'),
    ]
    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.render();
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
      square.addEventListener('click', handleClick);
    })
  }

  const handleClick = (event) => {
    if(gameOver) {
      return;
    }

   let index = parseInt(event.target.id.split('-')[1]);
   if(Gameboard.getGameBoard()[index] !== '')
    return;

   Gameboard.update(index, players[currentPlayerIndex].mark);

    if(checkForWin(Gameboard.getGameBoard(), players[currentPlayerIndex].mark)) {
      gameOver = true;
      displayController.renderMessage(`${players[currentPlayerIndex].name} wins`)
    } else if ( checkForTie(Gameboard.getGameBoard())) {
      gameOver = true;
      displayController.renderMessage(`It's Tie`);
    }

   currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  }

  const restart = () => {
    for(let i = 0; i < 9; i++) {
      Gameboard.update(i,'');
    }
    Gameboard.render();
    gameOver = false;
    document.getElementById('message').innerHTML = '';
  }

  return{
    start,
    restart,
    handleClick
  }
})();

function checkForWin(board) {
  const winnerCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0 ,4, 8],
    [2, 4, 6]
  ]
  for(let i = 0; i < winnerCombinations.length; i++) {
    const [a, b, c] = winnerCombinations[i];
    if(board[a] && board[a] === board[b] && board[a] === board[c ]) {
      return true;
    }
  }
  return false;
}

function checkForTie(board) {
  return board.every(cell => cell !== '')
}

const restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', () => {
  Game.restart();
})

const startButton = document.getElementById('start-button');
startButton.addEventListener('click', () => {
  Game.start();
})