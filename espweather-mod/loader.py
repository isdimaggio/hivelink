#!/usr/bin/python3
"""
Copyright 2021 Vittorio Lo Mele

Licensed under the Apache License, Version 2.0 (the "License");
You may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. 
"""

import yaml
import json
import time
import requests
import mysql.connector
from datetime import datetime

with open('config.yaml', 'r') as ymlconfig:
    config = yaml.load(ymlconfig, Loader=yaml.FullLoader)

print("[i] Letto file di configurazione")

sqlink = mysql.connector.connect(
    host=config["db_address"],
    port=config["db_port"],
    user=config["db_user"],
    password=config["db_pass"],
    database=config["db_name"]
)

q = sqlink.cursor()
q.execute("CREATE TABLE IF NOT EXISTS `" + config["db_table"] + "` (id_meteo int(10) NOT NULL auto_increment, date date NOT NULL, time time NOT NULL, temp float NOT NULL, press float NOT NULL, umidit float NOT NULL, PRIMARY KEY (id_meteo));")

print("[i] Connesso al database...")

def fetch(): 
    try:
        jsondata = requests.get(config["sensor_endpoint"])
        data = jsondata.json()
        temp = data["temperatura"]
        press = data["pressione"]
        umidit = data["umidita"]
        insert = ("INSERT INTO `" + config["db_table"] + "` (date, time, temp, press, umidit) VALUES (CURDATE(), CURRENT_TIME(), %s, %s, %s);")
        insertdata = (float(temp), float(press), float(umidit))
        q = sqlink.cursor()
        q.execute(insert, insertdata)
        sqlink.commit()
        now = datetime.now()
        log = "[{}] - Nuova lettura dal sensore: Temperatura={} C°, Pressione={} Hpa, Umidità={} %".format(now, temp, press, umidit)
        print(log)
    except Exception as e:
        print("[!] Eccezione lanciata: " + str(e))

while True:
    fetch()
    time.sleep(config["read_interval"])