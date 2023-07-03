import { CustomError } from "../lib/custom-errors.js";
import robustFetch from "../lib/robust-fetch.js";
import "./folder.css";
import folderPrompt from "./folder.html";

async function showFolderPrompt({
  promptContainer,
  folderPathInput,
  handleCustomError,
  clearError,
}) {
  const fetchOptions = await getFetchOptions();
  const sha = await getSha(getFetchOptions);
  const folderPaths = await getFolderPaths(sha, fetchOptions);

  promptContainer.innerHTML = folderPrompt; //has tree view and new folder view

  setupNewFolderView(
    promptContainer,
    folderPathInput,
    handleCustomError,
    clearError
  );
  createTreeView(folderPaths, promptContainer, folderPathInput);
}

function setupNewFolderView(
  promptContainer,
  folderPathInput,
  handleCustomError,
  clearError
) {
  const newFolderView = promptContainer.querySelector("#new-folder-view");
  const input = newFolderView.querySelector('[type="text"]');
  const cancelButton = newFolderView.querySelector("#new-folder-cancel");

  input.oninput = () => {
    const value = input.value;
    try {
      errorIfBadFolderPath(value);
      clearError();
      folderPathInput.value = value;
    } catch (error) {
      handleCustomError(error);
    }
  };

  cancelButton.onclick = () => {
    promptContainer.querySelector("#tree-view").classList.remove("hidden");
    newFolderView.classList.add("hidden");
    folderPathInput.value = "";
  };
}

function errorIfBadFolderPath(path) {
  if (path.includes(".")) {
    throw new CustomError(
      `There is a '.' in the folder path. Please enter only the path of the folder, don't include any file.`
    );
  }

  if (path.includes("//")) {
    throw new CustomError(
      `There is a double slash '//' in the folder path. Remove it.`
    );
  }

  if (path.includes(" ")) {
    throw new CustomError(
      `Please don't include space characters in the folder path.`
    );
  }

  try {
    const url = new URL("https://abebe.com/" + path);
  } catch (error) {
    throw new CustomError(
      `The folder path is not url safe somehow. Please modify it.`
    );
  }
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

function createTreeView(folderPaths, promptContainer, folderPathInput) {
  const treeView = promptContainer.querySelector("#tree-view");
  folderPaths.sort(); // same parents together

  for (const path of folderPaths) {
    const folderElement = createFolderElement({
      path,
      folderPathInput,
      promptContainer,
    });
    treeView.appendChild(folderElement);
  }
}

function createFolderElement({ path, folderPathInput, promptContainer }) {
  const nodes = path.split("/").filter((node) => node !== "");
  const length = nodes.length;
  const name = length ? nodes[length - 1] : "root";

  const element = document.createElement("div");
  element.classList.add("m-folder");
  element.style.marginLeft = `${15 * length}px`;

  const folderButton = document.createElement("button");
  folderButton.textContent = "📁" + name;
  folderButton.classList.add("m-folder-btn");
  folderButton.setAttribute("type", "button");

  folderButton.onclick = () => {
    const selectedButton = promptContainer.querySelector(
      ".m-folder-btn__selected"
    );
    selectedButton?.classList.remove("m-folder-btn__selected");
    folderButton.classList.add("m-folder-btn__selected");
    folderPathInput.value = path;
  };

  const newFolderButton = document.createElement("button");
  newFolderButton.textContent = "+";
  newFolderButton.classList.add("m-new-folder-btn");
  newFolderButton.setAttribute("type", "button");

  newFolderButton.onclick = (e) => {
    promptContainer.querySelector("#tree-view").classList.add("hidden");
    const newFolderView = promptContainer.querySelector("#new-folder-view");

    newFolderView.classList.remove("hidden");
    newFolderView.querySelector('[type="text"]').value = path;
    folderPathInput.value = path;
  };

  element.appendChild(folderButton);
  element.appendChild(newFolderButton);
  return element;
}

export default showFolderPrompt;
