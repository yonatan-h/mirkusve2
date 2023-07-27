import { openSetupTab, getRedirectedUrl } from "./setup.js";
import requestViewChange from "./view-request.js";
//All listeners should be exposed, not nested in functions (from the documentation)


chrome.runtime.onMessage.addListener((req, sender, next) => {
	if (req.message === "set-up") openSetupTab();
});

chrome.runtime.onMessage.addListener((req, sender, next) => {
	if (req.message === "sign-in") {
		getRedirectedUrl(req.userName).then(next);
		return true;
	}
});


