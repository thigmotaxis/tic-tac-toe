// MAKE BOARD DISPLAY
const renderBoard = (() => {
  const body = document.querySelector("body")
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


// MAKE BOARD ARRAY
const board = ["", "", "", "", "", "", "", "", ""]

// MAKE PLAYER OBJECTS
// FACTORY FUNCTION TO CREATE PLAYERS - to do: add input elements allowing players to set player names, defaults "wingus" and "dingus"
const playerFactory = (name, symbol) => {
  return {name, symbol}
}

const playerOne = playerFactory("one", "X")
const playerTwo = playerFactory("two", "O")

// GAMEPLAY LOGIC

let turnCounter = 1

const putSymbol = (e) => (turnCounter % 2 === 1) ? board[e.target.dataset.index] = playerOne.symbol : board[e.target.dataset.index] = playerTwo.symbol
const updateBoard = (e) => (turnCounter % 2 === 1) ? e.target.textContent = playerOne.symbol : e.target.textContent = playerTwo.symbol

const handleClick = (e) => {
  updateBoard(e)
  putSymbol(e)
  checkGameOver()
  turnCounter++
}


// vv GOES IN BOARD OBJECT ALONG WITH REMOVE EVENT LISTENER FUNCTION, BUT CHECK GAME OVER SHOULD GO IN GAME OBJECT vv
const boardDivs = document.querySelectorAll(".boardSquare")
const addListeners = (() => {
  boardDivs.forEach((boardDiv, index) => {
    boardDiv.addEventListener("click", handleClick, {once: true})
  })
})
addListeners()


// RESET MUST COME AFTER PLAYER FACTORY, CONST BOARD DIVS AND CONST EVENTLISTENERS
function resetBoard() {
  for (element in board) {
    board[element] = ""
  }
  for (div in Array.from(boardDivs)) {
    boardDivs[div].textContent = ""
  }
  addListeners()
  turnCounter = 1
}
const resetButton = document.querySelector(".reset")
resetButton.addEventListener("click", resetBoard)

const test = document.querySelector(".test")
test.addEventListener("click", () => {
  boardDivs.forEach((boardDiv, index) => {
    boardDiv.removeEventListener("click", handleClick)
  })
})


function checkGameOver() {
// CHECKS FOR COLUMN WINS
  const columns = [0, 1, 2]
  for (let i = 0; i < 3; i++) {
    if (board[i] !== "" && board[i] === board[i + 3] && board[i] === board[i + 6]) {
      board[i] === "X" ? alert("Player 1 wins!") : alert("Player 2 wins!")
    }
  }
// CHECKS FOR ROW WINS
  const rows = [0, 3, 6]
  for (let i = 0; i < 9; i += 3) {
    if (board[i] !== "" && board[i] === board[i + 1] && board[i] === board[i + 2]) {
      board[i] === "X" ? alert("Player 1 wins!") : alert("Player 2 wins!")
    }
  }
// CHECKS FOR DIAGONAL WINS
  const p1Wins = (currentValue) => currentValue === "X"
  const p2Wins = (currentValue) => currentValue === "O"
  const downDiagonal = [board[0], board[4], board[8]]
    if (downDiagonal.every(p1Wins)) {
      alert("Player 1 wins!")
    }
    if (downDiagonal.every(p2Wins)) {
      alert("Player 2 wins!")
    }
  const upDiagonal = [board[2], board[4], board[6]]
  if (upDiagonal.every(p1Wins)) {
    alert("Player 1 wins!")
  }
  if (upDiagonal.every(p2Wins)) {
    alert("Player 2 wins!")
  }
}
// TO DO NEXT:

// function that removes event listeners and declare a winner if a win condition is met (checkGameOver should return a "winner" or "outcome" variable)
// add logic that checks for a tie (e.g. if turnCounter === 9, declareTie()?)
// clean up win condition logic so that it sucks less
// reorg code into modules/objects
