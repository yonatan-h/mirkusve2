const html = `
    <!DOCTYPE html>
    <html>
	<head>
		<style>
		.hidden {
			display: none;
		}
		button {
			font-size: 1.5rem;
		}

		</style>
	</head>
	<body>
		<p>
			<button id="play">▶️</button>
			<button id="pause">⏸️</button>
			<span>You spend</span>
			<span id="minutes">--</span>
			<span>minutes</span>
			<span id="dotdot">--</span>
		</p>
	</body>
    </html>

`;
const container = document.createElement("div");
container.setAttribute(
	"style",
	`
	position: fixed;
	bottom: 10px;
	`
);
const shadowDom = container.attachShadow({ mode: "open" });
shadowDom.innerHTML = html;
document.body.appendChild(container);

const playBtn = shadowDom.getElementById("play");
const pauseBtn = shadowDom.getElementById("pause");
const minutesSpan = shadowDom.getElementById("minutes");
const dotDotSpan = shadowDom.getElementById("dotdot");

let duration;
let lastSnapshot;
let setIntervalId;

initialize();

async function initialize() {
	duration = 0;
	playBtn.addEventListener("click", play);
	pauseBtn.addEventListener("click", pause);
	play();
}

function play() {
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

	//update brain
	const curTime = new Date().getTime();
	const gap = curTime - lastSnapshot;
	duration += gap;
	lastSnapshot = curTime;

	//update eyes
	const minutes = Math.floor(duration / (1000 * 60));
	minutesSpan.textContent = minutes;

	//animate ...
	let prevLength = dotDotSpan.textContent.length;
	const maxLength = 3;
	let length = (prevLength + 1) % (maxLength + 1);
	if (length == 0) length = 1; //always dots visible

	dotDotSpan.textContent = produceDots(length);
}

function produceDots(count) {
	let dots = "";
	for (let i = 0; i < count; i++) dots += ".";
	return dots;
}
