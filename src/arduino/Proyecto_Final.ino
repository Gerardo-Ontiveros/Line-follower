#include <WiFi.h>
#include "secrets.h"
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include "WiFi.h"
#include <DHT.h>
#include <Adafruit_BMP085.h>
#include <MPU6050.h>
#include <Wire.h>

#define DHT_PIN 2
#define DHTTYPE DHT11
#define AWS_IOT_PUBLISH_TOPIC   "iotfrontier/pub"
#define AWS_IOT_SUBSCRIBE_TOPIC "iotfrontier/sub"

// Variables globales para almacenar los datos de los sensores
String h; // Humedad
String t; // Temperatura
String p; // Presión
String a; // Altitud
String ax, ay, az; // Aceleración en X, Y, Z
String gx, gy, gz; // Giroscopio en X, Y, Z

WiFiClientSecure net = WiFiClientSecure();
PubSubClient client(net);

DHT dht(DHT_PIN, DHTTYPE);
Adafruit_BMP085 bmp;
MPU6050 mpu;

void connectAWS() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  Serial.println("Connecting to Wi-Fi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  // Configurar WiFiClientSecure con los certificados AWS
  net.setCACert(AWS_CERT_CA);
  net.setCertificate(AWS_CERT_CRT);
  net.setPrivateKey(AWS_CERT_PRIVATE);

  // Conectar al broker MQTT en el endpoint de AWS
  client.setServer(AWS_IOT_ENDPOINT, 8883);

  // Crear un manejador de mensajes
  client.setCallback(messageHandler);

  Serial.println("Connecting to AWS IOT");

  while (!client.connect(THINGNAME)) {
    Serial.print(".");
    delay(100);
  }

  if (!client.connected()) {
    Serial.println("AWS IoT Timeout!");
    return;
  }

  // Suscribirse a un tema
  client.subscribe(AWS_IOT_SUBSCRIBE_TOPIC);

  Serial.println("AWS IoT Connected!");
}

void publishMessage() {
  StaticJsonDocument<512> doc; // Aumentar el tamaño del JSON si es necesario
  doc["humidity"] = h;         // Humedad del DHT11
  doc["temperature"] = t;      // Temperatura del DHT11
  doc["pressure"] = p;         // Presión del BMP180
  doc["altitude"] = a;         // Altitud del BMP180
  doc["accel_x"] = ax;         // Aceleración en X del MPU6050
  doc["accel_y"] = ay;         // Aceleración en Y del MPU6050
  doc["accel_z"] = az;         // Aceleración en Z del MPU6050
  doc["gyro_x"] = gx;          // Giroscopio en X del MPU6050
  doc["gyro_y"] = gy;          // Giroscopio en Y del MPU6050
  doc["gyro_z"] = gz;          // Giroscopio en Z del MPU6050

  char jsonBuffer[512];
  serializeJson(doc, jsonBuffer); // Convertir el JSON a una cadena

  client.publish(AWS_IOT_PUBLISH_TOPIC, jsonBuffer); // Publicar el mensaje
  Serial.println("Mensaje publicado en AWS IoT:");
  Serial.println(jsonBuffer);
}

void messageHandler(char* topic, byte* payload, unsigned int length) {
  Serial.print("incoming: ");
  Serial.println(topic);

  StaticJsonDocument<200> doc;
  deserializeJson(doc, payload);
  const char* message = doc["message"];
  Serial.println(message);
}

void setup() {
  Serial.begin(115200);
  dht.begin(); // Inicializar el sensor DHT
  Serial.print("Connecting to WiFi");
  connectAWS();

  // Inicializar el primer bus I2C (MPU6050 en pines 21 y 22)
  Wire.begin();

  if (!bmp.begin()) {
    Serial.println("Error al iniciar BMP180. Verifica la conexión.");
    while (1);
  }

  // Inicializar MPU6050 en el primer bus I2C
  mpu.initialize();
  if (!mpu.testConnection()) {
    Serial.println("Error al iniciar MPU6050. Verifica la conexión.");
    while (1);
  }

  Serial.println("Sensores BMP180 y MPU6050 iniciados correctamente.");
}

void loop() {
  // Leer los valores del sensor DHT11
  float humidity = dht.readHumidity();       // Leer humedad
  float temperature = dht.readTemperature(); // Leer temperatura

  // Leer datos del BMP180
  float presion = bmp.readPressure() / 100.0F; // Presión en hPa
  float altitud = bmp.readAltitude();          // Altitud en metros

  // Leer datos del MPU6050
  int16_t accel_x, accel_y, accel_z; // Aceleración en los ejes X, Y, Z
  int16_t gyro_x, gyro_y, gyro_z;    // Giroscopio en los ejes X, Y, Z
  mpu.getMotion6(&accel_x, &accel_y, &accel_z, &gyro_x, &gyro_y, &gyro_z);

  // Verificar si la lectura del sensor DHT11 fue exitosa
  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Error obteniendo los datos del sensor DHT11");
    return;
  }

  // Actualizar las variables globales con los datos de los sensores
  h = String(humidity);    // Humedad
  t = String(temperature); // Temperatura
  p = String(presion);     // Presión
  a = String(altitud);     // Altitud
  ax = String(accel_x);    // Aceleración X
  ay = String(accel_y);    // Aceleración Y
  az = String(accel_z);    // Aceleración Z
  gx = String(gyro_x);     // Giroscopio X
  gy = String(gyro_y);     // Giroscopio Y
  gz = String(gyro_z);     // Giroscopio Z

  // Mostrar los valores en el monitor serial
  Serial.println("--- DHT11 ---");
  Serial.print("Temp: ");
  Serial.println(t);
  Serial.print("Humidity: ");
  Serial.println(h);
  Serial.println("---");

  Serial.println("--- BMP180 ---");
  Serial.print("Presión: ");
  Serial.print(p);
  Serial.println(" hPa");
  Serial.print("Altitud: ");
  Serial.print(a);
  Serial.println(" m");

  Serial.println("--- MPU6050 ---");
  Serial.print("Aceleración X: ");
  Serial.print(ax);
  Serial.print(", Y: ");
  Serial.print(ay);
  Serial.print(", Z: ");
  Serial.println(az);
  Serial.print("Giroscopio X: ");
  Serial.print(gx);
  Serial.print(", Y: ");
  Serial.print(gy);
  Serial.print(", Z: ");
  Serial.println(gz);

  // Publicar los datos en AWS IoT
  publishMessage();

  // Mantener la conexión MQTT activa
  client.loop();
  delay(5000); // Esperar 5 segundos antes de la siguiente lectura
}