const express = require("express");
const router = express.Router();
const db = require("../models/database");

// קבלת כל השתילות
router.get("/", async (req, res) => {
  try {
    const [threes] = await db.execute(`
      SELECT threes.*, plants.name AS plant_name 
      FROM threes 
      JOIN plants ON threes.id_plants = plants.ID
    `);
    res.json(threes);
  } catch (error) {
    console.error("Error fetching threes:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// הוספת שתילה חדשה
router.post("/", async (req, res) => {
  const { id_plants, date } = req.body;
  if (!id_plants || !date) {
    return res.status(400).json({ message: "Plant ID and date are required" });
  }

  try {
    await db.execute("INSERT INTO threes (id_plants, date) VALUES (?, ?)", [id_plants, date]);
    res.status(201).json({ message: "Tree added successfully" });
  } catch (error) {
    console.error("Error adding tree:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// עדכון שתילה
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { id_plants, date } = req.body;
  
  if (!id_plants || !date) {
    return res.status(400).json({ message: "Plant ID and date are required" });
  }

  try {
    await db.execute("UPDATE threes SET id_plants = ?, date = ? WHERE id = ?", [id_plants, date, id]);
    res.json({ message: "Tree updated successfully" });
  } catch (error) {
    console.error("Error updating tree:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// מחיקת שתילה
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    await db.execute("DELETE FROM threes WHERE id = ?", [id]);
    res.json({ message: "Tree deleted successfully" });
  } catch (error) {
    console.error("Error deleting tree:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
