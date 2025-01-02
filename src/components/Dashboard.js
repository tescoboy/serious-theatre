import React, { useState } from "react";

const Dashboard = ({ plays, onEditPlay, onDeletePlay }) => {
  const [selectedPlay, setSelectedPlay] = useState(null); // For editing overlay
  const [editedPlay, setEditedPlay] = useState(null); // Store updated play during editing

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
    setEditedPlay({ ...play }); // Create a copy for editing
  };

  const handleOverlayClose = () => {
    setSelectedPlay(null);
    setEditedPlay(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPlay((prevPlay) => ({
      ...prevPlay,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onEditPlay(editedPlay);
    setSelectedPlay(null); // Close overlay after saving
    setEditedPlay(null);
  };

  const renderPlayActions = (play) => (
    <div style={{ display: "flex", gap: "10px" }}>
      <button
        onClick={() => handleEditClick(play)}
        className="button edit"
      >
        Edit
      </button>
    </div>
  );

  const renderTile = (title, data) => (
    <div className="tile">
      <h3>{title}</h3>
      <ul>
        {data.length > 0 ? (
          data.map((play) => (
            <li key={play.id}>
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
    <div className="dashboard-container">
      {/* Summary Tiles */}
      <div className="tile">
        <h3>Total Plays Seen</h3>
        <p>{totalPlays}</p>
      </div>
      <div className="tile">
        <h3>Total This Year</h3>
        <p>{totalThisYear}</p>
      </div>
      <div className="tile">
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
        <div className="overlay">
          <div className="overlay-content">
            <h3>Edit Play</h3>

            <div style={{ marginBottom: "10px" }}>
              <label>
                Play Name:
                <input
                  type="text"
                  name="name"
                  value={editedPlay.name}
                  onChange={handleInputChange}
                  style={{ padding: "5px", width: "100%" }}
                />
              </label>
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label>
                Play Date:
                <input
                  type="date"
                  name="date"
                  value={editedPlay.date}
                  onChange={handleInputChange}
                  style={{ padding: "5px", width: "100%" }}
                />
              </label>
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label>
                Rating:
                <select
                  name="rating"
                  value={editedPlay.rating}
                  onChange={handleInputChange}
                  style={{ padding: "5px", width: "100%" }}
                >
                  <option value={0}>Unrated</option>
                  <option value={1}>🌑</option>
                  <option value={2}>🌗</option>
                  <option value={3}>🌕</option>
                  <option value={4}>🌕🌕</option>
                  <option value={5}>🌕🌕🌕</option>
                  <option value={6}>🕺</option>
                </select>
              </label>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button
                onClick={handleSave}
                className="button edit"
                style={{ backgroundColor: "#4CAF50", color: "white" }}
              >
                Save
              </button>
              <button
                onClick={handleOverlayClose}
                className="button delete"
                style={{ backgroundColor: "#DC3545", color: "white" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
