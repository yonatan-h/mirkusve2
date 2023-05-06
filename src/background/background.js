import openSetupTab from "./setup-bg.js";
//All listeners should be exposed, not nested in functions (from the documentation)

chrome.management.onInstalled.addListener(({ id }) => {
	if (id === chrome.runtime.id) openSetupTab();
});

chrome.runtime.onMessage.addListener((req, sender, next) => {
	if (req.message === "set-up") openSetupTab();
});

console.log("background.js working");

chrome.action.onClicked.addListener(openSetupTab);
