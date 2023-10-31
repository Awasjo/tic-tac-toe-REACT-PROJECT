import { useState } from "react";

export default function Player({ initialName, symbol,isActive, onChangeName }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  //if you want to update a state based on the previous state its best practice to pass a function rather than a !isEditing
  //if we did it the non best practice way, react will schedule it to change the state, with a function its change right away.
  function handleEditClick() {
    setIsEditing((editing) => !editing);
    // console.log(isEditing)
    if (isEditing){
        onChangeName(symbol, playerName)
    }
  }

  //the object event is describing the event that happened when the change even occurs
  function handleChange(event) {
    console.log(event);
    setPlayerName(event.target.value); //this is the input element, and holds a value property
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    // on change prop will trigger for every key stroke and will give back an event object for every key stroke that the user hit
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
  }

  return (
    <li className={isActive?'active' :undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
