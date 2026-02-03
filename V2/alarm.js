const currentTime = document.querySelector("#time");
const currentDate = document.querySelector("#date");
const content = document.querySelector(".content");
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("#set-alarm");
const stopAlarmBtn = document.querySelector("#stopAlarm");

let isAlarmSet = false;

const updateButtonState = () => {
  const allSelected = Array.from(selectMenu).every((s) => Boolean(s.value));
  setAlarmBtn.disabled = !allSelected && !isAlarmSet;
};

selectMenu.forEach((s) => s.addEventListener("change", updateButtonState));
updateButtonState();

let alarmTime = "";
let ringtone = new Audio("./ringtones/electronic.wav");

for (let i = 12; i > 0; i--) {
  let hour = i < 10 ? `0${i}` : `${i}`;
  let option = `<option value="${hour}">${hour}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
  let minute = i < 10 ? `0${i}` : `${i}`;
  let option = `<option value="${minute}">${minute}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

updateButtonState();

setInterval(() => {
  const now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();

  const ampm = h >= 12 ? "오후" : "오전";
  h = h % 12 || 12;
  h = h < 10 ? `0${h}` : `${h}`;
  m = m < 10 ? `0${m}` : `${m}`;
  s = s < 10 ? `0${s}` : `${s}`;

  var y = now.getFullYear();
  var month = now.getMonth() + 1;
  var d = now.getDate();
  currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

  currentDate.innerHTML = y + "년 " + month + "월 " + d + "일";

  if (alarmTime === `${h}:${m} ${ampm}`) {
    ringtone.loop = true;
    ringtone.play().catch((err) => {
      console.warn("ringtone play failed:", err);
    });
    const alarmMessage = document.querySelector("#alarmMessage");
    alarmMessage.innerText = `${alarmTime} 알람 시간`;
    $("#alarmFinished").foundation("open");
  }
}, 1000);

const setAlarm = () => {
  if (isAlarmSet) {
    alarmTime = "";
    ringtone.pause();
    ringtone.currentTime = 0;
    content.classList.remove("disable");
    selectMenu.forEach((s) => (s.disabled = false));
    setAlarmBtn.innerText = "알림 설정";
    return (isAlarmSet = false);
  }

  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;

  if (
    time.includes("시간") ||
    time.includes("분") ||
    time.includes("오전/오후")
  ) {
    return alert("유효한 시간을 선택해주세요!");
  }

  console.log("알림 설정 시간:", time);
  alarmTime = time;
  isAlarmSet = true;
  content.classList.add("disable");
  selectMenu.forEach((s) => (s.disabled = true));
  setAlarmBtn.innerText = "알림 해제";
  ringtone
    .play()
    .then(() => {
      ringtone.pause();
      ringtone.currentTime = 0;
    })
    .catch((err) => {
      console.warn("Audio priming failed:", err);
    });

  updateButtonState();
};

const stopAlarm = () => {
  ringtone.pause();
  ringtone.currentTime = 0;
  $("#alarmFinished").foundation("close");
  alarmTime = "";
  isAlarmSet = false;
  content.classList.remove("disable");
  selectMenu.forEach((s) => (s.disabled = false));
  setAlarmBtn.innerText = "알림 설정";
};

setAlarmBtn.addEventListener("click", setAlarm);
stopAlarmBtn.addEventListener("click", stopAlarm);
