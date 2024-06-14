#ifndef TEMPERATURE_MANAGER_H
#define TEMPERATURE_MANAGER_H

#include "sensor/Temperature.h"
#include "actuator/Fan.h"
#include "http_server/HttpServerFan.h"
#include "http_server/HttpServerTemperature.h"
#include "LcdManager.h"

class TemperatureManager
{
private:
    SensorTemperature* _sensor;
    ActuatorFan* _fan;
    HttpServerFan* _httpServerFan;
    HttpServerTemperature* _httpServerTemperature;
    LcdManager* _lcdManager;
    float _minTemperature;
    float _maxTemperature;
    float _setPoint;
    int _intervalMsSendCurrentTemperature;

    bool isIdealTemperature();
    bool isOverTemperature();
    void sendTemperatureToServer();
    bool canSendTemperatureToServer();

public:
    TemperatureManager(float minTemperature, float maxTemperature, float setPoint);
    void handlerTemperature();
    void printCurrentTemperatureOnLcd();
    void setTemperatureSensor(SensorTemperature* sensor);
    void setActuatorFan(ActuatorFan* actuator);
    void setHttpServerFan(HttpServerFan* httpServerFan);
    void setHttpServerTemperature(HttpServerTemperature* httpServerTemperature);
    void setLcdManager(LcdManager* lcdManager);
};

#endif
