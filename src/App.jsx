import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

// import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

//helper function

function deriveActivePlayer(gameTurns){
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer
}

// //helper constant 
// const WINNING_COMBINATIONS = [
//   [
//     {row:0,col:0},
//     {row:0,col:1},
//     {row:0,col:2},
//   ]
// ]

function App() {
  //const [activePlayer, setActivePlayer] = useState("X"); //this line is connected to the gameboard and player EJX files, this is lifting the state up which is a react concept
  const [gameTurns, setGameTurns] = useState([]); //this is to be used for the log EJX file, where we want to add turns to the array

  //instead of having an active player state which i commented out above, we can add derived state written below 
  const activePlayer = deriveActivePlayer(gameTurns)

  //initial game board
  let gameBoard = initialGameBoard;

  for (const turn of gameTurns) {
    //want to extract the info from the turn that just occured
    const { square, player } = turn; //these are two properrties from the app component
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner;

  //going through all the winning combinations whenever this app re-renders
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if(firstSquareSymbol && firstSquareSymbol == secondSquareSymbol && firstSquareSymbol == thirdSquareSymbol){
      winner = firstSquareSymbol
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectedSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
    //this is a state updating function below, that is updating the project on who has the latest turn and the symbol they are using
    setGameTurns((prevTurns) => {

      const currentPlayer = deriveActivePlayer(prevTurns)

      // let currentPlayer = "X";

      // //this is if the latest turn checker
      // if (prevTurns.length > 0 && prevTurns[0].player === "X") {
      //   currentPlayer = "O";
      // }
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: activePlayer }, //we are creating an object here, which has two properties
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner}/>}
        <GameBoard
          onSelectSquare={handleSelectedSquare}
          // activePlayerSymbol={activePlayer}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
