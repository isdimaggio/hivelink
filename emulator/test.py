import paho.mqtt.client as mqtt
import json

def on_message(client, userdata, message):
    payload = message.payload.decode("utf-8")
    data = json.loads(payload)
    print("Dati ricevuti: " + str(data))

client = mqtt.Client()

def on_connect(client, userdata, flags, rc):
    client.subscribe("Misurazioni")

client.on_connect = on_connect
client.on_message = on_message

client.connect("mqtt.eclipseprojects.io")

client.loop_forever()
