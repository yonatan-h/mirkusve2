import { loadDuration } from '../utils/duration.js';
import { CustomError } from '../utils/custom-errors.js';
import { calculateMinutes } from '../utils/duration.js';

import {
  EDIT_MODE,
  READ_MODE,
  getSubmissionSpans,
  getViewMode,
  getQuestionName,
  getCurrentCode,
  getCurrentFileExtension,
  currentCodeIsAccepted,
  acceptedSubmissionExists,
} from '../utils/web-scrape.js';

async function autoFill(setDatum) {
  if (!getSubmissionSpans().length) {
    throw new CustomError(
      'No answer has been submitted so far. There is nothing to submit.'
    );
  }
  if (!currentCodeIsAccepted()) {
    if (acceptedSubmissionExists()) {
      throw new CustomError(
        `You can't submit an unaccepted answer. Please select/view an accepted answer.`
      );
    } else {
      throw new CustomError(
        `Try more and have an accepted answer! Unaccepted answers can not be submitted.`
      );
    }
  }

  const url = window.location.href;

  console.log(
    JSON.stringify({
      submissions: getSubmissionSpans().length,
      minutes: calculateMinutes(await loadDuration(getQuestionName(url))),
      fileExtension: getCurrentFileExtension(),
      file: getCurrentCode(),
    })
  );

  setDatum('submissions', getSubmissionSpans().length);
  setDatum('minutes', await loadDuration(getQuestionName(url)));
  // setDatum('fileName', getQuestionName(url));
  setDatum('fileExtension', getCurrentFileExtension());
  setDatum('file', getCurrentCode());
}

export default autoFill;
