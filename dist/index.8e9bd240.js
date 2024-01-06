// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"hdaM1":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "78fcd0ac8e9bd240";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && ![
        "localhost",
        "127.0.0.1",
        "0.0.0.0"
    ].includes(hostname) ? "wss" : "ws";
    var ws;
    try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        if (e.message) console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"1jwFz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "appState", ()=>appState);
var _1Png = require("./assets/1.png");
var _1PngDefault = parcelHelpers.interopDefault(_1Png);
var _2Png = require("./assets/2.png");
var _2PngDefault = parcelHelpers.interopDefault(_2Png);
var _4Png = require("./assets/4.png");
var _4PngDefault = parcelHelpers.interopDefault(_4Png);
var _render = require("./src/render");
var _state = require("./src/state");
var _utils = require("./src/utils");
const penElement = document.getElementById("pen");
const eraserElement = document.getElementById("eraser");
const symmetryElement = document.getElementById("symmetry");
const undoElement = document.getElementById("undo");
const scaleElement = document.getElementById("scale");
const colorPicker = document.getElementById("color");
const frame = document.getElementById("editor-frame");
const canvas = document.getElementById("editor");
const guideCanvas = document.getElementById("guide");
const renderCanvas = document.getElementById("render");
canvas.width = (0, _state.tileSize) * (0, _state.editorRatio) * 3;
canvas.height = (0, _state.tileSize) * (0, _state.editorRatio) * 3;
guideCanvas.width = (0, _state.tileSize) * (0, _state.editorRatio) * 3;
guideCanvas.height = (0, _state.tileSize) * (0, _state.editorRatio) * 3;
let sizeIndex = 2;
const sizeList = [
    1,
    2,
    4
];
const pngList = [
    (0, _1PngDefault.default),
    (0, _2PngDefault.default),
    (0, _4PngDefault.default)
];
let pixelRatio = sizeList[sizeIndex];
let lastTouchEnd = 0;
renderCanvas.width = (0, _state.tileSize) * pixelRatio * 3;
renderCanvas.height = (0, _state.tileSize) * pixelRatio * 3;
scaleElement.addEventListener("click", ()=>{
    sizeIndex = (sizeIndex + 1) % sizeList.length;
    scaleElement.src = pngList[sizeIndex];
    pixelRatio = sizeList[sizeIndex];
    renderCanvas.width = (0, _state.tileSize) * pixelRatio * 3;
    renderCanvas.height = (0, _state.tileSize) * pixelRatio * 3;
    (0, _render.renderMap)(map, pixelRatio);
    (0, _render.setBorder)(map, pixelRatio);
    updateFrameHeight();
});
const appState = {
    paintColor: "#000000"
};
if (colorPicker) colorPicker.addEventListener("input", (e)=>{
    const input = e.target;
    appState.paintColor = input.value;
    (0, _render.renderMap)(map, pixelRatio);
    (0, _render.setBorder)(map, pixelRatio);
});
else console.error("Color picker element not found");
function updateFrameHeight() {
    frame.style.height = `${canvas.getBoundingClientRect().width}px`;
}
document.addEventListener("DOMContentLoaded", updateFrameHeight);
window.addEventListener("resize", updateFrameHeight);
let isDown = false;
let isErasing = false;
let rotationalSymmetry = true;
symmetryElement.addEventListener("click", ()=>{
    rotationalSymmetry = !rotationalSymmetry;
    symmetryElement.classList.toggle("selected");
});
eraserElement.addEventListener("click", ()=>{
    isErasing = true;
    eraserElement.classList.add("selected");
    penElement.classList.remove("selected");
});
penElement.addEventListener("click", ()=>{
    isErasing = false;
    penElement.classList.add("selected");
    eraserElement.classList.remove("selected");
});
let map = (0, _utils.newGrid)();
let undoStack = [
    JSON.stringify(map)
];
function pushUndo() {
    const candidate = JSON.stringify(map);
    const top = undoStack[undoStack.length - 1];
    if (candidate === top) return;
    undoStack.push(candidate);
    if (undoStack.length > 50) undoStack.shift();
    undoElement.classList.add("selected");
}
function popUndo() {
    undoStack.pop();
    const old = undoStack[undoStack.length - 1];
    if (old) {
        map = JSON.parse(old);
        (0, _render.cleanMap)();
        (0, _render.renderMap)(map, pixelRatio);
        (0, _render.setBorder)(map, pixelRatio);
    }
}
undoElement.addEventListener("click", (event)=>{
    popUndo();
    if (undoStack.length < 2) undoElement.classList.remove("selected");
    event.preventDefault();
});
(0, _render.drawGuide)();
(0, _render.renderMap)(map, pixelRatio);
(0, _render.setBorder)(map, pixelRatio);
function draw(loc, v) {
    if (isDown) (0, _utils.setLoc)(map, loc, 1 - v);
}
function handleEvent(event, isClick = false, isHover = false) {
    const { left, top, width, height } = canvas.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;
    const canvasX = x / width * canvas.width;
    const canvasY = y / height * canvas.height;
    const gridX = Math.floor(canvasX / (0, _state.editorRatio));
    const gridY = Math.floor(canvasY / (0, _state.editorRatio));
    const rotatePairs = rotationalSymmetry ? (0, _utils.rotationSet)([
        gridX,
        gridY
    ]) : [
        [
            gridX,
            gridY
        ]
    ];
    (0, _render.cleanMap)();
    rotatePairs.forEach(([gX, gY])=>{
        const sx = Math.floor(gX / (0, _state.tileSize));
        const sy = Math.floor(gY / (0, _state.tileSize));
        const cx = gX % (0, _state.tileSize);
        const cy = gY % (0, _state.tileSize);
        const loc = [
            sx,
            sy,
            cx,
            cy
        ];
        if (sx < 0 || sx > 2 || sy < 0 || sy > 2) return;
        if (isHover) (0, _render.renderHover)(map, loc);
        let v = (0, _utils.getLoc)(map, loc);
        if (!isClick) v = 0;
        if (isErasing) v = 1;
        draw(loc, v);
    });
    (0, _render.renderMap)(map, pixelRatio);
    setTimeout(()=>(0, _render.setBorder)(map, pixelRatio), 0);
}
canvas.addEventListener("mousedown", (event)=>{
    isDown = true;
    handleEvent(event, true);
});
canvas.addEventListener("mousemove", (event)=>{
    handleEvent(event, false, true);
});
canvas.addEventListener("mouseout", ()=>{
    (0, _render.cleanMap)();
    (0, _render.renderMap)(map, pixelRatio);
});
window.addEventListener("mousedown", ()=>{
    isDown = true;
});
window.addEventListener("mouseup", ()=>{
    isDown = false;
    pushUndo();
});
canvas.addEventListener("touchend", ()=>{
    isDown = false;
    pushUndo();
});
canvas.addEventListener("touchstart", (event)=>{
    isDown = true;
    event.preventDefault();
    [
        ...event.targetTouches
    ].forEach((touch)=>{
        handleEvent({
            clientX: touch.clientX,
            clientY: touch.clientY
        });
    });
});
canvas.addEventListener("touchmove", (event)=>{
    event.preventDefault();
    isDown = true;
    [
        ...event.targetTouches
    ].forEach((touch)=>{
        handleEvent({
            clientX: touch.clientX,
            clientY: touch.clientY
        });
    });
});
window.addEventListener("touchend", (event)=>{
    if (event.timeStamp - lastTouchEnd <= 500) {
        event.preventDefault();
        const targetElement = event.target;
        targetElement.click();
    }
    isDown = false;
    lastTouchEnd = event.timeStamp;
});

},{"./assets/1.png":"lCmg7","./assets/2.png":"f6QAk","./assets/4.png":"1bTwJ","./src/render":"9AS2t","./src/state":"1Yeju","./src/utils":"dsXzW","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lCmg7":[function(require,module,exports) {
module.exports = require("2e9f5b9391017440").getBundleURL("ao0Rz") + "1.b811bfb1.png" + "?" + Date.now();

},{"2e9f5b9391017440":"lgJ39"}],"lgJ39":[function(require,module,exports) {
"use strict";
var bundleURL = {};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ("" + err.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return "/";
}
function getBaseURL(url) {
    return ("" + url).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/, "$1") + "/";
}
// TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ("" + url).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^/]+/);
    if (!matches) throw new Error("Origin not found");
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}],"f6QAk":[function(require,module,exports) {
module.exports = require("adb958ce30f75600").getBundleURL("ao0Rz") + "2.4bb283f9.png" + "?" + Date.now();

},{"adb958ce30f75600":"lgJ39"}],"1bTwJ":[function(require,module,exports) {
module.exports = require("e55ca42c0551aad1").getBundleURL("ao0Rz") + "4.80a28040.png" + "?" + Date.now();

},{"e55ca42c0551aad1":"lgJ39"}],"9AS2t":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderMap", ()=>renderMap);
parcelHelpers.export(exports, "drawGuide", ()=>drawGuide);
parcelHelpers.export(exports, "setBorder", ()=>setBorder);
parcelHelpers.export(exports, "renderHover", ()=>renderHover);
parcelHelpers.export(exports, "cleanMap", ()=>cleanMap);
var _copyToClipboard = require("copy-to-clipboard");
var _copyToClipboardDefault = parcelHelpers.interopDefault(_copyToClipboard);
var _state = require("./state");
var _utils = require("./utils");
var _index = require("../index");
const target = document.getElementById("target");
const canvas = document.getElementById("editor");
const guideCanvas = document.getElementById("guide");
const renderCanvas = document.getElementById("render");
const ctx = canvas.getContext("2d");
const guideCtx = guideCanvas.getContext("2d");
const renderCtx = renderCanvas.getContext("2d");
if (!ctx || !renderCtx || !guideCtx) throw new Error("Canvas context could not be retrieved");
renderCtx.imageSmoothingEnabled = false;
function cleanMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function renderMap(map, pixelRatio) {
    renderCtx.fill();
    for(let sx = 0; sx < 3; sx++)for(let sy = 0; sy < 3; sy++){
        for(let cx = 0; cx < (0, _state.tileSize); cx++)for(let cy = 0; cy < (0, _state.tileSize); cy++){
            const v = (0, _utils.getLoc)(map, [
                sx,
                sy,
                cx,
                cy
            ]);
            const fillColor = v === 1 ? (0, _index.appState).paintColor : "#fff0";
            ctx.fillStyle = fillColor;
            renderCtx.fillStyle = fillColor;
            const gridX = (sx * (0, _state.tileSize) + cx) * pixelRatio;
            const gridY = (sy * (0, _state.tileSize) + cy) * pixelRatio;
            if (!(sx === 1 && sy === 1)) {
                renderCtx.clearRect(gridX, gridY, pixelRatio, pixelRatio);
                renderCtx.fillRect(gridX, gridY, pixelRatio, pixelRatio);
                const adjustedGridX = gridX * (0, _state.editorRatio) / pixelRatio;
                const adjustedGridY = gridY * (0, _state.editorRatio) / pixelRatio;
                ctx.fillRect(adjustedGridX + 1, adjustedGridY + 1, (0, _state.editorRatio) - 1, (0, _state.editorRatio) - 1);
            }
        }
    }
    renderVector(map, pixelRatio);
}
function drawGuide() {
    for(let index = 1; index < 3; index++){
        guideCtx.strokeStyle = "#33f";
        guideCtx.lineWidth = 0.5;
        let x = index * canvas.width / 3;
        guideCtx.beginPath();
        guideCtx.moveTo(x, 0);
        guideCtx.lineTo(x, canvas.height);
        guideCtx.stroke();
        guideCtx.beginPath();
        guideCtx.moveTo(0, x);
        guideCtx.lineTo(canvas.height, x);
        guideCtx.stroke();
    }
    for(let index = 0.0; index < 3 * (0, _state.tileSize); index++){
        guideCtx.strokeStyle = "#ccc";
        let x = index * canvas.width / (3 * (0, _state.tileSize));
        guideCtx.beginPath();
        guideCtx.moveTo(x, 0);
        guideCtx.lineTo(x, canvas.height);
        guideCtx.stroke();
        guideCtx.beginPath();
        guideCtx.moveTo(0, x);
        guideCtx.lineTo(canvas.height, x);
        guideCtx.stroke();
    }
    let third = canvas.width / 3;
    guideCtx.clearRect(third + 1, third + 1, third - 2, third - 2);
    guideCtx.beginPath();
    guideCtx.moveTo(third * 1, third * 2);
    guideCtx.lineTo(third * 2, third * 1);
    guideCtx.stroke();
    guideCtx.beginPath();
    guideCtx.moveTo(third * 1, third * 1);
    guideCtx.lineTo(third * 2, third * 2);
    guideCtx.stroke();
}
function setBorder(map, pixelRatio) {
    let dataURI = renderVector(map, pixelRatio);
    let style = document.getElementById("border-style");
    if (style) style.remove();
    style = document.createElement("style");
    style.id = "border-style";
    document.head.appendChild(style);
    if (!style.sheet) throw new Error("Style sheet could not be retrieved");
    let viewsize = (0, _state.tileSize) * pixelRatio;
    let css = `.bordy {
    border-image:  url("${dataURI}") ${viewsize} /  ${viewsize}px / 0 round;
    border-width:  ${viewsize}px;
    border-style:  solid;
}`;
    style.sheet.insertRule(css);
    target.textContent = css;
}
function svgToDataURL(svgStr) {
    const encoded = encodeURIComponent(svgStr).replace(/'/g, "%27").replace(/"/g, "%22");
    const header = "data:image/svg+xml,";
    const dataUrl = header + encoded;
    return dataUrl;
}
function renderVector(map, pixelRatio) {
    let content = `<svg 
      width="${(0, _state.tileSize) * pixelRatio * 3}px"
      height="${(0, _state.tileSize) * pixelRatio * 3}px"
      viewBox="0 0 ${(0, _state.tileSize) * pixelRatio * 3} ${(0, _state.tileSize) * pixelRatio * 3}" 
      fill="${(0, _index.appState).paintColor}"
      stroke="none"
      xmlns="http://www.w3.org/2000/svg"
      >`;
    for(let sx = 0; sx < 3; sx++)for(let sy = 0; sy < 3; sy++){
        for(let cx = 0; cx < (0, _state.tileSize); cx++)for(let cy = 0; cy < (0, _state.tileSize); cy++){
            let v = (0, _utils.getLoc)(map, [
                sx,
                sy,
                cx,
                cy
            ]);
            let gridX = (sx * (0, _state.tileSize) + cx) * pixelRatio;
            let gridY = (sy * (0, _state.tileSize) + cy) * pixelRatio;
            if (sx == 1 && sy == 1) continue;
            if (v == 1) content += `<rect x="${gridX}" y="${gridY}" width="${pixelRatio}px" height="${pixelRatio}px"/>`;
        }
    }
    content += "</svg>";
    let dataURI = svgToDataURL(content);
    return dataURI;
}
function renderHover(map, loc) {
    let x = loc[0] * (0, _state.tileSize) + loc[2];
    let y = loc[1] * (0, _state.tileSize) + loc[3];
    ctx.fillStyle = (0, _utils.getLoc)(map, loc) == 1 ? "#dde" : "#dde";
    if (loc[0] == 1 && loc[1] == 1) return;
    ctx.fillRect(x * (0, _state.editorRatio) + 0, y * (0, _state.editorRatio) + 0, (0, _state.editorRatio) - 0, (0, _state.editorRatio) - 0);
}
target.addEventListener("click", copyTarget);
function resetCopy() {
    target.setAttribute("data-after", "[Click to copy]");
}
resetCopy();
function copyTarget() {
    const textToCopy = target.textContent || "";
    (0, _copyToClipboardDefault.default)(textToCopy, {
        message: "Press #{key} to copy css"
    });
    target.setAttribute("data-after", "Copied to your clipboard!");
    target.classList.remove("flash");
    window.setTimeout(()=>{
        target.classList.add("flash");
    }, 1);
    window.setTimeout(resetCopy, 2500);
}

},{"copy-to-clipboard":"fLPFI","./state":"1Yeju","./utils":"dsXzW","../index":"1jwFz","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fLPFI":[function(require,module,exports) {
"use strict";
var deselectCurrent = require("b270149f26797c52");
var clipboardToIE11Formatting = {
    "text/plain": "Text",
    "text/html": "Url",
    "default": "Text"
};
var defaultMessage = "Copy to clipboard: #{key}, Enter";
function format(message) {
    var copyKey = (/mac os x/i.test(navigator.userAgent) ? "\u2318" : "Ctrl") + "+C";
    return message.replace(/#{\s*key\s*}/g, copyKey);
}
function copy(text, options) {
    var debug, message, reselectPrevious, range, selection, mark, success = false;
    if (!options) options = {};
    debug = options.debug || false;
    try {
        reselectPrevious = deselectCurrent();
        range = document.createRange();
        selection = document.getSelection();
        mark = document.createElement("span");
        mark.textContent = text;
        // avoid screen readers from reading out loud the text
        mark.ariaHidden = "true";
        // reset user styles for span element
        mark.style.all = "unset";
        // prevents scrolling to the end of the page
        mark.style.position = "fixed";
        mark.style.top = 0;
        mark.style.clip = "rect(0, 0, 0, 0)";
        // used to preserve spaces and line breaks
        mark.style.whiteSpace = "pre";
        // do not inherit user-select (it may be `none`)
        mark.style.webkitUserSelect = "text";
        mark.style.MozUserSelect = "text";
        mark.style.msUserSelect = "text";
        mark.style.userSelect = "text";
        mark.addEventListener("copy", function(e) {
            e.stopPropagation();
            if (options.format) {
                e.preventDefault();
                if (typeof e.clipboardData === "undefined") {
                    debug && console.warn("unable to use e.clipboardData");
                    debug && console.warn("trying IE specific stuff");
                    window.clipboardData.clearData();
                    var format = clipboardToIE11Formatting[options.format] || clipboardToIE11Formatting["default"];
                    window.clipboardData.setData(format, text);
                } else {
                    e.clipboardData.clearData();
                    e.clipboardData.setData(options.format, text);
                }
            }
            if (options.onCopy) {
                e.preventDefault();
                options.onCopy(e.clipboardData);
            }
        });
        document.body.appendChild(mark);
        range.selectNodeContents(mark);
        selection.addRange(range);
        var successful = document.execCommand("copy");
        if (!successful) throw new Error("copy command was unsuccessful");
        success = true;
    } catch (err) {
        debug && console.error("unable to copy using execCommand: ", err);
        debug && console.warn("trying IE specific stuff");
        try {
            window.clipboardData.setData(options.format || "text", text);
            options.onCopy && options.onCopy(window.clipboardData);
            success = true;
        } catch (err) {
            debug && console.error("unable to copy using clipboardData: ", err);
            debug && console.error("falling back to prompt");
            message = format("message" in options ? options.message : defaultMessage);
            window.prompt(message, text);
        }
    } finally{
        if (selection) {
            if (typeof selection.removeRange == "function") selection.removeRange(range);
            else selection.removeAllRanges();
        }
        if (mark) document.body.removeChild(mark);
        reselectPrevious();
    }
    return success;
}
module.exports = copy;

},{"b270149f26797c52":"jmaua"}],"jmaua":[function(require,module,exports) {
module.exports = function() {
    var selection = document.getSelection();
    if (!selection.rangeCount) return function() {};
    var active = document.activeElement;
    var ranges = [];
    for(var i = 0; i < selection.rangeCount; i++)ranges.push(selection.getRangeAt(i));
    switch(active.tagName.toUpperCase()){
        case "INPUT":
        case "TEXTAREA":
            active.blur();
            break;
        default:
            active = null;
            break;
    }
    selection.removeAllRanges();
    return function() {
        selection.type === "Caret" && selection.removeAllRanges();
        if (!selection.rangeCount) ranges.forEach(function(range) {
            selection.addRange(range);
        });
        active && active.focus();
    };
};

},{}],"1Yeju":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "tileSize", ()=>tileSize);
parcelHelpers.export(exports, "editorRatio", ()=>editorRatio);
var tileSize = 7;
var editorRatio = 16;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"dsXzW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "newGrid", ()=>newGrid);
parcelHelpers.export(exports, "randomLoc", ()=>randomLoc);
parcelHelpers.export(exports, "randomInt", ()=>randomInt);
parcelHelpers.export(exports, "getLoc", ()=>getLoc);
parcelHelpers.export(exports, "setLoc", ()=>setLoc);
parcelHelpers.export(exports, "rotatePair", ()=>rotatePair);
parcelHelpers.export(exports, "rotationSet", ()=>rotationSet);
var _state = require("./state");
function newCell() {
    return Array.from({
        length: (0, _state.tileSize)
    }, ()=>new Array((0, _state.tileSize)).fill(0));
}
function newGrid() {
    return Array.from({
        length: 3
    }, ()=>Array.from({
            length: 3
        }, ()=>newCell()));
}
function randomInt(min, max) {
    if (max === undefined) {
        max = min;
        min = 0;
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
function randomLoc() {
    return [
        randomInt(3),
        randomInt(3),
        randomInt((0, _state.tileSize)),
        randomInt((0, _state.tileSize))
    ];
}
function rotatePair([x, y]) {
    let gridSize = 3 * (0, _state.tileSize);
    return [
        gridSize - y,
        x
    ];
}
function rotationSet([x, y], n = 1) {
    let gridSize = 3 * (0, _state.tileSize) - 1;
    return [
        [
            x,
            y
        ],
        [
            gridSize - y,
            x
        ],
        [
            gridSize - x,
            gridSize - y
        ],
        [
            y,
            gridSize - x
        ]
    ];
}
function getLoc(map, loc) {
    let result = loc.reduce((acc, val)=>acc[val], map);
    return typeof result === "number" ? result : 0;
}
function setLoc(map, loc, v = 1) {
    let target = map;
    for(let i = 0; i < loc.length - 1; i++)target = target[loc[i]];
    if (Array.isArray(target) && typeof loc[loc.length - 1] === "number") target[loc[loc.length - 1]] = v;
    else throw new Error("Invalid location or target array");
}

},{"./state":"1Yeju","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["hdaM1","1jwFz"], "1jwFz", "parcelRequireae31")

//# sourceMappingURL=index.8e9bd240.js.map
