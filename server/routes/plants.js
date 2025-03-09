const express = require("express");
const router = express.Router();
const db = require("../models/database");

// קבלת כל העציצים
router.get("/", async (req, res) => {
  try {
    const [plants] = await db.execute("SELECT * FROM plants");
    res.json(plants);
  } catch (error) {
    console.error("Error fetching plants:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// הוספת עציץ חדש
router.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Plant name is required" });
  }

  try {
    await db.execute("INSERT INTO plants (name) VALUES (?)", [name]);
    res.status(201).json({ message: "Plant created successfully" });
  } catch (error) {
    console.error("Error creating plant:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// עדכון שם עציץ
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Plant name is required" });
  }

  try {
    await db.execute("UPDATE plants SET name = ? WHERE ID = ?", [name, id]);
    res.json({ message: "Plant updated successfully" });
  } catch (error) {
    console.error("Error updating plant:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// מחיקת עציץ
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute("DELETE FROM plants WHERE ID = ?", [id]);
    res.json({ message: "Plant deleted successfully" });
  } catch (error) {
    console.error("Error deleting plant:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
