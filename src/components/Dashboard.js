import React, { useState } from "react";
import { Button, Card, CardContent, Typography, Box, Select, MenuItem, TextField } from "@mui/material";  // Import TextField
import { Edit, Delete } from '@mui/icons-material';

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

  const handleDelete = () => {
    onDeletePlay(selectedPlay.id); // Delete the selected play
    setSelectedPlay(null); // Close the overlay after deleting
  };

  const renderPlayActions = (play) => (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <Button
        onClick={() => handleEditClick(play)}
        variant="contained"
        color="primary"
        startIcon={<Edit />}
        sx={{
          borderRadius: "10px",
          padding: "8px 16px",
          fontSize: "14px",
        }}
      >
        Edit
      </Button>
      <Button
        onClick={() => handleDelete()}
        variant="contained"
        color="error"
        startIcon={<Delete />}
        sx={{
          borderRadius: "10px",
          paddin
