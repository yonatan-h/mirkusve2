function getSubmissionSpans() {
	return document.querySelectorAll("span.text-green-s, span.text-red-s");
}

function getSelectedDiv() {
	const selected = document.querySelector("div.bg-blue-0");
	return selected;
}

function selectedWasAccepted() {
	const selected = getSelectedDiv();
	const greenSpan = selected.querySelector("span.text-green-s");
	if (!greenSpan) return false;
	return true;
}

export { getSubmissionSpans, selectedWasAccepted, getSelectedDiv };
