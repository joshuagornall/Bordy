// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
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
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"assets/1.png":[function(require,module,exports) {
module.exports = "/1.9be96cb3.png";
},{}],"assets/2.png":[function(require,module,exports) {
module.exports = "/2.2c7fcc9e.png";
},{}],"assets/4.png":[function(require,module,exports) {
module.exports = "/4.aec15ad6.png";
},{}],"node_modules/toggle-selection/index.js":[function(require,module,exports) {

module.exports = function () {
  var selection = document.getSelection();
  if (!selection.rangeCount) {
    return function () {};
  }
  var active = document.activeElement;

  var ranges = [];
  for (var i = 0; i < selection.rangeCount; i++) {
    ranges.push(selection.getRangeAt(i));
  }

  switch (active.tagName.toUpperCase()) { // .toUpperCase handles XHTML
    case 'INPUT':
    case 'TEXTAREA':
      active.blur();
      break;

    default:
      active = null;
      break;
  }

  selection.removeAllRanges();
  return function () {
    selection.type === 'Caret' &&
    selection.removeAllRanges();

    if (!selection.rangeCount) {
      ranges.forEach(function(range) {
        selection.addRange(range);
      });
    }

    active &&
    active.focus();
  };
};

},{}],"node_modules/copy-to-clipboard/index.js":[function(require,module,exports) {
"use strict";

var deselectCurrent = require("toggle-selection");

var clipboardToIE11Formatting = {
  "text/plain": "Text",
  "text/html": "Url",
  "default": "Text"
}

var defaultMessage = "Copy to clipboard: #{key}, Enter";

function format(message) {
  var copyKey = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
  return message.replace(/#{\s*key\s*}/g, copyKey);
}

function copy(text, options) {
  var debug,
    message,
    reselectPrevious,
    range,
    selection,
    mark,
    success = false;
  if (!options) {
    options = {};
  }
  debug = options.debug || false;
  try {
    reselectPrevious = deselectCurrent();

    range = document.createRange();
    selection = document.getSelection();

    mark = document.createElement("span");
    mark.textContent = text;
    // avoid screen readers from reading out loud the text
    mark.ariaHidden = "true"
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
        if (typeof e.clipboardData === "undefined") { // IE 11
          debug && console.warn("unable to use e.clipboardData");
          debug && console.warn("trying IE specific stuff");
          window.clipboardData.clearData();
          var format = clipboardToIE11Formatting[options.format] || clipboardToIE11Formatting["default"]
          window.clipboardData.setData(format, text);
        } else { // all other browsers
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
    if (!successful) {
      throw new Error("copy command was unsuccessful");
    }
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
  } finally {
    if (selection) {
      if (typeof selection.removeRange == "function") {
        selection.removeRange(range);
      } else {
        selection.removeAllRanges();
      }
    }

    if (mark) {
      document.body.removeChild(mark);
    }
    reselectPrevious();
  }

  return success;
}

module.exports = copy;

},{"toggle-selection":"node_modules/toggle-selection/index.js"}],"src/state.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editorRatio = exports.tileSize = void 0;
var tileSize = 7;
exports.tileSize = tileSize;
var editorRatio = 16;
exports.editorRatio = editorRatio;
},{}],"src/utils.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rotationSet = exports.rotatePair = exports.setLoc = exports.getLoc = exports.randomInt = exports.randomLoc = exports.newGrid = void 0;

var state_1 = require("./state");

function newCell() {
  return Array.from({
    length: state_1.tileSize
  }, function () {
    return new Array(state_1.tileSize).fill(0);
  });
}

function newGrid() {
  return Array.from({
    length: 3
  }, function () {
    return Array.from({
      length: 3
    }, function () {
      return newCell();
    });
  });
}

exports.newGrid = newGrid;

