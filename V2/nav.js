const style = document.createElement("style");
style.textContent = `
  body {
    margin: 0;
    font-family: sans-serif;
  }

  .app-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  }

  .app-nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
  }

  .app-nav a {
    text-decoration: none;
    padding: 1rem;
    display: block;
    color: #333;
    font-weight: 500;
  }

  .app-nav-right {
    margin-right: 2rem;
  }

  .app-nav-right img {
    max-width: 140px;
    height: auto;
  }

  /* 햄버거 버튼 */
  #menuToggle {
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 1100;
    font-size: 22px;
    background: white;
    border: none;
    padding: 6px 10px;
    cursor: pointer;
    display: none;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  }

  /* ===== 모바일 모드 ===== */
  @media (max-width: 768px) {
    .app-nav {
      top: 0;
      left: -260px;
      width: 250px;
      height: 100vh;
      flex-direction: column;
      align-items: flex-start;
      padding-top: 1rem;
      transition: left 0.3s ease;
    }

    .app-nav.open {
      left: 0;
    }

    .app-nav ul {
      flex-direction: column;
      width: 100%;
    }

    .app-nav a {
      width: 100%;
      padding: 1rem 1.5rem;
      border-bottom: 1px solid #eee;
    }

    /* 🔥 핵심 레이아웃 수정 */
    .app-nav-left {
      flex: 1;
      width: 100%;
    }

    .app-nav-right {
      margin: 0;
      margin-top: auto;  
      width: 100%;
      padding-bottom: 3rem;
      display: flex;
      justify-content: center;
    }

    .app-nav-right ul {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    .app-nav-right img {
      max-width: 90%;
    }

    body.sidebar-open {
      overflow: hidden;
    }
  }
`;
document.head.appendChild(style);

document.body.insertAdjacentHTML(
  "afterbegin",
  `
<button id="menuToggle">☰</button>

<div class="app-nav">
  <div class="app-nav-left">
    <ul>
      <li><a>TCLOCK</a></li>
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

function adjustBodyPadding() {
  const topBar = document.querySelector(".app-nav");
  if (!topBar) return;

  if (window.innerWidth > 768) {
    document.body.style.paddingTop = topBar.offsetHeight + "px";
  } else {
    document.body.style.paddingTop = "0px";
  }
}

window.addEventListener("load", adjustBodyPadding);
window.addEventListener("resize", adjustBodyPadding);

if (window.ResizeObserver) {
  const observer = new ResizeObserver(() => adjustBodyPadding());
  const topBar = document.querySelector(".app-nav");
  if (topBar) observer.observe(topBar);
}

function updateMenuButton() {
  const btn = document.getElementById("menuToggle");
  if (!btn) return;
  btn.style.display = window.innerWidth <= 768 ? "block" : "none";
}
window.addEventListener("load", updateMenuButton);
window.addEventListener("resize", updateMenuButton);

const toggleBtn = document.getElementById("menuToggle");
const topBarEl = document.querySelector(".app-nav");

if (toggleBtn && topBarEl) {
  toggleBtn.addEventListener("click", () => {
    topBarEl.classList.toggle("open");
    document.body.classList.toggle("sidebar-open");
  });
}

document.addEventListener("click", (e) => {
  if (
    window.innerWidth <= 768 &&
    topBarEl.classList.contains("open") &&
    !topBarEl.contains(e.target) &&
    e.target.id !== "menuToggle"
  ) {
    topBarEl.classList.remove("open");
    document.body.classList.remove("sidebar-open");
  }
});
