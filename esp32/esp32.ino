
String Api = "http://192.168.150.102:6060";

void setup() {
  Serial.begin(115200);

  // Setup WiFi
  wifiSetup();

  // Setup sensors and pump
  setupPump();
}

void loop() {
  // Read sensor values
  int soilMoisture = readSoilMoisture();
  int lightLevel = readLightLevel();
  float temperature = readTemperature();

  // Print values
  Serial.print("Soil Moisture: ");
  Serial.println(soilMoisture);
  Serial.print("Light Level: ");
  Serial.println(lightLevel);
  Serial.print("Temperature: ");
  Serial.println(temperature);

  // Send data to server
  sendData((Api + "/esp/soilMoisture").c_str(), soilMoisture);
  sendData((Api + "/esp/lightLevel").c_str(), lightLevel);
  sendData((Api + "/esp/temperature").c_str(), temperature);

  // Control pump based on soil moisture
  controlPump(soilMoisture < 300); // Example threshold

  delay(10000);
}