function randomInt(min, max) {
  if (max === undefined) {
    max = min;
    min = 0;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

exports.randomInt = randomInt;

function randomLoc() {
  return [randomInt(3), randomInt(3), randomInt(state_1.tileSize), randomInt(state_1.tileSize)];
}

exports.randomLoc = randomLoc;

function rotatePair(_a) {
  var x = _a[0],
      y = _a[1];
  var gridSize = 3 * state_1.tileSize;
  return [gridSize - y, x];
}

exports.rotatePair = rotatePair;

function rotationSet(_a, n) {
  var x = _a[0],
      y = _a[1];

  if (n === void 0) {
    n = 1;
  }

  var gridSize = 3 * state_1.tileSize - 1;
  return [[x, y], [gridSize - y, x], [gridSize - x, gridSize - y], [y, gridSize - x]];
}

exports.rotationSet = rotationSet;

function getLoc(map, loc) {
  var result = loc.reduce(function (acc, val) {
    return acc[val];
  }, map);
  return typeof result === "number" ? result : 0;
}

exports.getLoc = getLoc;

function setLoc(map, loc, v) {
  if (v === void 0) {
    v = 1;
  }

  var target = map;

  for (var i = 0; i < loc.length - 1; i++) {
    target = target[loc[i]];
  }

  if (Array.isArray(target) && typeof loc[loc.length - 1] === "number") {
    target[loc[loc.length - 1]] = v;
  } else {
    throw new Error("Invalid location or target array");
  }
}

exports.setLoc = setLoc;
},{"./state":"src/state.ts"}],"src/render.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanMap = exports.renderHover = exports.setBorder = exports.drawGuide = exports.renderMap = void 0;

var copy_to_clipboard_1 = __importDefault(require("copy-to-clipboard"));

var state_1 = require("./state");

var utils_1 = require("./utils");

var index_1 = require("../index");

var target = document.getElementById("target");
var canvas = document.getElementById("editor");
var guideCanvas = document.getElementById("guide");
var renderCanvas = document.getElementById("render");
var ctx = canvas.getContext("2d");
var guideCtx = guideCanvas.getContext("2d");
var renderCtx = renderCanvas.getContext("2d");

if (!ctx || !renderCtx || !guideCtx) {
  throw new Error("Canvas context could not be retrieved");
}

renderCtx.imageSmoothingEnabled = false;

function cleanMap() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

exports.cleanMap = cleanMap;

function renderMap(map, pixelRatio) {
  renderCtx.fill();

  for (var sx = 0; sx < 3; sx++) {
    for (var sy = 0; sy < 3; sy++) {
      for (var cx = 0; cx < state_1.tileSize; cx++) {
        for (var cy = 0; cy < state_1.tileSize; cy++) {
          var v = utils_1.getLoc(map, [sx, sy, cx, cy]);
          var fillColor = v === 1 ? index_1.appState.paintColor : "#fff0";
          ctx.fillStyle = fillColor;
          renderCtx.fillStyle = fillColor;
          var gridX = (sx * state_1.tileSize + cx) * pixelRatio;
          var gridY = (sy * state_1.tileSize + cy) * pixelRatio;

          if (!(sx === 1 && sy === 1)) {
            renderCtx.clearRect(gridX, gridY, pixelRatio, pixelRatio);
            renderCtx.fillRect(gridX, gridY, pixelRatio, pixelRatio);
            var adjustedGridX = gridX * state_1.editorRatio / pixelRatio;
            var adjustedGridY = gridY * state_1.editorRatio / pixelRatio;
            ctx.fillRect(adjustedGridX + 1, adjustedGridY + 1, state_1.editorRatio - 1, state_1.editorRatio - 1);
          }
        }
      }
    }
  }

  renderVector(map, pixelRatio);
}

exports.renderMap = renderMap;

