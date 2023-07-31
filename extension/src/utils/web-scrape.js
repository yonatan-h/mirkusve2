function getQuestionName(link) {
  //*/problems/*/*
  const match = /.*\/problems\/([^\/]+)\/.*/.exec(link);
  if (!match) {
    throw new Error(`Question name could not be extracted from link (${link})`);
  }
  return match[1];
}

//Ways of viewing submitted leetcode answers

// eg) When first time submitting, code shown is still editable. In .../submissions/
const EDIT_MODE = 'edit-mode';
//eg) When visiting old submissions, code shown is not editable. In .../submissions/.../
const READ_MODE = 'read-mode';

function getSubmissionSpans() {
  const acceptedSelector = 'div.cursor-pointer span.text-green-s';
  const nonAcceptedSelector = 'div.cursor-pointer span.text-red-s';

  const submissionSpans = document.querySelectorAll(
    `${acceptedSelector}, ${nonAcceptedSelector}`
  );

  return submissionSpans;
}

function getViewMode() {
  const url = window.location.href;
  if (url.match(/submissions\/$/)) {
    return EDIT_MODE;
  } else if (url.match(/submissions\/[^\/]+\//)) {
    return READ_MODE;
  } else {
    throw Error('the url is niether */submissions/* nor */submissions/');
  }
}

function getCurrentCode() {
  if (getViewMode() === EDIT_MODE) {
    const editor = document.querySelector('div.view-lines');
    return editor?.textContent;
  } else {
    const codeReader = document.querySelector('pre code');
    return codeReader?.textContent;
  }
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

  if (getViewMode() === EDIT_MODE) {
    const key = document.querySelector('div[data-mode-id]').dataset.modeId;
    return editModeMap[key] || 'txt';
  } else {
    const key = document.querySelector('pre code').className;
    return readModeMap[key] || 'txt';
  }
}

function currentCodeIsAccepted() {
  if (getViewMode() === EDIT_MODE) {
    const spans = getSubmissionSpans();
    if (!spans.length) return false;
    return spans[0].className.match(/green/) !== null;
  } else {
    const chart = document.querySelector('rect.highcharts-background');
    return chart != null;
  }
}

function acceptedSubmissionExists() {
  for (const span of getSubmissionSpans()) {
    if (span.className.match(/green/)) {
      return true;
    }
  }
  return false;
}

function saysNoSubmissions() {
  const nullImageExists =
    document.querySelector('img[alt="数据为空"]') !== null;
  if (nullImageExists) return true;

  const noDataCandidateDivs = document.querySelectorAll('div.text-label-3');
  for (const div of noDataCandidateDivs) {
    if (div.textContent.toLowerCase() === 'no data') return true;
  }

  return false;
}

export {
  EDIT_MODE,
  READ_MODE,
  getSubmissionSpans,
  getViewMode,
  getQuestionName,
  getCurrentCode,
  getCurrentFileExtension,
  currentCodeIsAccepted,
  acceptedSubmissionExists,
  saysNoSubmissions,
};
