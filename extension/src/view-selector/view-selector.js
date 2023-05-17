import { show as showTimer, hide as hideTimer } from "../timer/timer.js";

import {
	show as showPromptSetup,
	hide as hidePromptSetup,
} from "../prompt-setup/prompt-setup.js";

import {
	show as showAnswerSubmit,
	hide as hideAnswerSubmit,
} from "../answer-submit/answer-submit.js";

/*
Navigating from the leetcode questions page to the submissions page does not really reload the page.
The content scripts are not reloaded when pages(urls) change. 
This allows the content script for the questions page to appear on the submissions page and vice versa.
So, view selector is meant to manually detect a url change, and show/hide content scripts correspondingly.

*/

const nameViewPairs = {
	"prompt-setup": showPromptSetup,
	timer: showTimer,
	"answer-submit": showAnswerSubmit,
};

hideEveryView();
chrome.runtime.onMessage.addListener((req, sender, next) => {
	const { message, viewName } = req;
	if (message === "change-view") {
		hideEveryView();
		if (viewName in nameViewPairs) {
			nameViewPairs[viewName]();
		}
	}
});

function hideEveryView() {
	hideTimer();
	hidePromptSetup();
	hideAnswerSubmit();
}
