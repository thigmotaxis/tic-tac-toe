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
  const outcome = checkGameOver()
  turnCounter++
  if (outcome !== undefined) {
    removeListeners()
    if (outcome === "none") {
      alert("Oh, a tie. How boring...")
    }
    else alert(`Player ${outcome} is the glorious winner`)
  }
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


const removeListeners = () => {
  boardDivs.forEach((boardDiv, index) => {
    boardDiv.removeEventListener("click", handleClick)
  })
}


function checkGameOver() {
  let winner = "none"
// CHECKS FOR COLUMN WINS
  const columns = [0, 1, 2]
  for (let i = 0; i < 3; i++) {
    if (board[i] !== "" && board[i] === board[i + 3] && board[i] === board[i + 6]) {
      board[i] === "X" ? winner = "one" : winner = "two"
    }
  }
// CHECKS FOR ROW WINS
  const rows = [0, 3, 6]
  for (let i = 0; i < 9; i += 3) {
    if (board[i] !== "" && board[i] === board[i + 1] && board[i] === board[i + 2]) {
      board[i] === "X" ? winner = "one" : winner = "two"
    }
  }
// CHECKS FOR DIAGONAL WINS
  const p1Wins = (currentValue) => currentValue === "X"
  const p2Wins = (currentValue) => currentValue === "O"
  const downDiagonal = [board[0], board[4], board[8]]
    if (downDiagonal.every(p1Wins)) {
      winner = "one"
    }
    if (downDiagonal.every(p2Wins)) {
      winner = "two"
    }
  const upDiagonal = [board[2], board[4], board[6]]
  if (upDiagonal.every(p1Wins)) {
    winner = "one"
  }
  if (upDiagonal.every(p2Wins)) {
    winner = "two"
  }
if (winner !== "none" || turnCounter > 8) {
  return winner
}

}
// TO DO NEXT:


// clean up win condition logic so that it sucks less
// reorg code into modules/objects
