import { CustomError } from '../utils/custom-errors.js';
import { loadDuration } from '../utils/duration.js';
import getQuestionName from '../utils/get-question-name.js';

export default async function autoFill(setDatum) {
  await waitToLoad();
  if (!getNumberOfSubmissions()) {
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

  const submissions = getNumberOfSubmissions();
  const minutes = await loadDuration(getQuestionName(window.location.href));
  const fileName = getQuestionName(window.location.href);
  const fileExtension = getCurrentFileExtension();
  const file = getCurrentCode();

  setDatum('submissions', submissions);
  setDatum('minutes', minutes);
  setDatum('fileName', fileName);
  setDatum('fileExtension', fileExtension);
  setDatum('file', file);
}

async function waitToLoad() {
  const maxTime = 10000;
  const intervalTime = 500;

  return new Promise((success, fail) => {
    const intervalId = setInterval(() => {
      const editCodeLoaded = document.querySelector('div.view-lines') != null;
      const readCodeLoaded = document.querySelector('pre code') != null;
      const insideEditMode = inEditMode();

      if (
        (editCodeLoaded && insideEditMode) ||
        (readCodeLoaded && !insideEditMode)
      ) {
        success();
      }
    }, intervalTime);

    setTimeout(() => {
      clearInterval(intervalId);
      throw new CustomError(
        'Time Out. The page took too long to load. Try refreshing the page'
      );
    }, maxTime);
  });
}

function currentCodeIsAccepted() {
  if (inEditMode()) {
    const spans = getSubmissionSpans();
    if (!spans.length) return false;
    return spans[0].className.match(/green/) != null;
  } else {
    const chart = document.querySelector('rect.highcharts-background');
    return chart != null;
  }
}

function getCurrentCode() {
  if (inEditMode()) {
    const editor = document.querySelector('div.view-lines');
    return editor.textContent;
  } else {
    const codeReader = document.querySelector('pre code');
    return codeReader.textContent;
  }
}

function getNumberOfSubmissions() {
  return getSubmissionSpans().length;
}

function acceptedSubmissionExists() {
  for (const span of getSubmissionSpans()) {
    if (span.className.match(/green/)) {
      return true;
    }
  }

  return false;
}

function getCurrentFileExtension() {
  const editModeMap = {
    python3: 'py',
    cpp: 'cpp',
    java: 'java',
    python: 'py',
    c: 'c',
    csharp: 'cs',
    javascript: 'js',
    ruby: 'rb',
    swift: 'swift',
    golang: 'go',
    scala: 'sc',
    kotlin: 'kt',
    rust: 'rs',
    php: 'php',
    typescript: 'ts',
    racket: 'rkt',
    erlang: 'erl',
    elixir: 'exs',
    dart: 'dart',
  };

  const readModeMap = {
    'language-python': 'py',
    'language-javascript': 'js',
    'language-cpp': 'cpp',
    'language-java': 'java',
    'language-dart': 'dart',
  };

  if (inEditMode()) {
    const key = document.querySelector('div[data-mode-id]').dataset.modeId;
    return editModeMap[key] || 'txt';
  } else {
    const key = document.querySelector('pre code').className;
    return readModeMap[key] || 'txt';
  }
}

function getSubmissionSpans() {
  const acceptedSelector = 'div.cursor-pointer span.text-green-s';
  const nonAcceptedSelector = 'div.cursor-pointer span.text-red-s';

  const submissionSpans = document.querySelectorAll(
    `${acceptedSelector}, ${nonAcceptedSelector}`
  );

  return submissionSpans;
}

function inEditMode() {
  const url = window.location.href;
  if (url.match(/submissions[\/]?$/)) {
    return true;
  } else if (url.match(/submissions\/[^\/]+[\/]?/)) {
    return false;
  } else {
    throw Error('the url is niether */submissions/* nor */submissions/');
  }
}
