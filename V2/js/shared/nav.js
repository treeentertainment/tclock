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

  #menuToggle {
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 1100;
    font-size: 22px;
    background: white;
    border: none;
    padding: 10px 10px;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    display: none;
    opacity: 1;
    visibility: visible;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    transition-behavior: allow-discrete;
  }

  #menuCloseBtn {
    display: none;
  }

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
      box-sizing: border-box; /* 패딩으로 인한 너비 늘어남 방지 */
    }

    /* [수정] 외부로 튕겨 나가는 현상을 막기 위해 가로 폭을 사이드바 내로 결속 */
    .menu-logo-row {
      display: flex !important;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 100%; /* 부모 너비를 절대 넘지 못하도록 제한 */
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      padding: 0 1rem; /* 좌우 균등 여백 설정 */
    }

    /* [수정] 다른 메뉴 링크들의 거대한 패딩 간섭을 제거 */
    .menu-logo-row a {
      width: auto !important;
      border-bottom: none;
      padding: 1rem 0 !important; /* 위아래 간격만 유지하고 양옆 패딩 제거 */
      white-space: nowrap;
      flex-shrink: 0;
    }
    
    /* [수정] ✕ 버튼 위치 고정 및 가독성 확보 */
    #menuCloseBtn {
      display: block;
      background: none;
      border: none;
      font-size: 22px; /* 가독성을 위해 크기를 살짝 키움 */
      font-weight: bold;
      color: #999;
      cursor: pointer;
      padding: 0.8rem; /* 클릭 가능한 영역 확보 */
      line-height: 1;
      flex-shrink: 0;
      transition: color 0.2s ease;
    }

    #menuCloseBtn:hover {
      color: #e74c3c;
    }

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

    #menuToggle {
      display: block;
    }

    body.sidebar-open #menuToggle,
    #menuToggle:has(+ .app-nav.open) {
      opacity: 0 !important;
      visibility: hidden !important;
      pointer-events: none;
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
