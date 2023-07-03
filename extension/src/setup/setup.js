import handleNameSubmit from "./name.js";
import handleRepoSubmit from "./repo.js";
import handleTokenSubmit from "./token.js";
import handleFinish from "./finish.js";
import { showSection } from "./ui-functions.js";
import "./setup.css";

showSection("intro");
document.querySelector("#intro .next").onclick = () => showSection("name");
document.querySelector("#name .next").onclick = handleNameSubmit;
document.querySelector("#repo .next").onclick = handleRepoSubmit;
document.querySelector("#token .next").onclick = handleTokenSubmit;
document.querySelector("#finish .next").onclick = handleFinish;

document.getElementById("cancel").onclick = () => {
	// Get the current tab
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		// Close the current tab
		chrome.tabs.remove(tabs[0].id);
	});
};
