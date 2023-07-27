async function getStorageObject() {
  const storageObject = await chrome.storage.local.get('durations');

  if (storageObject.durations === undefined) {
    return { durations: {} };
  } else {
    return storageObject;
  }
}

async function loadDuration(questionName) {
  const { durations } = await getStorageObject();
  return durations[questionName];
}

async function storeDuration(questionName, duration) {
  const { durations } = await getStorageObject();
  durations[questionName] = duration;
  await chrome.storage.local.set({ durations });
}

async function forgetDuration(questionName) {
  const { durations } = await getStorageObject();
  delete durations[questionName];
  await chrome.storage.local.set({ durations });
}

function calculateMinutes(duration) {
  const minutes = Math.floor(duration / (60 * 1000));
  return minutes;
}

export { loadDuration, storeDuration, forgetDuration, calculateMinutes };
