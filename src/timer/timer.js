import getQuestionName from "../lib/get-question-name.js";

const container = createTimerUI();
document.body.appendChild(container);

let duration; //in millisecods
let lastSnapshot; //milliseconds from 1970
let setIntervalId;

const playBtn = container.querySelector("#play");
const pauseBtn = container.querySelector("#pause");
const minutesSpan = container.querySelector("#minutes");
const dotDotSpan = container.querySelector("#dotdot");

playBtn.addEventListener("click", play);
pauseBtn.addEventListener("click", pause);

function getTimerControls() {
	function show() {
		play();
		container.classList.remove("hidden");
	}

	function hide() {
		pause();
		container.classList.add("hidden");
	}

	return [show, hide];
}

async function getStoredDuration() {
	const questionName = getQuestionName(window.location.href);
	const durations = await chrome.storage.local.get("durations");
	return durations[questionName];
}

async function storeDuration() {
	const durations = {};
	const questionName = getQuestionName(window.location.href);
	durations[questionName] = duration;

	await chrome.storage.local.set({ durations });
}

function createTimerUI() {
	const container = document.createElement("div");
	const html = `
	<p>
		<button id="play">▶️</button>
		<button id="pause">⏸</button>
		<span>You spent</span>
		<span id="minutes">---</span>
		<span>minutes</span>
		<span id="dotdot">---</span>
	</p>
	`;

	container.innerHTML = html;
	return container;
}

async function play() {
	if (duration === undefined) {
		duration = (await getStoredDuration()) || 0;
	}

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

export default getTimerControls;