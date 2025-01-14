const express = require('express');
const router = express.Router();

// Variable to store the last received values
let sensorData = {
  soilMoisture: null,
  lightLevel: null,
  temperature: null,
};

// Test
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Is working' });
});

// Endpoint to handle soil moisture data
router.post('/soilMoisture', (req, res) => {
    const { value } = req.body;
    sensorData.soilMoisture = value; // Update the stored value
    console.log(`Soil Moisture: ${value}`);
    res.status(200).json({ message: 'Soil moisture value received', value });
});

// Endpoint to handle light level data
router.post('/lightLevel', (req, res) => {
    const { value } = req.body;
    sensorData.lightLevel = value; // Update the stored value
    console.log(`Light Level: ${value}`);
    res.status(200).json({ message: 'Light level value received', value });
});

// Endpoint to handle temperature data
router.post('/temperature', (req, res) => {
    const { value } = req.body;
    sensorData.temperature = value; // Update the stored value
    console.log(`Temperature: ${value}`);
    res.status(200).json({ message: 'Temperature value received', value });
});

// Endpoint to retrieve all sensor data
router.get('/all', (req, res) => {
    res.status(200).json(sensorData);
});

module.exports = router;
