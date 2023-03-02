package it.hivelink.emulator;

import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttMessage;

import javax.swing.*;
import java.util.UUID;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

public class Main {

    static IMqttClient brokerClient;

    public static void main(String[] args) {

        // broker connection data
        JTextField hiveID = new JTextField(UUID.randomUUID().toString());
        JTextField brokerUser = new JTextField("");
        JPasswordField brokerPass = new JPasswordField("");
        JTextField brokerAddress = new JTextField("");
        JTextField brokerPort = new JTextField("1883");
        JSpinner betweenMessages = new JSpinner(
                new SpinnerNumberModel(60, 10, 300, 5));
        JCheckBox telemetryCapable = new JCheckBox();

        Object[] optionList = new Object[]{
                "ID Arnia:", hiveID,
                "Username Broker:", brokerUser,
                "Password Broker:", brokerPass,
                "Indirizzo Broker:", brokerAddress,
                "Porta Broker:", brokerPort,
                "Telemetria attiva:", telemetryCapable,
                "Intervallo tra mess.", betweenMessages
        };

        int dialogResult = JOptionPane.showConfirmDialog(
                null,
                optionList,
                "Accesso al Broker",
                JOptionPane.OK_CANCEL_OPTION,
                JOptionPane.PLAIN_MESSAGE
        );

        if (dialogResult == 0) {
            // data validation
            if (
                    Utilities.isStringNotValid(hiveID.getText()) ||
                            Utilities.isStringNotValid(brokerUser.getText()) ||
                            //Utilities.isStringNotValid(String.valueOf(brokerPass.getPassword())) ||
                            Utilities.isStringNotValid(brokerAddress.getText()) ||
                            Utilities.isStringNotValid(brokerPort.getText())
            ) {
                Utilities.shErrDiag("Dati di connessione non validi");
            }

            // dialog res. is "OK", attempt connection to broker
            try {
                brokerClient = new MqttClient(
                        "tcp://" + brokerAddress.getText() + ":" + brokerPort.getText(),
                        hiveID.getText()
                );
                brokerClient.connect(Utilities.authenticate(
                        brokerUser.getText(),
                        String.valueOf(brokerPass.getPassword())
                ));

                // connected? try sending test message
                String testString = "PING " + hiveID.getText();
                MqttMessage testMessage = new MqttMessage(
                        testString.getBytes());
                brokerClient.publish(
                        "hivetest/" + hiveID.getText(),
                        testMessage
                );

                // connection successful, launch emulator
                Emulator emulator = new Emulator(
                        brokerClient,
                        telemetryCapable.isSelected(),
                        (Integer) betweenMessages.getValue(),
                        hiveID.getText()
                );

                // start periodic send thread
                TxThread txThread = new TxThread(emulator);
                txThread.start();

                RxHandler rxHandler = new RxHandler(emulator);

                CountDownLatch receivedSignal = new CountDownLatch(10);
                String t = "hivelink/otaconfig/" + hiveID.getText();
                brokerClient.subscribe(t, (topic, msg) -> {
                    // handle payload
                    rxHandler.callback(msg.getPayload(), t);
                    receivedSignal.countDown();
                });
                // sync threads
                receivedSignal.await(1, TimeUnit.MINUTES);

            } catch (Exception e) {
                Utilities.shErrDiag(e.getLocalizedMessage());
                System.exit(-1);
            }
        }
    }
}