# Workbox Inject Manifest
**SW selbst generieren mit Anpassungen**: `npx workbox injectManifest workbox-config.js` oder `npm run build`
* ermöglicht mehr Kontrolle über die finale SW-Datei
* geht davon aus, das man eine existierende SW-Datei geschrieben hat und in workbox-config.js hinterlegt hat
* wenn workbox injectManifest ausgeführt wird, schaut der Befehl nach dem Aufruf `precaching.precacheAndRoute([injectionPoint])` in der SW Datei
--> das leere Array wird automatisch ersetzt bzw. gefüllt mit einer Liste von URLs zum Precaching (URLs sind in config.js definiert), der Rest im SW wird nicht von workbox verändert

## Example Configurations
```js
    // Whenever your app requests the logo image
    // TESTEN OB DAS MIT BILDERN GEHT
    workbox.routing.registerRoute(
        '/logo.png', //https://some-other-origin.com/logo.png
        handler
    );

    workbox.routing.registerRoute(
        new RegExp('.+\\.js$'), //ermöglicht js/app.js und https://www.../js/app.js
        jsHandler
    );

    workbox.routing.registerRoute(
        ({url}) => url.pathname.startsWith('/images/avatars/'),
        new workbox.strategies.StaleWhileRevalidate()
    );

    //____Cache Resources Based on Resource Type
    // route that will match any requests that have a destination property set to 'script'.
    workbox.routing.registerRoute(
        ({request}) => request.destination === 'style', //oder image
        new workbox.strategies.CacheFirst({
            cachName: 'styles-cache'
        }) // NetworkFirst(), new NetworkOnly(), new CacheOnly()
    );


    import {registerRoute} from 'workbox-routing';
    import {NetworkFirst, StaleWhileRevalidate} from 'workbox-strategies';
    import {CacheFirst} from 'workbox-strategies';

    // https://developers.google.com/web/tools/workbox/guides/configure-workbox#custom_fetch_options_in_strategies
    // outgoing requests matching a given third-party URL end up using a credentials mode of 'include'
    registerRoute(
    ({url}) => url.origin === 'https://third-party.example.com',
    new NetworkFirst({
        fetchOptions: {
            credentials: 'include',
            method: 'GET'
        },
    })
    );

    registerRoute(
        ({url}) => url.origin === 'https://fonts.googleapis.com' ||
                    url.origin === 'https://fonts.gstatic.com',
        new StaleWhileRevalidate()
    );


    import {CacheableResponsePlugin} from 'workbox-cacheable-response';
    import {ExpirationPlugin} from 'workbox-expiration';

    // Cache only API Data, when the response has a status between 0 and 200
    // new workbox.cacheableResponse.CacheableResponsePlugin({
    registerRoute(
    'https://cdn.google.com/example-script.min.js',
    new CacheFirst({
        plugins: [
            new ExpirationPlugin({
                maxEntries: 50,
                maxAgeSeconds: 5 * 60, // 5 minutes,
                // Automatically cleanup if quota is exceeded.
                purgeOnQuotaError: true
            }),
            new CacheableResponsePlugin({
                statuses: [0, 200]
            })
        ]
    }),
    );
```

The stylesheet can change frequently, so it's best to use a caching strategy like stale while revalidate that checks for updates with every request. The font files themselves, on the other hand, do not change and can leverage a cache first strategy.
``` js
    // Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
    registerRoute(
    ({url}) => url.origin === 'https://fonts.googleapis.com',
        new StaleWhileRevalidate({
            cacheName: 'google-fonts-stylesheets',
        })
    );

    // Cache the underlying font files with a cache-first strategy for 1 year.
    registerRoute(
    ({url}) => url.origin === 'https://fonts.gstatic.com',
    new CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
        new CacheableResponsePlugin({
            statuses: [0, 200],
        }),
        new ExpirationPlugin({
            maxAgeSeconds: 60 * 60 * 24 * 365, //1 Year
            maxEntries: 30,
        }),
        ],
    })
    );
```

## Debugging/Logging
```
// Force development builds
workbox.setConfig({ debug: true });

// Force production builds
workbox.setConfig({ debug: false });
```

## Workbox Plugins
htps://developers.google.com/web/tools/workbox/guides/using-plugins#workbox_plugins
* BackgroundSyncPlugin: If a network request ever fails, add it to a background sync queue and retry the request when the next sync event is triggered.
* BroadcastUpdatePlugin: Whenever a cache is updated, dispatch a message on a Broadcast Channel or via postMessage().
* CacheableResponsePlugin: Only cache requests that meet a certain criteria.
* ExpirationPlugin: Manage the number and maximum age of items in the cache.
* RangeRequestsPlugin: Respond to requests that include a Range: header with partial content from a cache.