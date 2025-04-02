const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

// Adjusted fallback data to match frontend expectations
const fallbackData = {
  skylineTowers: {
    id: 1,
    name: "Skyline Towers",
    status: "In Progress",
    completionPercentage: 65,
    recentTasks: [],
    materialsInventory: {},
    workforce: {},
  },
  harborViewComplex: {
    id: 2,
    name: "Harbor View Complex",
    status: "Planning",
    completionPercentage: 25,
    recentTasks: [],
    materialsInventory: {},
    workforce: {},
  },
  dashboardSummary: {
    totalProjects: 2,
    activeProjects: 1,
    openTasks: 2,
    lowStockMaterials: 2,
    workersToday: 25,
  },
};

// Transform the data structure to match frontend expectations
const transformData = (data) => {
  return {
    skylineTowers: data.activeProject.skylineTowers,
    harborViewComplex: data.activeProject.harborViewComplex,
    dashboardSummary: data.dashboardSummary,
  };
};

app.get("/api/projectData", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "db.json");
    const rawData = await fs.readFile(filePath, "utf8");
    const originalData = JSON.parse(rawData);

    // Transform the data structure before sending
    const transformedData = transformData(originalData);
    res.json(transformedData);
  } catch (error) {
    console.error("Error:", error);
    res.json(fallbackData); // Send transformed fallback data
  }
});

// POST endpoint should also handle the transformed structure
app.post("/api/projectData", express.json(), async (req, res) => {
  try {
    // Your existing POST logic here
    // Make sure to handle the transformed structure

    // Example response:
    res.json({
      skylineTowers: req.body.skylineTowers || fallbackData.skylineTowers,
      harborViewComplex:
        req.body.harborViewComplex || fallbackData.harborViewComplex,
      dashboardSummary:
        req.body.dashboardSummary || fallbackData.dashboardSummary,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
