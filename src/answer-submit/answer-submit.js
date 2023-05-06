import makeHandler from "../lib/handle-custom-error.js";
import fillInputs from "./fill-inputs.js";
import showTreeView from "./tree-view.js";
import sendAnswer from "./send-answer.js";

function createUi() {
	const html = `
    <form id="mirkusve-submit">
    <!--Easy to disable all inputs by disabling fieldset-->
    <fieldset>

        <div id="error-box">
            <p></p>
            <code></code>
        </div>
        
        <h2>Submit to</h2>
        <p>
            <input type="text" name="submissions" placeholder="?" /> submissions |
            <input type="text" name="minutes" placeholder="?" /> minutes
        </p>
        <p>
            Select a folder in your repo to upload
            <input type="text" name="questionName" placeholder="?" />.
            <input type="text" name="fileExtension" placeholder="?" />
            <input type="text" name="file" placeholder="???" />
        </p>

        <div>
            <div id="tree-view"></div>
            <input type="text" name="folderPath" />
        </div>
        
        <input type="submit" value="Submit" />
    </fieldset>
    </form>
    `;

	const container = document.createElement("div");
	container.classList.add("answer-submit");
	container.innerHTML = html;

	return container;
}

const container = createUi();

const errorBox = container.querySelector("#error-box");
const errorParagraph = errorBox.querySelector("p");
const errorCode = errorBox.querySelector("code");

const handleCustomError = makeHandler(errorParagraph, errorCode);

const folderPathInput = container.querySelector('[name="folderPath"]');
const treeViewDiv = container.querySelector("#tree-view");
const form = container.querySelector("form");
const submitButton = form.querySelector('[type="submit"]');

function getAnswerSubmitControls() {
	async function show() {
		errorParagraph.textContent = "";
		errorCode.textContent = "";
		container.classList.remove("hidden");

		fillInputs(form, handleCustomError);
		await showTreeView(treeViewDiv, folderPathInput, handleCustomError);
	}

	submitButton.onclick = () => {
		sendAnswer(form, handleCustomError);
	};

	async function hide() {
		container.classList.add("hidden");
	}

	return [show, hide];
}

export default getAnswerSubmitControls;
