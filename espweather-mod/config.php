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


$db_address = "";           #indirizzo database
$db_user = "";                  #username database
$db_pass = "!";                  #password database
$db_name = "";             #nome database
$db_table = "meteo";                #nome tabella dati
$sensor_timeout = 1200;             #dopo quanti secondi il sensore può considerarsi offline (per mandare gli allarmi)
$enable_old_record_clear = true;    #se attivato elimina i record più vecchi di $old_record_clear_offset giorni
$old_record_clear_offset = 1;       #dopo quanti giorni cancellare i record vecchi (il valore minimo è due)