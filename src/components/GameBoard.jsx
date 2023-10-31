//the change that we want TODO here is to lift up the game board information so that we can use it in the log ejx, refer to the app component
export default function GameBoard({
  onSelectSquare /*activePlayerSymbol*/,
  board,
}) {
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null} //disable clicking the same button if the button was clicked previously
                >
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
