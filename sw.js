console.log("Hello from Service Worker");
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

//Write here own Service Worker Code e.g. for Push Notifications
if (workbox) {
    console.log(`Workbox is loaded`);
    // set logging
    workbox.setConfig({ debug: true });
    // placeholder for workbox, array filed by links in workbox-config.js file
    workbox.precaching.precacheAndRoute([{"revision":"3d4d5fc2a29550096eab34273894ab0d","url":"404.html"},{"revision":"ed186afb642e92a2cf9b7f20064be65f","url":"app.css"},{"revision":"cad839d7a08003fddc5f6ba92d28b8b0","url":"index.html"},{"revision":"f641688196c3c3355a5a8e895acb4c91","url":"offline.html"},{"revision":"171cbfecec0a18a3a3877d00523a1185","url":"app.js"}]);

    // NetworkFirst(), new NetworkOnly(), new CacheOnly()
    // images could be cached and used until they're a week old, after which they’ll need updating.
    // possible plugins: workbox-background-sync, workbox-broadcast-update, workbox-cacheable-response, workbox-expiration, workbox-range-requests
    // new RegExp('/(.*)image_folder(.*)\.(?:png|gif|jpg)/')
    workbox.routing.registerRoute(
        new RegExp('.+\\.jpg$'),
        new workbox.strategies.CacheFirst({
            cacheName: 'images-cache',
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: 2, // only cache 2 requests, maximum of 2 images in the cache, once 2 images has been reached, Workbox will remove the oldest image automatically
                    maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
                }),
            ],
        }),
    );
// new RegExp(http:\/\/via\.placeholder\.com\/640x360)
    workbox.routing.registerRoute(
        ({ url }) => url.origin === 'http://via.placeholder.com',
        new workbox.strategies.CacheFirst({
            cacheName: 'img-placeholders',
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: 10,
                    maxAgeSeconds: 5 * 60, // 5 minutes
                }),
            ],
        }),
    );

    workbox.routing.registerRoute(
        ({ url }) => url.pathname.endsWith('/tasks'),
        new workbox.strategies.NetworkFirst({
            cacheName: 'task2',
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: 10,
                    maxAgeSeconds: 5 * 60, // 5 minutes
                }),
            ],
        }),
    );

} else {
    console.log(`Workbox didn't load`);
}
