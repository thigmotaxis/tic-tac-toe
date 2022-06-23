// MODEL - CONTAINS ALL INTERNAL REPRESENTATIONS
const gameBoard = (() => {
  const board = ["X", "O", "X", "O", "X", "O", "X", "O", "X"]
  return {board}
})();


const playerFactory = (name) => {
  const makePlay = 0;
  return name
}

const playerOne = playerFactory("playerOne")
const playerTwo = playerFactory("playerTwo")
console.log(playerOne, playerTwo)

// VIEW = UPDATES DISPLAY

const displayController = (() => {
// STORE ALL SELECTORS HERE
  const domCache = (() => {
    const body = document.querySelector("body")

    return {body}
  })();

// GENERATES HTML ELEMENTS

  const renderBoard = () => {
    const boardContainer = document.createElement("div")
    boardContainer.classList.add("boardContainer")
    domCache.body.appendChild(boardContainer)
    for(let i = 0; (i < 9); i++) {
      let childElement = document.createElement("div")
      childElement.textContent = gameBoard.board[i]
      childElement.classList.add("boardSquare")
      childElement.setAttribute("id", `square-${i}`)
      boardContainer.appendChild(childElement)
    }
  };
  const clearBoard = () => {
    while (boardContainer.firstChild) {
      boardContainer.removeChild(boardContainer.firstChild)
    }
  }
  return {renderBoard, clearBoard, domCache}
})();

// CONTROLLER - ALLOWS USER TO MAKE CHANGES TO THE MODEL (e.g. event listeners to store user input)

displayController.renderBoard();
const test = prompt("...")
if(test === ".") {
  displayController.clearBoard()
  gameBoard.board = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  displayController.renderBoard()
}
