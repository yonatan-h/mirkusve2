/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/setup/setup.css":
/*!*******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/setup/setup.css ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n\tbox-sizing: border-box;\n\tfont-family: monospace;\n\tfont-size: 1rem;\n}\n\nbody {\n\tmargin: 0;\n}\n\n.container {\n\tmin-height: 100vh;\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-items: center;\n\tjustify-content: center;\n\tpadding: 2rem;\n}\n\n.slide {\n\tmax-width: 1000px;\n}\n\nbutton {\n\tbox-shadow: 2px 2px black;\n\tpadding: 5px;\n\tborder-radius: 2.5px;\n}\n\n.form-section{\n\tposition: relative;\n}\n\n.next {\n\tposition: absolute;\n\tright: 0;\n\tbottom: -20px;\n\n\tbackground: none;\n\tborder: none;\n\tbackground-color: darkgreen;\n\tcolor: white;\n}\n\n.cancel {\n\tbackground: none;\n\tborder: none;\n\tcolor: white;\n\tbackground-color: rgb(188, 50, 0);\n\n\tposition: fixed;\n\tright: 2rem;\n\tbottom: 2rem;\n}\n\n.flex {\n\tdisplay: flex;\n\tjustify-content: space-around;\n}\n\n.hidden {\n\tdisplay: none;\n}\n\n.next__disabled {\n\tbackground: darkslategray;\n}\n\n.error-box p {\n\tcolor: rgb(98, 25, 25);\n}\n.error-box code {\n\tcolor: brown;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ "./src/setup/setup.css":
/*!*****************************!*\
  !*** ./src/setup/setup.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_setup_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./setup.css */ "./node_modules/css-loader/dist/cjs.js!./src/setup/setup.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_setup_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_setup_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_setup_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_setup_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/keys.js":
/*!*********************!*\
  !*** ./src/keys.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clientId": () => (/* binding */ clientId),
/* harmony export */   "codeForTokenUrl": () => (/* binding */ codeForTokenUrl),
/* harmony export */   "groupFinderUrl": () => (/* binding */ groupFinderUrl),
/* harmony export */   "submitAnswerUrl": () => (/* binding */ submitAnswerUrl)
/* harmony export */ });
const sheetsWebappUrl =
	"https://script.google.com/macros/s/AKfycbzla4uMy7Dan5631pEB9DA_wrnClhJq9CiRXGjv_MLE9ZwXO7wdgBrgOeIhbYTHa-gUIw/exec";

const groupFinderUrl = sheetsWebappUrl + "?path=groups";
const codeForTokenUrl = sheetsWebappUrl + "?path=tokens";
const submitAnswerUrl = sheetsWebappUrl + "?path=answers";

const clientId = "96309949db0f49ae9c72";




/***/ }),

/***/ "./src/lib/custom-errors.js":
/*!**********************************!*\
  !*** ./src/lib/custom-errors.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppScriptError": () => (/* binding */ AppScriptError),
/* harmony export */   "BadStatusError": () => (/* binding */ BadStatusError),
/* harmony export */   "BadUrlError": () => (/* binding */ BadUrlError),
/* harmony export */   "CustomError": () => (/* binding */ CustomError),
/* harmony export */   "EmptyInputError": () => (/* binding */ EmptyInputError),
/* harmony export */   "NetworkError": () => (/* binding */ NetworkError)
/* harmony export */ });
class CustomError extends Error {
	constructor(descriptionAndSolution, errorAsString = "") {
		super(`Custom Error: \n- ${descriptionAndSolution}\n- ${errorAsString}\n`);
		this.descriptionAndSolution = descriptionAndSolution;
		this.errorAsString = errorAsString;
	}
}

class NetworkError extends CustomError {
	constructor(typeError) {
		const { name, message } = typeError;
		const errorAsString = JSON.stringify({ name, message });

		super("Weak connection? Please try again later.", errorAsString);
	}
}

class BadStatusError extends CustomError {
	constructor(response) {
		const { ok, status, statusText, url } = response;
		const errorAsString = JSON.stringify({ ok, status, statusText, url });

		super(
			"Http response not ok. Try avoiding vpn or try again later.",
			errorAsString
		);
	}
}

