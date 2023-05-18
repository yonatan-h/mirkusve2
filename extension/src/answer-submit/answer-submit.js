import makeHandler from "../lib/handle-custom-error.js";
import { CustomError } from "../lib/custom-errors.js";
import { getSubmissionSpans } from "./submitssion-spans.js";
import fillInputs from "./fill-inputs.js";
import showTreeView from "./tree-view.js";
import sendAnswer from "./send-answer.js";
import html from "./answer-submit.html";
import "./answer-submit.css";

const container = createUi();
document.body.appendChild(container);

const errorBox = container.querySelector("#error-box");
const errorParagraph = errorBox.querySelector("p");
const errorCode = errorBox.querySelector("code");

const handleCustomError = makeHandler(errorParagraph, errorCode);

const folderPathInput = container.querySelector('[name="folderPath"]');
const treeViewDiv = container.querySelector("#tree-view");
const form = container.querySelector("form");
const submitButton = form.querySelector('[type="submit"]');

form.onsubmit = async (event) => {
	try {
		showLoading();
		event.preventDefault();
		await sendAnswer(form);
		stopShowingLoading();
		showSuccessfulSubmit();
	} catch (error) {
		stopShowingLoading();
		handleCustomError(error);
	}
};

async function show() {
	errorParagraph.textContent = "";
	errorCode.textContent = "";
	container.classList.remove("hidden");

	showLoading();

	const numPolls = 20;

	for (let i = 0; i < numPolls; i++) {
		if (pageHasLoaded()) break;
		await sleep(500);
	}

	try {
		errorIfPageNotLoaded();
		await fillInputs(form);
		await showTreeView(treeViewDiv, folderPathInput, handleCustomError);
		stopShowingLoading();
	} catch (error) {
		stopShowingLoading();
		disableForm();
		handleCustomError(error);
	}
}

function hide() {
	container.classList.add("hidden");
}

function createUi() {
	const container = document.createElement("div");
	container.innerHTML = html;
	return container;
}

async function sleep(duration) {
	return new Promise((onSuccess, onFail) => {
		setTimeout(onSuccess, duration);
	});
}

function pageHasLoaded() {
	//one of the code elements is ours
	const hasCode = document.querySelectorAll("code").length >= 2;
	const submissionSpans = getSubmissionSpans();
	const hasSubmissions = submissionSpans.length > 0;

	return hasCode && hasSubmissions;
}

function errorIfPageNotLoaded() {
	if (!pageHasLoaded()) {
		const message = "Page has not loaded, try refreshing the page";
		throw new CustomError(message);
	}
}

function showSuccessfulSubmit() {
	errorParagraph.textContent = "";
	errorCode.textContent = "";
	submitButton.setAttribute("disabled", "disabled");
	submitButton.classList.add("m-success-button");
	submitButton.value = "Submitted!";
}

function disableForm() {
	submitButton.setAttribute("disabled", "disabled");
	submitButton.classList.add("m-grey-button");
	form.classList.add("m-disabled");
}

function showLoading() {
	submitButton.setAttribute("disabled", "disabled");
	submitButton.classList.add("m-grey-button");
	form.classList.add("m-loading");
}

function stopShowingLoading() {
	submitButton.removeAttribute("disabled");
	submitButton.classList.remove("m-grey-button");
	form.classList.remove("m-loading");
}

export { show, hide };