function drawGuide() {
  for (var index = 1; index < 3; index++) {
    guideCtx.strokeStyle = "#33f";
    guideCtx.lineWidth = 0.5;
    var x = index * canvas.width / 3;
    guideCtx.beginPath();
    guideCtx.moveTo(x, 0);
    guideCtx.lineTo(x, canvas.height);
    guideCtx.stroke();
    guideCtx.beginPath();
    guideCtx.moveTo(0, x);
    guideCtx.lineTo(canvas.height, x);
    guideCtx.stroke();
  }

  for (var index = 0.0; index < 3 * state_1.tileSize; index++) {
    guideCtx.strokeStyle = "#ccc";
    var x = index * canvas.width / (3 * state_1.tileSize);
    guideCtx.beginPath();
    guideCtx.moveTo(x, 0);
    guideCtx.lineTo(x, canvas.height);
    guideCtx.stroke();
    guideCtx.beginPath();
    guideCtx.moveTo(0, x);
    guideCtx.lineTo(canvas.height, x);
    guideCtx.stroke();
  }

  var third = canvas.width / 3;
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

exports.drawGuide = drawGuide;

function setBorder(map, pixelRatio) {
  var dataURI = renderVector(map, pixelRatio);
  var style = document.getElementById("border-style");
  if (style) style.remove();
  style = document.createElement("style");
  style.id = "border-style";
  document.head.appendChild(style);

  if (!style.sheet) {
    throw new Error("Style sheet could not be retrieved");
  }

  var viewsize = state_1.tileSize * pixelRatio;
  var css = ".bordy {\n    border-image:  url(\"" + dataURI + "\") " + viewsize + " /  " + viewsize + "px / 0 round;\n    border-width:  " + viewsize + "px;\n    border-style:  solid;\n}";
  style.sheet.insertRule(css);
  44;
  target.textContent = css;
}

exports.setBorder = setBorder;

function svgToDataURL(svgStr) {
  var encoded = encodeURIComponent(svgStr).replace(/'/g, "%27").replace(/"/g, "%22");
  var header = "data:image/svg+xml,";
  var dataUrl = header + encoded;
  return dataUrl;
}

function renderVector(map, pixelRatio) {
  var content = "<svg \n      width=\"" + state_1.tileSize * pixelRatio * 3 + "px\"\n      height=\"" + state_1.tileSize * pixelRatio * 3 + "px\"\n      viewBox=\"0 0 " + state_1.tileSize * pixelRatio * 3 + " " + state_1.tileSize * pixelRatio * 3 + "\" \n      fill=\"" + index_1.appState.paintColor + "\"\n      stroke=\"none\"\n      xmlns=\"http://www.w3.org/2000/svg\"\n      >";

  for (var sx = 0; sx < 3; sx++) {
    for (var sy = 0; sy < 3; sy++) {
      for (var cx = 0; cx < state_1.tileSize; cx++) {
        for (var cy = 0; cy < state_1.tileSize; cy++) {
          var v = utils_1.getLoc(map, [sx, sy, cx, cy]);
          var gridX = (sx * state_1.tileSize + cx) * pixelRatio;
          var gridY = (sy * state_1.tileSize + cy) * pixelRatio;

          if (sx == 1 && sy == 1) {
            continue;
          }

          if (v == 1) {
            content += "<rect x=\"" + gridX + "\" y=\"" + gridY + "\" width=\"" + pixelRatio + "px\" height=\"" + pixelRatio + "px\"/>";
          }
        }
      }
    }
  }

  content += "</svg>";
  var dataURI = svgToDataURL(content);
  return dataURI;
}

function renderHover(map, loc) {
  var x = loc[0] * state_1.tileSize + loc[2];
  var y = loc[1] * state_1.tileSize + loc[3];
  ctx.fillStyle = utils_1.getLoc(map, loc) == 1 ? "#dde" : "#dde";

  if (loc[0] == 1 && loc[1] == 1) {
    return;
  }

  ctx.fillRect(x * state_1.editorRatio + 0, y * state_1.editorRatio + 0, state_1.editorRatio - 0, state_1.editorRatio - 0);
}

exports.renderHover = renderHover;
target.addEventListener("click", copyTarget);

function resetCopy() {
  target.setAttribute("data-after", "[Click to copy]");
}

resetCopy();

function copyTarget() {
  var textToCopy = target.textContent || "";
  copy_to_clipboard_1.default(textToCopy, {
    message: "Press #{key} to copy css"
  });
  target.setAttribute("data-after", "Copied to your clipboard!");
  target.classList.remove("flash");
  window.setTimeout(function () {
    target.classList.add("flash");
  }, 1);
  window.setTimeout(resetCopy, 2500);
}
},{"copy-to-clipboard":"node_modules/copy-to-clipboard/index.js","./state":"src/state.ts","./utils":"src/utils.ts","../index":"index.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appState = void 0;

var _1_png_1 = __importDefault(require("./assets/1.png"));

var _2_png_1 = __importDefault(require("./assets/2.png"));

var _4_png_1 = __importDefault(require("./assets/4.png"));

var render_1 = require("./src/render");

var state_1 = require("./src/state");

var utils_1 = require("./src/utils");

var penElement = document.getElementById("pen");
var eraserElement = document.getElementById("eraser");
var symmetryElement = document.getElementById("symmetry");
var undoElement = document.getElementById("undo");
var scaleElement = document.getElementById("scale");
var colorPicker = document.getElementById("color");
var frame = document.getElementById("editor-frame");
var canvas = document.getElementById("editor");
var guideCanvas = document.getElementById("guide");
var renderCanvas = document.getElementById("render");
canvas.width = state_1.tileSize * state_1.editorRatio * 3;
canvas.height = state_1.tileSize * state_1.editorRatio * 3;
guideCanvas.width = state_1.tileSize * state_1.editorRatio * 3;
guideCanvas.height = state_1.tileSize * state_1.editorRatio * 3;
var sizeIndex = 2;
var sizeList = [1, 2, 4];
var pngList = [_1_png_1.default, _2_png_1.default, _4_png_1.default];
var pixelRatio = sizeList[sizeIndex];
var lastTouchEnd = 0;
renderCanvas.width = state_1.tileSize * pixelRatio * 3;
renderCanvas.height = state_1.tileSize * pixelRatio * 3;
scaleElement.addEventListener("click", function () {
  sizeIndex = (sizeIndex + 1) % sizeList.length;
  scaleElement.src = pngList[sizeIndex];
  pixelRatio = sizeList[sizeIndex];
  renderCanvas.width = state_1.tileSize * pixelRatio * 3;
  renderCanvas.height = state_1.tileSize * pixelRatio * 3;
  render_1.renderMap(map, pixelRatio);
  render_1.setBorder(map, pixelRatio);
  updateFrameHeight();
});
exports.appState = {
  paintColor: "#000000"
};

if (colorPicker) {
  colorPicker.addEventListener("input", function (e) {
    var input = e.target;
    exports.appState.paintColor = input.value;
    render_1.renderMap(map, pixelRatio);
    render_1.setBorder(map, pixelRatio);
  });
} else {
  console.error("Color picker element not found");
}

function updateFrameHeight() {
  frame.style.height = canvas.getBoundingClientRect().width + "px";
}

document.addEventListener("DOMContentLoaded", updateFrameHeight);
window.addEventListener("resize", updateFrameHeight);
var isDown = false;
var isErasing = false;
var rotationalSymmetry = true;
symmetryElement.addEventListener("click", function () {
  rotationalSymmetry = !rotationalSymmetry;
  symmetryElement.classList.toggle("selected");
});
eraserElement.addEventListener("click", function () {
  isErasing = true;
  eraserElement.classList.add("selected");
  penElement.classList.remove("selected");
});
penElement.addEventListener("click", function () {
  isErasing = false;
  penElement.classList.add("selected");
  eraserElement.classList.remove("selected");
});
var map = utils_1.newGrid();
var undoStack = [JSON.stringify(map)];

function pushUndo() {
  var candidate = JSON.stringify(map);
  var top = undoStack[undoStack.length - 1];
  if (candidate === top) return;
  undoStack.push(candidate);
  if (undoStack.length > 50) undoStack.shift();
  undoElement.classList.add("selected");
}

function popUndo() {
  undoStack.pop();
  var old = undoStack[undoStack.length - 1];

  if (old) {
    map = JSON.parse(old);
    render_1.cleanMap();
    render_1.renderMap(map, pixelRatio);
    render_1.setBorder(map, pixelRatio);
  }
}

undoElement.addEventListener("click", function (event) {
  popUndo();
  if (undoStack.length < 2) undoElement.classList.remove("selected");
  event.preventDefault();
});
render_1.drawGuide();
render_1.renderMap(map, pixelRatio);
render_1.setBorder(map, pixelRatio);

function draw(loc, v) {
  if (isDown) utils_1.setLoc(map, loc, 1 - v);
}

function handleEvent(event, isClick, isHover) {
  if (isClick === void 0) {
    isClick = false;
  }

  if (isHover === void 0) {
    isHover = false;
  }

  var _a = canvas.getBoundingClientRect(),
      left = _a.left,
      top = _a.top,
      width = _a.width,
      height = _a.height;

  var x = event.clientX - left;
  var y = event.clientY - top;
  var canvasX = x / width * canvas.width;
  var canvasY = y / height * canvas.height;
  var gridX = Math.floor(canvasX / state_1.editorRatio);
  var gridY = Math.floor(canvasY / state_1.editorRatio);
  var rotatePairs = rotationalSymmetry ? utils_1.rotationSet([gridX, gridY]) : [[gridX, gridY]];
  render_1.cleanMap();
  rotatePairs.forEach(function (_a) {
    var gX = _a[0],
        gY = _a[1];
    var sx = Math.floor(gX / state_1.tileSize);
    var sy = Math.floor(gY / state_1.tileSize);
    var cx = gX % state_1.tileSize;
    var cy = gY % state_1.tileSize;
    var loc = [sx, sy, cx, cy];
    if (sx < 0 || sx > 2 || sy < 0 || sy > 2) return;
    if (isHover) render_1.renderHover(map, loc);
    var v = utils_1.getLoc(map, loc);
    if (!isClick) v = 0;
    if (isErasing) v = 1;
    draw(loc, v);
  });
  render_1.renderMap(map, pixelRatio);
  setTimeout(function () {
    return render_1.setBorder(map, pixelRatio);
  }, 0);
}

canvas.addEventListener("mousedown", function (event) {
  isDown = true;
  handleEvent(event, true);
});
canvas.addEventListener("mousemove", function (event) {
  handleEvent(event, false, true);
});
canvas.addEventListener("mouseout", function () {
  render_1.cleanMap();
  render_1.renderMap(map, pixelRatio);
});
window.addEventListener("mousedown", function () {
  isDown = true;
});
window.addEventListener("mouseup", function () {
  isDown = false;
  pushUndo();
});
canvas.addEventListener("touchend", function () {
  isDown = false;
  pushUndo();
});
canvas.addEventListener("touchstart", function (event) {
  isDown = true;
  event.preventDefault();

  __spreadArrays(event.targetTouches).forEach(function (touch) {
    handleEvent({
      clientX: touch.clientX,
      clientY: touch.clientY
    });
  });
});
canvas.addEventListener("touchmove", function (event) {
  event.preventDefault();
  isDown = true;

  __spreadArrays(event.targetTouches).forEach(function (touch) {
    handleEvent({
      clientX: touch.clientX,
      clientY: touch.clientY
    });
  });
});
window.addEventListener("touchend", function (event) {
  if (event.timeStamp - lastTouchEnd <= 500) {
    event.preventDefault();
    var targetElement = event.target;
    targetElement.click();
  }

  isDown = false;
  lastTouchEnd = event.timeStamp;
});
},{"./assets/1.png":"assets/1.png","./assets/2.png":"assets/2.png","./assets/4.png":"assets/4.png","./src/render":"src/render.ts","./src/state":"src/state.ts","./src/utils":"src/utils.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63837" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/Bordy.77de5100.js.map