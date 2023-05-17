import html from "./prompt-setup.html";
import "./prompt-setup.css";

function createUi() {
	const container = document.createElement("div");
	container.classList.add("prompt-setup");
	container.innerHTML = html;

	const setupButton = container.querySelector("#setup");
	setupButton.onclick = () => chrome.runtime.sendMessage({ message: "set-up" });

	return container;
}

const promptSetupUi = createUi();
document.body.appendChild(promptSetupUi);

function show() {
	promptSetupUi.classList.remove("hidden");
}
function hide() {
	promptSetupUi.classList.add("hidden");
}

export { show, hide };
