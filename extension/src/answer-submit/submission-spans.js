function getSubmissionSpans() {
	return document.querySelectorAll("span.text-green-s, span.text-red-s");
}

function recentWasAccepted() {
	const submissionSpans = getSubmissionSpans();

	return submissionSpans[0].classList.contains("text-green-s");
}
export { getSubmissionSpans, recentWasAccepted };
