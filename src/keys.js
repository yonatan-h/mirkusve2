//could not use json. json type could not be imported.

const sheetsWebappUrl =
	"https://script.google.com/macros/s/AKfycbyCGaLrifSlvIeD1tOvc9soFfAbYYcS2cJ1q7VuETVxoTcnBJGMzLLdlpd5MkTOguRq/exec";

const groupFinderUrl = sheetsWebappUrl + "?path=groups";
const codeForTokenUrl = sheetsWebappUrl + "?path=tokens";
const submitAnswerUrl = sheetsWebappUrl + "?path=answers";

const clientId = "96309949db0f49ae9c72";
const clientSecret = "57915a7c26dc315351e112376fe3b95eaece4ac8";

export { groupFinderUrl, clientId, codeForTokenUrl, submitAnswerUrl };
