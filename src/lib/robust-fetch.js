import {
	BadStatusError,
	AppScriptError,
	NetworkError,
} from "./custom-errors.js";

async function robustFetch(url, options) {
	try {
		const fetchPromise = options ? fetch(url, options) : fetch(url);
		const response = await fetchPromise;
		if (!response.ok) {
			throw new BadStatusError(response);
		}

		const data = await response.json();
		if (data.error) {
			throw new AppScriptError(data);
		}

		return data;
	} catch (error) {
		if (error instanceof TypeError) throw new NetworkError(error);
		else throw error;
	}
}

export default robustFetch;

function test() {
	// should work
	robustFetch("https://api.github.com", { method: "GET" }).then(console.log);
	//should network error
	robustFetch("https://exampl.com").then(console.log);
	//should bad status
	robustFetch("https://api.github.com/asdf").then(console.log);
}
// test();
