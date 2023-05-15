import getQuestionName from "../lib/get-question-name.js";
import html from "./timer.html";
import "./timer.css";

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

function createTimerUI() {
	const container = document.createElement("div");

	container.innerHTML = html;
	return container;
}

async function getStoredDuration() {
	const questionName = getQuestionName(window.location.href);
	const { durations } = await chrome.storage.local.get("durations");
	return durations[questionName];
}

async function storeDuration() {
	const durations = {};
	const questionName = getQuestionName(window.location.href);
	durations[questionName] = duration;

	await chrome.storage.local.set({ durations });
}

async function play() {
	if (duration === undefined) {
		const prevDuration = await getStoredDuration();
		duration = prevDuration || 0;
	}

	lastSnapshot = new Date().getTime();
	updateTime(); //immidiately then continue
	setIntervalId = setInterval(updateTime, 2000);
	playBtn.classList.add("m-hidden");
	pauseBtn.classList.remove("m-hidden");
}

function pause() {
	clearInterval(setIntervalId); //no errors if undefined btw
	playBtn.classList.remove("m-hidden");
	pauseBtn.classList.add("m-hidden");
}

function updateTime() {
	if (!lastSnapshot) {
		lastSnapshot = new Date().getTime();
	}
	const curTime = new Date().getTime();
	const gap = curTime - lastSnapshot;

	duration += gap;
	lastSnapshot = curTime;
	storeDuration();

	const minutes = Math.floor(duration / (60 * 1000));
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

function show() {
	play();
	container.classList.remove("m-hidden");
}

function hide() {
	pause();
	container.classList.add("m-hidden");
}

export { show, hide };
