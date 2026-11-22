document.addEventListener("DOMContentLoaded", () => {
  if (!(document.fullscreenEnabled || document.webkitFullscreenEnabled)) return;
  const style = document.createElement("style");
  style.textContent = `
    :root { --zoom-scale: 1; }

    .zoom-controller {
      position: relative;
      bottom: 70px;
      left: 50%;
      transform: translateX(-50%);
      width: 300px;
      z-index: 9999;
    }

    body, html {
      overflow: hidden;
    }

    #container {
      height: 100vh;
      transform-origin: top center;
      transition: transform 0.2s ease;
    }
  `;
  document.head.appendChild(style);

  document.body.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="zoom-controller text-center">
      <input
        type="range"
        id="zoomRange"
        min="50"
        max="500"
        value="100"
        step="1"
      />
    </div>
    `,
  );

  const container = document.getElementById("container");
  const range = document.getElementById("zoomRange");

  function applyZoom(value) {
    const scale = value / 100;
    container.style.transform = `scale(${scale})`;
    document.documentElement.style.setProperty("--zoom-scale", scale);
  }

  const initial = parseInt(range.value(), 10) || 100;
  applyZoom(initial);

  range.addEventListener("input", function (event) {
    applyZoom(event.value);
  });
});
