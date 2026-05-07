import { useState, useEffect } from "react";

function App() {
  // State to store the list of players and the current input value
  const [players, setPlayers] = useState([]);
  const [newNick, setNewNick] = useState("");

  // Function to fetch the player list from our Django API
  const fetchPlayers = async () => {
    try {
      // The request goes to /api/players/, Nginx proxies it to the backend container
      const response = await fetch("/api/players/");
      const data = await response.json();
      setPlayers(data.players || []);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  // useEffect runs once when the component is first rendered
  useEffect(() => {
    fetchPlayers();
  }, []);

  // Handle form submission to add a new nickname
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newNick) return;

    try {
      const response = await fetch("/api/players/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: newNick }),
      });

      if (response.ok) {
        setNewNick(""); // Clear the input field on success
        fetchPlayers(); // Refresh the list from the database
      } else {
        alert("Nickname already exists or invalid!");
      }
    } catch (error) {
      console.error("Error adding player:", error);
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "system-ui, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h1>ft_transcendence PoC</h1>

      {/* Form for submitting a new nickname */}
      <form
        onSubmit={handleSubmit}
        style={{ marginBottom: "2rem", display: "flex", gap: "1rem" }}
      >
        <input
          type="text"
          value={newNick}
          onChange={(e) => setNewNick(e.target.value)}
          placeholder="Enter your nickname..."
          required
          style={{ padding: "0.5rem", fontSize: "1rem", flex: 1 }}
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Join Game
        </button>
      </form>

      {/* List of players fetched from the database */}
      <h2>Registered Players (PostgreSQL)</h2>
      {players.length === 0 ? (
        <p>No players in the database yet. Be the first!</p>
      ) : (
        <ul style={{ fontSize: "1.2rem", lineHeight: "1.8" }}>
          {players.map((player, index) => (
            <li key={index}>{player}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
