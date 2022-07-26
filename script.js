const display = (() => {
// MAKE BOARD DISPLAY
  const body = document.querySelector("body")

  const sections = ["header", "content", "footer"]
  for (let i = 0; i < sections.length; i++) {
    const section = document.createElement("div")
    section.classList.add(sections[i])
    body.appendChild(section)
  }

// RENDER HEADER

// RENDER CONTENT
  const content = document.querySelector(".content")
  const boardContainer = document.createElement("div")
  boardContainer.classList.add("boardContainer")
  content.appendChild(boardContainer)
  for(let i = 0; (i < 9); i++) {
    let boardSquare = document.createElement("div")
    boardSquare.classList.add("boardSquare")
    boardSquare.setAttribute("data-index", i)
    boardContainer.appendChild(boardSquare)
  }

  const pNameContainer = document.createElement("div")
  pNameContainer.classList.add("playerNameContainer")
  content.appendChild(pNameContainer)
  const inputs = ["One", "Two"]
  const placeholders = ["Wingus", "Dingus"]
  for (let i = 0; i < inputs.length; i++) {
    const label = document.createElement("label")
    label.setAttribute("for", `player${inputs[i]}`)
    label.textContent = `Player ${inputs[i]}: `
    pNameContainer.appendChild(label)
    const input = document.createElement("input")
    input.setAttribute("id", `player${inputs[i]}`)
    input.setAttribute("placeholder", placeholders[i])
    input.classList.add("playerName")
    pNameContainer.appendChild(input)
  }

  const resetButton = document.createElement("button")
  resetButton.classList.add("reset")
  resetButton.textContent = "New Game"
  content.appendChild(resetButton)

})();

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

  const updateBoard = (e, player) => e.target.textContent = player.symbol
  const putSymbol = (e, player) => board[e.target.dataset.index] = player.symbol

  const checkGameOver = (turn) => {
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
    if (winner !== "none" || turn > 8) {
      return winner
    }
  }

  const handleClick = (e) => {
    const [turn, player] = game.checkTurn()
    updateBoard(e, player)
    putSymbol(e, player)
    const outcome = checkGameOver(turn)
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

// START GAME OBJECT
const game = (() => {

  let turnCounter = 0

  const checkTurn = () => {
    let currentPlayer
    (turnCounter % 2 === 0) ? currentPlayer = players.one : currentPlayer = players.two
    turnCounter++
    return [turnCounter, currentPlayer]
  }

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
    turnCounter = 0
  }

  const resetButton = document.querySelector(".reset")
  resetButton.addEventListener("click", newGame)

  return {checkTurn}
})();
// END GAME OBJECT

// TO DO NEXT:
// clean up win condition logic so that it sucks less
