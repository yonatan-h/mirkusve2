import robustFetch from "../lib/robust-fetch.js";
import { EmptyInputError, CustomError } from "../lib/custom-errors.js";
import { codeForTokenUrl } from "../keys.js";
import {
	disableNexts,
	enableNexts,
	showSection,
	handleCustomError,
} from "./ui-functions.js";

const signInButton = document.getElementById("sign-in");
signInButton.addEventListener("click", signInAndStoreToken);

function handleTokenSubmit() {
	disableNexts();
	try {
		const token = document.querySelector(`[name="token"]`).value;
		if (token === "" || token === "undefined") {
			throw new EmptyInputError("Signing in to Github", token);
		}
		showSection("finish");
	} catch (error) {
		enableNexts();
		handleCustomError(error);
	}
	enableNexts();
}

async function signInAndStoreToken() {
	try {
		const userName = document.querySelector(`[name="userName"]`).value;
		const redirectedUrl = await getRedirectedUrl(userName);

		const search = new URL(redirectedUrl).search;
		const code = new URLSearchParams(search).get("code");

		const token = await exchangeForToken(code);
		document.querySelector(`[name="token"]`).value = token;
	} catch (error) {
		handleCustomError(error);
	}
}

async function getRedirectedUrl(userName) {
	const response = await chrome.runtime.sendMessage({
		message: "sign-in",
		userName: userName,
	});

	if (response.error) {
		const { descriptionAndSolution, errorAsString } = response.error;
		throw new CustomError(descriptionAndSolution, errorAsString);
	}

	if (!response.redirectedUrl) {
		const message = "Signin failed. Try signing in again?";
		throw new CustomError(message, responseString);
	}

	return response.redirectedUrl;
}

async function exchangeForToken(code) {
	let tokenUrl;
	tokenUrl = codeForTokenUrl.split("/").filter((n) => n !== "");
	tokenUrl = tokenUrl.join("/");
	tokenUrl += `&code=${code}`;

	const data = await robustFetch(tokenUrl);
	return data.accessToken;
}

export default handleTokenSubmit;
