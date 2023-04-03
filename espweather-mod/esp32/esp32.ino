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

/*!
* IMPORTAZIONE LIBRERIE
* Installare le librerie DHT ed Adafruit_BMP280.
*/
#include <DHT.h>
#include <Adafruit_BMP280.h>
#include <WiFi.h>
#include <WiFiClient.h>
#include <WebServer.h>


/*!
* CONFIGURAZIONE PER L'UTENTE
* Inserire qui tutti i dati necessari alla configurazione del dispositivo.
* Le informazioni necessarie da inserire sono WL_SSID e WL_PASSWORD, le altre
* possono essere lasciate come default.
*/
#define WL_SSID 		"ssid"	   			/*! \def SSID (nome) della rete wifi a cui il dispositivo deve connettersi */
#define WL_PASSWORD 	"pass" 				/*! \def Password della rete wifi a cui il dispositivo deve connettersi */
#define IO_SDA 			21		   			/*! \def Pin a cui è connesso il piedino SDA del sensore di pressione */
#define IO_SCL 			22		   			/*! \def Pin a cui è connesso il piedino SCL del sensore di pressione */
#define IO_DHT 			4		   			/*! \def Pin a cui è connesso il piedino dati del sensore di temperatura */
#define IO_LED			2					/*! \def Pin a cui è connesso un led di segnaletica */
#define IO_BMP 			0x76		   		/*! \def Indirizzo I2C su cui comunica il sensore di pressione */
#define WS_PORT 		80		   			/*! \def Porta su cui è in ascolto il WebServer */


/*!
* VARIABILI GLOBALI
*/
float buftemp, bufhum, bufpress; 			/*!< Buffers dove vengono memorizzati temporaneamente i dati di temperatura, umidità e pressione */
WebServer server(WS_PORT);		 			/*!< Istanza del webserver */
bool startup = true;			 			/*!< Variabile di avvio, diventa falsa in caso di problemi con i sensori */
int currt = millis();			 			/*!< Memorizza l'ultima lettura dei sensori,  */
Adafruit_BMP280 bmp280;			 			/*!< Istanza del sensore di pressione */
DHT dht22(IO_DHT, DHT22);		 			/*!< Istanza del sensore di temperatura ed umidità */


/*! \brief Funzione di startup
 *
 *  Funzione di startup, eseguita una volta sola all'avvio del programma.
 *	Si occupa di inizializzare la seriale, connettersi alla rete wifi
 *	ed inizializzare i sensori per le letture.
 */
void setup()
{
	Serial.begin(115200);

	/*!
	 * Connessione alla rete wifi.
	 * Stampa anche su seriale l'indirizzo IP ottenuto dal DHCP.
	 */
	Serial.print("Connettendo a ");
	Serial.println(WL_SSID);
	WiFi.begin(WL_SSID, WL_PASSWORD); 
	while (WiFi.status() != WL_CONNECTED)	// se non ancora connesso
	{
		/*!
	 	 * Finchè non è connesso ogni 200 ms stampa '#' sulla seriale.
	 	 * Crea una specie di "progress bar".
	 	 */
		delay(200);
		Serial.print("#");
	}
	Serial.println("");
	Serial.println("WiFi Connesso!");
	Serial.println("Indirizzo IP: ");
	Serial.println(WiFi.localIP());
	server.on("/", stampaMisure); // comunica all'esp quale funzione chiamare per la root
	server.begin();	// avvia il server

	/*!
	 * Inzializzazione del sensore di pressione.
	 * Prima aggancia la comunicazione I2C, poi verifica l'avvenuta connessione con il sensore.
	 * Se non connesso setta la flag per la visualizzazione degli errori.
	 * Per finire, imposta tutte le settings di default del sensore per permettere la misurazione.
	 */
	Wire.begin(IO_SDA, IO_SCL); // startiamo la libreria i2c sui pin impostati sopra
	if (!bmp280.begin(IO_BMP))
	{
		Serial.println("Inizializzazione del sensore di pressione fallita :( ");
		startup = false; // init fallita del sensore, flagga la variabile di start
	}
	else
	{
		// settings di default, non modifiare
		bmp280.setSampling(Adafruit_BMP280::MODE_NORMAL,	 /* Operating Mode. */
						   Adafruit_BMP280::SAMPLING_X2,	 /* Temp. oversampling */
						   Adafruit_BMP280::SAMPLING_X16,	 /* Pressure oversampling */
						   Adafruit_BMP280::FILTER_X16,		 /* Filtering. */
						   Adafruit_BMP280::STANDBY_MS_500); /* Standby time. */
		Serial.println("Sensore di pressione OK");
	}

	/*!
	 * Inizializza il sensore di temperatura ed umidità.
	 * Una volta tentata la connessione al sensore aspetta 2 secondi (cooldown letture),
	 * successivamente verifica l'avvenuta connessione provando a fare una lettura e verificando se è nulla.
	 * In caso di errori flagga la variabile di start.
	 */
	dht22.begin();
	delay(2000);
	if (isnan(dht22.readTemperature()))
	{
		Serial.println("Inizializzazione del sensore di temperatura ed umidità fallita :( ");
		startup = false;
	}
	else
	{
		Serial.println("Sensore temperatura ed umidità OK");
	}

	/*!
	 * Controllo flag di startup.
	 * Esegui tutte le operazioni necessarie per quando c'è un problema sui sensori.
	 * In questo caso fai lampeggiare il led integrato.
	 */
	if (!startup)
	{
		pinMode(IO_LED, OUTPUT); // setta il pin come output
		while(true) // in anomalia, ripeti all'infinito
		{
			delay(500);
			digitalWrite(IO_LED, HIGH);
			delay(500);
			digitalWrite(IO_LED, LOW);
		}
	}
}

/*! \brief Funzione di loop
 *
 * Esegui a ripetizione finchè non si spegne il dispositivo.
 * In questa funzione si prelevano nuovi dati ogni due secondi
 * e si rispondono alle richieste in entrata.
 */
void loop()
{
	if (millis() - currt > 2000)
	{									   // controlla se sono passati più di due secondi dall'ultima lettura
		buftemp = dht22.readTemperature(); // fai le letture e inseriscile nei buffer
		bufhum = dht22.readHumidity();	   // ...
		bufpress = bmp280.readPressure();  // ...
		currt = millis();				   // aggiorna la variabile dell'ultima lettura
	}
	server.handleClient(); // vedi se ci sono richieste e rispondi
}

/*! \brief Funzione di stampa json
 *
 * La funzione genera un payload json da restituire ad ogni richiesta.
 */
void stampaMisure()
{
	String msg;
	msg += "{\"temperatura\": ";
	msg += buftemp;
	msg += ", \"umidita\": ";
	msg += bufhum;
	msg += ", \"pressione\": ";
	msg += bufpress;
	msg += "}";
	server.send(200, "application/json", msg); // invia risposta
}