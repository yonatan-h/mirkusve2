import { groupFinderUrl } from "../keys.js";
import robustFetch from "../lib/robust-fetch.js";
import { EmptyInputError } from "../lib/custom-errors.js";
import {
	disableNexts,
	enableNexts,
	showSection,
	handleCustomError,
} from "./ui-functions.js";

async function handleNameSubmit() {
	const name = document.querySelector(`[name="name"]`).value;
	const groupInput = document.querySelector(`[name="group"]`);

	disableNexts();
	try {
		if (name === "") {
			throw new EmptyInputError("Name");
		}
		groupInput.value = await getGroup(name);

		if (groupInput.value === "" || groupInput.value === "undefined") {
			throw new EmptyInputError("Group (A hidden Input)");
		}

		showSection("repo");
	} catch (error) {
		enableNexts();
		handleCustomError(error);
	}
	enableNexts();
}

async function getGroup(name) {
	let url;
	url = groupFinderUrl.split("/").filter((n) => n !== "");
	url = url.join("/");
	url = `${url}&name=${name}`;

	const data = await robustFetch(url);
	return data["group"];
}

export default handleNameSubmit;

function test() {
	getGroup("Yonatan ");
}

test();
