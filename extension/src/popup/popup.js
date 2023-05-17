import "./popup.css";

document.getElementById("setup").onclick = () => {
	chrome.runtime.sendMessage({ message: "set-up" });
};

async function chooseView() {
	const storageObject = await chrome.storage.local.get();
	if (storageObject) {
		const { name, group, userName, repoName } = storageObject;

		document.querySelector(".info-view").classList.remove("hidden");
		document.querySelector("#name").textContent = name;
		document.querySelector("#group").textContent = group;
		document.querySelector("#userName").textContent = userName;
		document.querySelector("#repoName").textContent = repoName;
	} else {
		document.querySelector("prompt-setup-view").classList.remove("hidden");
	}
}

chooseView();