class BadUrlError extends CustomError {
	constructor(badUrl) {
		super(`${badUrl} is not a valid url`);
	}
}

//because (at least sofar) you cant send status codes in appscript responses
class AppScriptError extends CustomError {
	constructor(responseObject) {
		super(`Message from Sheets: ${responseObject.error}`);
	}
}

class EmptyInputError extends CustomError {
	constructor(inputName) {
		super(`Please fill out '${inputName}'`);
	}
}




/***/ }),

/***/ "./src/lib/handle-custom-error.js":
/*!****************************************!*\
  !*** ./src/lib/handle-custom-error.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _custom_errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./custom-errors.js */ "./src/lib/custom-errors.js");


function makeHandler(paragraphElement, codeElement) {
	function handleCustomError(error) {
		if (error instanceof _custom_errors_js__WEBPACK_IMPORTED_MODULE_0__.CustomError) {
			paragraphElement.textContent = "";
			codeElement.textContent = "";

			setTimeout(() => {
				paragraphElement.textContent = error.descriptionAndSolution;
				codeElement.textContent = error.errorAsString;
			}, 500);
		} else {
			throw error;
		}
	}

	return handleCustomError;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (makeHandler);


function test() {
	const p = {};
	const c = {};
	const handler = makeHandler(p, c);

	// handler(new Error());
	handler(new _custom_errors_js__WEBPACK_IMPORTED_MODULE_0__.EmptyInputError("dummy input"));
	setTimeout(() => console.log(p, c), 1000);
}
// test();


/***/ }),

/***/ "./src/lib/robust-fetch.js":
/*!*********************************!*\
  !*** ./src/lib/robust-fetch.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _custom_errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./custom-errors.js */ "./src/lib/custom-errors.js");


async function robustFetch(url, options) {
	try {
		const fetchPromise = options ? fetch(url, options) : fetch(url);
		const response = await fetchPromise;
		if (!response.ok) {
			throw new _custom_errors_js__WEBPACK_IMPORTED_MODULE_0__.BadStatusError(response);
		}

		const data = await response.json();
		if (data.error) {
			throw new _custom_errors_js__WEBPACK_IMPORTED_MODULE_0__.AppScriptError(data);
		}

		return data;
	} catch (error) {
		if (error instanceof TypeError) throw new _custom_errors_js__WEBPACK_IMPORTED_MODULE_0__.NetworkError(error);
		else throw error;
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (robustFetch);


/***/ }),

/***/ "./src/setup/finish.js":
/*!*****************************!*\
  !*** ./src/setup/finish.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ui_functions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui-functions.js */ "./src/setup/ui-functions.js");
/* harmony import */ var _lib_custom_errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/custom-errors.js */ "./src/lib/custom-errors.js");




async function handleFinish(event) {
  (0,_ui_functions_js__WEBPACK_IMPORTED_MODULE_0__.disableNexts)();
  try {
    event.preventDefault();

    const form = document.querySelector("form");
    const formData = new FormData(form);

    const keyValues = { durations: {} }; //for timer
    for (const [key, value] of formData) {
      keyValues[key] = value;
    }

    await save(keyValues);
    const submitInputButton = event.target;
    submitInputButton.textContent = "Saved!";
    document.getElementById("cancel").setAttribute("disabled", "disabled");
  } catch (error) {
    (0,_ui_functions_js__WEBPACK_IMPORTED_MODULE_0__.enableNexts)();
    (0,_ui_functions_js__WEBPACK_IMPORTED_MODULE_0__.handleCustomError)(error);
  }
}

async function save(keyValueObject) {
  try {
    await chrome.storage.local.set(keyValueObject);
    const things = await chrome.storage.local.get(keyValueObject);
  } catch (error) {
    throw new _lib_custom_errors_js__WEBPACK_IMPORTED_MODULE_1__.CustomError("Could not save setup", error.message);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handleFinish);


/***/ }),

/***/ "./src/setup/name.js":
/*!***************************!*\
  !*** ./src/setup/name.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../keys.js */ "./src/keys.js");
