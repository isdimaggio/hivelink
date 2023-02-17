import paho.mqtt.client as mqtt
import json
from random import randrange, uniform
import time

mqttBroker = "mqtt.eclipseprojects.io"
client = mqtt.Client("Arnia")
client.connect(mqttBroker)

while True:
    misurazioni = {
        "temperature": uniform(30.0, 35.0),
	    "humidity": uniform(60, 100),
	    "weight": uniform(45, 200),
    }

    payload = json.dumps(misurazioni)

    client.publish("Misurazioni", payload)
    print("publicato" + payload + "in misurazioni")
    time.sleep(1)