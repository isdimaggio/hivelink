package it.hivelink.emulator;

import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;

import javax.swing.*;
import java.awt.*;

public class Emulator extends JFrame {

    IMqttClient brokerClient;
    String deviceID;
    boolean telemetryCapable;
    int betweenMessages;
    TxPacket packet;

    SpinnerNumberModel tempSpinnerModel
            = new SpinnerNumberModel(20, -5.0, 50.0, 0.1);

    SpinnerNumberModel humSpinnerModel
            = new SpinnerNumberModel(80, 0.0, 100.0, 0.5);

    SpinnerNumberModel weiaSpinnerModel
            = new SpinnerNumberModel(80, 0.0, 100.0, 0.5);

    SpinnerNumberModel batterySpinnerModel
            = new SpinnerNumberModel(14.2, 11.1, 14.4, 0.1);

    JSpinner spinnerTemp;
    JSpinner spinnerHum;
    JSpinner spinnerWeight;
    JTextField telemetry;
    JTextField security;
    JSpinner spinnerBattery;
    JTextField uncovering;
    JTextField accelerometer;
    JButton uncoveringTrigger;
    JButton accelerometerTrigger;
    JTextField latitude;
    JTextField longitude;
    JTextArea logs;
    JProgressBar untilNewMessage;

    Emulator(IMqttClient bc, boolean tc, int bm, String di) throws Exception {
        if(!bc.isConnected()){
            throw new Exception("client not connected");
        }

        brokerClient = bc;
        telemetryCapable = tc;
        betweenMessages = bm;
        deviceID = di;

        // assumes that telemetry is enabled when capable at device boot
        packet = new TxPacket(telemetryCapable);

        setTitle("HiveLink Emulator");
        int w = 800; int h = 600;
        setSize(w, h);
        setPreferredSize(new Dimension(w, h));
        setLocation(200, 200);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setResizable(false);
        setMaximumSize(new Dimension(w, h));
        setVisible(true);

        JPanel gridBagPane = new JPanel();

        // gridbag setup
        gridBagPane.setLayout(new GridBagLayout());
        GridBagConstraints layout = new GridBagConstraints();
        layout.weighty = 0.5;
        layout.weightx = 1;
        layout.fill = GridBagConstraints.BOTH;

        // temperature spinner
        spinnerTemp = new JSpinner(tempSpinnerModel);
        spinnerTemp.setBorder(BorderFactory.createTitledBorder("Temperatura"));
        layout.gridwidth = 1;
        layout.gridx = 0;
        layout.gridy = 0;
        gridBagPane.add(spinnerTemp, layout);

        // hum spinner
        spinnerHum = new JSpinner(humSpinnerModel);
        spinnerHum.setBorder(BorderFactory.createTitledBorder("Umidità"));
        layout.gridwidth = 1;
        layout.gridx = 1;
        layout.gridy = 0;
        gridBagPane.add(spinnerHum, layout);

        // weight spinner
        spinnerWeight = new JSpinner(weiaSpinnerModel);
        spinnerWeight.setBorder(BorderFactory.createTitledBorder("Peso"));
        layout.gridwidth = 1;
        layout.gridx = 2;
        layout.gridy = 0;
        gridBagPane.add(spinnerWeight, layout);

        telemetry = new JTextField(String.valueOf(packet.isTelemetryEnabled()));
        telemetry.setForeground(
                packet.isTelemetryEnabled() ? new Color(14, 171, 0) : new Color(171,0,0));
        telemetry.setEditable(false);
        telemetry.setBorder(BorderFactory.createTitledBorder("Stato telemetria"));
        layout.gridwidth = 1;
        layout.gridx = 0;
        layout.gridy = 1;
        gridBagPane.add(telemetry, layout);

        security = new JTextField(String.valueOf(packet.isSecurityEnabled()));
        security.setForeground(
                packet.isSecurityEnabled() ? new Color(14, 171, 0) : new Color(171,0,0));
        security.setEditable(false);
        security.setBorder(BorderFactory.createTitledBorder("Stato sicurezza"));
        layout.gridwidth = 1;
        layout.gridx = 1;
        layout.gridy = 1;
        gridBagPane.add(security, layout);

        // weight spinner
        spinnerBattery = new JSpinner(batterySpinnerModel);
        spinnerBattery.setBorder(BorderFactory.createTitledBorder("Tensione batteria"));
        layout.gridwidth = 1;
        layout.gridx = 2;
        layout.gridy = 1;
        gridBagPane.add(spinnerBattery, layout);

        uncovering = new JTextField(String.valueOf(packet.isCoverTriggered()));
        uncovering.setForeground(
                packet.isCoverTriggered() ? new Color(14, 171, 0) : new Color(171,0,0));
        uncovering.setEditable(false);
        uncovering.setBorder(BorderFactory.createTitledBorder("Stato scoperchiamento"));
        layout.gridwidth = 2;
        layout.gridx = 0;
        layout.gridy = 2;
        gridBagPane.add(uncovering, layout);

        uncoveringTrigger = new JButton("Toggle scoperchiamento");
        uncoveringTrigger.addActionListener(e -> {
            packet.setCoverTriggered(!packet.isCoverTriggered());
            uncovering.setText(String.valueOf(packet.isCoverTriggered()));
            uncovering.setForeground(
                    packet.isCoverTriggered() ? new Color(14, 171, 0) : new Color(171,0,0));
            untilNewMessage.setValue(0);
        });
        layout.gridwidth = 1;
        layout.gridx = 2;
        layout.gridy = 2;
        gridBagPane.add(uncoveringTrigger, layout);

        accelerometer = new JTextField(String.valueOf(packet.isAccelerometerTriggered()));
        accelerometer.setForeground(
                packet.isAccelerometerTriggered() ? new Color(14, 171, 0) : new Color(171,0,0));
        accelerometer.setEditable(false);
        accelerometer.setBorder(BorderFactory.createTitledBorder("Stato accelerometro"));
        layout.gridwidth = 2;
        layout.gridx = 0;
        layout.gridy = 3;
        gridBagPane.add(accelerometer, layout);

        accelerometerTrigger = new JButton("Toggle accelerometro");
        accelerometerTrigger.addActionListener(e -> {
            packet.setAccelerometerTriggered(!packet.isAccelerometerTriggered());
            accelerometer.setText(String.valueOf(packet.isAccelerometerTriggered()));
            accelerometer.setForeground(
                    packet.isAccelerometerTriggered() ? new Color(14, 171, 0) : new Color(171,0,0));
            untilNewMessage.setValue(0);
        });
        layout.gridwidth = 1;
        layout.gridx = 2;
        layout.gridy = 3;
        gridBagPane.add(accelerometerTrigger, layout);

        latitude = new JTextField(String.valueOf(packet.getPositionLatitude()));
        latitude.setBorder(BorderFactory.createTitledBorder("Latitudine"));
        layout.gridwidth = 1;
        layout.gridx = 0;
        layout.gridy = 4;
        gridBagPane.add(latitude, layout);

        longitude = new JTextField(String.valueOf(packet.getPositionLongitude()));
        longitude.setBorder(BorderFactory.createTitledBorder("Longitudine"));
        layout.gridwidth = 1;
        layout.gridx = 1;
        layout.gridy = 4;
        gridBagPane.add(longitude, layout);

        JTextField telemetryCT = new JTextField(telemetryCapable ? "true" : "false");
        telemetryCT.setBorder(BorderFactory.createTitledBorder("Hw. abilit. Telemetria"));
        telemetryCT.setEditable(false);
        telemetryCT.setForeground(
                telemetryCapable ? new Color(14, 171, 0) : new Color(171,0,0));
        layout.gridwidth = 1;
        layout.gridx = 2;
        layout.gridy = 4;
        gridBagPane.add(telemetryCT, layout);

        untilNewMessage = new JProgressBar(0, betweenMessages);
        untilNewMessage.setValue(betweenMessages);
        untilNewMessage.setStringPainted(false);
        untilNewMessage.setBorder(BorderFactory.createTitledBorder(
                "Prossimo messaggio in: " + untilNewMessage.getValue()));
        layout.gridwidth = 3;
        layout.gridx = 0;
        layout.gridy = 5;
        gridBagPane.add(untilNewMessage, layout);

        JButton applica = new JButton("CLICCA PER APPLICARE MODIFICHE FIELDS");
        applica.addActionListener(e -> {
            packet.setTemperature((float) (double) spinnerTemp.getValue());
            packet.setHumidity((float) (double) spinnerHum.getValue());
            packet.setWeight((float) (double) spinnerWeight.getValue());
            packet.setBatteryVoltage((float) (double) spinnerBattery.getValue());
            packet.setPositionLatitude(Float.parseFloat(latitude.getText()));
            packet.setPositionLongitude(Float.parseFloat(longitude.getText()));
            logs.append("parameters appended \n");
        });
        layout.gridwidth = 3;
        layout.gridx = 0;
        layout.gridy = 6;
        gridBagPane.add(applica, layout);

        logs = new JTextArea("DEVICE: boot OK\n");
        logs.setBorder(BorderFactory.createTitledBorder("Messaggi di Log"));
        logs.setEditable(false);

        JSplitPane splitter = new JSplitPane(JSplitPane.VERTICAL_SPLIT, gridBagPane, new JScrollPane(logs));
        splitter.setResizeWeight(1);
        splitter.setDividerLocation(250);

        setContentPane(splitter);
        validate();
        repaint();
    }

    void loop() {
        if(untilNewMessage.getValue() == 0){
            try {
                brokerClient.publish(
                        "hivelink/telemetry/" + deviceID,
                        packet.getMqttMessage()
                );
                logs.append("TX hivelink/telemetry/" + deviceID + ": " + packet.getJSON() + "\n");
            } catch (MqttException e) {
                logs.append("ERR: " + e.getMessage() + "\n");
            }
            untilNewMessage.setValue(betweenMessages);

        }else{
           untilNewMessage.setValue(untilNewMessage.getValue() - 1);
        }
        untilNewMessage.setBorder(BorderFactory.createTitledBorder(
                "Prossimo messaggio in: " + untilNewMessage.getValue()));
    }

    void updateLabels(){
        telemetry.setText(String.valueOf(packet.isTelemetryEnabled()));
        telemetry.setForeground(
                packet.isTelemetryEnabled() ? new Color(14, 171, 0) : new Color(171,0,0));

        security.setText(String.valueOf(packet.isSecurityEnabled()));
        security.setForeground(
                packet.isSecurityEnabled() ? new Color(14, 171, 0) : new Color(171,0,0));
    }

}
