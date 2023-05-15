import makeHandler from "../lib/handle-custom-error.js";

const errorBox = document.getElementById("error-box");
const errorParagraph = errorBox.querySelector("p");
const errorCode = errorBox.querySelector("code");

const handleCustomError = makeHandler(errorParagraph, errorCode);

function showSection(sectionId) {
	const sections = [...document.querySelectorAll(".form-section")];
	sections.forEach((sec) => sec.classList.add("hidden"));
	document.getElementById(sectionId).classList.remove("hidden");

	errorParagraph.textContent = "";
	errorCode.textContent = "";
}

function disableNexts() {
	const buttons = [...document.querySelectorAll(".next")];
	buttons.forEach((btn) => btn.setAttribute("disabled", "disabled"));
	buttons.forEach((btn) => btn.classList.add("next__disabled"));
}

function enableNexts() {
	const buttons = [...document.querySelectorAll(".next")];
	buttons.forEach((btn) => btn.removeAttribute("disabled"));
	buttons.forEach((btn) => btn.classList.remove("next__disabled"));
}

export { showSection, disableNexts, enableNexts, handleCustomError };
