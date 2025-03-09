#include <WiFi.h>
#include <WiFiClient.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <DHT.h>

#define dhtPin 16
#define DHTTYPE DHT11
DHT dht(dhtPin, DHTTYPE);

#define lightSensor 36
#define MoistureSensor 39

// הגדרת מצבים עם DEFINE
#define TEMP_CONTROL 1
#define MOISTURE_CONTROL 2
#define SHABBAT 3
#define MANUAL 4

int currentState = MANUAL; // ברירת מחדל למצב ידני
unsigned long lastUpdate = 0; // משתנה למעקב אחרי הזמן

extern WiFiClient client; // משתמש ב-WiFiClient שהוגדר בקובץ אחר

// כתובת השרת לקבלת מצב
const char* serverStateURL = "http://10.9.1.10:3004/state"; 

// ערכים קבועים
const float desiredTemp = 25.0;
const float desiredMoisture = 500;
const int shabbatStartHour = 18, shabbatStopHour = 22;
bool manualPumpOn = false;
bool isPumpRunning = false;

// פונקציה להפעלת המשאבה
void controlPump(bool turnOn) {
  if (turnOn && !isPumpRunning) {
    Serial.println("Pump ON");
    isPumpRunning = true;
  } else if (!turnOn && isPumpRunning) {
    Serial.println("Pump OFF");
    isPumpRunning = false;
  }
}

// פונקציה לקבלת מצב מהשרת כל 10 דקות
void fetchStateFromServer() {
  if (millis() - lastUpdate >= 600000) { // כל 10 דקות
    lastUpdate = millis();
    
    Serial.println("Fetching state from server...");
    
    HTTPClient http;
    http.begin(client, serverStateURL);
    int httpResponseCode = http.GET();

    if (httpResponseCode > 0) {
      String payload = http.getString();
      Serial.println("Response: " + payload);

      StaticJsonDocument<200> doc;
      DeserializationError error = deserializeJson(doc, payload);
      
      if (!error) {
        currentState = doc["state"]; // שליפת מצב מה-JSON
        Serial.print("Updated State: ");
        Serial.println(currentState);
      } else {
        Serial.println("JSON parsing failed");
      }
    } else {
      Serial.print("HTTP Error: ");
      Serial.println(httpResponseCode);
    }
    http.end();
  }
}

// ניהול מצבים
void handleState(float temp, int moisture) {
  switch (currentState) {
    case TEMP_CONTROL:
      controlPump(temp > desiredTemp);
      break;
    case MOISTURE_CONTROL:
      controlPump(moisture < desiredMoisture);
      break;
    case SHABBAT: {
      struct tm timeinfo;
      if (getLocalTime(&timeinfo)) {
        controlPump(timeinfo.tm_hour >= shabbatStartHour && timeinfo.tm_hour < shabbatStopHour);
      }
      break;
    }
    case MANUAL:
      controlPump(manualPumpOn);
      break;
  }
}

void setup() {
  Serial.begin(115200);
  WiFi_SETUP(); // חיבור לרשת דרך הפונקציה הקיימת
  dht.begin();
}

void loop() {
  fetchStateFromServer(); // עדכון מצב מהשרת

  // קריאת חיישנים
  float temp = dht.readTemperature();
  int moisture = analogRead(MoistureSensor);

  // שליחת נתונים לשרת
  sendData(temp, analogRead(lightSensor), moisture);

  // ניהול מצב המשאבה
  handleState(temp, moisture);

  delay(500);
}
