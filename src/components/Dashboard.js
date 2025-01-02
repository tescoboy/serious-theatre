// Dashboard.js
import React, { useState } from 'react';

const Dashboard = ({ plays, onUpdatePlay }) => {
  const [editingPlay, setEditingPlay] = useState(null);

  const handleMoonClick = (index, play) => {
    const clickedRating = index + 1;
    const newRating =
      play.rating === clickedRating ? clickedRating - 0.5 : clickedRating;

    onUpdatePlay({ ...play, rating: newRating, standingOvation: false });
  };

  const handleStandingOvation = (play) => {
    onUpdatePlay({ ...play, rating: 5, standingOvation: true });
  };

  return (
    <div>
      <h2>Plays Dashboard</h2>
      {plays.map((play) => (
        <div key={play.id}>
          <h3>{play.name}</h3>
          <p>{play.date}</p>
          <div>
            {[0, 1, 2, 3, 4].map((index) => (
              <span
                key={index}
                onClick={() => handleMoonClick(index, play)}
                style={{
                  cursor: 'pointer',
                  color: play.rating >= index + 1 ? 'yellow' : 'gray',
                }}
              >
                🌙
              </span>
            ))}
            <span
              onClick={() => handleStandingOvation(play)}
              style={{
                cursor: 'pointer',
                color: play.standingOvation ? 'yellow' : 'gray',
              }}
            >
              👨
            </span>
          </div>
          <button onClick={() => setEditingPlay(play)}>Edit</button>
        </div>
      ))}

      {editingPlay && (
        <div>
          <h2>Edit Play</h2>
          <div>
            <label>Play Name</label>
            <input
              type="text"
              value={editingPlay.name}
              onChange={(e) =>
                setEditingPlay({ ...editingPlay, name: e.target.value })
              }
            />
          </div>
          <div>
            <label>Date</label>
            <input
              type="date"
              value={editingPlay.date}
              onChange={(e) =>
                setEditingPlay({ ...editingPlay, date: e.target.value })
              }
            />
          </div>
          <div>
            <label>Rating</label>
            <div>
              {[0, 1, 2, 3, 4].map((index) => (
                <span
                  key={index}
                  onClick={() =>
                    setEditingPlay({
                      ...editingPlay,
                      rating: editingPlay.rating === index + 1
                        ? index + 0.5
                        : index + 1,
                    })
                  }
                  style={{
                    cursor: 'pointer',
                    color:
                      editingPlay.rating >= index + 1 ? 'yellow' : 'gray',
                  }}
                >
                  🌙
                </span>
              ))}
              <span
                onClick={() =>
                  setEditingPlay({ ...editingPlay, rating: 5, standingOvation: true })
                }
                style={{
                  cursor: 'pointer',
                  color: editingPlay.standingOvation ? 'yellow' : 'gray',
                }}
              >
                👨
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              onUpdatePlay(editingPlay);
              setEditingPlay(null);
            }}
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
