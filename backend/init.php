<?php

require "config.php";
require "util/inc.php"; # imports all utility functions
require "vendor/autoload.php"; # imports all composer libraries

error_reporting(E_ERROR);

// create database connection instance
$DB = new mysqli(
    $GLOBAL_CONFIG["DB_HOST"], 
    $GLOBAL_CONFIG["DB_USER"], 
    $GLOBAL_CONFIG["DB_PASS"], 
    $GLOBAL_CONFIG["DB_NAME"]
);

// check connection
if ($DB->connect_error) {
    HL_BrowserResponse("Database connection failed: " + $DB->connect_error, true, 500);
}