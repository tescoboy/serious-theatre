import React, { useState, useEffect } from "react";

const App = () => {
  // State for play inputs
  const [playName, setPlayName] = useState("");
  const [playDate, setPlayDate] = useState("");
  const [rating, setRating] = useState(0);
  const [plays, setPlays] = useState([]);

  // Load plays from localStorage on initial render
  useEffect(() => {
    const savedPlays = JSON.parse(localStorage.getItem("seriousTheatrePlays")) || [];
    setPlays(savedPlays);
  }, []);

  // Save plays to localStorage whenever plays state changes
  useEffect(() => {
    localStorage.setItem("seriousTheatrePlays", JSON.stringify(plays));
  }, [plays]);

  // Handle form submission
  const handleAddPlay = (e) => {
    e.preventDefault();
    if (!playName || !playDate || rating === 0) {
      alert("Please enter a name, date, and rating for the play.");
      return;
    }

    const newPlay = { id: Date.now(), name: playName, date: playDate, rating };
    setPlays((prevPlays) => [...prevPlays, newPlay]);
    setPlayName("");
    setPlayDate("");
    setRating(0);
  };

  // Render moons for the rating
  const renderMoons = (rating) => {
    const fullMoons = Math.floor(rating);
    const hasHalfMoon = rating % 1 !== 0;
    const moons = Array(fullMoons).fill("🌕");
    if (hasHalfMoon) moons.push("🌗");
    return moons.join(" ");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Serious Theatre</h1>
      <h2>Track Your Plays</h2>

      {/* Form to add a new play */}
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
          <label>
            Rating:
            <div style={{ marginLeft: "10px", display: "inline-block" }}>
              {[1, 2, 3, 4, 5].map((num) => (
                <span
                  key={num}
                  onClick={() => setRating(num)}
                  style={{
                    cursor: "pointer",
                    fontSize: "20px",
                    marginRight: "5px",
                    color: num <= rating ? "gold" : "gray",
                  }}
                >
                  🌕
                </span>
              ))}
              <span
                onClick={() => setRating(rating === 0.5 ? 0 : rating + 0.5)}
                style={{
                  cursor: "pointer",
                  fontSize: "20px",
                  marginRight: "5px",
                  color: rating % 1 !== 0 ? "gold" : "gray",
                }}
              >
                🌗
              </span>
            </div>
          </label>
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

      {/* Table to display saved plays */}
      {plays.length > 0 ? (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Rating</th>
            </tr>
          </thead>
          <tbody>
            {plays.map((play) => (
              <tr key={play.id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{play.name}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{play.date}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {renderMoons(play.rating)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No plays saved yet. Add a play to get started!</p>
      )}
    </div>
  );
};

export default App;
