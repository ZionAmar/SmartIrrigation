
// Pump pin
#define PUMP_PIN 27

void setupPump() {
  pinMode(PUMP_PIN, OUTPUT);
  digitalWrite(PUMP_PIN, LOW); // Ensure pump is off initially
}

void controlPump(bool state) {
  digitalWrite(PUMP_PIN, state ? HIGH : LOW);
  Serial.println(state ? "Pump ON" : "Pump OFF");
}
