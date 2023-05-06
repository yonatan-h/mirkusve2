import getTimerControls from "../timer/timer.js";
import getPromptSetupControls from "../prompt-setup/prompt-setup.js";
import getAnswerSubmitControls from "../answer-submit/answer-submit.js";

/*
Navigating from the leetcode questions page to the submissions page does not really reload the page.
Content scripts are not reloaded when pages(urls) change. 
This allows the content script for the questions page to appear on the submissions page and vice versa.
So, view selector is meant to manually detect a url change, and show/hide content scripts correspondingly.

*/

let [showTimer, hideTimer] = getTimerControls();
let [showPromptSetup, hideSetupPrompt] = getPromptSetupControls();
let [showAnswerSubmit, hideAnswerSubmit] = getAnswerSubmitControls();

window.addEventListener("popstate", chooseView);
console.log(chrome.storage);
async function chooseView() {
	alert("choosing view");
	const link = window.location.href;

	if (await hasNotSetup()) {
		hideTimer();
		hideAnswerSubmit();
		showPromptSetup();
	} else if (matchesQuestionPage(link)) {
		hideAnswerSubmit();
		hideSetupPrompt();
		showTimer();
	} else if (matchesSubmissionPage(link)) {
		hideTimer();
		hideSetupPrompt();
		showAnswerSubmit();
	}
}

async function hasNotSetup() {
	const storageObject = await chrome.storage.local.get();
	if (!storageObject) return false;
	else return true;
}

function matchesSubmissionPage(url) {
	//example
	//https://leetcode.com/problems/two-sum/submissions/

	const pathNodes = new URL(url).pathname.split("/").filter((x) => x !== "");
	const hasProblems = pathNodes[0] === "problems";
	const hasSubmissions = pathNodes[pathNodes.length - 1] === "submissions";
	return hasProblems && hasSubmissions;
}

function matchesQuestionPage(url) {
	//examples
	//https://leetcode.com/problems/two-sum/description/
	//or
	//https://leetcode.com/problems/two-sum/

	const pathNodes = new URL(url).pathname.split("/").filter((x) => x !== "");
	const hasProblem = pathNodes[0] === "problems";
	const hasDescription = pathNodes[pathNodes.length - 1] === "description";
	const questionNameOnly = pathNodes.length === 2;

	return hasProblem && (hasDescription || questionNameOnly);
}
