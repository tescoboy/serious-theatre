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
          backgroundColor: "#4A90E2", // Modern blue color
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        Edit
      </button>
      <button
        onClick={() => onDeletePlay(play.id)}
        style={{
          backgroundColor: "#E94E77", // Soft red color
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        Delete
      </button>
    </div>
  );

  const renderTile = (title, data) => (
    <div
      style={{
        backgroundColor: "#F4F4F9", // Soft light gray background
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px", // Space between tiles
      }}
    >
      <h3 style={{ fontSize: "20px", color: "#333", fontWeight: "600" }}>{title}</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {data.length > 0 ? (
          data.map((play) => (
            <li
              key={play.id}
              style={{
                marginBottom: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "16px",
                color: "#555",
              }}
            >
              <span>
                <strong>{play.name}</strong> ({play.date})
              </span>
              {renderPlayActions(play)}
            </li>
          ))
        ) : (
          <p style={{ color: "#777" }}>No plays available.</p>
        )}
      </ul>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column", // Stacking tiles vertically
        gap: "30px", // Add space between tiles
        padding: "40px",
        backgroundColor: "#FAFAFA", // Light background for the entire dashboard
        fontFamily: "'Roboto', sans-serif", // Modern font family
      }}
    >
      {/* Summary Tiles */}
      <div style={{ textAlign: "center" }}>
        <h3 style={{ fontSize: "22px", color: "#333", fontWeight: "600" }}>Total Plays Seen</h3>
        <p style={{ fontSize: "18px", color: "#4A4A4A" }}>{totalPlays}</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <h3 style={{ fontSize: "22px", color: "#333", fontWeight: "600" }}>Total This Year</h3>
        <p style={{ fontSize: "18px", color: "#4A4A4A" }}>{totalThisYear}</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <h3 style={{ fontSize: "22px", color: "#333", fontWeight: "600" }}>Total This Month</h3>
        <p style={{ fontSize: "18px", color: "#4A4A4A" }}>{totalThisMonth}</p>
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
              borderRadius: "12px",
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
              width: "400px",
            }}
          >
            <h3 style={{ fontSize: "22px", color: "#333", fontWeight: "600" }}>Edit Play</h3>
            <p style={{ fontSize: "16px", color: "#555" }}>
              <strong>{selectedPlay.name}</strong> ({selectedPlay.date})
            </p>
            {/* Editing logic (input fields) */}
            <button
              onClick={handleOverlayClose}
              style={{
                backgroundColor: "#E94E77", // Soft red color
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
