document.addEventListener("DOMContentLoaded", () => {
  if (!(document.fullscreenEnabled || document.webkitFullscreenEnabled)) return;

  const style = document.createElement("style");
  style.textContent = `
    #container {
      background: white;
    }
    .toggle-fullscreen-btn {
      position: fixed;
      z-index: 10000;
      top: 10px;
      right: 10px;
      border: 0;
      padding: 0;
      background: none;
      cursor: pointer;
      outline: none;
    }

    .toggle-fullscreen-svg {
      display: block;
      height: auto;
    }

    .toggle-fullscreen-svg path {
      transform-box: view-box;
      transform-origin: 12px 12px;
      fill: none;
      stroke: hsl(225, 10%, 8%);
      stroke-width: 4;
      transition: 0.15s;
    }

    .toggle-fullscreen-btn:hover path:nth-child(1),
    .toggle-fullscreen-btn:focus path:nth-child(1) {
      transform: translate(-2px, -2px);
    }

    .toggle-fullscreen-btn:hover path:nth-child(2),
    .toggle-fullscreen-btn:focus path:nth-child(2) {
      transform: translate(2px, -2px);
    }

    .toggle-fullscreen-btn:hover path:nth-child(3),
    .toggle-fullscreen-btn:focus path:nth-child(3) {
      transform: translate(2px, 2px);
    }

    .toggle-fullscreen-btn:hover path:nth-child(4),
    .toggle-fullscreen-btn:focus path:nth-child(4) {
      transform: translate(-2px, 2px);
    }

    .toggle-fullscreen-btn:not(.on) .icon-fullscreen-leave {
      display: none;
    }

    .toggle-fullscreen-btn.on .icon-fullscreen-enter {
      display: none;
    }
  `;
  document.head.appendChild(style);

  document.getElementById("stage").insertAdjacentHTML(
    "beforeend",
    `
    <button
      class="js-toggle-fullscreen-btn toggle-fullscreen-btn"
      aria-label="Enter fullscreen mode"
    >
      <svg
        class="toggle-fullscreen-svg"
        width="28"
        height="28"
        viewBox="-2 -2 28 28"
      >
        <g class="icon-fullscreen-enter">
          <path d="M 2 9 v -7 h 7" />
          <path d="M 22 9 v -7 h -7" />
          <path d="M 22 15 v 7 h -7" />
          <path d="M 2 15 v 7 h 7" />
        </g>

        <g class="icon-fullscreen-leave">
          <path d="M 24 17 h -7 v 7" />
          <path d="M 0 17 h 7 v 7" />
          <path d="M 0 7 h 7 v -7" />
          <path d="M 24 7 h -7 v -7" />
        </g>
      </svg>
    </button>
    `,
  );

  const toggleBtn = document.querySelector(".js-toggle-fullscreen-btn");
  const stageEl = document.getElementById("stage");

  toggleBtn.addEventListener("click", () => {
    const isFullscreen =
      document.fullscreenElement === stageEl ||
      document.webkitFullscreenElement === stageEl;

    if (isFullscreen) {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
    } else {
      if (stageEl.requestFullscreen) stageEl.requestFullscreen();
      else if (stageEl.webkitRequestFullScreen) stageEl.webkitRequestFullScreen();
    }
  });

  document.addEventListener("fullscreenchange", handleFullscreen);
  document.addEventListener("webkitfullscreenchange", handleFullscreen);

  function handleFullscreen() {
    const isFullscreen =
      document.fullscreenElement === stageEl ||
      document.webkitFullscreenElement === stageEl;

    if (isFullscreen) {
      toggleBtn.classList.add("on");
      toggleBtn.setAttribute("aria-label", "Exit fullscreen mode");
    } else {
      toggleBtn.classList.remove("on");
      toggleBtn.setAttribute("aria-label", "Enter fullscreen mode");
    }
  }
});
