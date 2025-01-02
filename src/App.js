import React, { useState, useEffect } from "react";
import InputSection from "./components/InputSection";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [plays, setPlays] = useState(() => {
    const savedPlays = JSON.parse(localStorage.getItem("seriousTheatrePlays")) || [];
    return savedPlays;
  });

  const [rating, setRating] = useState(0);

  // Save plays to localStorage whenever plays state changes
  useEffect(() => {
    localStorage.setItem("seriousTheatrePlays", JSON.stringify(plays));
  }, [plays]);

  const addPlay = (newPlay) => {
    setPlays((prevPlays) => [...prevPlays, newPlay]);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Serious Theatre</h1>
      <h2>Track Your Plays</h2>
      <InputSection addPlay={addPlay} rating={rating} setRating={setRating} />
      <Dashboard plays={plays} />
    </div>
  );
};

export default App;
