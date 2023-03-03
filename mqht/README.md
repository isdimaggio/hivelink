# hivelink/mqht

MQTT <--> HTTP translation layer, makes a web request to the backend for every incoming message   
Requires `paho-mqtt` package.   

### Environment variables needed
- `BROKER_ADDRESS`
- `BROKER_PORT`
- `BROKER_USERNAME`
- `BROKER_PASSWORD`
- `BACKEND` (backend url like http://cloud.hivelink.local/api/ingest.php)
- `MQHT_PSK` (the pre shared key)