/* harmony import */ var _lib_robust_fetch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/robust-fetch.js */ "./src/lib/robust-fetch.js");
/* harmony import */ var _lib_custom_errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/custom-errors.js */ "./src/lib/custom-errors.js");
/* harmony import */ var _ui_functions_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui-functions.js */ "./src/setup/ui-functions.js");





async function handleNameSubmit() {
	const name = document.querySelector(`[name="name"]`).value;
	const groupInput = document.querySelector(`[name="group"]`);

	(0,_ui_functions_js__WEBPACK_IMPORTED_MODULE_3__.disableNexts)();
	try {
		if (name === "") {
			throw new _lib_custom_errors_js__WEBPACK_IMPORTED_MODULE_2__.EmptyInputError("Name");
		}
		groupInput.value = await getGroup(name);

		if (groupInput.value === "" || groupInput.value === "undefined") {
			throw new _lib_custom_errors_js__WEBPACK_IMPORTED_MODULE_2__.EmptyInputError("Group (A hidden Input)");
		}

		(0,_ui_functions_js__WEBPACK_IMPORTED_MODULE_3__.showSection)("repo");
	} catch (error) {
		(0,_ui_functions_js__WEBPACK_IMPORTED_MODULE_3__.enableNexts)();
		(0,_ui_functions_js__WEBPACK_IMPORTED_MODULE_3__.handleCustomError)(error);
	}
	(0,_ui_functions_js__WEBPACK_IMPORTED_MODULE_3__.enableNexts)();
}

async function getGroup(name) {
	let url;
	url = _keys_js__WEBPACK_IMPORTED_MODULE_0__.groupFinderUrl.split("/").filter((n) => n !== "");
	url = url.join("/");
	url = `${url}&name=${name}`;

	const data = await (0,_lib_robust_fetch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(url);
	return data["group"];
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handleNameSubmit);

function test() {
	getGroup("Yonatan ");
}

test();


/***/ }),

/***/ "./src/setup/repo.js":
/*!***************************!*\
  !*** ./src/setup/repo.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_custom_errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/custom-errors.js */ "./src/lib/custom-errors.js");
/* harmony import */ var _ui_functions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui-functions.js */ "./src/setup/ui-functions.js");



async function handleRepoSubmit() {
	const repoLinkI = document.querySelector(`[name="repoLink"]`);
	const repoNameI = document.querySelector(`[name="repoName"]`);
	const userNameI = document.querySelector(`[name="userName"]`);
	const repoLink = repoLinkI.value;

	(0,_ui_functions_js__WEBPACK_IMPORTED_MODULE_1__.disableNexts)();
	try {
		if (repoLink === "") throw new _lib_custom_errors_js__WEBPACK_IMPORTED_MODULE_0__.EmptyInputError("Git repository link");

		//offline checks
		errorIfBadUrl(repoLink);
		errorIfWrongOrigin(repoLink, "https://github.com");
		errorIfBadPath(repoLink);

		const { userName, repoName } = getUserAndRepoName(repoLink);
		const response = await getRepoResponse(userName, repoName);

		//online checks
		errorIfRepoMissing(response, userName, repoName);
		await errorIfTooManyTries(response);
		if (!response.ok) throw new _lib_custom_errors_js__WEBPACK_IMPORTED_MODULE_0__.BadStatusError(response);

		userNameI.value = userName;
		repoNameI.value = repoName;

		(0,_ui_functions_js__WEBPACK_IMPORTED_MODULE_1__.showSection)("token");
	} catch (error) {
		(0,_ui_functions_js__WEBPACK_IMPORTED_MODULE_1__.enableNexts)();
		(0,_ui_functions_js__WEBPACK_IMPORTED_MODULE_1__.handleCustomError)(error);
	}
	(0,_ui_functions_js__WEBPACK_IMPORTED_MODULE_1__.enableNexts)();
}

function errorIfBadUrl(url) {
	try {
		new URL(url);
	} catch (error) {
		throw new _lib_custom_errors_js__WEBPACK_IMPORTED_MODULE_0__.BadUrlError(url);
	}
}

function errorIfWrongOrigin(url, correctOrigin) {
	const origin = new URL(url).origin;
	if (origin !== correctOrigin) {
		throw new _lib_custom_errors_js__WEBPACK_IMPORTED_MODULE_0__.CustomError(`'${url}' should begin with '${correctOrigin}'`);
	}
}

