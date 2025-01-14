
// Sensor pins
#define SOIL_SENSOR_PIN 32
#define LIGHT_SENSOR_PIN 34
#define TEMP_SENSOR_PIN 35

int readSoilMoisture() {
  return analogRead(SOIL_SENSOR_PIN);
}

int readLightLevel() {
  return analogRead(LIGHT_SENSOR_PIN);
}

float readTemperature() {
  int sensorValue = analogRead(TEMP_SENSOR_PIN);
  float voltage = sensorValue * (3.3 / 4095.0); // Convert to voltage
  return (voltage - 0.5) * 100.0; // Convert to temperature (Celsius)
}
