import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";

const InputSection = ({ onAddPlay }) => {
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
    if (!newPlay.name || !newPlay.date || newPlay.rating === 0) {
      alert("Please enter valid name, date, and rating!");
      return;
    }

    const newPlayObject = {
      id: Date.now(),
      name: newPlay.name,
      date: newPlay.date,
      rating: newPlay.rating,
    };

    onAddPlay(newPlayObject);

    // Reset form after adding
    setNewPlay({
      name: "",
      date: "",
      rating: 0,
    });
  };

  return (
    <div>
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
      <Box sx={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        {[0, 1, 2, 3, 4].map((position) => (
          <span
            key={position}
            onClick={() => setNewPlay((prev) => ({ ...prev, rating: position + 1 }))}
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
      <Button onClick={handleAddPlay} variant="contained" color="primary">
        Add Play
      </Button>
    </div>
  );
};

export default InputSection;
