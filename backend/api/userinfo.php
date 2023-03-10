<?php

require "../init.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

if ($_SERVER["REQUEST_METHOD"] != "GET") {
    HL_BrowserResponse("Method not allowed", true, 405);
}

try {
    $decoded = JWT::decode(HL_GetBearerToken(), new Key($GLOBAL_CONFIG["JWT_SECRET"], 'HS256'));
} catch (Exception $th) {
    HL_BrowserResponse("Invalid authorization token", true, 401);
}

HL_BrowserResponse($decoded);