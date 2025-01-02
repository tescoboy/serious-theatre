import React from "react";
import { Button, Box, Typography, Card, CardContent } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const Dashboard = ({ plays, onEditPlay, onDeletePlay }) => {
  const handleEditClick = (play) => {
    // Open the edit form (e.g., set selectedPlay)
    console.log("Editing play:", play);
    // Add logic to show the edit form with play details
  };

  const handleDeleteClick = (id) => {
    onDeletePlay(id);
  };

  return (
    <div>
      <Typography variant="h5">Dashboard</Typography>
      {/* Tiles */}
      <Box sx={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <Card sx={{ padding: "10px", width: "150px", textAlign: "center" }}>
          <Typography variant="h6">Total Plays</Typography>
          <Typography variant="body1">{plays.length}</Typography>
        </Card>
      </Box>

      {/* List of plays */}
      <Box>
        {plays.map((play) => (
          <Card key={play.id} sx={{ marginBottom: "20px", padding: "10px" }}>
            <CardContent>
              <Typography variant="h6">
                {play.name} ({play.date})
              </Typography>
              <Typography variant="body2">Rating: {play.rating}</Typography>
              <Box sx={{ display: "flex", gap: "10px" }}>
                <Button
                  onClick={() => handleEditClick(play)}
                  variant="outlined"
                  color="primary"
                  startIcon={<Edit />}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteClick(play.id)}
                  variant="outlined"
                  color="secondary"
                  startIcon={<Delete />}
                >
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default Dashboard;
