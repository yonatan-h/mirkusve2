import makeHandler from '../lib/handle-custom-error.js';
import { CustomError } from '../lib/custom-errors.js';
import { getSelectedDiv } from './submission-spans.js';
import fillInputs from './fill-inputs.js';
import showFolderPrompt from './folder.js';
import sendAnswer from './send-answer.js';
import afterSubmit from './after-submit.js';

import html from './answer-submit.html';
import './answer-submit.css';

const container = createUi();
document.body.appendChild(container);

const window = container.querySelector('.submit');
const minimizeButton = container.querySelector('#minimize-button');
const maximizeButton = container.querySelector('#maximize-button');

const errorBox = container.querySelector('#error-box');
const errorParagraph = errorBox.querySelector('p');
const errorCode = errorBox.querySelector('code');

const handleCustomError = makeHandler(errorParagraph, errorCode);

const folderPathInput = container.querySelector('[name="folderPath"]');
const folderPromptContainer = container.querySelector(
  '#folder-prompt-container'
);
const form = container.querySelector('form');
const submitButton = form.querySelector('[type="submit"]');

minimizeButton.onclick = () => {
  form.classList.add('hidden');
};

maximizeButton.onclick = () => {
  form.classList.remove('hidden');
};

form.onsubmit = async (event) => {
  event.preventDefault();
  await afterSubmit();

  try {
    showLoading();
    await sendAnswer(form);
    stopShowingLoading();

    showSuccessfulSubmit();
  } catch (error) {
    stopShowingLoading();
    handleCustomError(error);
  }
};

function clearError() {
  errorParagraph.textContent = '';
  errorCode.textContent = '';
}

async function show() {
  clearError();
  container.classList.remove('hidden');
  enableForm();
  showLoading();

  await waitForLoad();

  try {
    await fillInputs(form);
    await showFolderPrompt({
      promptContainer: folderPromptContainer,
      folderPathInput,
      handleCustomError,
      clearError,
    });
    stopShowingLoading();
  } catch (error) {
    stopShowingLoading();
    disableForm();
    handleCustomError(error);
  }
}

function hide() {
  container.classList.add('hidden');
}

function createUi() {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
}

//compares the previous code with current one
//or waits for code to load
async function waitForLoad() {
  const selected = getSelectedDiv();
  const numPolls = 20;

  for (let i = 0; i < numPolls; i++) {
    const codes = document.querySelectorAll('code');
    //error box has code too
    if (selected !== getSelectedDiv() && codes.length >= 2) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  const message = 'Page has not loaded, try refreshing the page';
  throw new CustomError(message);
}

function showSuccessfulSubmit() {
  errorParagraph.textContent = '';
  errorCode.textContent = '';
  submitButton.setAttribute('disabled', 'disabled');
  submitButton.classList.add('success-button');
  submitButton.value = 'Submitted!';
}

function disableForm() {
  submitButton.setAttribute('disabled', 'disabled');
  submitButton.classList.add('grey-button');
  form.classList.add('disabled-form');
  window.classList.add('disabled');
}

function enableForm() {
  submitButton.removeAttribute('disabled', 'disabled');
  submitButton.classList.remove('grey-button');
  form.classList.remove('disabled-form');
  window.classList.remove('disabled');
}

function showLoading() {
  submitButton.setAttribute('disabled', 'disabled');
  submitButton.classList.add('grey-button');
  window.classList.add('loading');
}

function stopShowingLoading() {
  submitButton.removeAttribute('disabled');
  submitButton.classList.remove('grey-button');
  window.classList.remove('loading');
}

export { show, hide };
