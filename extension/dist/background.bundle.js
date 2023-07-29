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
/* harmony import */ var _utils_keys_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/keys.js */ "./src/utils/keys.js");
/* harmony import */ var _utils_custom_errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/custom-errors.js */ "./src/utils/custom-errors.js");


function openSetupTab() {
  const url = chrome.runtime.getURL('/setup.html');
  chrome.tabs.create({
    url
  });
}
async function getRedirectedUrl(name) {
  await chrome.identity.clearAllCachedAuthTokens();
  const authUrl = getAuthURL(name);
  try {
    const redirectedUrl = await chrome.identity.launchWebAuthFlow({
      url: authUrl,
      interactive: true
    });
    return {
      redirectedUrl
    };
  } catch (error) {
    const message = 'You canceled the sign in? Please sign in to github.';
    const customError = new _utils_custom_errors_js__WEBPACK_IMPORTED_MODULE_1__.CustomError(message, error.message);
    return {
      error: customError
    };
  }
}
function getAuthURL(name) {
  let authUrl = 'https://github.com/login/oauth/authorize';
  authUrl += `?client_id=${_utils_keys_js__WEBPACK_IMPORTED_MODULE_0__.clientId}`;
  authUrl += `&login=${name}`;
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
    message: 'change-view',
    viewName
  });
}
async function getViewName(link) {
  if (matchesQuestionPage(link)) return 'timer';else if (matchesSubmissionPage(link)) return 'answer-submit';else return undefined;
}
function inSlashProblems(url) {
  const pathNodes = new URL(url).pathname.split('/').filter(x => x !== '');
  const hasProblems = pathNodes[0] === 'problems';
  return hasProblems;
}
function matchesSubmissionPage(url) {
  //example
  //https://leetcode.com/problems/two-sum/submissions/54654

  const pathNodes = new URL(url).pathname.split('/').filter(x => x !== '');
  const hasProblems = pathNodes[0] === 'problems';
  const hasSubmissions = pathNodes[pathNodes.length - 2] === 'submissions';
  return hasProblems && hasSubmissions;
}
function matchesQuestionPage(url) {
  //examples
  //https://leetcode.com/problems/two-sum/description/
  //or
  //https://leetcode.com/problems/two-sum/

  const pathNodes = new URL(url).pathname.split('/').filter(x => x !== '');
  const hasProblem = pathNodes[0] === 'problems';
  const hasDescription = pathNodes[pathNodes.length - 1] === 'description';
  const questionNameOnly = pathNodes.length === 2;
  return hasProblem && (hasDescription || questionNameOnly);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (requestViewChange);

/***/ }),

/***/ "./src/utils/custom-errors.js":
/*!************************************!*\
  !*** ./src/utils/custom-errors.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppScriptError": () => (/* binding */ AppScriptError),
/* harmony export */   "BadStatusError": () => (/* binding */ BadStatusError),
/* harmony export */   "BadUrlError": () => (/* binding */ BadUrlError),
/* harmony export */   "CustomError": () => (/* binding */ CustomError),
/* harmony export */   "DisablingError": () => (/* binding */ DisablingError),
/* harmony export */   "EmptyInputError": () => (/* binding */ EmptyInputError),
/* harmony export */   "InputError": () => (/* binding */ InputError),
/* harmony export */   "NetworkError": () => (/* binding */ NetworkError),
/* harmony export */   "ToastError": () => (/* binding */ ToastError)
/* harmony export */ });
class CustomError extends Error {
  constructor(descriptionAndSolution, errorAsString = '') {
    super(`Custom Error: \n- ${descriptionAndSolution}\n- ${errorAsString}\n`);
    this.descriptionAndSolution = descriptionAndSolution;
    this.errorAsString = errorAsString;
  }
}
class ToastError extends CustomError {
  constructor(descriptionAndSolution, errorAsString = '') {
    super(descriptionAndSolution, errorAsString);
  }
}
class InputError extends CustomError {
  constructor(descriptionAndSolution, errorAsString = '') {
    super(descriptionAndSolution, errorAsString);
  }
}
class DisablingError extends CustomError {
  constructor(descriptionAndSolution, errorAsString = '') {
    super(descriptionAndSolution, errorAsString);
  }
}
class NetworkError extends ToastError {
  constructor(typeError) {
    const {
      name,
      message
    } = typeError;
    const errorAsString = JSON.stringify({
      name,
      message
    });
    super('Weak connection? Please try again later.', errorAsString);
  }
}
class BadStatusError extends ToastError {
  constructor(response) {
    const {
      ok,
      status,
      statusText,
      url
    } = response;
    const errorAsString = JSON.stringify({
      ok,
      status,
      statusText,
      url
    });
    super('Http response not ok. Try avoiding vpn or try again later.', errorAsString);
  }
}
class BadUrlError extends InputError {
  constructor(badUrl) {
    super(`${badUrl} is not a valid url`);
  }
}

//because (at least sofar) you cant send status codes in appscript responses
class AppScriptError extends ToastError {
  constructor(responseObject) {
    super(`Message from Sheets: ${responseObject.error}`);
  }
}
class EmptyInputError extends InputError {
  constructor(inputName) {
    super(`Please fill out '${inputName}'`);
  }
}


/***/ }),

/***/ "./src/utils/keys.js":
/*!***************************!*\
  !*** ./src/utils/keys.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clientId": () => (/* binding */ clientId),
/* harmony export */   "codeForTokenUrl": () => (/* binding */ codeForTokenUrl),
/* harmony export */   "getAnswerSubmitUrl": () => (/* binding */ getAnswerSubmitUrl),
/* harmony export */   "githubAppId": () => (/* binding */ githubAppId),
/* harmony export */   "githubAppLink": () => (/* binding */ githubAppLink),
/* harmony export */   "groupFinderUrl": () => (/* binding */ groupFinderUrl)
/* harmony export */ });
const clientId = 'Iv1.0c9196e6fcd3647a';
const githubAppId = 356032; //the github apps
const githubAppLink = 'https://github.com/apps/mirkusve/installations/new';
const mainWebappUrl = 'https://script.google.com/macros/s/AKfycbwztq78Ffh6hPaXVHECZloSnIDnSZ0CJYzjTy96KJ0prxna96NwSO1HoUs8XKIDuIRt/exec';
const codeForTokenUrl = mainWebappUrl + '?path=tokens';
const groupFinderUrl = mainWebappUrl + '?path=group-urls';
const getGroupWebappUrl = async () => {};
const getAnswerSubmitUrl = async () => {
  return (await getGroupWebappUrl()) + '&path=answers';
};


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

chrome.runtime.onMessage.addListener((req, sender, next) => {
  if (req.message === "set-up") (0,_setup_js__WEBPACK_IMPORTED_MODULE_0__.openSetupTab)();
});
chrome.runtime.onMessage.addListener((req, sender, next) => {
  if (req.message === "sign-in") {
    (0,_setup_js__WEBPACK_IMPORTED_MODULE_0__.getRedirectedUrl)(req.userName).then(next);
    return true;
  }
});
})();

/******/ })()
;
//# sourceMappingURL=background.bundle.js.map