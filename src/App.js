import React, { useState, useEffect } from "react";

const App = () => {
  // State for play inputs
  const [playName, setPlayName] = useState("");
  const [playDate, setPlayDate] = useState("");
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
    if (!playName || !playDate) {
      alert("Please enter both a name and a date for the play.");
      return;
    }

    const newPlay = { id: Date.now(), name: playName, date: playDate };
    setPlays((prevPlays) => [...prevPlays, newPlay]);
    setPlayName("");
    setPlayDate("");
  };

  // Render the app
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
            </tr>
          </thead>
          <tbody>
            {plays.map((play) => (
              <tr key={play.id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{play.name}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{play.date}</td>
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
