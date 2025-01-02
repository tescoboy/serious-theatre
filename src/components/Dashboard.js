import React, { useState } from "react";

const Dashboard = ({ plays, onEditPlay }) => {
  const [selectedPlay, setSelectedPlay] = useState(null); // For editing overlay

  const renderRating = (rating) => {
    if (rating === "Standing Ovation") {
      return <span style={{ fontSize: "24px", color: "purple" }}>🕺</span>;
    }
    const fullMoons = Math.floor(rating);
    const isHalfMoon = rating % 1 !== 0;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            style={{
              fontSize: "24px",
              color: index < fullMoons ? "yellow" : "grey",
            }}
          >
            {index === fullMoons && isHalfMoon ? "🌗" : "🌕"}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2>Your Plays</h2>
      <table>
        <thead>
          <tr>
            <th>Play Name</th>
            <th>Date</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {plays.map((play) => (
            <tr key={play.id}>
              <td>{play.name}</td>
              <td>{play.date}</td>
              <td>{renderRating(play.rating)}</td>
              <td>
                <button onClick={() => setSelectedPlay(play)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedPlay && (
        <div>
          <h3>Edit Play</h3>
          <input
            type="text"
            value={selectedPlay.name}
            onChange={(e) =>
              setSelectedPlay({ ...selectedPlay, name: e.target.value })
            }
          />
          <input
            type="date"
            value={selectedPlay.date}
            onChange={(e) =>
              setSelectedPlay({ ...selectedPlay, date: e.target.value })
            }
          />
          <button
            onClick={() => {
              onEditPlay(selectedPlay);
              setSelectedPlay(null);
            }}
          >
            Save
          </button>
          <button onClick={() => setSelectedPlay(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
