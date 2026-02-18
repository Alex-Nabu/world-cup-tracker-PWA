import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

const BASE_URL = "https://api.balldontlie.io/fifa/worldcup/v1";

// Serve PWA files
app.use(express.static(path.join(__dirname, "public")));

// Proxy routes
app.get("/api/matches", async (req, res) => {
  try {
    const response = await fetch(`${BASE_URL}/matches`, {
      headers: { Authorization: API_KEY }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});

app.get("/api/standings", async (req, res) => {
  try {
    const response = await fetch(`${BASE_URL}/group_standings`, {
      headers: { Authorization: API_KEY }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch standings" });
  }
});

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});