#include <WiFi.h>
#include <WiFiClient.h>
#include <HTTPClient.h>

// WiFi credentials
const char* ssid = "Amar";
const char* password = "0549774827";

// Ensure client is accessible globally
WiFiClient client;

void wifiSetup() {
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected");
}

void sendData(const char* endpoint, int value) {
  HTTPClient http;
  http.begin(client, endpoint);
  http.addHeader("Content-Type", "application/json");
  String jsonPayload = "{\"value\": " + String(value) + "}";
  int httpResponseCode = http.POST(jsonPayload);

  if (httpResponseCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
  } else {
    Serial.print("Error sending data: ");
    Serial.println(http.errorToString(httpResponseCode).c_str());
  }
  http.end();
}

void sendData(const char* endpoint, float value) {
  HTTPClient http;
  http.begin(client, endpoint);
  http.addHeader("Content-Type", "application/json");
  String jsonPayload = "{\"value\": " + String(value, 2) + "}";
  int httpResponseCode = http.POST(jsonPayload);

  if (httpResponseCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
  } else {
    Serial.print("Error sending data: ");
    Serial.println(http.errorToString(httpResponseCode).c_str());
  }
  http.end();
}
