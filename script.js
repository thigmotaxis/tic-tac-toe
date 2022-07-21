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

  return {gameBoard}
})();


// display object to create html elements
// display object:
// should generate html elements

const game = (() => {

  let turnCounter = 1
  const renderBoard = () => {
    const body = document.querySelector("body")
    const boardContainer = document.createElement("div")
    boardContainer.classList.add("boardContainer")
    body.appendChild(boardContainer)
    for(let i = 0; (i < 9); i++) {
      let childElement = document.createElement("div")
      childElement.textContent = board.gameBoard[i]
      childElement.classList.add("boardSquare")
      childElement.setAttribute("id", `square ${i}`)
      childElement.addEventListener("click", () => {
        if(childElement.textContent === "") {                   // prevents players from placing a symbol on an occupied board space
          if ((turnCounter % 2) === 1) {                        // adds player symbol to array then updates text content of dom element to reflect array
            playerOne.putSymbol(i)
            playerOne.updateBoardDisplay(childElement)
            turnCounter++
          }
          else {
            playerTwo.putSymbol(i)
            playerTwo.updateBoardDisplay(childElement)
            turnCounter++
          }
        }
      })
      boardContainer.appendChild(childElement)
    }
    return {body, boardContainer}
  }



  const newGame = () => {       // newGame SHOULD REMOVE BOARD DISPLAY, RESET turnCounter AND CALL renderBoard() TO REITERATE DISPLAY AND RESET LISTENERS
    if (firstGame.boardContainer) {
      firstGame.boardContainer.remove()
    }

  }

  const firstGame = renderBoard();
  const test = prompt("test")
  if (test === ".") newGame();

  // FACTORY FUNCTION CREATING PLAYERS - to do: add input elements allowing players to set player names, defaults "wingus" and "dingus"
  const playerFactory = (name, symbol) => {
    const putSymbol = (index) => {
      board.gameBoard[index] = symbol
    }
    const updateBoardDisplay = ((childElement) => {
      childElement.textContent = symbol
    })
    return {name, symbol, putSymbol, updateBoardDisplay}
  }

  const playerOne = playerFactory("one", "X")
  const playerTwo = playerFactory("two", "O")

// END PLAYER CONTROLS

  return {renderBoard, newGame}
})();
