import React, { useState } from "react";
import { Button, Box, Typography, TextField } from "@mui/material";

const Dashboard = ({ plays, onAddPlay }) => {
  const [newPlay, setNewPlay] = useState({
    name: "",
    date: "",
    rating: 0, // No rating initially
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlay((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddPlay = () => {
    // Check if name, date, and rating are valid before adding
    if (!newPlay.name || !newPlay.date || newPlay.rating === 0) {
      alert("Please enter valid name, date, and rating!");
      return;
    }

    // Create a new play object
    const newPlayObject = {
      id: Date.now(),
      name: newPlay.name,
      date: newPlay.date,
      rating: newPlay.rating,
    };

    // Call the onAddPlay function to add the new play to the plays list
    onAddPlay(newPlayObject);

    // Reset form after adding
    setNewPlay({
      name: "",
      date: "",
      rating: 0,
    });
  };

  // Handle rating change
  const handleRatingChange = (position) => {
    if (newPlay.rating === position + 1) {
      // If clicking on a filled moon, toggle to half
      setNewPlay((prev) => ({
        ...prev,
        rating: position + 0.5,
      }));
    } else if (newPlay.rating <= position) {
      // If clicking on an empty moon, fill all moons up to that position
      setNewPlay((prev) => ({
        ...prev,
        rating: position + 1,
      }));
    } else {
      // Reset to empty moons
      setNewPlay((prev) => ({
        ...prev,
        rating: position,
      }));
    }
  };

  // Set all moons to filled (5 moons) - Standing Ovation
  const handleStandingOvation = () => {
    setNewPlay((prev) => ({ ...prev, rating: 6 }));
  };

  // Get moon state (full, half, or empty)
  const getMoonState = (position) => {
    const fullMoons = Math.floor(newPlay.rating); // Full moons based on integer part of rating
    const hasHalf = newPlay.rating % 1 !== 0; // Check if the rating has a half moon

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

  return (
    <div>
      {/* Add New Play Form */}
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Add New Play
      </Typography>

      <TextField
        label="Play Name"
        name="name"
        value={newPlay.name}
        onChange={handleInputChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />

      <TextField
        label="Play Date"
        type="date"
        name="date"
        value={newPlay.date}
        onChange={handleInputChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />

      {/* Rating System */}
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
            color: newPlay.rating === 6 ? "#FFD700" : "#D3D3D3",
            margin: "0 5px",
          }}
        >
          🕺
        </span>
      </Box>

      <Button
        onClick={handleAddPlay}
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
      >
        Add Play
      </Button>
    </div>
  );
};

export default Dashboard;
