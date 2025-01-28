#include <WiFi.h>
#include <WiFiClient.h>
#include <HTTPClient.h>

const char* ssid = "Kinneret College";

WiFiClient client;

void WiFi_SETUP(){
  WiFi.begin(ssid);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
}

void sendData(float temp, int linght, int moisture){
  HTTPClient http;
  String dataUrl = "temp=" + String(temp);
  dataUrl+= "&linght="+ String(linght);
  dataUrl+= "&moisture="+ String(moisture);
  http.begin(client, "http://10.9.1.10:3004/esp?");
    Serial.println(dataUrl);
   int httpCode = http.GET();
   if(httpCode == HTTP_CODE_OK) {
     Serial.print("HTTP response code ");
     Serial.println(httpCode);
     //String Res = http.getString();
     //Serial.println(Res);
     //ret = Res.toInt();
    }
    http.end();
}
