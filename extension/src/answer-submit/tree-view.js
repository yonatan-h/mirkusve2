import robustFetch from "../lib/robust-fetch.js";
import "./tree-view.css";

async function showTreeView(viewDiv, folderPathInput) {
	const fetchOptions = await getFetchOptions();
	const sha = await getSha(getFetchOptions);
	const folderPaths = await getFolderPaths(sha, fetchOptions);

	viewDiv.replaceChildren(); //by nothing
	createView(folderPaths, viewDiv, folderPathInput);
}

async function getFetchOptions() {
	const { token } = await chrome.storage.local.get("token");

	const fetchOptions = {
		method: "GET",
		headers: {
			Accept: "application/vnd.github+json",
			Authorization: `Bearer ${token}`,
		},
	};

	return fetchOptions;
}

async function getSha(fetchOptions) {
	const { userName, repoName } = await chrome.storage.local.get([
		"userName",
		"repoName",
	]);

	const url = `https://api.github.com/repos/${userName}/${repoName}/commits/main`;
	const data = await robustFetch(url, fetchOptions);
	return data.sha;
}

async function getFolderPaths(sha, fetchOptions) {
	const { userName, repoName } = await chrome.storage.local.get([
		"userName",
		"repoName",
	]);

	const treeUrl = `https://api.github.com/repos/${userName}/${repoName}/git/trees/${sha}?recursive=1`;
	const { tree } = await robustFetch(treeUrl, fetchOptions);

	const folderPaths = tree
		.filter((node) => node.type === "tree")
		.map((folder) => folder.path);

	folderPaths.push("/");
	return folderPaths;
}

function createView(folderPaths, viewDiv, folderPathInput) {
	folderPaths.sort(); // same parents together

	for (const path of folderPaths) {
		const folderElement = createFolderElement({
			path,
			folderPathInput,
			viewDiv,
		});
		viewDiv.appendChild(folderElement);
	}
}

function createFolderElement({ path, folderPathInput, viewDiv }) {
	const nodes = path.split("/").filter((node) => node !== "");
	const length = nodes.length;
	const name = length ? nodes[length - 1] : "root";

	const element = document.createElement("div");
	element.classList.add("m-folder");
	element.textContent = name;
	element.style.marginLeft = `${15 * length}px`;

	element.onclick = () => {
		const selectedLabel = viewDiv.querySelector(".m-folder__selected");
		if (selectedLabel) selectedLabel.classList.remove("m-folder__selected");
		element.classList.add("m-folder__selected");
		folderPathInput.value = path;
	};

	return element;
}

export default showTreeView;
