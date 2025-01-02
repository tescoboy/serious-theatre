import React, { useState } from "react";

const Dashboard = ({ plays, onEditPlay, onDeletePlay }) => {
  const [selectedPlay, setSelectedPlay] = useState(null); // For editing overlay

  // Filtered data
  const totalPlays = plays.length;
  const totalThisYear = plays.filter(
    (play) => new Date(play.date).getFullYear() === new Date().getFullYear()
  ).length;
  const totalThisMonth = plays.filter((play) => {
    const playDate = new Date(play.date);
    const now = new Date();
    return (
      playDate.getFullYear() === now.getFullYear() &&
      playDate.getMonth() === now.getMonth()
    );
  }).length;

  const upcomingPlays = plays.filter((play) => new Date(play.date) > new Date());
  const recentPlays = plays
    .filter((play) => new Date(play.date) <= new Date())
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  const hallOfFame = plays.filter((play) => play.rating === 5 || play.rating === 6);
  const unratedPlays = plays.filter((play) => play.rating === 0);

  // Edit overlay
  const handleEditClick = (play) => {
    setSelectedPlay(play);
  };

  const handleOverlayClose = () => {
    setSelectedPlay(null);
  };

  const renderPlayActions = (play) => (
    <div style={{ display: "flex", gap: "10px" }}>
      <button
        onClick={() => handleEditClick(play)}
        style={{
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          padding: "5px 10px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Edit
      </button>
      <button
        onClick={() => onDeletePlay(play.id)}
        style={{
          backgroundColor: "#DC3545",
          color: "white",
          border: "none",
          padding: "5px 10px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </div>
  );

  const renderTile = (title, data) => (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3>{title}</h3>
      <ul>
        {data.length > 0 ? (
          data.map((play) => (
            <li
              key={play.id}
              style={{
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>
                <strong>{play.name}</strong> ({play.date})
              </span>
              {renderPlayActions(play)}
            </li>
          ))
        ) : (
          <p>No plays available.</p>
        )}
      </ul>
    </div>
  );

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
      {/* Summary Tiles */}
      <div style={{ textAlign: "center" }}>
        <h3>Total Plays Seen</h3>
        <p>{totalPlays}</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <h3>Total This Year</h3>
        <p>{totalThisYear}</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <h3>Total This Month</h3>
        <p>{totalThisMonth}</p>
      </div>

      {/* Detailed Tiles */}
      {renderTile("Upcoming Plays", upcomingPlays)}
      {renderTile("Recent Plays", recentPlays)}
      {renderTile("Hall of Fame", hallOfFame)}
      {renderTile("Unrated Plays", unratedPlays)}

      {/* Edit Overlay */}
      {selectedPlay && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              width: "400px",
            }}
          >
            <h3>Edit Play</h3>
            <p>
              <strong>{selectedPlay.name}</strong> ({selectedPlay.date})
            </p>
            {/* Editing logic (input fields) */}
            <button onClick={handleOverlayClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
