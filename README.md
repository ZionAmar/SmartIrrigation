Smart Irrigation System

A smart irrigation system utilizing ESP32, Node.js, and MySQL. The system manages irrigation based on real-time sensor data and predefined states.

🚀 Features

Real-time sensor data collection with ESP32.

Node.js server for data processing and API management.

Efficient data storage using MySQL.

Dynamic state management via JSON configuration.

⚙️ Setup

Install dependencies:

npm install

Import the SQL file into your MySQL database.

Run the server:

npm start

Server will be available at http://localhost:3004.

📂 API Endpoints

/plants

GET: Fetch all plants.

POST: Add a new plant.

PUT: Update a plant by ID.

DELETE: Delete a plant by ID.

/threes

GET: Fetch all planting records.

POST: Add a new planting record.

PUT: Update a planting record by ID.

DELETE: Delete a planting record by ID.

/esp

GET: Send sensor data.

/esp?temp=25&light=60&moisture=500&id_threes=1&isRunning=1

/state

GET: Get the current state configuration.

PUT: Update state configuration.

🧩 ESP32

Upload esp32.ino and Wi-Fi setup files.

Ensure server URL and Wi-Fi credentials are configured correctly.

✅ Testing

Use Postman to test API endpoints.

Verify ESP32 connection via Serial Monitor.

Validate data integrity using SQL queries.

🚩 Notes

Data is stored as daily averages, minimums, and maximums.

Manual and automatic modes are controlled via the /state API.

Ensure the server is running before operating the ESP32.


