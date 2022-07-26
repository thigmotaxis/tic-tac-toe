const display = (() => {
// MAKE BOARD DISPLAY
  const body = document.querySelector("body")

// TO DO: ADD IIFE TO RENDER REST OF USER INTERFACE (INCLUDING INPUT FIELDS)
  // const renderPage = (() => {
  //   const inputContainer = document.createElement("div")
  //   body.appendChild(inputContainer)
  //   const playerOneInput =
  // })();

  const renderBoard = (() => {
    const boardContainer = document.createElement("div")
    boardContainer.classList.add("boardContainer")
    body.appendChild(boardContainer)
    for(let i = 0; (i < 9); i++) {
      let boardSquare = document.createElement("div")
      boardSquare.classList.add("boardSquare")
      boardSquare.setAttribute("data-index", i)
      boardContainer.appendChild(boardSquare)
    }
  })();
})();

// MAKE PLAYER OBJECTS
// FACTORY FUNCTION TO CREATE PLAYERS
const players = (() => {
  const playerFactory = (name, symbol) => {
    const score = 0
    return {name, symbol, score}
  }

  const one = playerFactory("", "X")
  const two = playerFactory("", "O")
  return {one, two}
})();

// START GAMEBOARD OBJECT
const gameBoard = (() => {

// MAKE BOARD ARRAY
  const board = ["", "", "", "", "", "", "", "", ""]

  const putSymbol = (e) => (game.turnCounter % 2 === 1) ? board[e.target.dataset.index] = players.one.symbol : board[e.target.dataset.index] = players.two.symbol
  const updateBoard = (e) => (game.turnCounter % 2 === 1) ? e.target.textContent = players.one.symbol : e.target.textContent = players.two.symbol

  const checkGameOver = () => {
    let winner = "none"
// CHECKS FOR COLUMN WINS
    const columns = [0, 1, 2]
    for (let i = 0; i < 3; i++) {
      if (board[i] !== "" && board[i] === board[i + 3] && board[i] === board[i + 6]) {
        board[i] === "X" ? winner = players.one.name : winner = players.two.name
      }
    }
// CHECKS FOR ROW WINS
    const rows = [0, 3, 6]
    for (let i = 0; i < 9; i += 3) {
      if (board[i] !== "" && board[i] === board[i + 1] && board[i] === board[i + 2]) {
        board[i] === "X" ? winner = players.one.name : winner = players.two.name
      }
    }
// CHECKS FOR DIAGONAL WINS
    const p1Wins = (currentValue) => currentValue === "X"
    const p2Wins = (currentValue) => currentValue === "O"
    const downDiagonal = [board[0], board[4], board[8]]
    if (downDiagonal.every(p1Wins)) {
      winner = players.one.name
    }
    if (downDiagonal.every(p2Wins)) {
      winner = players.two.name
    }
    const upDiagonal = [board[2], board[4], board[6]]
    if (upDiagonal.every(p1Wins)) {
      winner = players.one.name
    }
    if (upDiagonal.every(p2Wins)) {
      winner = players.two.name
    }
    if (winner !== "none" || game.turnCounter > 8) {
      return winner
    }
  }

  const handleClick = (e) => {
    updateBoard(e)
    putSymbol(e)
    const outcome = checkGameOver()
    game.turnCounter++
    if (outcome !== undefined) {
      removeListeners()
      if (outcome === "none") {
        alert("Oh, a tie. How boring...")
      }
      else alert(`${outcome} is the glorious winner`)
    }
  }
//
  const boardDivs = document.querySelectorAll(".boardSquare")
  const addListeners = (() => {
    boardDivs.forEach((boardDiv, index) => {
      boardDiv.addEventListener("click", handleClick, {once: true})
    })
  })

  const removeListeners = () => {
    boardDivs.forEach((boardDiv, index) => {
      boardDiv.removeEventListener("click", handleClick)
    })
  }
  return {board, boardDivs, addListeners}
})();

// END GAMEBOARD OBJECT

const game = (() => {

  let turnCounter = 1

  const newGame = () => {
    players.one.name = document.getElementById("playerOne").value
    players.two.name = document.getElementById("playerTwo").value
    if (players.one.name === "" || players.two.name === "") {
      alert("Please enter a name for each player")
      return
    }
    for (element in gameBoard.board) {
      gameBoard.board[element] = ""
    }
    for (div in Array.from(gameBoard.boardDivs)) {
      gameBoard.boardDivs[div].textContent = ""
    }
    gameBoard.addListeners()
    turnCounter = 1
  }

  const resetButton = document.querySelector(".reset")
  resetButton.addEventListener("click", newGame)

  return {turnCounter}
})();

// TO DO NEXT:
// clean up win condition logic so that it sucks less
// improve user interface so user can add player names
