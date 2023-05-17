import { openSetupTab, getRedirectedUrl } from "./setup.js";
import requestViewChange from "./view-request.js";
//All listeners should be exposed, not nested in functions (from the documentation)

chrome.management.onInstalled.addListener(({ id }) => {
	if (id === chrome.runtime.id) openSetupTab();
});

chrome.runtime.onMessage.addListener((req, sender, next) => {
	if (req.message === "set-up") openSetupTab();
});

chrome.runtime.onMessage.addListener((req, sender, next) => {
	if (req.message === "sign-in") {
		getRedirectedUrl(req.userName).then(next);
		return true;
	}
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	const url = tab.url;
	if (url && changeInfo.status === "complete") {
		requestViewChange(tabId, url);
	}
});

// chrome.action.onClicked.addListener(openSetupTab);
