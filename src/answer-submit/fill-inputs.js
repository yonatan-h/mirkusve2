import { CustomError } from "../lib/custom-errors.js";
import getQuestionName from "../lib/get-question-name.js";

function fillInputs(form, handleCustomError) {
	try {
		setSubmissions();
		setMinutes();

		setFileName();
		setFileExtension();
		setFile();
	} catch (error) {
		if (error instanceof NotAcceptedError) {
			disableForm();
		} else if (error instanceof NoTimerError) {
			const minutesInput = form.querySelector(`[name="minutes"]`);
			minutesInput.removeAttribute("disabled"); //allow user to enter manually
		}

		handleCustomError(error);
	}
}

function setSubmissions() {
	if (!recentWasAccepted()) {
		throw new NotAcceptedError();
	}

	const submissionsInput = form.querySelector(`[name="submissions"]`);

	const totalSubmissionCount = getSubmissionSpans().length;
	submissionsInput.value = totalSubmissionCount;
}

function setFile() {
	const fileInput = form.querySelector(`[name="file"]`);
	const fileContent = document.querySelector("code").innerText;
	fileInput.value = fileContent;
}

function setFileName() {
	const questionNameInput = form.querySelector(`[name="fileName"]`);
	questionNameInput.value = getQuestionName();
}

function setFileExtension() {
	const fileExtensionInput = form.querySelector('[name="fileExtension"]');
	const extension = document.querySelector("code").className;
	fileExtensionInput.value = extension;
}

async function setMinutes() {
	const durations = await chrome.storage.local.set("durations");
	const questionName = getQuestionName();
	const minutes = durations[questionName];

	if (minutes === undefined) throw new NoTimerError();

	const timeInput = form.querySelector(`[name="time"]`);
	timeInput.value = durations;
}

function getSubmissionSpans() {
	const selector = "span.text-green-s, span.text-red-s";
	//[...] because truthy falsey values are not as predicted
	return [...document.querySelectorAll(selector)];
}
function recentWasAccepted() {
	const submissionSpans = getSubmissionSpans();
	return submissionSpans[0]?.innerText === "Accepted";
}

function disableForm(form) {
	form.querySelector("fieldset").setAttribute("disabled", "disabled");
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
