import { clientId } from '../utils/keys.js';
import { CustomError } from '../utils/custom-errors.js';

function openSetupTab() {
  const url = chrome.runtime.getURL('/setup.html');
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
    const message = 'You canceled the sign in? Please sign in to github.';
    const custom_Error = new CustomError(message, error.message);
    return { error: custom_Error };
  }
}

function getAuthURL(name) {
  let authUrl = 'https://github.com/login/oauth/authorize';
  authUrl += `?client_id=${clientId}`;
  authUrl += `&login=${name}`;
  return authUrl;
}

export { openSetupTab, getRedirectedUrl };
