<?php

require "../init.php";

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    HL_BrowserResponse("Method not allowed", true, 405);
}

// check authorization pre shared key
if (
    strcmp(
        trim(HL_GetBearerToken()),
        trim($GLOBAL_CONFIG["MQHT_PSK"])
    ) !== 0
) {
    HL_BrowserResponse("Invalid authorization token", true, 401);
}

$request_body = array();

// decode post request body
try {
    $request_body = json_decode(file_get_contents('php://input'), true, 512, JSON_THROW_ON_ERROR);
} catch (\Throwable $th) {
    HL_BrowserResponse("Request body is not valid JSON: " . $th->getMessage(), true, 400);
}

// check if json is empty or has a malformed structure
if(!array_key_exists("MQHT_hive", $request_body)) {
    HL_BrowserResponse("Missing field: `MQHT_hive`", true, 400);
}

if(!array_key_exists("temperature", $request_body)) {
    HL_BrowserResponse("Missing field: `temperature`", true, 400);
}

if(!array_key_exists("humidity", $request_body)) {
    HL_BrowserResponse("Missing field: `humidity`", true, 400);
}

if(!array_key_exists("weight", $request_body)) {
    HL_BrowserResponse("Missing field: `weight`", true, 400);
}

if(!array_key_exists("telemetryEnabled", $request_body)) {
    HL_BrowserResponse("Missing field: `telemetryEnabled`", true, 400);
}

if(!array_key_exists("securityEnabled", $request_body)) {
    HL_BrowserResponse("Missing field: `securityEnabled`", true, 400);
}

if(!array_key_exists("batteryVoltage", $request_body)) {
    HL_BrowserResponse("Missing field: `batteryVoltage`", true, 400);
}

if(!array_key_exists("coverTriggered", $request_body)) {
    HL_BrowserResponse("Missing field: `coverTriggered`", true, 400);
}

if(!array_key_exists("accelerometerTriggered", $request_body)) {
    HL_BrowserResponse("Missing field: `accelerometerTriggered`", true, 400);
}

if(!array_key_exists("pos_lat", $request_body)) {
    HL_BrowserResponse("Missing field: `pos_lat`", true, 400);
}

if(!array_key_exists("pos_lon", $request_body)) {
    HL_BrowserResponse("Missing field: `pos_lon`", true, 400);
}

// check if the hive it is referencing to actually exists
$hive_id = $DB->real_escape_string($request_body["MQHT_hive"]);
$hive_query = "SELECT * FROM `Hive` WHERE `ID` = $hive_id";
$hive_res = $DB->query($hive_query);

if($hive_res->num_rows != 1){
    HL_BrowserResponse("The specified hive does not exist", true, 404);
}

// hive exists, prepare query
$stmt = $DB->prepare("
INSERT INTO `Payload`(
    `IDHive`,
    `Temperature`,
    `Humidity`,
    `Weight`,
    `TelemetryEnabled`,
    `SecurityEnabled`,
    `BatteryVoltage`,
    `CoverTriggered`,
    `AccelerometerTriggered`,
    `Latitude`,
    `Longitude`
)
VALUES(
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
);
");

$stmt->bind_param(
    "idddiidiiss",
    $IDHive,
    $Temperature,
    $Humidity,
    $Weight,
    $TelemetryEnabled,
    $SecurityEnabled,
    $BatteryVoltage,
    $CoverTriggered,
    $AccelerometerTriggered,
    $Latitude,
    $Longitude
);

// set data
$IDHive = $hive_id;
$Temperature = $request_body["temperature"];
$Humidity = $request_body["humidity"];
$Weight = $request_body["weight"];
$TelemetryEnabled = $request_body["telemetryEnabled"] ? 1 : 0;
$SecurityEnabled = $request_body["securityEnabled"] ? 1 : 0;
$BatteryVoltage = $request_body["batteryVoltage"];
$CoverTriggered = $request_body["coverTriggered"] ? 1 : 0;
$AccelerometerTriggered = $request_body["accelerometerTriggered"] ? 1 : 0;
$Latitude = $request_body["pos_lat"];
$Longitude = $request_body["pos_lon"];

$stmt->execute();

if ($stmt->errno) {
    HL_BrowserResponse("Database error " . $stmt->errno . ": " . $stmt->error, true, 500);
}

HL_BrowserResponse();