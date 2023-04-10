/**
 * @OnlyCurrentDoc
 */
//to ask for permissioin for this spreadsheet only

function main() {}

//rest part
function doGet(event) {
	try {
		const { question, name } = event.parameter;
		if (question === undefined) throw new Error(`question missing`);
		if (name === undefined) throw new Error(`name missing`);

		const areEmpty = answerCellsEmpty(question, name);
		return outPutJSON({ areEmpty });
	} catch (error) {
		Logger.log(error);
		return outPutJSON({ error: error.message });
	}
}

function doPost(event) {
	try {
		const { submissions, time, fileLink, question, name } = event.parameter;

		if (submissions === undefined) throw new Error(`submissions missing`);
		if (time === undefined) throw new Error(`time missing`);
		if (fileLink === undefined) throw new Error(`fileLink missing`);
		if (question === undefined) throw new Error(`question missing`);
		if (name === undefined) throw new Error(`name missing`);

		fillAnswer(event.parameter);
		return outPutJSON({ successful: true });
	} catch (error) {
		return outPutJSON({ error: error.message });
	}
}

function outPutJSON(object) {
	const stringified = JSON.stringify(object);
	const textOutput = ContentService.createTextOutput(stringified);
	const jsonOutput = textOutput.setMimeType(ContentService.MimeType.JSON);
	return jsonOutput;
}

//high level logic part
const QUESTION_SHEETS = {
	names: ["Sheet1"],
	questionsRow: 5,
	namesCol: 1,
};

function answerCellsEmpty(question, name) {
	const { subsCell, timeCell } = getAnswerCells(question, name);
	return subsCell.getValue() === "" && timeCell.getValue() === "";
}

function fillAnswer({ submissions, time, fileLink, question, name }) {
	const { subsCell, timeCell } = getAnswerCells(question, name);
	if (subsCell.getValue() || timeCell.getValue()) {
		throw new Error(`${question} has already been answered`);
	}

	const subsRichValue = SpreadsheetApp.newRichTextValue()
		.setText(submissions)
		.setLinkUrl(fileLink)
		.build();

	subsCell.setRichTextValue(subsRichValue);
	timeCell.setValue(time);
}

function getAnswerCells(question, name) {
	const { sheet, questionCol } = sheetWithQuestionCol(question);
	const answerRow = getAnswerRow(name, sheet);

	const subsCell = sheet.getRange(answerRow, questionCol);
	const timeCell = sheet.getRange(answerRow, questionCol + 1);
	return { subsCell, timeCell };
}

//deep level logic
function getAnswerRow(name, sheet) {
	const namesCol = QUESTION_SHEETS.namesCol;
	const lastRow = sheet.getLastRow();
	const nameRange = sheet.getRange(1, namesCol, lastRow, 1);
	const cellValues = nameRange.getValues();

	for (let row = 1; row < cellValues.length + 1; row++) {
		if (cellValues[row - 1][0] == name) return row;
	}

	throw new Error(`name ${name} not found in ${sheet.getName()}`);
}

function sheetWithQuestionCol(question) {
	const questionsRow = QUESTION_SHEETS.questionsRow;
	for (const name of QUESTION_SHEETS.names) {
		const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
		const lastCol = sheet.getLastColumn();
		const questionsRange = sheet.getRange(questionsRow, 1, 1, lastCol);
		const questionCells = questionsRange.getRichTextValues();

		for (let col = 1; col < questionCells[0].length + 1; col++) {
			const richText = questionCells[0][col - 1];
			const link = richText.getLinkUrl();
			const match = /.*\/problems\/([^/.]*)\/.*/.exec(link);

			if (match && match[1] == question)
				return { sheet: sheet, questionCol: col };
		}
	}

	throw new Error(`question ${question} not found in ${QUESTION_SHEETS.names}`);
}
