//Content scripts cant take advantage of type="module" by default
//but linking them through script tags allows them to do so
//its a work around

(function () {
	console.log(chrome.storage);

	const script = document.createElement("script");
	const jsPath = "/view-selector/view-selector.js";
	const src = chrome.runtime.getURL(jsPath);

	alert(src);

	script.src = src;
	script.type = "module";

	document.body.appendChild(script);
})();
