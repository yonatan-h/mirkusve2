import handleNameSubmit from "./name.js";
import handleRepoSubmit from "./repo.js";
import handleTokenSubmit from "./token.js";
import handleFinish from "./finish.js";
import { showSection } from "./ui-functions.js";

document.querySelector("#name .next").onclick = handleNameSubmit;
document.querySelector("#repo .next").onclick = handleRepoSubmit;
document.querySelector("#token .next").onclick = handleTokenSubmit;
document.querySelector("#finish .next").onclick = handleFinish;

showSection("name");

document.getElementById("cancel").onclick = () => {
	window.location = window.location;
};
