void setup() {
  Serial.begin(115200);
  WiFi_SETUP();
}

void loop() {
  sendData();
  delay(10000);
}
