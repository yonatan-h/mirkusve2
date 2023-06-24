import hasSetup from "../lib/has-setup";
import "./popup.css";

document.getElementById("setup-button").onclick = () => {
	chrome.runtime.sendMessage({ message: "set-up" });
};

const infoView = document.querySelector(".info-view");
const promptSetupView = document.querySelector(".prompt-setup-view");
chooseView();

async function chooseView() {
	// alert("kjkj");
	if (await hasSetup()) {
		console.log("has setup");
		const { name, group, userName, repoName } = storageObject;
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
