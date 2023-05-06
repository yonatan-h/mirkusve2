const { shadowDom, container } = createUserInfoUI();

const formElement = shadowDom.querySelector("form");
formElement.onsubmit = async (event) => {
	event.preventDefault();
	const formElement = event.target;
	const storageObject = extractInfo(formElement);
	saveUserInfo(storageObject);
};

initialize();

async function initialize() {
	const userInfo = await getUserInfo();
	if (userInfo) await fillForm(userInfo);
	document.body.appendChild(container);
}

function createUserInfoUI() {
	const formHtml = `

    <style>
        form{
            padding:1rem;
        }
        label{
            display:block;
            padding:0.5rem 0;
        }
    </style>
    <form>
        <label>
            Name (as in the sheets)
            <input type="text" required name="name" />
        </label>
        <label>
            Github Repo
            <input type="text" required name="github-repo" />
        </label>
        <label>
            Github Token
            <input type="text" required name="github-token" />
            <br/>
            <a href="https://github.com/settings/tokens/new">Create one here!</a>
            <b>Remember, enable "repo"</b>
        </label>

        <br />
        <input type="submit" value="Save" />
    </form>
`;

	const container = document.createElement("div");
	const shadowDom = container.attachShadow({ mode: "closed" });
	shadowDom.innerHTML = formHtml;
	container.style = `
        background: rgba(50,50,50,0.8);
        color: white;
    `;

	return { container, shadowDom };
}

function extractInfo(formElement) {
	const formData = new FormData(formElement);
	const object = {};
	for (const [key, value] of formData) {
		object[key] = value;
	}
	return object;
}

async function saveUserInfo(storageObject) {
	await chrome.storage.local.set({ "user-info": storageObject });
}

async function getUserInfo() {
	const storageObject = await chrome.storage.local.get("user-info");
	return storageObject["user-info"];
}

async function fillForm(storageObject) {
	for (const inputName in storageObject) {
		const inputElement = formElement.querySelector(`[name="${inputName}"]`);
		inputElement.value = storageObject[inputName];
	}
}

//bg script interact with dom?
//use html without popup
//bg script dynamic content script
//detect change on url change
//use css separately
//what are web resources
