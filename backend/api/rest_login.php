<?php

require "../init.php";

use Firebase\JWT\JWT;

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    HL_BrowserResponse("Method not allowed", true, 405);
}

$request_body = array();

// decode post request body
try {
    $request_body = json_decode(file_get_contents('php://input'), true, 512, JSON_THROW_ON_ERROR);
} catch (\Throwable $th) {
    HL_BrowserResponse("Request body is not valid JSON: " . $th->getMessage(), true, 400);
}

// check if json is empty or has a malformed structure
if(!array_key_exists("email", $request_body)) {
    HL_BrowserResponse("Missing field: `email`", true, 400);
}

if(!array_key_exists("password", $request_body)) {
    HL_BrowserResponse("Missing field: `password`", true, 400);
}

$email = $DB->real_escape_string($request_body["email"]);
$password = $request_body["password"];

$query = "
SELECT
    `ID`,
    `Type`,
    `FirstName`,
    `LastName`,
    `Address`,
    `City`,
    `Province`,
    `Phone`,
    `Password`
FROM
    `User`
WHERE
    `Email` = '$email'
";

$result = $DB->query($query);

if($result->num_rows != 1) {
    HL_BrowserResponse("Invalid credentials query is $query", true, 401);
}

$row = $result->fetch_assoc();

if(
    password_verify($password, $row["Password"])
){
    unset($row["Password"]); // remove password from session payload
    $exp = $GLOBAL_CONFIG["JWT_VALID"];
    $row["exp"] = $NewDate=Date(strtotime("+$exp days"));
    $jwt = JWT::encode($row, $GLOBAL_CONFIG["JWT_SECRET"], 'HS256');
    HL_BrowserResponse($jwt);
}else {
    HL_BrowserResponse("Invalid credentials", true, 401);
}