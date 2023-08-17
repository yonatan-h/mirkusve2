import { DisablingError } from '../utils/custom-errors.js';
import {
  getCurrentCode,
  getSubmissionSpans,
  getViewMode,
  EDIT_MODE,
  READ_MODE,
  saysNoSubmissions,
} from '../utils/web-scrape.js';

async function waitToLoad() {
  const maxTime = 10000;
  const intervalTime = 800; 

  //ASSUMPTION: if answer code has loaded, every thing else that's needed from the page is loaded
  return new Promise((resolve, reject) => {
    const intervalId = setInterval(() => {
      if (isLoaded()) {
        clearInterval(intervalId);
        resolve();
      }
    }, intervalTime);

    setTimeout(() => {
      clearInterval(intervalId);
      reject(
        new DisablingError('Page took too long to load. Try refreshing it.')
      );
    }, maxTime);
  });
}

export default waitToLoad;

function isLoaded() {
  const mode = getViewMode();
  const submissionSpans = getSubmissionSpans();
  const codeLoaded = getCurrentCode() !== undefined;

  // console.log('loading...', getCurrentCode(), getCurrentCode()===undefined);

  if (mode === READ_MODE) {
    //There MUST be a submission for READ_MODE
    if (codeLoaded && submissionSpans.length) return true;
  } else if (mode === EDIT_MODE) {
    //There may or may not be a submission for EDIT_MODE
    if (codeLoaded && submissionSpans.length) return true;
    if (codeLoaded && saysNoSubmissions()) return true;
  }
  return false;
}
