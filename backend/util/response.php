<?php

/* 
    generates an API response in a standard format given the error flag,
    http status code and payload
*/
function HL_BrowserResponse(
    bool $isError = false,
    int $responseCode = 200,
    $payload
){
    $response = array(
        "status" => $isError ? "success" : "error",
        "payload" => $payload
    );

    http_response_code($responseCode);

    die(
        json_encode($response)
    );
}