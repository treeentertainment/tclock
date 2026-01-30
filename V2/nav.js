const style = document.createElement("style");
style.textContent = `
  .top-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
  }
`;
document.head.appendChild(style);

document.body.insertAdjacentHTML(
  "afterbegin",
  `
<div class="top-bar">
  <div class="top-bar-left">
    <ul class="dropdown menu" data-dropdown-menu>
      <li><a href="./about.html">TCLOCK</a></li>
      <li><a href="./index.html">시계</a></li>
      <li><a href="./timer.html">타이머</a></li>
      <li><a href="./alarm.html">알람</a></li>
      <li><a href="./stopwatch.html">스탑워치</a></li>
    </ul>
  </div>
  <!-- maybe later 
  <div class="top-bar-right">
    <ul class="menu">
      <li><input type="search" placeholder="Search"></li>
      <li><button type="button" class="button">Search</button></li>
    </ul>
  </div>
  -->
</div>
`,
);

if (window.jQuery && $(document).foundation) {
  $(document).foundation();
}

function adjustBodyPadding() {
  const topBar = document.querySelector(".top-bar");
  if (!topBar) return;
  document.body.style.paddingTop = topBar.offsetHeight + "px";
}

window.addEventListener("load", adjustBodyPadding);

window.addEventListener("resize", adjustBodyPadding);

const topBar = document.querySelector(".top-bar");
if (window.ResizeObserver && topBar) {
  const observer = new ResizeObserver(() => adjustBodyPadding());
  observer.observe(topBar);
}
