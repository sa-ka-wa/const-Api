const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

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
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
