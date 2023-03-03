import os
import random
import json
import time
import requests
import paho.mqtt.client as mqttClient

BROKER_ADDRESS = os.getenv("BROKER_ADDRESS")
BROKER_PORT = os.getenv("BROKER_PORT")
BROKER_USERNAME = os.getenv("BROKER_USERNAME")
BROKER_PASSWORD = os.getenv("BROKER_PASSWORD")
BACKEND = os.getenv("BACKEND")
MQHT_PSK = os.getenv("MQHT_PSK")

HEADERS = {"Authorization": "Bearer " + MQHT_PSK}

topic_sub = "hivelink/telemetry/#"
client_id = f'mqht_{random.randint(0, 1000)}'
Connected = False  # global variable for the state of the connection


def on_connect(client, userdata, flags, rc):

    if rc == 0:
        print("Connected to broker")
        global Connected  # Use global variable
        Connected = True  # Signal connection
    else:
        print("Connection failed")


def on_message(client, userdata, message):
    cid = str(message.topic).replace("hivelink/telemetry/", "")
    print(f"Message received on topic {str(message.topic)} calculated client id is {cid}")

    json_message = json.loads(
        str(message.payload.decode("utf-8","ignore")))
    json_message["MQHT_hive"] = cid
    r = requests.post(BACKEND, json = json_message, headers=HEADERS)
    print("backend said: " + r.text)


def run():

    if BROKER_USERNAME == None or BROKER_USERNAME == "":
        print("env err: username")
        exit(-1)

    if BROKER_PASSWORD == None or BROKER_PASSWORD == "":
        print("env err: password")
        exit(-1)

    if BROKER_ADDRESS == None or BROKER_ADDRESS == "":
        print("env err: address")
        exit(-1)

    if BROKER_PORT == None or BROKER_PORT == "":
        print("env err: port")
        exit(-1)

    client = mqttClient.Client()
    client.username_pw_set(BROKER_USERNAME, password=BROKER_PASSWORD)
    client.on_connect = on_connect
    client.on_message = on_message

    client.connect(BROKER_ADDRESS, port=int(BROKER_PORT))  # connect to broker

    client.loop_start()  # start the loop

    while Connected != True:  # Wait for connection
        time.sleep(0.1)

    client.subscribe(topic_sub)

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("exiting")
        client.disconnect()
        client.loop_stop()


if __name__ == '__main__':
    run()
