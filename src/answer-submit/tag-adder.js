//Content scripts cant take advantage of type="module" by default
//but linking them through script tags allows them to do so
//its a work around

(function () {
	const script = document.createElement("script");
	const jsPath = "/answer-submit/answer-submit.js";
	const src = chrome.runtime.getURL(jsPath);

	script.src = src;
	script.type = "module";

	document.body.appendChild(script);
})();