function errorIfBadPath(repoLink) {
	const path = new URL(repoLink).pathname;
	const pathNodes = path.split("/").filter((node) => node !== "");

	if (pathNodes.length !== 2) {
		throw new _lib_custom_errors_js__WEBPACK_IMPORTED_MODULE_0__.CustomError(
			`'${repoLink}' should've been like \r\n 'https://github.com/USER_NAME/REPO_NAME'`
		);
	}
}

function getUserAndRepoName(repoLink) {
	const path = new URL(repoLink).pathname;
	const nonEmpty = (node) => node !== "";
	const [userName, repoName] = path.split("/").filter(nonEmpty);
	return { userName, repoName };
}

async function getRepoResponse(userName, repoName) {
	const repoUrl = `https://api.github.com/repos/${userName}/${repoName}`;
	try {
		return await fetch(repoUrl);
	} catch (error) {
		if (error instanceof TypeError) throw new _lib_custom_errors_js__WEBPACK_IMPORTED_MODULE_0__.NetworkError(error);
		else throw error;
	}
}

function errorIfRepoMissing(response, userName, repoName) {
	if (response.status !== 404) return;
	const message = `Mistyped the link? We could'nt find the repo in github (github.com/${userName}/${repoName})`;
	const { ok, status, statusText, url } = response;
	throw new _lib_custom_errors_js__WEBPACK_IMPORTED_MODULE_0__.CustomError(
		message,
		JSON.stringify({ ok, status, statusText, url })
	);
}

async function errorIfTooManyTries(response) {
	if (response.status !== 403) return;

	const data = await response.json();
	const message = `Too many tries! Try again in a few hours. You can switch to another wifi and try again too.`;
	const code = JSON.stringify(data);
	throw new _lib_custom_errors_js__WEBPACK_IMPORTED_MODULE_0__.CustomError(message, code);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handleRepoSubmit);


/***/ }),

/***/ "./src/setup/token.js":
/*!****************************!*\
  !*** ./src/setup/token.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_robust_fetch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/robust-fetch.js */ "./src/lib/robust-fetch.js");
/* harmony import */ var _lib_custom_errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/custom-errors.js */ "./src/lib/custom-errors.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../keys.js */ "./src/keys.js");
/* harmony import */ var _ui_functions_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui-functions.js */ "./src/setup/ui-functions.js");





const signInButton = document.getElementById("sign-in");
signInButton.addEventListener("click", signInAndStoreToken);

function handleTokenSubmit() {
  (0,_ui_functions_js__WEBPACK_IMPORTED_MODULE_3__.disableNexts)();
  try {
    const token = document.querySelector(`[name="token"]`).value;
    if (token === "" || token === "undefined") {
      throw new _lib_custom_errors_js__WEBPACK_IMPORTED_MODULE_1__.EmptyInputError("Signing in to Github", token);
    }
    (0,_ui_functions_js__WEBPACK_IMPORTED_MODULE_3__.showSection)("finish");
  } catch (error) {
    (0,_ui_functions_js__WEBPACK_IMPORTED_MODULE_3__.enableNexts)();
    (0,_ui_functions_js__WEBPACK_IMPORTED_MODULE_3__.handleCustomError)(error);
  }
  (0,_ui_functions_js__WEBPACK_IMPORTED_MODULE_3__.enableNexts)();
}

async function signInAndStoreToken() {
  try {
    const userName = document.querySelector(`[name="userName"]`).value;
    const redirectedUrl = await getRedirectedUrl(userName);

    const search = new URL(redirectedUrl).search;
    const code = new URLSearchParams(search).get("code");

    const token = await exchangeForToken(code);
    document.querySelector("#signed-in-bool").textContent = "You're Signed In!";
    document.querySelector(`[name="token"]`).value = token;
  } catch (error) {
    (0,_ui_functions_js__WEBPACK_IMPORTED_MODULE_3__.handleCustomError)(error);
  }
}

