function main() {}

function studentNameDoGet(event) {
	try {
		const { name } = event.parameter;
		if (name === undefined) throw new Error(`name missing`);

		return outPutJSON({ exists:nameExists(name) });
	} catch (error) {
		Logger.log(error);
		return outPutJSON({ error: error.message });
	}
}

function nameExists(name){
  const namesCol = QUESTION_SHEETS.namesCol;
  const sheetName = QUESTION_SHEETS.names[0];
	const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

	const lastRow = sheet.getLastRow();
	const nameRange = sheet.getRange(1, namesCol, lastRow, 1);
	const cellValues = nameRange.getValues();

	for (let row = 1; row < cellValues.length + 1; row++) {
		if (cellValues[row - 1][0] == name) return true;
	}
  return false;
}
