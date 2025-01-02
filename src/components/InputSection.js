import React, { useState } from "react";

const InputSection = ({ onAddPlay }) => {
  const [playName, setPlayName] = useState("");
  const [playDate, setPlayDate] = useState("");
  const [rating, setRating] = useState(0); // Default rating: 0 (no moons filled)
  const [standingOvation, setStandingOvation] = useState(false);

  const handleMoonClick = (index) => {
    if (standingOvation) setStandingOvation(false);
    setRating(index + 1); // Full moons
  };

  const handleHalfMoonClick = (index) => {
    if (standingOvation) setStandingOvation(false);
    setRating(index + 0.5); // Half moons
  };

  const handleManClick = () => {
    setStandingOvation(true);
    setRating(5); // Standing Ovation is 5 moons
  };

  const handleAddPlay = () => {
    if (!playName || !playDate) {
      alert("Please fill in all fields.");
      return;
    }
    const newPlay = {
      id: Date.now(),
      name: playName,
      date: playDate,
      rating: standingOvation ? "Standing Ovation" : rating,
    };
    onAddPlay(newPlay);
    setPlayName("");
    setPlayDate("");
    setRating(0);
    setStandingOvation(false);
  };

  return (
    <div>
      <h2>Add New Play</h2>
      <div>
        <label>Play Name:</label>
        <input
          type="text"
          value={playName}
          onChange={(e) => setPlayName(e.target.value)}
        />
      </div>
      <div>
        <label>Play Date:</label>
        <input
          type="date"
          value={playDate}
          onChange={(e) => setPlayDate(e.target.value)}
        />
      </div>
      <div>
        <label>Rating:</label>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              style={{
                fontSize: "24px",
                cursor: "pointer",
                color: rating >= index + 1 ? "yellow" : "grey",
              }}
              onClick={() => handleMoonClick(index)}
              onDoubleClick={() => handleHalfMoonClick(index)}
            >
              🌕
            </span>
          ))}
          <span
            style={{
              fontSize: "24px",
              cursor: "pointer",
              color: standingOvation ? "purple" : "grey",
            }}
            onClick={handleManClick}
          >
            🕺
          </span>
        </div>
      </div>
      <button onClick={handleAddPlay}>Add Play</button>
    </div>
  );
};

export default InputSection;
