import { clientId } from "../keys.js";
import { CustomError } from "../lib/custom-errors.js";

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
		const customError = new CustomError(message, error.message);
		return { error: customError };
	}
}

function getAuthURL(name) {
	let authUrl = "https://github.com/login/oauth/authorize";
	authUrl += `?client_id=${clientId}`;
	authUrl += `&scope=repo`;
	authUrl += `&login=${name}`;
	console.log("authUrl", authUrl);
	return authUrl;
}

export { openSetupTab, getRedirectedUrl };
