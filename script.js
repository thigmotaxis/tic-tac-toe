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
  const renderHeader = (() => {
    const header = document.querySelector(".header")

    const title = document.createElement("div")
    title.classList.add("title")
    title.textContent = "Tic-Tac-Toe"
    header.appendChild(title)
  })();

// RENDER CONTENT
  const renderContent = (() => {
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

    const playerOne = document.createElement("div")
    playerOne.classList.add("playerOne")
    content.appendChild(playerOne)
    const playerTwo = document.createElement("div")
    playerTwo.classList.add("playerTwo")
    content.appendChild(playerTwo)

    const players = [playerOne, playerTwo]
    const placeholders = ["Wingus", "Dingus"]
    for (let i = 0; i < players.length; i++) {
      const label = document.createElement("label")
      label.setAttribute("for", `player${i+1}`)
      label.textContent = `Player ${i+1}: `
      players[i].appendChild(label)
      const input = document.createElement("input")
      input.setAttribute("id", `player${i+1}`)
      input.setAttribute("placeholder", placeholders[i])
      input.classList.add("nameInput")
      players[i].appendChild(input)
    }

    const resetButton = document.createElement("button")
    resetButton.classList.add("reset")
    resetButton.textContent = "New Game"
    content.appendChild(resetButton)
  })();

// RENDER FOOTER
  const renderFooter = (() => {
    const footer = document.querySelector(".footer")

    const gitStuff = document.createElement("div")
    gitStuff.classList.add("gitStuff")
    footer.appendChild(gitStuff)

    const gitLogo = document.createElement("img")
    gitLogo.setAttribute("src", "images/gitLogo.png")
    gitLogo.classList.add("footerImg")
    gitStuff.appendChild(gitLogo)
    const gitLink = document.createElement("a")
    gitLink.setAttribute("href", "https://github.com/thigmotaxis/tic-tac-toe")
    gitLink.textContent = "source"
    gitStuff.appendChild(gitLink)

    const copyright = document.createElement("div")
    copyright.classList.add("copyright")
    footer.appendChild(copyright)

    const symbol = document.createElement("img")
    symbol.setAttribute("src", "images/copyright.jpg")
    symbol.classList.add("footerImg")
    copyright.appendChild(symbol)

    const attribution = document.createElement("div")
    attribution.textContent = "Copyright Abe Industries 2022"
    copyright.appendChild(attribution)
  })();
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
    players.one.name = document.getElementById("player1").value
    players.two.name = document.getElementById("player2").value
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
