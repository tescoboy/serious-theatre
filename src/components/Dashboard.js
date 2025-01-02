import React, { useState } from "react";
import { Button, Card, CardContent, Typography, Box, TextField } from "@mui/material";
import { Edit } from '@mui/icons-material';

const Dashboard = ({ plays, onEditPlay, onDeletePlay }) => {
  const [selectedPlay, setSelectedPlay] = useState(null); // For editing overlay
  const [editedPlay, setEditedPlay] = useState(null); // Store updated play during editing

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
    console.log("Editing play:", play); // Log the play being edited
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
    console.log(`Updated field ${name}:`, value); // Log changes to the fields
  };

  // Handle ranking change (for editing)
  const handleRatingChange = (position) => {
    // Prevent changes if readonly
    if (editedPlay.readonly) return;

    const currentState = getMoonState(position);

    // Log the moon state before making a change
    console.log("Moon clicked, current state:", currentState);
    console.log("Current rating before change:", editedPlay.rating);

    switch (currentState) {
      case "empty":
        setEditedPlay((prev) => {
          const newRating = position + 1;
          console.log("Setting new rating (empty -> full):", newRating); // Log the new rating
          return { ...prev, rating: newRating };
        });
        break;
      case "full":
        setEditedPlay((prev) => {
          const newRating = position + 0.5;
          console.log("Setting new rating (full -> half):", newRating); // Log the new rating
          return { ...prev, rating: newRating };
        });
        break;
      case "half":
        setEditedPlay((prev) => {
          const newRating = position;
          console.log("Setting new rating (half -> empty):", newRating); // Log the new rating
          return { ...prev, rating: newRating };
        });
        break;
      default:
        break;
    }
  };

  const getMoonState = (position) => {
    const fullMoons = Math.floor(editedPlay.rating); // Calculate full moons
    const hasHalf = editedPlay.rating % 1 !== 0; // Check if half moon is needed

    console.log("Getting moon state for position:", position); // Log the current position

    if (position < fullMoons) return "full"; // Full moons
    if (position === fullMoons && hasHalf) return "half"; // Half moon
    return "empty"; // Empty moons
  };

  const getRatingText = (rating) => {
    console.log("Getting rating text for:", rating); // Log the rating being processed
    if (rating === 6) return "🕺 (Standing Ovation)";  // Standing Ovation icon for rating of 6

    const fullMoons = Math.floor(rating); // Full moons
    const hasHalfMoon = rating % 1 !== 0;  // Check for half moon
    const moons = Array(fullMoons).fill("🌕");  // Add full moons
    if (hasHalfMoon) moons.push("🌗");  // Add half moon if applicable
    while (moons.length < 5) moons.push("🌑");  // Add empty moons if necessary
    return moons.join(" ");  // Join all moons into a string
  };

  const handleSave = () => {
    // Log the final play state before saving
    console.log("Saving play with rating:", editedPlay.rating);
    onEditPlay(editedPlay);  // Save the edited play
    setSelectedPlay(null);  // Close overlay after saving
    setEditedPlay(null);  // Reset the edited play
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
    </div>
  );

  const renderTile = (title, data) => (
    <Card sx={{ minWidth: 275, marginBottom: "20px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ mb: 2, color: "#FFC107" }}>
          {title}
        </Typography>
        <Box>
          {data.length > 0 ? (
            data.map((play) => (
              <Box key={play.id} sx={{ marginBottom: "15px", padding: "10px", border: "1px solid #ddd", borderRadius: "8px" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "5px" }}>
                  {play.name} ({play.date})
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Rating: {getRatingText(play.rating)}
                </Typography>
                {renderPlayActions(play)}
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No plays available.
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <div style={{ margin: "20px" }}>
      {/* Summary Tiles */}
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
        <Card sx={{ flex: 1 }}>
          <CardContent sx={{ backgroundColor: "#343a40", color: "white", borderRadius: "10px" }}>
            <Typography variant="h5" component="div">Total Plays Seen</Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>{totalPlays}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent sx={{ backgroundColor: "#343a40", color: "white", borderRadius: "10px" }}>
            <Typography variant="h5" component="div">Total This Year</Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>{totalThisYear}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent sx={{ backgroundColor: "#343a40", color: "white", borderRadius: "10px" }}>
            <Typography variant="h5" component="div">Total This Month</Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>{totalThisMonth}</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Detailed Tiles */}
      {renderTile("Upcoming Plays", upcomingPlays)}
      {renderTile("Recent Plays", recentPlays)}
      {renderTile("Hall of Fame", hallOfFame)}
      {renderTile("Unrated Plays", unratedPlays)}

      {/* Edit Overlay */}
      {selectedPlay && (
        <div className="overlay">
          <div className="overlay-content">
            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
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
              <span
                onClick={() => handleRatingChange(6)}
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
