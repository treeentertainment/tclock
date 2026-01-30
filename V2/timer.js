function finishTimer() {
  alert("타이머가 종료되었습니다!");
}

var currentTimer = null;

function startTimer(durationSeconds = 10) {
  if (currentTimer) {
    clearInterval(currentTimer);
    currentTimer = null;
  }

  var endTime = Date.now() + durationSeconds * 1000;
  var x = setInterval(function () {
    var distance = endTime - Date.now();

    if (distance <= 0) {
      clearInterval(x);
      currentTimer = null;
      document.getElementById("demo").innerHTML = "0d 0h 0m 0s";
      finishTimer();
      return;
    }

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("demo").innerHTML =
      days + "d " + hours + "h " + minutes + "m " + seconds + "s";
  }, 250);

  currentTimer = x;
  return x;
}

function incrementField(field, delta) {
  var el = document.getElementById(field);
  if (!el) return;
  var val = parseInt(el.value, 10) || 0;
  val += delta;
  if (field === "hours") {
    if (val < 0) val = 0;
  } else {
    if (val < 0) val = 0;
    if (val > 59) val = 59;
  }
  el.value = val;
}

function startFromInput() {
  var hEl = document.getElementById("hours");
  var mEl = document.getElementById("minutes");
  var sEl = document.getElementById("seconds");
  var h = hEl ? parseInt(hEl.value, 10) || 0 : 0;
  var m = mEl ? parseInt(mEl.value, 10) || 0 : 0;
  var s = sEl ? parseInt(sEl.value, 10) || 0 : 0;
  if (m < 0) m = 0;
  if (m > 59) m = 59;
  if (s < 0) s = 0;
  if (s > 59) s = 59;
  hEl && (hEl.value = h);
  mEl && (mEl.value = m);
  sEl && (sEl.value = s);

  var total = h * 3600 + m * 60 + s;
  if (total <= 0) total = 10;
  startTimer(total);
  if (typeof show === "function") show("countdown", "set");
}

function show(shown, hidden) {
  document.getElementById(shown).style.display = "block";
  document.getElementById(hidden).style.display = "none";
  return false;
}

function stopTimer() {
  if (currentTimer) {
    clearInterval(currentTimer);
    currentTimer = null;
  }
}

function stopAndReturn() {
  stopTimer();
  var demo = document.getElementById("demo");
  if (demo) demo.innerHTML = "";
  if (typeof show === "function") show("set", "countdown");
}
