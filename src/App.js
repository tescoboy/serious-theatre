import React, { useState } from "react";
import InputSection from "./components/InputSection";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [plays, setPlays] = useState([]);

  const handleAddPlay = (newPlay) => {
    setPlays([...plays, newPlay]);
  };

  const handleEditPlay = (updatedPlay) => {
    const updatedPlays = plays.map((play) =>
      play.id === updatedPlay.id ? updatedPlay : play
    );
    setPlays(updatedPlays);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Serious Theatre</h1>
      <InputSection onAddPlay={handleAddPlay} />
      <Dashboard plays={plays} onEditPlay={handleEditPlay} />
    </div>
  );
};

export default App;
