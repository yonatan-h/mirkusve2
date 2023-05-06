import robustFetch from "../lib/robust-fetch.js";
import {
	BadStatusError,
	CustomError,
	EmptyInputError,
} from "../lib/custom-errors.js";
import removeExcessSlash from "../lib/excess-slash.js";
import { submitAnswerUrl } from "../keys.js";

async function sendAnswer(form, handleCustomError) {
	try {
		const {
			questionName,
			folderPath,
			fileName,
			fileExtension,
			file,
			submissions,
			minutes,
		} = extractKeyValues(form);

		await errorIfAlreadyAnswered(questionName);
		const filePath = getFilePath(folderPath, fileName, fileExtension);
		const uploadResponse = await uploadFileResponse(filePath, file);

		errorIfFileExists(uploadResponse);
		errorIfBadStatus(uploadResponse);

		const fileLink = await getFileLink(uploadFileResponse);
		await submitToSheets(submissions, minutes, fileLink);
	} catch (error) {
		handleCustomError(error);
	}
}

async function extractKeyValues(form) {
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
		if (!keyValues[key]) {
			throw new EmptyInputError(key);
		}
	}
	return keyValues;
}

async function errorIfAlreadyAnswered(questionName) {
	const { name, group } = await chrome.storate.local.get(["name", "group"]);

	let url = submitAnswerUrl;
	url += `&name=${name}&question=${questionName}&group=${group}`;
	url = removeExcessSlash(url);

	const { isEmpty } = await robustFetch(url);
	if (!isEmpty) {
		let message = "You've already answered in sheets.";
		message += "You can't submit twice.";
		throw new CustomError(message);
	}
}

function getFilePath(folderPath, fileName, fileExtension) {
	return `${folderPath}/${fileName}/${fileExtension}`;
}

async function uploadFileResponse(filePath, file) {
	const { userName, repoName, token } = await chrome.storage.local.get([
		"userName",
		"repoName",
		"token",
	]);

	let fileUrl = `https://api.github.com/repos/${userName}/${repoName}/${filePath}`;
	fileUrl = removeExcessSlash(fileUrl);

	const response = await fetch(url, {
		method: "PUT",
		headers: { Authorization: `Bearer ${token}` },
		body: JSON.stringify({
			message: "Uploaded By Mirkusve",
			content: btoa(file), //binary to ascii
		}),
	});

	return response;
}

function errorIfFileExists(response, filePath) {
	if (response.status === 442) {
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

async function submitToSheets(submissions, minutes, fileLink) {
	let url = submitAnswerUrl;
	url += `&name=${storageObject.name}`;
	url += `&question=${questionName}`;
	url += `&group=${storageObject.group}`;

	url += `&submissions=${submissions}`;
	url += `&time=${minutes}`;
	url += `&fileLink=${fileLink}`;

	url = removeExcessSlash(url);

	await robustFetch(url, { method: "POST" });
}

export default sendAnswer;
