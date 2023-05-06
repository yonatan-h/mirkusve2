import { disableNexts, enableNexts } from "./ui-functions.js";
import { CustomError } from "../lib/custom-errors.js";
import { handleCustomError } from "./ui-functions.js";

async function handleFinish(event) {
	disableNexts();
	try {
		event.preventDefault();

		const form = document.querySelector("form");
		const formData = new FormData(form);

		const keyValues = { durations: {} }; //for timer
		for (const [key, value] of formData) {
			keyValues[key] = value;
		}

		await save(keyValues);
		const submitInputButton = event.target;
		submitInputButton.value = "Saved!";
		document.getElementById("cancel").setAttribute("disabled", "disabled");
	} catch (error) {
		enableNexts();
		handleCustomError(error);
	}
}

async function save(keyValueObject) {
	try {
		const things = await chrome.storage.local.get();
		alert(JSON.stringify(things));
	} catch (error) {
		throw new CustomError("Could not save setup", error.message);
	}
}

export default handleFinish;
