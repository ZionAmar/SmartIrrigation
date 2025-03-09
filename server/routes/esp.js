const express = require("express");
const router = express.Router();
const db = require("../models/database");

// נתיב קבלת דגימות מה-ESP
router.get("/", async (req, res) => {
  try {
    const { temp, light, moisture, id_threes, isRunning } = req.query;

    // אימות נתונים בסיסי
    if (!temp || !light || !moisture || !id_threes) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    // עדכון נתוני החיישנים במסד הנתונים
    await updateSensorData(id_threes, "temperature", parseFloat(temp), isRunning || 0);
    await updateSensorData(id_threes, "light", parseFloat(light), isRunning || 0);
    await updateSensorData(id_threes, "moisture", parseFloat(moisture), isRunning || 0);

    res.status(201).json({ message: "Data saved successfully" });

  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// פונקציה לעדכון או הכנסת דגימת חיישן
async function updateSensorData(id_threes, sensorName, value, isRunning) {
  const [existing] = await db.execute(
    `SELECT * FROM datasensors 
     WHERE id_threes = ? AND name_sensor = ? AND date = CURDATE()`,
    [id_threes, sensorName]
  );

  if (existing.length > 0) {
    const currentAvg = existing[0].avg;
    const currentMin = existing[0].min_value;
    const currentMax = existing[0].max_value;

    // חישוב ממוצע חדש
    const newAvg = (currentAvg + value) / 2;
    const newMin = Math.min(currentMin, value);
    const newMax = Math.max(currentMax, value);

    // עדכון נתונים קיימים
    await db.execute(
      `UPDATE datasensors 
       SET avg = ?, min_value = ?, max_value = ?, isRunning = ? 
       WHERE id_threes = ? AND name_sensor = ? AND date = CURDATE()`,
      [newAvg, newMin, newMax, isRunning, id_threes, sensorName]
    );

  } else {
    // הכנסת נתונים חדשים אם לא קיימים
    await db.execute(
      `INSERT INTO datasensors 
       (id_threes, name_sensor, avg, min_value, max_value, date, isRunning) 
       VALUES (?, ?, ?, ?, ?, CURDATE(), ?)`,
      [id_threes, sensorName, value, value, value, isRunning]
    );
  }
}

module.exports = router;
