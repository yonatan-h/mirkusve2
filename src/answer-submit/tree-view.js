import robustFetch from "../lib/robust-fetch.js";

async function showTreeView(viewDiv, folderPathInput, handleError) {
	try {
		const fetchOptions = await getFetchOptions();
		const sha = await getSha(getFetchOptions);
		const folderPaths = await getFolderPaths(sha, fetchOptions);

		showFolderLabels(folderPaths, viewDiv, folderPathInput);
	} catch (error) {
		handleError(error);
	}
}

async function getFetchOptions() {
	const token = await chrome.storage.local.get("token");

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
	const response = await robustFetch(url, fetchOptions);
	const data = await response.json();
	return data.sha;
}

async function getFolderPaths(sha, fetchOptions) {
	const { userName, repoName } = await chrome.storage.local.get([
		"userName",
		"repoName",
	]);

	const treeUrl = `https://api.github.com/repos/${userName}/${repoName}/git/trees/${sha}?recursive=1`;
	const treeResponse = await robustFetch(treeUrl, fetchOptions);
	const tree = (await treeResponse.json()).tree;

	const folderPaths = tree
		.filter((node) => node.type === "tree")
		.map((folder) => folder.path);
	return folderPaths;
}

function showFolderLabels(folderPaths, viewDiv, folderPathInput) {
	viewDiv.innerHtml = "";
	folderPaths.sort(); // same parents together

	for (const path of folderPaths) {
		const { name, depth } = getNameAndDepth(path);
		const label = createFolderLabel(name, depth);

		folderLabel.onclick = () => {
			showSelected(label, viewDiv);
			folderPathInput.value = path;
		};
		appendToView(label, viewDiv);
	}
}

function createFolderLabel(name, depth) {
	const label = submissionForm.createElement("span");
	label.textContent = name;
	label.classList.add("folder");

	const indentationUnit = 20;
	label.style.marginLeft = `${depth * indentationUnit}px`;
	return label;
}

function appendToView(label, viewDiv) {
	const labelContainer = submissionForm.createElement("div");
	labelContainer.appendChild(label);
	viewDiv.appendChild(labelContainer);
}

function getNameAndDepth(path) {
	const nodes = path.split("/").filter((node) => node !== "");
	const name = nodes ? nodes[nodes.length - 1] : "root";
	const depth = pathNodes.length;
	return { name, depth };
}

function showSelected(label, viewDiv) {
	const selectedClass = ".folder__selected";
	const labels = [...viewDiv.querySelectorAll(selectedClass)];

	labels.forEach((label) => label.classList.remove(selectedClass));
	label.classList.add(selectedClass);
}

export default showTreeView;
