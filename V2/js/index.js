function startClock() {
  function update() {
    const now = new Date();

    const h24 = now.getHours();
    const period = h24 >= 12 ? "PM" : "AM";
    const h12 = h24 % 12 || 12;

    const hour = String(h12).padStart(2, "0");
    const min = String(now.getMinutes()).padStart(2, "0");
    const sec = String(now.getSeconds()).padStart(2, "0");

    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();

    document.getElementById("time").textContent =
      `${hour}:${min}:${sec} ${period}`;
    document.getElementById("date").textContent =
      `${year}년 ${month}월 ${date}일`;

    const delay = 1000 - now.getMilliseconds();
    setTimeout(update, delay);
  }

  update();
}

window.onload = startClock;
