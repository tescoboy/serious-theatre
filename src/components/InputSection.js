import React, { useState } from 'react';

const InputSection = ({ onAddPlay }) => {
  const [playName, setPlayName] = useState('');
  const [playDate, setPlayDate] = useState('');
  const [rating, setRating] = useState(0);

  const handleMoonClick = (index) => {
    const clickedRating = index + 1;
    if (rating === clickedRating) {
      setRating(clickedRating - 0.5);
    } else {
      setRating(clickedRating);
    }
  };

  const handleStandingOvationClick = () => {
    setRating(6);
  };

  const renderMoon = (index) => {
    const isHalf = rating === index + 0.5;
    const isFull = rating >= index + 1;

    return (
      <span
        key={index}
        onClick={() => handleMoonClick(index)}
        style={{
          fontSize: '24px',
          cursor: 'pointer',
          color: isFull || isHalf ? 'yellow' : 'gray',
        }}
      >
        🌙
      </span>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!playName.trim() || !playDate) {
      alert('Please fill in both the play name and date.');
      return;
    }

    onAddPlay({
      id: Date.now(),
      name: playName.trim(),
      date: playDate,
      rating,
    });

    setPlayName('');
    setPlayDate('');
    setRating(0);
  };

  return (
    <div>
      <h2>Add New Play</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Play Name:</label>
          <input
            type="text"
            value={playName}
            onChange={(e) => setPlayName(e.target.value)}
          />
        </div>
        <div>
          <label>Play Date:</label>
          <input
            type="date"
            value={playDate}
            onChange={(e) => setPlayDate(e.target.value)}
          />
        </div>
        <div>
          <label>Rating:</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {[...Array(5)].map((_, index) => renderMoon(index))}
            <span
              onClick={handleStandingOvationClick}
              style={{
                fontSize: '24px',
                cursor: 'pointer',
                color: rating === 6 ? 'yellow' : 'gray',
                marginLeft: '8px',
              }}
            >
              🕴️
            </span>
          </div>
        </div>
        <button type="submit">Add Play</button>
      </form>
    </div>
  );
};

export default InputSection;
