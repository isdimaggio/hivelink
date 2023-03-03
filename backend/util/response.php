<?php

/* 
    generates an API response in a standard format given the error flag,
    http status code and payload
*/
function HL_BrowserResponse(
    $payload = array(),
    bool $isError = false,
    int $responseCode = 200
){
    $response = array(
        "status" => $isError ? "error" : "success",
        "payload" => $payload
    );
    
    header("Content-Type: application/json");
    http_response_code($responseCode);

    die(
        json_encode($response)
    );
}