import { loadDuration } from '../utils/duration.js';
import { DisablingError } from '../utils/custom-errors.js';
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

async function autoFill(updateData) {
  if (!getSubmissionSpans().length) {
    throw new DisablingError(
      'No answer has been submitted so far. There is nothing to submit.'
    );
  }
  if (!currentCodeIsAccepted()) {
    if (acceptedSubmissionExists()) {
      throw new DisablingError(
        `You can't submit an unaccepted answer. Please select/view an accepted answer.`
      );
    } else {
      throw new DisablingError(
        `Try more and have an accepted answer! Unaccepted answers can not be submitted.`
      );
    }
  }

  const url = window.location.href;
  const duration = (await loadDuration(getQuestionName(url))) || 0;

  const data = {
    submissions: getSubmissionSpans().length,
    fileExtension: getCurrentFileExtension(),
    file: getCurrentCode(),
    minutes: calculateMinutes(duration),
  };

  updateData(data);
}

export default autoFill;
