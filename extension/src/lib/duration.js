async function getDuration(questionName) {
	const { durations } = await chrome.storage.local.get("durations");
	return durations[questionName];
}

async function setDuration(questionName, duration) {
	const { durations } = await chrome.storage.local.get("durations");
	durations[questionName] = duration;
	await chrome.storage.local.set({ durations: durations });
}

async function forgetDuration(questionName) {
	const { durations } = await chrome.storage.local.get("durations");
	delete durations[questionName];
	await chrome.storage.local.set({ durations: durations });
}

function calculateMinutes(duration) {
	const minutes = Math.floor(duration / (60 * 1000));
	return minutes;
}

export { getDuration, setDuration, forgetDuration, calculateMinutes };
