import { CustomError } from "../lib/custom-errors.js";
import getQuestionName from "../lib/get-question-name.js";

async function fillInputs(form) {
	setSubmissions(form);
	await setMinutes(form);

	setFileName(form);
	setQuestionName(form);
	setFileExtension(form);
	setFile(form);
}

function setSubmissions(form) {
	if (!recentWasAccepted()) {
		throw new NotAcceptedError();
	}

	const submissionsInput = form.querySelector(`[name="submissions"]`);

	const totalSubmissionCount = getSubmissionSpans().length;
	submissionsInput.value = totalSubmissionCount;
}

function setFile(form) {
	const fileInput = form.querySelector(`[name="file"]`);
	const fileContent = document.querySelector("code").innerText;

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
	const className = document.querySelector("code").className;
	const map = {
		"language-python": "py",
	};

	fileExtensionInput.value = map[className] || "txt";
}

async function setMinutes(form) {
	const { durations } = await chrome.storage.local.get("durations");
	const questionName = getQuestionName(window.location.href);
	const minutes = Math.round(durations[questionName] / (1000 * 60)); //ms to minutes

	if (minutes === undefined) throw new NoTimerError();

	const minutesInput = form.querySelector(`[name="minutes"]`);
	minutesInput.value = minutes;
}

function getSubmissionSpans() {
	const selector = "span.text-green-s, span.text-red-s";
	//[...] because truthy falsey values are not as predicted
	return [...document.querySelectorAll(selector)];
}
function recentWasAccepted() {
	const submissionSpans = getSubmissionSpans();
	return submissionSpans[0]?.classList.contains("text-green-s");
}

class NotAcceptedError extends CustomError {
	constructor() {
		super("You need to have an accepted answer in order to submit");
	}
}

class NoTimerError extends CustomError {
	constructor() {
		super(
			"Did the question before mirkusve? You have to manually input the minutes manually."
		);
	}
}

export default fillInputs;
