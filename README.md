**SW selbst generieren mit Anpassungen**: `npx workbox injectManifest workbox-config.js` oder `npm run build`
* ermöglicht mehr Kontrolle über die finale SW-Datei
* geht davon aus, das man eine existierende SW-Datei geschrieben hat und in workbox-config.js hinterlegt hat
* wenn workbox injectManifest ausgeführt wird, schaut der Befehl nach dem Aufruf `precaching.precacheAndRoute([injectionPoint])` in der SW Datei
--> das leere Array wird automatisch ersetzt bzw. gefüllt mit einer Liste von URLs zum Precaching (URLs sind in config.js definiert), der Rest im SW wird nicht von workbox verändert
