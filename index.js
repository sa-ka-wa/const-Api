const express = require("express");
const fs = require("fs").promises; // Use fs.promises for async reading
const path = require("path");
const cors = require("cors");

const app = express();

// Enable CORS for all origins
app.use(cors());

// Function to read data from db.json asynchronously
const getDataFromFile = async () => {
  try {
    const filePath = path.join(__dirname, "db.json");
    const rawData = await fs.readFile(filePath, "utf8"); // Read file asynchronously
    return JSON.parse(rawData); // Parse the JSON data
  } catch (error) {
    console.error("Error reading db.json:", error);
    return { error: "Failed to load project data." }; // Return an error if there's an issue
  }
};

// API route to get project data
app.get("/api/projectData", async (req, res) => {
  const projectData = await getDataFromFile();
  res.json(projectData); // Send the project data as a JSON response
});

// Set dynamic port for hosting services (local or cloud)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
