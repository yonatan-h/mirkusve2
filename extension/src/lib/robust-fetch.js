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
