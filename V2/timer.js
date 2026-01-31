const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;
let TIME_LIMIT = 0;
let isRunning = false;

const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};

let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("timer").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft,
  )}</span>
</div>
`;

function onTimesUp() {
  clearInterval(timerInterval);
  timerInterval = null;
  isRunning = false;
}

function startTimer() {
  if (isRunning) return;

  isRunning = true;

  timerInterval = setInterval(() => {
    timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;

    document.getElementById("base-timer-label").innerHTML =
      formatTime(timeLeft);
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft <= 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  let seconds = time % 60;

  const h = String(hours).padStart(2, "0");
  const m = String(minutes).padStart(2, "0");
  const s = String(seconds).padStart(2, "0");

  return h + ":" + m + ":" + s;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  if (TIME_LIMIT === 0) return 0;
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

function getTotalSeconds() {
  const h = parseInt(document.getElementById("hours-input").value, 10) || 0;
  const m = parseInt(document.getElementById("minutes-input").value, 10) || 0;
  const s = parseInt(document.getElementById("seconds-input").value, 10) || 0;

  return h * 3600 + m * 60 + s;
}

function initializeTimer(totalSeconds) {
  clearInterval(timerInterval);

  TIME_LIMIT = totalSeconds;
  timePassed = 0;
  timeLeft = totalSeconds;

  document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
  setCircleDasharray();

  const path = document.getElementById("base-timer-path-remaining");
  path.classList.remove(COLOR_CODES.warning.color, COLOR_CODES.alert.color);
  path.classList.add(COLOR_CODES.info.color);
}

document.getElementById("start-timer").addEventListener("click", () => {
  const totalSeconds = getTotalSeconds();

  if (totalSeconds <= 0) {
    alert("시간을 입력하세요");
    return;
  }

  initializeTimer(totalSeconds);
  startTimer();
});

function resetToZero() {
  clearInterval(timerInterval);
  timerInterval = null;
  isRunning = false;

  TIME_LIMIT = 0;
  timePassed = 0;
  timeLeft = 0;

  document.getElementById("base-timer-label").innerHTML = "00:00:00";

  const path = document.getElementById("base-timer-path-remaining");
  path.setAttribute("stroke-dasharray", `283 283`);
  path.classList.remove(COLOR_CODES.warning.color, COLOR_CODES.alert.color);
  path.classList.add(COLOR_CODES.info.color);
}

document.getElementById("reset-timer").addEventListener("click", resetToZero);

document.querySelectorAll(".adjust-time").forEach((button) => {
  button.addEventListener("click", () => {
    const unit = button.dataset.unit;
    const action = button.dataset.action;

    let input;
    if (unit === "hour") input = document.getElementById("hours-input");
    if (unit === "minute") input = document.getElementById("minutes-input");
    if (unit === "second") input = document.getElementById("seconds-input");

    let value = parseInt(input.value, 10) || 0;

    if (action === "plus") value += 1;
    if (action === "minus" && value > 0) value -= 1;

    input.value = value;
  });
});

document.getElementById("pause-timer").addEventListener("click", () => {
  if (isRunning) pauseTimer();
  else resumeTimer();
});

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  isRunning = false;
}

function resumeTimer() {
  if (TIME_LIMIT <= 0) return;
  startTimer();
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    const tag = document.activeElement.tagName.toLowerCase();
    if (tag === "input") return;

    e.preventDefault();

    if (isRunning) pauseTimer();
    else resumeTimer();
  }
});
