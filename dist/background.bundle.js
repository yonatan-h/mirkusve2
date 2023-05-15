/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/background/setup.js":
/*!*********************************!*\
  !*** ./src/background/setup.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRedirectedUrl": () => (/* binding */ getRedirectedUrl),
/* harmony export */   "openSetupTab": () => (/* binding */ openSetupTab)
/* harmony export */ });
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../keys.js */ "./src/keys.js");
/* harmony import */ var _lib_custom_errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/custom-errors.js */ "./src/lib/custom-errors.js");



function openSetupTab() {
	const url = chrome.runtime.getURL("/setup.html");
	chrome.tabs.create({ url });
}

async function getRedirectedUrl(name) {
	await chrome.identity.clearAllCachedAuthTokens();
	const authUrl = getAuthURL(name);

	try {
		const redirectedUrl = await chrome.identity.launchWebAuthFlow({
			url: authUrl,
			interactive: true,
		});
		return { redirectedUrl };
	} catch (error) {
		const message = "You canceled the sign in? Please sign in to github.";
		const customError = new _lib_custom_errors_js__WEBPACK_IMPORTED_MODULE_1__.CustomError(message, error.message);
		return { error: customError };
	}
}

function getAuthURL(name) {
	let authUrl = "https://github.com/login/oauth/authorize";
	authUrl += `?client_id=${_keys_js__WEBPACK_IMPORTED_MODULE_0__.clientId}`;
	authUrl += `&scope=repo`;
	authUrl += `&login=${name}`;
	console.log("authUrl", authUrl);
	return authUrl;
}




/***/ }),

/***/ "./src/background/view-request.js":
/*!****************************************!*\
  !*** ./src/background/view-request.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
async function requestViewChange(tabId, url) {
	const viewName = await getViewName(url);
	if (!inSlashProblems(url)) return;
	chrome.tabs.sendMessage(tabId, {
		message: "change-view",
		viewName,
	});
}

async function getViewName(link) {
	if (!(await hasSetup())) return "prompt-setup";
	else if (matchesQuestionPage(link)) return "timer";
	else if (matchesSubmissionPage(link)) return "answer-submit";
	else return undefined;
}

async function hasSetup() {
	const storageObject = await chrome.storage.local.get();
	console.log(storageObject);
	if (storageObject) return true;
	else return false;
}

function inSlashProblems(url) {
	const pathNodes = new URL(url).pathname.split("/").filter((x) => x !== "");
	const hasProblems = pathNodes[0] === "problems";
	return hasProblems;
}

function matchesSubmissionPage(url) {
	//example
	//https://leetcode.com/problems/two-sum/submissions/54654

	const pathNodes = new URL(url).pathname.split("/").filter((x) => x !== "");
	const hasProblems = pathNodes[0] === "problems";
	const hasSubmissions = pathNodes[pathNodes.length - 2] === "submissions";
	return hasProblems && hasSubmissions;
}

function matchesQuestionPage(url) {
	//examples
	//https://leetcode.com/problems/two-sum/description/
	//or
	//https://leetcode.com/problems/two-sum/

	const pathNodes = new URL(url).pathname.split("/").filter((x) => x !== "");
	const hasProblem = pathNodes[0] === "problems";
	const hasDescription = pathNodes[pathNodes.length - 1] === "description";
	const questionNameOnly = pathNodes.length === 2;

	return hasProblem && (hasDescription || questionNameOnly);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (requestViewChange);


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
//could not use json. json type could not be imported.

const sheetsWebappUrl =
	"https://script.google.com/macros/s/AKfycbwqWb7m4z7osZtcQLW5wu61Of6G6rBbGUkr-8OprrahzlkUtk5wZm43xUrLQD7qBCqH/exec";

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



function test() {
	console.log(new CustomError("one", "two"));
	console.log(new NetworkError(new TypeError()));
	console.log(new BadStatusError({ ok: false, status: 404 }));
	console.log(new AppScriptError({ error: "api is busy" }));
	console.log(new EmptyInputError("Empty thing"));
}

// test();


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
/******/ 			// no module.id needed
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************************!*\
  !*** ./src/background/background.js ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _setup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setup.js */ "./src/background/setup.js");
/* harmony import */ var _view_request_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view-request.js */ "./src/background/view-request.js");


//All listeners should be exposed, not nested in functions (from the documentation)

chrome.management.onInstalled.addListener(({ id }) => {
	if (id === chrome.runtime.id) (0,_setup_js__WEBPACK_IMPORTED_MODULE_0__.openSetupTab)();
});

chrome.runtime.onMessage.addListener((req, sender, next) => {
	if (req.message === "set-up") (0,_setup_js__WEBPACK_IMPORTED_MODULE_0__.openSetupTab)();
});

chrome.runtime.onMessage.addListener((req, sender, next) => {
	if (req.message === "sign-in") {
		(0,_setup_js__WEBPACK_IMPORTED_MODULE_0__.getRedirectedUrl)(req.userName).then(next);
		return true;
	}
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	const url = tab.url;
	if (url && changeInfo.status === "complete") {
		(0,_view_request_js__WEBPACK_IMPORTED_MODULE_1__["default"])(tabId, url);
	}
});

chrome.action.onClicked.addListener(_setup_js__WEBPACK_IMPORTED_MODULE_0__.openSetupTab);

})();

/******/ })()
;
//# sourceMappingURL=background.bundle.js.map