/**
 * @OnlyCurrentDoc
*/

function main(){}

function groupUrlDoGet(event) {
  	try {
		const { name } = event.parameter;
		if (name === undefined) throw new Error(`name missing`);
    
		return outPutJSON(findGroupAndUrl(name)); //{url, group}
	} catch (error) {
		Logger.log(error);
		return outPutJSON({ error: error.message });
	}
}

function findGroupAndUrl(name){
  //group finder
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("GroupUrls");
  const numRows = sheet.getLastRow()-1;

  //top row, left row, numRows, numCols (one indexed)
  const table = sheet.getSheetValues(2, 1, numRows, 2);

  for (let [group, url] of table){
    const response = UrlFetchApp.fetch(`${url}?path=names&name=${name}`);
    const {error, exists} = JSON.parse(response.getContentText());

    if (error) throw new Error(error);
    else if(exists) return {url, group};

    if (error === undefined && exists==undefined){
     throw new Error(`groupUrl ${url} is not working properly, 'exists' was undefined. (trying to find a student name)`)
    }
  }

  const groups = table.map(row=>row[0]);
  throw new Error(`name '${name}' could not be found in groups [${groups}]. Did you spell it correctly?`);
}

