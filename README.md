**SW automatisch generieren**: `npx workbox generateSW workbox-config.js` oder `npm run build`
einfache schnelle Variante, aber nicht sinnvoll, wenn 
* You want to use other Service Worker features (i.e. Web Push).
* You want to import additional scripts or add additional logic.