async function getRedirectedUrl(userName) {
  const response = await chrome.runtime.sendMessage({
    message: "sign-in",
    userName: userName,
  });

  if (response.error) {
    const { descriptionAndSolution, errorAsString } = response.error;
    throw new _lib_custom_errors_js__WEBPACK_IMPORTED_MODULE_1__.CustomError(descriptionAndSolution, errorAsString);
  }

  if (!response.redirectedUrl) {
    const message = "Signin failed. Try signing in again?";
    throw new _lib_custom_errors_js__WEBPACK_IMPORTED_MODULE_1__.CustomError(message, responseString);
  }

  return response.redirectedUrl;
}

async function exchangeForToken(code) {
  let tokenUrl;
  tokenUrl = _keys_js__WEBPACK_IMPORTED_MODULE_2__.codeForTokenUrl.split("/").filter((n) => n !== "");
  tokenUrl = tokenUrl.join("/");
  tokenUrl += `&code=${code}`;

  const data = await (0,_lib_robust_fetch_js__WEBPACK_IMPORTED_MODULE_0__["default"])(tokenUrl);
  return data.accessToken;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handleTokenSubmit);


/***/ }),

/***/ "./src/setup/ui-functions.js":
/*!***********************************!*\
  !*** ./src/setup/ui-functions.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "disableNexts": () => (/* binding */ disableNexts),
/* harmony export */   "enableNexts": () => (/* binding */ enableNexts),
/* harmony export */   "handleCustomError": () => (/* binding */ handleCustomError),
/* harmony export */   "showSection": () => (/* binding */ showSection)
/* harmony export */ });
/* harmony import */ var _lib_handle_custom_error_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/handle-custom-error.js */ "./src/lib/handle-custom-error.js");


const errorBox = document.getElementById("error-box");
const errorParagraph = errorBox.querySelector("p");
const errorCode = errorBox.querySelector("code");

const handleCustomError = (0,_lib_handle_custom_error_js__WEBPACK_IMPORTED_MODULE_0__["default"])(errorParagraph, errorCode);

function showSection(sectionId) {
	const sections = [...document.querySelectorAll(".form-section")];
	sections.forEach((sec) => sec.classList.add("hidden"));
	document.getElementById(sectionId).classList.remove("hidden");

	errorParagraph.textContent = "";
	errorCode.textContent = "";
}

function disableNexts() {
	const buttons = [...document.querySelectorAll(".next")];
	buttons.forEach((btn) => btn.setAttribute("disabled", "disabled"));
	buttons.forEach((btn) => btn.classList.add("next__disabled"));
}

function enableNexts() {
	const buttons = [...document.querySelectorAll(".next")];
	buttons.forEach((btn) => btn.removeAttribute("disabled"));
	buttons.forEach((btn) => btn.classList.remove("next__disabled"));
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./src/setup/setup.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _name_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./name.js */ "./src/setup/name.js");
/* harmony import */ var _repo_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./repo.js */ "./src/setup/repo.js");
/* harmony import */ var _token_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./token.js */ "./src/setup/token.js");
/* harmony import */ var _finish_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./finish.js */ "./src/setup/finish.js");
/* harmony import */ var _ui_functions_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ui-functions.js */ "./src/setup/ui-functions.js");
/* harmony import */ var _setup_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./setup.css */ "./src/setup/setup.css");







(0,_ui_functions_js__WEBPACK_IMPORTED_MODULE_4__.showSection)("intro");
document.querySelector("#intro .next").onclick = () => (0,_ui_functions_js__WEBPACK_IMPORTED_MODULE_4__.showSection)("name");
document.querySelector("#name .next").onclick = _name_js__WEBPACK_IMPORTED_MODULE_0__["default"];
document.querySelector("#repo .next").onclick = _repo_js__WEBPACK_IMPORTED_MODULE_1__["default"];
document.querySelector("#token .next").onclick = _token_js__WEBPACK_IMPORTED_MODULE_2__["default"];
document.querySelector("#finish .next").onclick = _finish_js__WEBPACK_IMPORTED_MODULE_3__["default"];

document.getElementById("cancel").onclick = () => {
	// Get the current tab
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		// Close the current tab
		chrome.tabs.remove(tabs[0].id);
	});
};

})();

/******/ })()
;
//# sourceMappingURL=setup.bundle.js.map