const express = require("express");
const fs = require("fs");
const router = express.Router();
const jsonFile = "Inside_information.json";

// קריאת כל ההגדרות
router.get("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync(jsonFile, "utf8"));
  res.json(data);
});

// עדכון כל ההגדרות
router.put("/", (req, res) => {
  const newData = req.body;
  fs.writeFileSync(jsonFile, JSON.stringify(newData, null, 2));
  res.json({ message: "State updated successfully" });
});

// עדכון מצב בלבד (state)
router.put("/mode", (req, res) => {
  const { state } = req.body;
  const data = JSON.parse(fs.readFileSync(jsonFile, "utf8"));
  data.state = state;
  fs.writeFileSync(jsonFile, JSON.stringify(data, null, 2));
  res.json({ message: "Mode updated successfully" });
});

// עדכון ערכים למצב ספציפי
router.put("/updateMode/:mode", (req, res) => {
  const { mode } = req.params;
  const newData = req.body;
  
  const data = JSON.parse(fs.readFileSync(jsonFile, "utf8"));
  data[mode] = newData;
  fs.writeFileSync(jsonFile, JSON.stringify(data, null, 2));

  res.json({ message: `${mode} updated successfully` });
});

module.exports = router;
