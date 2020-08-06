//WICHTIG: nach jeder Änderung an dieser Datei, muss der SW neu gebaut werden
// https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.generateSW
module.exports = {
  globDirectory: ".",
  globPatterns: [ //precached Files
    "**/*.{css,js,html}"
  ],
  swDest: "sw.js",
  runtimeCaching: [
    {
      urlPattern: "http://192.168.99.100:8085/tasks", //new RegExp()
      handler: "NetworkFirst", //CacheFirst, CacheOnly, NetworkFirst, NetworkOnly, StaleWhileRevalidate
      method: "GET"
    }
  ]
};
