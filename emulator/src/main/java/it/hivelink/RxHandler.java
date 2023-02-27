package it.hivelink;

import org.json.JSONObject;

import java.nio.charset.StandardCharsets;

public class RxHandler {

    Emulator emulator;

    RxHandler(Emulator e){
        this.emulator = e;
    }

    public void callback(byte[] payload, String topic) {
        String payloadStr = new String(payload, StandardCharsets.UTF_8);

        // security and telemetry
        boolean secEn, telEn;
        String message;

        try{
            // try to parse json
            JSONObject obj = new JSONObject(payloadStr);
            secEn = obj.getBoolean("securityEnabled");
            telEn = obj.getBoolean("telemetryEnabled");
            message = obj.toString();
        }catch (Exception e){
            emulator.logs.append("RX ERR: " + e.getLocalizedMessage() + "\n");
            return;
        }

        // parse ok show message
        emulator.logs.append("RX " + topic + ": " + message + "\n");

        // check if server is trying to enable telemetry on a device that
        // doesn't support it
        if(telEn && !emulator.telemetryCapable){
            emulator.logs.append("RX ERR: cannot enable telemetry on unsupported hardware\n");
        }else{
            emulator.packet.setTelemetryEnabled(telEn);
        }

        emulator.packet.setSecurityEnabled(secEn);
        emulator.updateLabels();

    }

}
