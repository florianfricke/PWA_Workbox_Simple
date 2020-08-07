console.log("Hello from Service Worker");
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

//Write here own Service Worker Code e.g. for Push Notifications
if (workbox) {
    console.log(`Workbox is loaded`);
    //placeholder for workbox, array filed by links in workbox-config.js file
    workbox.precaching.precacheAndRoute([{"revision":"3d4d5fc2a29550096eab34273894ab0d","url":"404.html"},{"revision":"ed186afb642e92a2cf9b7f20064be65f","url":"app.css"},{"revision":"9da4ea0d2670e132dba78fc224779d3a","url":"index.html"},{"revision":"f641688196c3c3355a5a8e895acb4c91","url":"offline.html"},{"revision":"171cbfecec0a18a3a3877d00523a1185","url":"app.js"}]);
} else {
    console.log(`Workbox didn't load`);
}
