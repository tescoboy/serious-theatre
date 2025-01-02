import InputSection from './components/InputSection';
import Dashboard from './components/Dashboard';


import React, { useState } from "react";
import InputSection from "./InputSection";
import Dashboard from "./Dashboard";

const App = () => {
  const [plays, setPlays] = useState([]);

  const addPlay = (newPlay) => {
    setPlays((prevPlays) => [...prevPlays, newPlay]);
  };

  const editPlay = (editedPlay) => {
    setPlays((prevPlays) =>
      prevPlays.map((play) =>
        play.id === editedPlay.id ? editedPlay : play
      )
    );
  };

  const deletePlay = (id) => {
    setPlays((prevPlays) => prevPlays.filter((play) => play.id !== id));
  };

  return (
    <div>
      <h1>Serious Theatre</h1>
      <InputSection onAddPlay={addPlay} />
      <Dashboard
        plays={plays}
        onEditPlay={editPlay}
        onDeletePlay={deletePlay}
      />
    </div>
  );
};

export default App;
