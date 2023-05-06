function createUi() {
	const html = `
    <p> <button id="setup">Setup Mirkusve</button> to send leetcode answers to A2sv!</p>
    <p>Once you are done, refresh this page!</p>
    `;

	const container = document.createElement("div");
	container.classList.add("prompt-setup");
	container.innerHTML = html;

	const setupButton = container.querySelector("#setup");
	setupButton.onclick = () => chrome.runtime.sendMessage({ message: "set-up" });

	return container;
}

function getPromptSetupControls() {
	const promptSetupUi = createUi();
	document.body.appendChild(promptSetupUi);

	function show() {
		promptSetupUi.classList.remove("hidden");
	}
	function hide() {
		promptSetupUi.classList.add("hidden");
	}

	return [show, hide];
}

export default getPromptSetupControls;
