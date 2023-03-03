<?php

require "../init.php";

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    HL_BrowserResponse("Method not allowed", true, 405);
}

// check authorization pre shared key
// cron job is called from mqht
if (
    strcmp(
        trim(HL_GetBearerToken()),
        trim($GLOBAL_CONFIG["MQHT_PSK"])
    ) !== 0
) {
    HL_BrowserResponse("Invalid authorization token", true, 401);
}

// do actual cron job work here


HL_BrowserResponse("cron job completed");