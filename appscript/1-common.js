function outPutJSON(object) {
	const stringified = JSON.stringify(object);
	const textOutput = ContentService.createTextOutput(stringified);
	const jsonOutput = textOutput.setMimeType(ContentService.MimeType.JSON);
	return jsonOutput;
}
