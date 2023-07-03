import { BadUrlError } from "./custom-errors.js";

function removeExcessSlash(url) {
	try {
		var urlObj = new URL(url);
	} catch (error) {
		throw new BadUrlError(url);
	}

	let path = urlObj.pathname;

	path = path.split("/");
	path = path.filter((node) => node !== "");
	path = path.join("/");

	urlObj.pathname = path;
	return urlObj.href;
}

export default removeExcessSlash;
