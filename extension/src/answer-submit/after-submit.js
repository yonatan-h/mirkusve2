import { forgetDuration } from "../lib/duration";
import getQuestionName from "../lib/get-question-name";

async function afterSubmit() {
	const questionName = getQuestionName(window.location.href);
	await forgetDuration(questionName);
}

export default afterSubmit;
