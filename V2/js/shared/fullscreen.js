document.addEventListener("DOMContentLoaded", () => {
  if (!(document.fullscreenEnabled || document.webkitFullscreenEnabled)) return;
  document.body.insertAdjacentHTML(
    "afterbegin",
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
      else if (document.webkitCancelFullScreen)
        document.webkitCancelFullScreen();
    } else {
      if (stageEl.requestFullscreen) stageEl.requestFullscreen();
      else if (stageEl.webkitRequestFullScreen)
        stageEl.webkitRequestFullScreen();
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
