//could not use json. json type could not be imported.

const sheetsWebappUrl =
	"https://script.google.com/macros/s/AKfycbwqWb7m4z7osZtcQLW5wu61Of6G6rBbGUkr-8OprrahzlkUtk5wZm43xUrLQD7qBCqH/exec";

const groupFinderUrl = sheetsWebappUrl + "?path=groups";
const codeForTokenUrl = sheetsWebappUrl + "?path=tokens";
const submitAnswerUrl = sheetsWebappUrl + "?path=answers";

const clientId = "96309949db0f49ae9c72";

export { groupFinderUrl, clientId, codeForTokenUrl, submitAnswerUrl };
