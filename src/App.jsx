import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";

function App() {
const[activePlayer, setActivePlayer]=useState('X');

function handleSelectedSquare(){
  setActivePlayer((curActivePlayter)=> curActivePlayter==='X'? 'O' : 'X')
}

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player1" symbol="X" isActive={activePlayer ==='X'}/>
          <Player initialName="Player2" symbol="O" isActive={activePlayer ==='O'}/>
        </ol>
          <GameBoard onSelectSquare={handleSelectedSquare} activePlayerSymbol={activePlayer}/>
      </div>
      Log
    </main>
  );
}

export default App;
