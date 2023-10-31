import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";

//helper function

function deriveActivePlayer(gameTurns){
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer
}


function App() {
  //const [activePlayer, setActivePlayer] = useState("X"); //this line is connected to the gameboard and player EJX files, this is lifting the state up which is a react concept
  const [gameTurns, setGameTurns] = useState([]); //this is to be used for the log EJX file, where we want to add turns to the array

  //instead of having an active player state which i commented out above, we can add derived state written below 
  const activePlayer = deriveActivePlayer(gameTurns)

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
        <GameBoard
          onSelectSquare={handleSelectedSquare}
          // activePlayerSymbol={activePlayer}
          turns={gameTurns}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
