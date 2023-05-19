import getQuestionName from "../lib/get-question-name.js";
import { getDuration, setDuration, calculateMinutes } from "../lib/duration.js";
import html from "./timer.html";
import "./timer.css";

class Timer {
	constructor(offsetDuration, getDurationCallBack) {
		this.offsetDuration = offsetDuration;
		this.startTime = new Date().getTime();

		getDurationCallBack(offsetDuration);
		this.setIntervalId = setInterval(() => {
			const duration = this.calculateDuration();
			getDurationCallBack(duration);
		}, 1000);
	}

	stop = () => {
		clearInterval(this.setIntervalId); //no errors if undefined btw
	};

	calculateDuration = () => {
		const currentTime = new Date().getTime();
		const gap = currentTime - this.startTime;
		return gap + this.offsetDuration;
	};
}

let timer;
const container = createTimerUI();
const playBtn = container.querySelector("#play");
const pauseBtn = container.querySelector("#pause");
const minutesSpan = container.querySelector("#minutes");
const dotDotSpan = container.querySelector("#dotdot");

playBtn.addEventListener("click", play);
pauseBtn.addEventListener("click", pause);
document.body.appendChild(container);

function createTimerUI() {
	const container = document.createElement("div");
	container.innerHTML = html;
	return container;
}

async function play() {
	const questionName = getQuestionName(window.location.href);
	const prevDuration = (await getDuration(questionName)) || 0;

	timer = new Timer(prevDuration, handleDurationUpdate);
	playBtn.classList.add("m-hidden");
	pauseBtn.classList.remove("m-hidden");
}

async function pause() {
	if (!timer) return;
	const duration = timer.calculateDuration();
	await saveDuration(duration); //accurate pause
	timer.stop();

	playBtn.classList.remove("m-hidden");
	pauseBtn.classList.add("m-hidden");
}

async function handleDurationUpdate(duration) {
	await saveDuration(duration);
	minutesSpan.textContent = calculateMinutes(duration);
	animateDots();
}

async function saveDuration(duration) {
	const questionName = getQuestionName(window.location.href);
	await setDuration(questionName, duration);
}

function animateDots() {
	const changingLength = 3; //not actual length, but length of changing dots

	const prevLength = dotDotSpan.textContent.length;
	const length = (prevLength + 1) % changingLength;
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
