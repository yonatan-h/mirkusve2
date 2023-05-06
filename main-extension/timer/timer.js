let playBtn;
let pauseBtn;
let minutesSpan;
let dotDotSpan;

let duration; //in millisecods
let lastSnapshot; //milliseconds from 1970
let setIntervalId;

initialize();

async function initialize() {
	const container = await createTimerUI();
	alert("here", container.innerText);

	playBtn = container.getElementById("play");
	pauseBtn = container.getElementById("pause");
	minutesSpan = container.getElementById("minutes");
	dotDotSpan = container.getElementById("dotdot");

	duration = (await getStoredDuration()) || 0;
	playBtn.addEventListener("click", play);
	pauseBtn.addEventListener("click", pause);

	document.body.appendChild(container);
	play();
}

//TODO: try to import as module
function getQuestionName() {
	const link = window.location.href;
	const match = /.*\/problems\/([^/.]*)\/.*/.exec(link);
	if (!match) {
		throw new Error(`question name could not be extracted from link`);
	}
	return match[1];
}

async function getStoredDuration() {
	const questionName = getQuestionName();
	const storageObject = await chrome.storage.local.get(questionName);
	return storageObject[questionName];
}

async function storeDuration() {
	const storageObject = {};
	storageObject[getQuestionName()] = duration;
	await chrome.storage.local.set(storageObject);
}

async function createTimerUI() {
	const container = document.createElement("div");
	const url = chrome.runtime.getURL("timer/timer.html");
	const response = await fetch(url);
	const html = await response.text();

	alert("html", JSON.stringify(response));
	container.innerHTML = html;
	return container;
}

function play() {
	lastSnapshot = new Date().getTime();
	updateTime(); //immidiately then continue
	setIntervalId = setInterval(updateTime, 1000);
	playBtn.classList.add("hidden");
	pauseBtn.classList.remove("hidden");
}

function pause() {
	clearInterval(setIntervalId); //no errors if undefined btw
	playBtn.classList.remove("hidden");
	pauseBtn.classList.add("hidden");
}

function updateTime() {
	if (!lastSnapshot) lastSnapshot = new Date().getTime();
	const curTime = new Date().getTime();
	const gap = curTime - lastSnapshot;

	duration += gap;
	lastSnapshot = curTime;
	storeDuration();

	const minutes = Math.floor(duration / 1000);
	minutesSpan.textContent = minutes;

	animateDots();
}

function animateDots() {
	const maxLength = 3;
	const prevLength = dotDotSpan.textContent.length;

	let length = (prevLength + 1) % (maxLength + 1);
	if (length == 0) length = 1; //always dots visible

	dotDotSpan.textContent = ".".repeat(length);
}
