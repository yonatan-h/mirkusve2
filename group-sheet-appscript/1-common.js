function outPutJSON(object) {
	const stringified = JSON.stringify(object);
	const textOutput = ContentService.createTextOutput(stringified);
	const jsonOutput = textOutput.setMimeType(ContentService.MimeType.JSON);
	return jsonOutput;
}

const QUESTION_SHEETS = {
	names: ["Sheet1"],
	questionsRow: 5,
	namesCol: 1,
};