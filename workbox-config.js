//WICHTIG: nach jeder Änderung an dieser Datei, muss der SW neu gebaut werden
// https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.generateSW
module.exports = {
  globDirectory: ".",
  globPatterns: [ //precached Files
    "**/*.{css,html}",
    "app.js"
  ],
  swDest: "sw.js",
  swSrc: "src-sw.js",
  injectionPoint: "injectionPoint"

  // , globIgnores: [
  //   "workbox-config.js"
  // ]
};
//runtimeCaching now handled in src-sw.js