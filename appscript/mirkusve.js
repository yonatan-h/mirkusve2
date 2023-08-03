/**
 * @OnlyCurrentDoc
 */
// For Mirkusve's Appscript to only access this spreadsheet, and not other sheets in the google account
// of the person who deploys this as a web app.
// https://developers.google.com/apps-script/guides/services/authorization

//Enable fetch permission by running
//Logger.log(UrlFetchApp.fetch("example.com"))

///utils///

const QUESTION_SHEETS = {
  names: ['Sheet1'],
  //all zero indexed
  questionsRow: 4,
  questionsFirstCol: 6,
  namesCol: 0,
  namesFirstRow: 5,
}
function outPutJSON(object) {
  const stringified = JSON.stringify(object)
  const textOutput = ContentService.createTextOutput(stringified)
  const jsonOutput = textOutput.setMimeType(ContentService.MimeType.JSON)
  return jsonOutput
}

function errorIfUndefined(name, value) {
  if (value === undefined) {
    throw new Error(`Property '${name}' is undefined. Please fill it out.`)
  }
}

function linkMatchesQuestion(link, questionName) {
  const match = /.*leetcode.com\/problems\/([^\/]+)\/.*/.exec(link)
  if (match && match[1] === questionName) return true
  else return false
}

function getNames(sheet) {
  const names = sheet
    .getRange(
      QUESTION_SHEETS.namesFirstRow + 1,
      QUESTION_SHEETS.namesCol + 1,
      sheet.getLastRow(), //1 index
      1
    )
    .getValues()
    .map((row) => row[0])
  return names
}

function getQuestionLinks(sheet) {
  const questionLinks = sheet
    .getRange(
      QUESTION_SHEETS.questionsRow + 1,
      QUESTION_SHEETS.questionsFirstCol + 1,
      1,
      sheet.getLastColumn() // 1 index
    )
    .getRichTextValues()[0]
    .map((richText) => richText.getLinkUrl())
  return questionLinks
}

function fillAnswer({ sheet, row, col, submissions, fileLink, time }) {
  //row and col ARE ZERO INDEXED
  const subsCell = sheet.getRange(row + 1, col + 1)
  const timeCell = sheet.getRange(row + 1, col + 2)

  const subsRichTextValue = SpreadsheetApp.newRichTextValue()
    .setText(submissions)
    .setLinkUrl(fileLink)
    .build()

  subsCell.setRichTextValue(subsRichTextValue)
  timeCell.setValue(time)
}

///handlers///

function submitAnswer({ submissions, time, fileLink, questionName, name }) {
  errorIfUndefined('submissions', submissions)
  errorIfUndefined('time', time)
  errorIfUndefined('fileLink', fileLink)
  errorIfUndefined('questionName', questionName)
  errorIfUndefined('name', name)

  let questionExists = false

  for (const sheetName of QUESTION_SHEETS.names) {
    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)

    const answerIndex = getNames(sheet).indexOf(name)

    if (answerIndex === -1) {
      throw new Error(
        `Your name '${name}' does not exist in sheet ${sheetName}`
      )
    }

    const questionLinks = getQuestionLinks(sheet)
    for (let queIndex = 0; queIndex < questionLinks.length; queIndex++) {
      const questionLink = questionLinks[queIndex]

      if (linkMatchesQuestion(questionLink, questionName)) {
        questionExists = true
        const col = queIndex + QUESTION_SHEETS.questionsFirstCol
        const row = answerIndex + QUESTION_SHEETS.namesFirstRow
        fillAnswer({ sheet, row, col, submissions, time, fileLink })
      }
    }
  }

  if (!questionExists) {
    throw new Error(
      `Question '${questionName}' does not exist in sheets ${QUESTION_SHEETS.names}`
    )
  }

  return { success: true }
}

function questionExists({ questionName }) {
  errorIfUndefined('questionName', questionName)

  for (const sheetName of QUESTION_SHEETS.names) {
    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)

    for (const link of getQuestionLinks(sheet)) {
      if (linkMatchesQuestion(link, questionName)) {
        return { exists: true }
      }
    }
  }
  return { exists: false }
}

function nameExists({ name }) {
  errorIfUndefined('name', name)
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    QUESTION_SHEETS.names[0]
  )

  const names = getNames(sheet)
  if (names.indexOf(name) === -1) return { exists: false }
  else return { exists: true }
}

///routing///

const getHandlers = {
  questions: questionExists,
  names: nameExists,
}

const postHandlers = {
  answers: submitAnswer,
}

function doGet(event) {
  const { path } = event.parameter

  if (!getHandlers[path]) {
    return outPutJSON({ error: `404. path '${path}' does not exist for GET` })
  } else {
    try {
      return outPutJSON(getHandlers[path](event.parameter))
    } catch (error) {
      return outPutJSON({ error: error.message })
    }
  }
}

function doPost(event) {
  const { path } = event.parameter

  if (!postHandlers[path]) {
    return outPutJSON({
      error: `404. path '${path}' does not exist for POST`,
    })
  } else {
    try {
      return outPutJSON(postHandlers[path](event.parameter))
    } catch (error) {
      return outPutJSON({ error: error.message })
    }
  }
}
