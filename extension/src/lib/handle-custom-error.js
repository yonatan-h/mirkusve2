import { CustomError } from "./custom-errors.js";

function makeHandler(paragraphElement, codeElement) {
	function handleCustomError(error) {
		if (error instanceof CustomError) {
			paragraphElement.textContent = "";
			codeElement.textContent = "";

			setTimeout(() => {
				paragraphElement.textContent = error.descriptionAndSolution;
				codeElement.textContent = error.errorAsString;
			}, 500);
		} else {
			throw error;
		}
	}

	return handleCustomError;
}

export default makeHandler;

import { EmptyInputError } from "./custom-errors.js";
function test() {
	const p = {};
	const c = {};
	const handler = makeHandler(p, c);

	// handler(new Error());
	handler(new EmptyInputError("dummy input"));
	setTimeout(() => console.log(p, c), 1000);
}
// test();
