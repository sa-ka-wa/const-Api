const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors"); // Import cors middleware

const app = express();

// Enable CORS for all origins
app.use(cors());

// Function to read data from db.json
const getDataFromFile = () => {
  const filePath = path.join(__dirname, "db.json"); // Path to db.json
  const rawData = fs.readFileSync(filePath); // Read the file synchronously
  return JSON.parse(rawData); // Parse JSON data
};

// Route to serve the JSON data from db.json
app.get("/api/projectData", (req, res) => {
  const projectData = getDataFromFile(); // Read the data from db.json
  res.json(projectData); // Return the data as a JSON response
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
