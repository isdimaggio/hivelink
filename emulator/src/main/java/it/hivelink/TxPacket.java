package it.hivelink;

import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.json.JSONObject;

public class TxPacket {

    private float temperature = 20;
    private float humidity = 80;
    private float weight = 80;
    private boolean telemetryEnabled;
    private final boolean telemetrySupport;

    private boolean securityEnabled = true;
    private float batteryVoltage = (float) 14.2;
    private boolean coverTriggered = false;
    private boolean accelerometerTriggered = false;
    private float positionLatitude = (float) 41.702434;
    private float positionLongitude = (float) 15.729550;

    public TxPacket(boolean telemetryEnabled) {
        this.telemetryEnabled = telemetryEnabled;
        this.telemetrySupport = telemetryEnabled;
    }

    public boolean isTelemetrySupport() {
        return telemetrySupport;
    }

    public float getTemperature() {
        return temperature;
    }

    public void setTemperature(float temperature) {
        if(temperature < -5 || temperature > 100){
            return;
        }
        this.temperature = temperature;
    }

    public float getHumidity() {
        return humidity;
    }

    public void setHumidity(float humidity) {
        if(humidity <= 0 || humidity > 100){
            return;
        }
        this.humidity = humidity;
    }

    public float getWeight() {
        return weight;
    }

    public void setWeight(float weight) {
        if(weight <= 0 || weight > 100){
            return;
        }
        this.weight = weight;
    }

    public boolean isTelemetryEnabled() {
        return telemetryEnabled;
    }

    public void setTelemetryEnabled(boolean telemetryEnabled) {
        this.telemetryEnabled = telemetryEnabled;
    }

    public boolean isSecurityEnabled() {
        return securityEnabled;
    }

    public void setSecurityEnabled(boolean securityEnabled) {
        this.securityEnabled = securityEnabled;
    }

    public float getBatteryVoltage() {
        return batteryVoltage;
    }

    public void setBatteryVoltage(float batteryVoltage) {
        this.batteryVoltage = batteryVoltage;
    }

    public boolean isCoverTriggered() {
        return coverTriggered;
    }

    public void setCoverTriggered(boolean coverTriggered) {
        this.coverTriggered = coverTriggered;
    }

    public boolean isAccelerometerTriggered() {
        return accelerometerTriggered;
    }

    public void setAccelerometerTriggered(boolean accelerometerTriggered) {
        this.accelerometerTriggered = accelerometerTriggered;
    }

    public float getPositionLatitude() {
        return positionLatitude;
    }

    public void setPositionLatitude(float positionLatitude) {
        this.positionLatitude = positionLatitude;
    }

    public float getPositionLongitude() {
        return positionLongitude;
    }

    public void setPositionLongitude(float positionLongitude) {
        this.positionLongitude = positionLongitude;
    }

    /*
    SAMPLE PACKET:
    {
        "temperature": 22.0,
        "humidity": 93.2,
        "weight": 44.4,
        "telemetryEnabled": true,
        "securityEnabled": true,
        "batteryVoltage": 55.5,
        "coverTriggered": true,
        "accelerometerTriggered": true,
        "pos_lat": 45.1234123412,
        "pos_lon": 27.234234234
    }
 */

    public String getJSON(){
        JSONObject jo = new JSONObject();
        jo.put("temperature", getTemperature());
        jo.put("humidity", getHumidity());
        jo.put("weight", getWeight());
        jo.put("telemetryEnabled", isTelemetryEnabled());
        jo.put("telemetrySupport", isTelemetrySupport());
        jo.put("securityEnabled", isSecurityEnabled());
        jo.put("batteryVoltage", getBatteryVoltage());
        jo.put("coverTriggered", isCoverTriggered());
        jo.put("accelerometerTriggered", isAccelerometerTriggered());
        jo.put("pos_lat", getPositionLatitude());
        jo.put("pos_lon", getPositionLongitude());
        return jo.toString();
    }

    public MqttMessage getMqttMessage(){
        return new MqttMessage(getJSON().getBytes());
    }
}
