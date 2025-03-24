#include <pgmspace.h>
#define SECRET
#define THINGNAME "iotfrontierthing"
const char WIFI_SSID[] = "Redmi 10";
const char WIFI_PASSWORD[] = "nkn53mqta7mb4ak";
const char AWS_IOT_ENDPOINT[] = "a3ehy2ww3x3nhf-ats.iot.us-east-1.amazonaws.com";

// Amazon Root CA 1
static const char AWS_CERT_CA[] PROGMEM = R"EOF(
//ARCHIVO AMAZON ROOT CA 1
)EOF";

// Device Certificate                                               //change this
static const char AWS_CERT_CRT[] PROGMEM = R"KEY(
//ARCHIVO CERTIFICADO DE DISPOSITIVO
)KEY";

// Device Private Key                                               //change this
static const char AWS_CERT_PRIVATE[] PROGMEM = R"KEY(
//ARCHIVO CLAVE PRIVADA
)KEY";
