// MAKE BOARD DISPLAY
const renderBoard = (() => {
  const body = document.querySelector("body")
  const boardContainer = document.createElement("div")
  boardContainer.classList.add("boardContainer")
  body.appendChild(boardContainer)
  for(let i = 0; (i < 9); i++) {
    let boardSquare = document.createElement("div")
    boardSquare.classList.add("boardSquare")
    boardContainer.appendChild(boardSquare)
  }
})();


// MAKE BOARD ARRAY
const board = ["", "", "", "", "", "", "", "", ""]
// const board = ["X", "X", "X", "X", "O", 5, "X", "O", 8]
// TEST BOARD ^^

// MAKE PLAYER OBJECTS
// FACTORY FUNCTION TO CREATE PLAYERS - to do: add input elements allowing players to set player names, defaults "wingus" and "dingus"
const playerFactory = (name, symbol) => {
  return {name, symbol}
}

const playerOne = playerFactory("one", "X")
const playerTwo = playerFactory("two", "O")

// GAMEPLAY LOGIC

let turnCounter = 1

const putSymbol = (index) => {

  if (turnCounter % 2 === 1) {
    board[index] = playerOne.symbol
  }
  else {
    board[index] = playerTwo.symbol
  }
}

const boardDivs = document.querySelectorAll(".boardSquare")
const createEventListeners = (() => {
  boardDivs.forEach((boardDiv, index) => {
    boardDiv.addEventListener("click", () => {
      if (board[index] === "") {
        putSymbol(index)
        updateBoard(index)
        turnCounter++
      }
    })
  })
})();

const updateBoard = (index) => {
  if (turnCounter % 2 === 1) {
    boardDivs[index].textContent = playerOne.symbol
  }
  else {
    boardDivs[index].textContent = playerTwo.symbol
  }
  if (boardDivs[index].textContent !== "") {
    checkGameOver()
  }
}

// RESET MUST COME AFTER PLAYER FACTORY, CONST BOARD DIVS AND CONST EVENTLISTENERS
function resetBoard() {
  for (element in board) {
    board[element] = ""
  }
  for (div in Array.from(boardDivs)) {
    boardDivs[div].textContent = ""
  }
  turnCounter = 1
}
const resetButton = document.querySelector(".test")
resetButton.addEventListener("click", () => {
  resetBoard()
  }
)
function checkGameOver() {
// CHECKS FOR COLUMN WINS
  const columns = [0, 1, 2]
  for (let i = 0; i < 3; i++) {
    if (board[i] !== "" && board[i] === board[i + 3] && board[i] === board[i + 6]) {
      console.log("game over")
    }
  }
// CHECKS FOR ROW WINS
  const rows = [0, 3, 6]
  for (let i = 0; i < 9; i += 3) {
    if (board[i] !== "" && board[i] === board[i + 1] && board[i] === board[i + 2]) {
      console.log("game over")
    }
  }
// CHECKS FOR DIAGONAL WINS
  const p1Wins = (currentValue) => currentValue === "X"
  const p2Wins = (currentValue) => currentValue === "O"
  const downDiagonal = [board[0], board[4], board[8]]
    if (downDiagonal.every(p1Wins)) {
      console.log("p1 wins")
    }
    if (downDiagonal.every(p2Wins)) {
      console.log("p2 wins")
    }
  const upDiagonal = [board[2], board[4], board[6]]
  if (upDiagonal.every(p1Wins)) {
    console.log("p1 wins")
  }
  if (upDiagonal.every(p2Wins)) {
    console.log("p2 wins")
  }
}
