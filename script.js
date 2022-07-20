// game object containing methods: newGame(player1, player2), putSymbol(coordinate[0...9])
// game object:
// should load a new game (loading in two players, each with X or O assigned and)
// should include a method for each player to place a symbol on the board

// const gameBoard = (() => {
//   const board = ["X", "O", "X", "O", "X", "O", "X", "O", "X"]
//   return {board}
// })();
// playerFactory, creating player1 and player2


// board object containing methods: putSymbol(boardDivId, coordinateInArray, symbolXorO), clear(boardDivId), render(boardDivId)
// board object:
// should contain an array with current symbols on the board
// a method to update that array
// a method to update the display

const board = (() =>{
  const gameBoard = ["", "", "", "", "", "", "", "", ""]

  // const

  return {gameBoard}
})();


// display object to create html elements
// display object:
// should generate html elements
// should add event listeners to each board element
const game = (() => {
  const domCache = (() => {
    const body = document.querySelector("body")
    const boardContainer = document.createElement("div")

    return {body, boardContainer}
  })();

  const renderBoard = () => {
    domCache.boardContainer.classList.add("boardContainer")
    domCache.body.appendChild(domCache.boardContainer)
    for(let i = 0; (i < 9); i++) {
      let childElement = document.createElement("div")
      childElement.textContent = board.gameBoard[i]
      childElement.classList.add("boardSquare")
      childElement.setAttribute("id", `square ${i}`)
      childElement.addEventListener("click", () => {
        putSymbol(i, childElement)
      })
      domCache.boardContainer.appendChild(childElement)
    }
  }

  function putSymbol(i, childElement) {
    board.gameBoard[i] = "X"
    childElement.textContent = `${board.gameBoard[i]}`
  }

  const clearBoard = () => {
    domCache.boardContainer.remove()
  }

  renderBoard();

  return {renderBoard, clearBoard}
})();

// const test = prompt("clear?")
// if (test === "") {
//   game.clearBoard()
// }
