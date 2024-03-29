const clientId = 'Iv1.0c9196e6fcd3647a';
const githubAppId = 356032; //the github apps
const githubAppLink = 'https://github.com/apps/mirkusve/installations/new';

const mainWebappUrl =
  'https://script.google.com/macros/s/AKfycbwztq78Ffh6hPaXVHECZloSnIDnSZ0CJYzjTy96KJ0prxna96NwSO1HoUs8XKIDuIRt/exec';
const codeForTokenUrl = mainWebappUrl + '?path=tokens';
const groupFinderUrl = mainWebappUrl + '?path=group-urls';

const getGroupWebappUrl = async () => {
  const { groupUrl } = await chrome.storage.local.get(['groupUrl']);
  return groupUrl;
};

const getAnswerSubmitUrl = async () => {
  return (await getGroupWebappUrl()) + '?path=answers';
};

const getQuestionExistsUrl = async () => {
  return (await getGroupWebappUrl()) + '?path=questions';
};

export {
  groupFinderUrl,
  clientId,
  codeForTokenUrl,
  getAnswerSubmitUrl,
  getQuestionExistsUrl,
  githubAppLink,
  githubAppId,
};
