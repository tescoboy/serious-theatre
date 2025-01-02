import React, { useState } from "react";
import "../index.css"; // Import the CSS file

const Dashboard = ({ plays, onEditPlay, onDeletePlay }) => {
  const [selectedPlay, setSelectedPlay] = useState(null); // For editing overlay
  const [editedPlay, setEditedPlay] = useState(null); // To track changes to the play being edited

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

  // Handle Edit Click
  const handleEditClick = (play) => {
    setSelectedPlay(play);
    setEditedPlay({ ...play }); // Set the play to be edited
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPlay((prevPlay) => ({
      ...prevPlay,
      [name]: value, // Update the field dynamically
    }));
  };

  // Handle Overlay Close
  const handleOverlayClose = () => {
    setSelectedPlay(null);
    setEditedPlay(null); // Reset the edited play
  };

  // Save Edits
  const handleSaveEdit = () => {
    if (editedPlay) {
      onEditPlay(editedPlay); // Pass the updated play to parent
      setSelectedPlay(null); // Close the edit overlay
      setEditedPlay(null); // Reset the edited play
    }
  };

  // Delete Play
  const handleDeletePlay = () => {
    if (editedPlay) {
      onDeletePlay(editedPlay.id); // Delete play by its ID
      setSelectedPlay(null); // Close the edit overlay after deletion
      setEditedPlay(null); // Reset the edited play
    }
  };

  const renderPlayActions = (play) => (
    <div className="button-container">
      <button onClick={() => handleEditClick(play)} className="button button--edit">
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
    <div className="dashboard">
      {/* Summary Tiles */}
      <div className="dashboard__summary">
        <h3>Total Plays Seen</h3>
        <p>{totalPlays}</p>
      </div>
      <div className="dashboard__summary">
        <h3>Total This Year</h3>
        <p>{totalThisYear}</p>
      </div>
      <div className="dashboard__summary">
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
          <div className="overlay__content">
            <h3>Edit Play</h3>
            <div>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={editedPlay.name}
                  onChange={handleInputChange}
                  className="input"
                />
              </label>
            </div>
            <div>
              <label>
                Date:
                <input
                  type="date"
                  name="date"
                  value={editedPlay.date}
                  onChange={handleInputChange}
                  className="input"
                />
              </label>
            </div>
            <div>
              <label>
                Rating:
                <input
                  type="number"
                  name="rating"
                  value={editedPlay.rating}
                  onChange={handleInputChange}
                  className="input ranking-input"
                  min="0"
                  max="6"
                />
              </label>
            </div>
            <div className="button-group">
              <button onClick={handleSaveEdit} className="button button--save">
                Save Changes
              </button>
              <button onClick={handleDeletePlay} className="button button--delete">
                Delete Play
              </button>
            </div>
            <button onClick={handleOverlayClose} className="button button--close">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
