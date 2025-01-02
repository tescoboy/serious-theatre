import React, { useState } from "react";
import { Button, Box, Typography, TextField } from "@mui/material";

const Dashboard = ({ plays, onEditPlay, onDeletePlay }) => {
  const [selectedPlay, setSelectedPlay] = useState(null); // For editing overlay
  const [editedPlay, setEditedPlay] = useState(null); // Store updated play during editing

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

  // Update rating by clicking on moons
  const handleRatingChange = (position) => {
    // Prevent changes if readonly
    if (editedPlay.readonly) return;

    const rating = editedPlay.rating;

    if (position < rating) {
      // When a filled moon is clicked, remove all moons after it
      setEditedPlay((prev) => ({ ...prev, rating: position }));
    } else if (position === rating) {
      // If clicked again on the same moon, toggle to half moon
      const newRating = rating % 1 === 0 ? position + 0.5 : position;
      setEditedPlay((prev) => ({ ...prev, rating: newRating }));
    } else {
      // When an empty moon is clicked, fill all moons up to that position
      setEditedPlay((prev) => ({ ...prev, rating: position + 1 }));
    }
  };

  // Set all moons to filled (5 moons) - Standing Ovation
  const handleStandingOvation = () => {
    setEditedPlay((prev) => ({ ...prev, rating: 6 }));
  };

  // Get moon state (full, half, or empty)
  const getMoonState = (position) => {
    const fullMoons = Math.floor(editedPlay.rating); // Full moons based on integer part of rating
    const hasHalf = editedPlay.rating % 1 !== 0; // Check if the rating has a half moon

    if (position < fullMoons) return "full";  // If the position is less than the full moons, it's full
    if (position === fullMoons && hasHalf) return "half"; // If the position is the next one and there is a half, it's half
    return "empty"; // Otherwise, it's empty
  };

  const getRatingText = (rating) => {
    if (rating === 6) {
      return "🕺";  // Standing Ovation icon for rating of 6 (highest rating)
    }

    const fullMoons = Math.floor(rating); // Full moons
    const hasHalfMoon = rating % 1 !== 0;  // Check for half moon
    const moons = Array(fullMoons).fill("🌕");
    if (hasHalfMoon) moons.push("🌗");
    while (moons.length < 5) moons.push("🌑"); // Fill empty moons if necessary
    return moons.join(" ");
  };

  const handleSave = () => {
    onEditPlay(editedPlay);  // Save the edited play
    setSelectedPlay(null);  // Close overlay after saving
    setEditedPlay(null);  // Reset the edited play
  };

  return (
    <div>
      {/* Edit Overlay */}
      {selectedPlay && (
        <div className="overlay">
          <div className="overlay-content">
            <Typography variant="h6" sx={{ mb: 2 }}>
              Edit Play
            </Typography>

            <TextField
              label="Play Name"
              name="name"
              value={editedPlay.name}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              label="Play Date"
              type="date"
              name="date"
              value={editedPlay.date}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />

            {/* Rating System with Moons */}
            <Box sx={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              {[0, 1, 2, 3, 4].map((position) => (
                <span
                  key={position}
                  onClick={() => handleRatingChange(position)}
                  style={{
                    fontSize: "24px",
                    cursor: "pointer",
                    color: getMoonState(position) === "empty" ? "#D3D3D3" : "#FFD700",
                    margin: "0 5px",
                  }}
                >
                  🌕
                </span>
              ))}
              {/* Standing Ovation Icon */}
              <span
                onClick={handleStandingOvation}
                style={{
                  fontSize: "24px",
                  cursor: "pointer",
                  color: editedPlay.rating === 6 ? "#FFD700" : "#D3D3D3",
                  margin: "0 5px",
                }}
              >
                🕺
              </span>
            </Box>

            <Box sx={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <Button
                onClick={handleSave}
                variant="contained"
                color="success"
              >
                Save
              </Button>
              <Button
                onClick={handleOverlayClose}
                variant="outlined"
              >
                Close
              </Button>
            </Box>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
