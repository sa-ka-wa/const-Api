const express = require("express");
const fs = require("fs").promises; // Use fs.promises for async reading
const path = require("path");
const cors = require("cors");

const app = express();

// Enable CORS for all origins
app.use(cors());

// Fallback data if reading db.json fails
const fallbackData = {
  activeProject: {
    skylineTowers: {
      id: 1,
      name: "Fallback Skyline Towers",
      status: "Unavailable",
      completionPercentage: 0,
      recentTasks: [],
      materialsInventory: {},
      workforce: {},
    },
    harborViewComplex: {
      id: 2,
      name: "Fallback Harbor View Complex",
      status: "Unavailable",
      completionPercentage: 0,
      recentTasks: [],
      materialsInventory: {},
      workforce: {},
    },
  },
  dashboardSummary: {
    totalProjects: 0,
    activeProjects: 0,
    openTasks: 0,
    lowStockMaterials: 0,
    workersToday: 0,
  },
};

// Function to read data from db.json asynchronously with fallback
const getDataFromFile = async () => {
  try {
    const filePath = path.join(__dirname, "db.json");
    console.log("Reading file from:", filePath); // Log the resolved path
    const rawData = await fs.readFile(filePath, "utf8"); // Read file asynchronously
    return JSON.parse(rawData); // Parse the JSON data
  } catch (error) {
    console.error("Error reading db.json:", error);
    return fallbackData;
  }
};

// Default route for root URL
app.get("/", (req, res) => {
  res.send("Welcome to the Project Data API. Try accessing /api/projectData");
});

// API route to get project data
app.get("/api/projectData", async (req, res) => {
  try {
    const projectData = await getDataFromFile();
    res.json(projectData);
  } catch (error) {
    console.error("Error processing /api/projectData:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", fallback: fallbackData });
  }
});

// Set dynamic port for hosting services (local or cloud)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
