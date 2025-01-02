import React, { useState } from "react";
import { Button, Box, Typography, TextField } from "@mui/material";

const Dashboard = ({ plays, onEditPlay, onAddPlay, onDeletePlay }) => {
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
    // Check if name and date are valid before adding
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
    // Set new rating based on clicked moon
    setNewPlay((prev) => ({
      ...prev,
      rating: position + 1,
    }));
  };

  return (
    <div>
      {/* Form to Add Play */}
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
              color: newPlay.rating > position ? "#FFD700" : "#D3D3D3",
            }}
          >
            🌕
          </span>
        ))}
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
