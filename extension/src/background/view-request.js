async function requestViewChange(tabId, url) {
	const viewName = await getViewName(url);
	if (!inSlashProblems(url)) return;
	chrome.tabs.sendMessage(tabId, {
		message: "change-view",
		viewName,
	});
}

async function getViewName(link) {
	if (matchesQuestionPage(link)) return "timer";
	else if (matchesSubmissionPage(link)) return "answer-submit";
	else return undefined;
}

function inSlashProblems(url) {
	const pathNodes = new URL(url).pathname.split("/").filter((x) => x !== "");
	const hasProblems = pathNodes[0] === "problems";
	return hasProblems;
}

function matchesSubmissionPage(url) {
	//example
	//https://leetcode.com/problems/two-sum/submissions/54654

	const pathNodes = new URL(url).pathname.split("/").filter((x) => x !== "");
	const hasProblems = pathNodes[0] === "problems";
	const hasSubmissions = pathNodes[pathNodes.length - 2] === "submissions";
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

export default requestViewChange;
