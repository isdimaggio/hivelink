package it.hivelink;

import org.eclipse.paho.client.mqttv3.MqttConnectOptions;

import javax.swing.*;

public class Utilities {

    public static boolean isStringNotValid(String string){
        return string.length() <= 1;
    }

    public static void shErrDiag(String content){
        JOptionPane.showMessageDialog(null,
                content,
                "HiveLink Emulator",
                JOptionPane.ERROR_MESSAGE);
    }

    public static MqttConnectOptions authenticate(String username, String password) {
        MqttConnectOptions connOpts = new MqttConnectOptions();
        connOpts.setCleanSession(true);
        connOpts.setUserName(username);
        connOpts.setPassword(password.toCharArray());
        return connOpts;
    }
}
