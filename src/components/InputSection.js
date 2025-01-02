import React, { useState } from "react";

const InputSection = ({ addPlay, rating, setRating }) => {
  const [playName, setPlayName] = useState("");
  const [playDate, setPlayDate] = useState("");

  const handleAddPlay = (e) => {
    e.preventDefault();
    if (!playName || !playDate || rating === 0) {
      alert("Please enter a name, date, and rating for the play.");
      return;
    }

    const newPlay = { id: Date.now(), name: playName, date: playDate, rating };
    addPlay(newPlay);
    setPlayName("");
    setPlayDate("");
    setRating(0);
  };

  const handleMoonClick = (position) => {
    if (rating === 6) return;

    const currentState = getMoonState(position);
    if (currentState === "empty") {
      setRating(position + 1);
    } else if (currentState === "full") {
      setRating(position + 0.5);
    } else if (currentState === "half") {
      setRating(position);
    }
  };

  const handleStandingOvationClick = () => {
    setRating(rating === 6 ? 0 : 6);
  };

  const getMoonState = (position) => {
    if (rating === 6) return "standing";
    const fullMoons = Math.floor(rating);
    const hasHalfMoon = rating % 1 !== 0;
    if (position < fullMoons) return "full";
    if (position === fullMoons && hasHalfMoon) return "half";
    return "empty";
  };

  const renderMoonInput = () => (
    <div style={{ display: "flex", gap: "10px", alignItems: "center", cursor: "pointer" }}>
      {[0, 1, 2, 3, 4].map((position) => {
        const state = getMoonState(position);
        return (
          <span
            key={position}
            onClick={() => handleMoonClick(position)}
            style={{
              fontSize: "30px",
              color: rating === 6 ? "#32CD32" : state === "empty" ? "#ccc" : "#f0c419",
            }}
          >
            {state === "full" || rating === 6 ? "🌕" : state === "half" ? "🌗" : "🌑"}
          </span>
        );
      })}
      <span
        onClick={handleStandingOvationClick}
        style={{
          fontSize: "30px",
          cursor: "pointer",
          color: rating === 6 ? "#32CD32" : "#ccc",
          fontWeight: rating === 6 ? "bold" : "normal",
        }}
      >
        🕺
      </span>
    </div>
  );

  return (
    <form onSubmit={handleAddPlay} style={{ marginBottom: "20px" }}>
      <div>
        <label>
          Play Name:
          <input
            type="text"
            value={playName}
            onChange={(e) => setPlayName(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px", width: "200px" }}
          />
        </label>
      </div>
      <div style={{ marginTop: "10px" }}>
        <label>
          Play Date:
          <input
            type="date"
            value={playDate}
            onChange={(e) => setPlayDate(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </label>
      </div>
      <div style={{ marginTop: "10px" }}>
        <label>Rating:</label>
        {renderMoonInput()}
      </div>
      <button
        type="submit"
        style={{
          marginTop: "10px",
          padding: "5px 15px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add Play
      </button>
    </form>
  );
};

export default InputSection;
