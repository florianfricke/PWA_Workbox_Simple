console.log("Hello from Service Worker");
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

//Write here own Service Worker Code e.g. for Push Notifications
if (workbox) {
    console.log(`Workbox is loaded`);
    //placeholder for workbox, array filed by links in workbox-config.js file
    workbox.precaching.precacheAndRoute(injectionPoint);

} else {
    console.log(`Workbox didn't load`);
}
