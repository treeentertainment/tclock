document.body.insertAdjacentHTML(
  "afterbegin",
  `
<button id="menuToggle">☰</button>

<div class="app-nav">
  <div class="app-nav-left">
    <ul>
      <li class="menu-logo-row">
        <a href="./index.html">TCLOCK</a>
        <button id="menuCloseBtn">✕</button>
      </li>
      <li><a href="./index.html">시계</a></li>
      <li><a href="./timer.html">타이머</a></li>
      <li><a href="./alarm.html">알람</a></li>
      <li><a href="./stopwatch.html">스탑워치</a></li>
    </ul>
  </div>
  <div class="app-nav-right">
    <ul>
      <li>
        <a href="https://github.com/treeentertainment/tclock" target="_blank" rel="noopener">
          <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
        </a>
      </li>
    </ul>
  </div>
</div>
`,
);

const toggleBtn = document.getElementById("menuToggle");
const closeBtn = document.getElementById("menuCloseBtn");
const topBarEl = document.querySelector(".app-nav");

function adjustDisplay() {
  if (!topBarEl || !toggleBtn) return;

  if (window.innerWidth > 768) {
    document.body.style.paddingTop = topBarEl.offsetHeight + "px";
  } else {
    document.body.style.paddingTop = "0px";
  }
}

function closeSidebar() {
  if (!topBarEl) return;
  topBarEl.classList.remove("open");
  document.body.classList.remove("sidebar-open");
}

document.addEventListener("DOMContentLoaded", (event) => {
  if (window.ResizeObserver) {
    const observer = new ResizeObserver(() => adjustDisplay());
    if (topBarEl) observer.observe(topBarEl);
  } else {
    window.addEventListener("load", adjustDisplay);
    window.addEventListener("resize", adjustDisplay);
  }

  if (toggleBtn && topBarEl) {
    toggleBtn.addEventListener("click", () => {
      topBarEl.classList.toggle("open");
      document.body.classList.toggle("sidebar-open");
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      closeSidebar();
    });
  }
});

document.addEventListener("click", (e) => {
  if (
    window.innerWidth <= 768 &&
    topBarEl &&
    topBarEl.classList.contains("open") &&
    !topBarEl.contains(e.target) &&
    e.target.id !== "menuToggle"
  ) {
    closeSidebar();
  }
});
