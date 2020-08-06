# Workbox Tutorial
## Workbox CLI
package.json initialisieren: `npm init -y`
`npm install workbox-cli --save-dev`
`npx workbox --version`
`npx workbox --help`
worbox konfiguration Datei erstellen: `npx workbox wizard` 
```
? Please enter the path to the root of your web app: .
? Which file types would you like to precache? css, js, html
? Where would you like your service worker file to be saved? sw.js
? Where would you like to save these configuration options? workbox-config.js

To build your service worker, run

  workbox generateSW workbox-config.js

as part of a build process. See https://goo.gl/fdTQBf for details.
You can further customize your service worker by making changes to workbox-config.js. See https://goo.gl/gVo87N for details. 
```
**SW automatisch generieren**: `npx workbox generateSW workbox-config.js`
einfache schnelle Variante, aber nicht sinnvoll, wenn 
* You want to use other Service Worker features (i.e. Web Push).
* You want to import additional scripts or add additional logic.

**SW selbst angepasst generieren**: `npx workbox injectManifest workbox-config.js`
* ermöglicht mehr Kontrolle über die finale SW-Datei
* geht davon aus, das man eine existierende SW-Datei geschrieben hat und in workbox-config.js hinterlegt hat
* wenn workbox injectManifest ausgeführt wird, schaut der Befehl nach dem Aufruf `precaching.precacheAndRoute([])` in der SW Datei
--> das leere Array wird automatisch ersetzt bzw. gefüllt mit einer Liste von URLs zum Precaching (URLs sind in config.js definiert), der Rest im SW wird nicht von workbox verändert

**ODER** `npm build` ausführen, da `workbox <mode> workbox-config.js` nun als build befehl in package.json hinterlegt ist.

## Workbox CLI in Build Process integrieren
* für Webpack gibt es ein workbox-webpack-plugin -> cli nicht sinnvoll
* bei Verwendung von npm Skripten ist die CLI eine gute Wahl
* dafür: `package.json` (<mode> with generateSW or injectManifest)
    ```
    {
        "scripts": {
            "build": "my-build-script && workbox <mode> <path/to/config.js>"
        }
    }
    ```
