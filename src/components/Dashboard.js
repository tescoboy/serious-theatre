import React from "react";

const Dashboard = ({ plays }) => {
  const renderRating = (rating) => {
    if (rating === 6) return "🕺";
    const fullMoons = Math.floor(rating);
    const hasHalfMoon = rating % 1 !== 0;
    const moons = Array(fullMoons).fill("🌕");
    if (hasHalfMoon) moons.push("🌗");
    while (moons.length < 5) moons.push("🌑");
    return moons.join(" ");
  };

  return (
    <div>
      {plays.length > 0 ? (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Rating</th>
            </tr>
          </thead>
          <tbody>
            {plays.map((play) => (
              <tr key={play.id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{play.name}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{play.date}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{renderRating(play.rating)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No plays saved yet. Add a play to get started!</p>
      )}
    </div>
  );
};

export default Dashboard;
