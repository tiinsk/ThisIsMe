
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": preferDefault(require("/Users/tiina/thisisme/.cache/dev-404-page.js")),
  "component---src-pages-404-js": preferDefault(require("/Users/tiina/thisisme/src/pages/404.js")),
  "component---src-pages-console-js": preferDefault(require("/Users/tiina/thisisme/src/pages/console.js")),
  "component---src-templates-index-js": preferDefault(require("/Users/tiina/thisisme/src/templates/index.js"))
}

