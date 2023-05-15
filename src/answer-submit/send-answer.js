import { encode } from "js-base64";
import robustFetch from "../lib/robust-fetch.js";
import removeExcessSlash from "../lib/excess-slash.js";
import { submitAnswerUrl } from "../keys.js";
import {
	BadStatusError,
	CustomError,
	EmptyInputError,
} from "../lib/custom-errors.js";

async function sendAnswer(form) {
	const {
		folderPath,
		questionName,
		fileName,
		fileExtension,
		file,
		submissions,
		minutes,
	} = extractKeyValues(form);

	await errorIfAlreadyAnswered(questionName);
	const filePath = getFilePath(folderPath, fileName, fileExtension);
	const uploadResponse = await uploadFileResponse(filePath, file);

	errorIfFileExists(uploadResponse, filePath);
	errorIfBadStatus(uploadResponse);

	const fileLink = await getFileLink(uploadResponse);
	await submitToSheets({ submissions, minutes, questionName, fileLink });
}

function extractKeyValues(form) {
	const keyValues = {};
	const formData = new FormData(form);
	for (const [key, value] of formData) {
		keyValues[key] = value;
	}

	if (!keyValues["folderPath"]) {
		let message = "Please select a folder in your repo for the answer file";
		throw new CustomError(message);
	}

	for (const key in keyValues) {
		if (!keyValues[key]) throw new EmptyInputError(key);
	}
	return keyValues;
}

async function errorIfAlreadyAnswered(questionName) {
	const { name, group } = await chrome.storage.local.get(["name", "group"]);

	let url = submitAnswerUrl;
	url += `&name=${name}&question=${questionName}&group=${group}`;
	url = removeExcessSlash(url);

	const { isAnswered } = await robustFetch(url);
	if (isAnswered) {
		let message = "You've already answered in sheets.";
		message += "You can't submit twice.";
		throw new CustomError(message);
	}
}

function getFilePath(folderPath, fileName, fileExtension) {
	return `${folderPath}/${fileName}.${fileExtension}`;
}

async function uploadFileResponse(filePath, file) {
	const { userName, repoName, token } = await chrome.storage.local.get([
		"userName",
		"repoName",
		"token",
	]);

	let fileUrl = `https://api.github.com/repos/${userName}/${repoName}/contents/${filePath}`;
	fileUrl = removeExcessSlash(fileUrl);

	const response = await fetch(fileUrl, {
		method: "PUT",
		headers: { Authorization: `Bearer ${token}` },
		body: JSON.stringify({
			message: "Uploaded By Mirkusve",
			content: encode(file), //binary to ascii
		}),
	});

	return response;
}

function errorIfFileExists(response, filePath) {
	if (response.status === 422) {
		//discovered 422 from trail and error
		const message = `${filePath} already exists in your repo. You can't submit twice`;
		throw new CustomError(message);
	}
}

function errorIfBadStatus(response) {
	if (!response.ok) {
		throw new BadStatusError(response);
	}
}

async function getFileLink(response) {
	const data = await response.json();
	return data["content"]["html_url"];
}

async function submitToSheets({
	submissions,
	minutes,
	questionName,
	fileLink,
}) {
	const { name, group } = await chrome.storage.local.get(["name", "group"]);

	let url = submitAnswerUrl;
	url += `&name=${name}`;
	url += `&question=${questionName}`;
	url += `&group=${group}`;

	url += `&submissions=${submissions}`;
	url += `&time=${minutes}`;
	url += `&fileLink=${fileLink}`;

	url = removeExcessSlash(url);

	const data = await robustFetch(url, { method: "POST" });

	if (data.error) {
		const { descriptionAndSolution, errorAsString = "" } = data;
		if (errorAsString) {
			throw new CustomError(descriptionAndSolution, errorAsString);
		} else {
			throw new CustomError(descriptionAndSolution);
		}
	}
}

export default sendAnswer;
