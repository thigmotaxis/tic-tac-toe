// MODEL - CONTAINS ALL INTERNAL REPRESENTATIONS
const gameBoard = (() => {
  const board = ["X", "O", "X", "O", "X", "O", "X", "O", "X"]
  return {board}
})();

// VIEW = UPDATES DISPLAY
const displayController = (() => {
  const body = document.querySelector("body")
  const boardContainer = document.createElement("div")
  boardContainer.classList.add("boardContainer")
  body.appendChild(boardContainer)
  const render = () => {
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
  return {render, clearBoard}
})();
displayController.render();
// const test = prompt("...")
// if(test === ".") {
//   displayController.clearBoard()
//   displayController.render()
// }

// CONTROLLER - ALLOWS USER TO MAKE CHANGES TO THE MODEL (e.g. event listeners to store user input)
