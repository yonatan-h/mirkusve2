import hasSetup from "../lib/has-setup";
import "./popup.css";

document.getElementById("setup-button").onclick = () => {
	chrome.runtime.sendMessage({ message: "set-up" });
};

document.getElementById("options-button").onclick = () => {
	document.querySelector(".options").classList.toggle("hidden");
};
document.getElementById("reset-button").onclick = async (e) => {
	await chrome.storage.local.clear();
	e.target.textContent = "Cleared!";
	setTimeout(() => window.close(), 1000);
};

const infoView = document.querySelector(".info-view");
const promptSetupView = document.querySelector(".prompt-setup-view");
chooseView();

async function chooseView() {
	if (await hasSetup()) {
		console.log("has setup");
		const storageObject = await chrome.storage.local.get();
		const { name, group, userName, repoName, durations } = storageObject;
		infoView.classList.remove("hidden");
		promptSetupView.classList.add("hidden");

		document.querySelector("#name").textContent = name;
		document.querySelector("#group").textContent = group;
		document.querySelector("#userName").textContent = userName;
		document.querySelector("#repoName").textContent = repoName;
	} else {
		infoView.classList.add("hidden");
		promptSetupView.classList.remove("hidden");
	}
}
