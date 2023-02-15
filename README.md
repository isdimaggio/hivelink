![git2](https://user-images.githubusercontent.com/58268988/219010873-f47453ee-1d30-401c-9c87-490b8e3ca9c2.png)
------------------
### Implementazione sistema di monitoraggio e sicurezza arnie per il progetto PCTO Erasmus+

Si desidera fornire una serie di servizi legati al monitoraggio di alcuni parametri all’ interno di un arnia.    
Nello specifico deve essere possibile:
- visualizzare graficamente il valore della temperatura all’ interno dell’ arnia;
- visualizzare graficamente la percentuale di umidità;
- visualizzare graficamente il peso dell’arnia;
- combinare umidità e peso per prevedere la quantità di miele prodotta e visualizzarla graficamente;
- identificare ogni arnia tramite ID univoco, fotografia e colore;
- attivare il sistema di allarme in grado di percepire se un arnia è stata scoperchiata;
- attivare il sistema in grado di percepire l’accelerazione di movimento dell’ arnia.

Il Sistema è composto da una sensoristica relativa al monitoraggio dei parametri ed altri componenti elettronici atti alla sicurezza.    
I dati relativi al monitoraggio vengono inviati con cadenza oraria e vengono mantenuti in uno storico di lunghezza temporale uguale ad un mese per costituire i grafici.   


Un utente deve essere in grado di attivare e disattivare il sistema di sicurezza per entrare fisicamente nelle arnia e
per svolgere il proprio lavoro. Nel momento in cui il sistema di sicurezza è abilitato e si verifica un furto viene
mandato un allarme tramite SMS ed inizia il rintracciamento del dispositivo
sulla base delle sue coordinate geografiche. 


All’ interno di un apiario una sola arnia sarà abilitata all’ invio
dei dati per il monitoraggio, mentre tutte avranno il supporto alla sicurezza. Il sistema deve essere fruibile
attraverso un’ apposita applicazione mobile crossplatform e di una (anche temporanea) interfaccia web.
