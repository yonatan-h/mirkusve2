async function hasSetup() {
	const storageObject = await chrome.storage.local.get();
    if (!storageObject) return false;

    const keys = Object.keys(storageObject)
    if(keys.length == 0) return false;

	return true;
}

export default hasSetup;
