import { CustomError } from '../lib/custom-errors.js';
import { getSubmissionSpans, selectedWasAccepted } from './submission-spans.js';
import getQuestionName from '../lib/get-question-name.js';

async function fillInputs(form) {
  errorIfNotAccepted();

  setSubmissions(form);
  await setMinutes(form);

  setFileName(form);
  setQuestionName(form);
  setFileExtension(form);
  setFile(form);
}

function errorIfNotAccepted() {
  if (!selectedWasAccepted()) {
    throw new NotAcceptedError();
  }
}

function setSubmissions(form) {
  const submissionsInput = form.querySelector(`[name="submissions"]`);

  const totalSubmissionCount = getSubmissionSpans().length;
  submissionsInput.value = totalSubmissionCount;
}

function setFile(form) {
  const fileInput = form.querySelector(`[name="file"]`);
  const fileContent = document.querySelector('code').innerText;

  fileInput.value = fileContent;
}

function setFileName(form) {
  const fileNameInput = form.querySelector(`[name="fileName"]`);
  fileNameInput.value = getQuestionName(window.location.href);
}

function setQuestionName(form) {
  const questionNameInput = form.querySelector(`[name="questionName"]`);
  questionNameInput.value = getQuestionName(window.location.href);
}

function setFileExtension(form) {
  const fileExtensionInput = form.querySelector('[name="fileExtension"]');
  const map = {
    'language-python': 'py',
    'language-javascript': 'js',
    'language-cpp': 'cpp',
    'language-java': 'java',
    'language-dart': 'dart',
  };

  const className = document.querySelector('code').className;
  fileExtensionInput.value = map[className] || 'txt';
}

async function setMinutes(form) {
  const { durations } = await chrome.storage.local.get('durations');
  const questionName = getQuestionName(window.location.href);
  const milliseconds = durations[questionName] ?? 0;
  const minutes = Math.floor(milliseconds / (1000 * 60)); //ms to minutes

  if (minutes === undefined) throw new NoTimerError();

  const minutesInput = form.querySelector(`[name="minutes"]`);
  minutesInput.value = minutes;
}

class NotAcceptedError extends CustomError {
  constructor() {
    super('You need to have an accepted answer in order to submit');
  }
}

export default fillInputs;
