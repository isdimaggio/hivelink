<?php
/* 
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
*/


require_once 'config.php';

if($_SERVER['REQUEST_METHOD'] == "OPTIONS"){
  header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
die();
}

header("Content-Type: application/json");
date_default_timezone_set('Europe/Rome');
$intervallo = $_GET["intervallo"];
$now = date("H:i:s");
$dnow = date("Y-m-d");
$nselector = "WHERE `time` BETWEEN '%s' AND '$now' AND `date` = '$dnow'";
$eselector = "WHERE `date` = '$dnow'";
//crea codice SQL in base all'intervallo di selezione dati
switch($intervallo){
    case "1h":
		$t=strtotime("-1 Hour");
        $ts = date("H:i:s", $t);
        $selector = sprintf($nselector, $ts);
        break;
    case "2h":
        $t=strtotime("-2 Hour");
        $ts = date("H:i:s", $t);
        $selector = sprintf($nselector, $ts);
        break;
    case "4h":
        $t=strtotime("-4 Hour");
        $ts = date("H:i:s", $t);
        $selector = sprintf($nselector, $ts);
        break;
    case "6h":
        $t=strtotime("-6 Hour");
        $ts = date("H:i:s", $t);
        $selector = sprintf($nselector, $ts);
        break;
    case "whole":
        $selector = $eselector;
        break;
    default:
        $t=strtotime("-1 Hour");
        $ts = date("H:i:s", $t);
        $selector = sprintf($nselector, $ts);
        break;
}
//effettua la query
$sqlink = mysqli_connect($db_address, $db_user, $db_pass, $db_name);
$r = $sqlink->query("SELECT * FROM `$db_table` ". $selector. " ORDER BY `id_meteo` DESC");
$al_r = $sqlink->query("SELECT * FROM `$db_table` ORDER BY `id_meteo` DESC LIMIT 1");
$darr = array();
//preleva i dati della prima riga e mettili da parte
$al_rr = $al_r->fetch_array(MYSQLI_ASSOC);
$primariga = $al_rr;
//crea array con dati
while($rr = $r->fetch_array(MYSQLI_ASSOC)){
    array_push($darr, $rr);
}
//calcola la differenza in secondi tra l'ultimo read ed il timestamp corrente
$statoallarme = false;
$a_diff = time() - strtotime($primariga["date"]. " ". $primariga["time"]);
if($a_diff > $sensor_timeout){
    $statoallarme = true; //se supera quella impostata in configurazione attiva lo stato allarme
}
if($enable_old_record_clear == true && $old_record_clear_offset >= 1){
    $offset = strtotime("-$old_record_clear_offset Day");
    $offset_ok = date("Y-m-d", $offset);
    $delq = $sqlink->query("DELETE FROM `$db_table` WHERE `date` <= '$offset_ok'");
}
//crea array di dati finale e stampa
$marr = array(
    "alarm" => $statoallarme,
    "date" => $primariga["date"],
    "time" => $primariga["time"],
    "temp" => $primariga["temp"],
    "press" => $primariga["press"],
    "umidit" => $primariga["umidit"],
    "datastore" => $darr
);
echo json_encode($marr);
