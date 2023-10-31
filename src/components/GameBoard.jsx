// import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

//the change that we want TODO here is to lift up the game board information so that we can use it in the log ejx, refer to the app component

export default function GameBoard({
  onSelectSquare /*activePlayerSymbol*/,
  turns,
}) {
  //initial game board
  let gameBoard = initialGameBoard;

  for (const turn of turns) {
    //want to extract the info from the turn that just occured
    const { square, player } = turn; //these are two properrties from the app component
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  //   const [gameBoard, setGameBoard] = useState(initialGameBoard)

  // function handleSelectSquare(rowIndex, colIndex){
  //     setGameBoard((prevGameBoard)=>{
  //         //updating the state in an immutable way which is recommended by react
  //         const updatedBoard =[...prevGameBoard.map(innerArray=>[...innerArray])];
  //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  //         return updatedBoard
  //     })

  //    onSelectSquare();
  // }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
