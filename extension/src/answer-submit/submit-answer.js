import robustFetch from '../utils/robust-fetch.js';
import removeExcessSlash from '../utils/excess-slash.js';
import { getAnswerSubmitUrl, getQuestionExistsUrl } from '../utils/keys.js';
import joinWithPath from '../utils/join-path.js';
import {
  BadStatusError,
  CustomError,
  DisablingError,
  EmptyInputError,
} from '../utils/custom-errors.js';

async function submitAnswer({
  folderPath,
  questionName,
  fileName,
  fileExtension,
  file,
  submissions,
  minutes,
}) {
  errorIfQuestionNotInSheets(questionName);

  const filePath = joinWithPath(folderPath, fileName + '.' + fileExtension);
  const uploadResponse = await uploadFileResponse(filePath, file);

  errorIfFileExists(uploadResponse, filePath);
  errorIfBadStatus(uploadResponse);

  const fileLink = await getFileLink(uploadResponse);
  await submitToSheets({ submissions, minutes, questionName, fileLink });
}

async function errorIfQuestionNotInSheets(questionName) {
  const { name } = await chrome.storage.local.get();
  const questionExistsUrl = await getQuestionExistsUrl();

  let url = questionExistsUrl;
  url += `&questionName=${questionName}`;

  const { exists } = await robustFetch(removeExcessSlash(url));
  if (exists === false) {
    throw new DisablingError(
      `Question ${questionName} does'nt exist in sheets`
    );
  }
}

async function uploadFileResponse(filePath, file) {
  const { userName, repoName, token } = await chrome.storage.local.get();

  let fileUrl = `https://api.github.com/repos/${userName}/${repoName}/contents/${filePath}`;
  fileUrl = removeExcessSlash(fileUrl);

  const response = await fetch(fileUrl, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      message: 'Uploaded By Mirkusve',
      content: btoa(file), //binary to ascii
    }),
  });

  return response;
}

function errorIfFileExists(response, filePath) {
  if (response.status === 422) {
    //discovered 422 from trail and error
    const message = `${filePath} already exists in your repo. Please choose a different file name or folder.`;
    throw new CustomError(message);
  }
}

function errorIfBadStatus(response) {
  if (!response.ok) throw new BadStatusError(response);
}

async function getFileLink(response) {
  const data = await response.json();
  return data['content']['html_url'];
}

async function submitToSheets({
  submissions,
  minutes,
  questionName,
  fileLink,
}) {
  const { name } = await chrome.storage.local.get();
  const submitAnswerUrl = await getAnswerSubmitUrl();

  let url = submitAnswerUrl;
  url += `&name=${name}`;
  url += `&questionName=${questionName}`;

  url += `&submissions=${submissions}`;
  url += `&time=${minutes}`;
  url += `&fileLink=${fileLink}`;

  url = removeExcessSlash(url);

  const data = await robustFetch(url, { method: 'POST' });
  return data.success === true;
}

export default submitAnswer;
