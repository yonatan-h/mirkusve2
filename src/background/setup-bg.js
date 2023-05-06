import { clientId } from "../keys.js";
import { CustomError } from "../lib/custom-errors.js";

chrome.runtime.onMessage.addListener((req, sender, next) => {
	if (req.message !== "sign-in") return;
	const authUrl = getAuthURL(req.userName);

	getRedirectedUrl(authUrl)
		.then((redirectedUrl) => {
			console.log(redirectedUrl);
			next({ redirectedUrl });
		})
		.catch((error) => {
			const message = "You canceled the sign in? Please sign in to github.";
			const customError = new CustomError(message, error.message);
			next({ error: customError });
		});

	return true;
});

function openSetupTab() {
	const url = chrome.runtime.getURL("/setup/setup.html");
	chrome.tabs.create({ url });
}

async function getRedirectedUrl(authUrl) {
	await chrome.identity.clearAllCachedAuthTokens();
	const result = await chrome.identity.launchWebAuthFlow({
		url: authUrl,
		interactive: true,
	});
	return result;
}

function getAuthURL(name) {
	let authUrl = "https://github.com/login/oauth/authorize";
	authUrl += `?client_id=${clientId}`;
	authUrl += `&scope=repo`;
	authUrl += `&login=${name}`;
	return authUrl;
}

export default openSetupTab;
