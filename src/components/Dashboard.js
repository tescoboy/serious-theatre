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
            <p>
              <strong>{selectedPlay.name}</strong> ({selectedPlay.date})
            </p>
            {/* Add form inputs to edit the play */}
            <button onClick={() => onDeletePlay(selectedPlay.id)}>Delete</button>
            <button onClick={handleOverlayClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
