document.addEventListener("DOMContentLoaded", () => {
  if (!(document.fullscreenEnabled || document.webkitFullscreenEnabled)) return;
  const style = document.createElement("style");
  style.textContent = `
    :root { --zoom-scale: 1; }

    .zoom-controller {
      position: fixed;
      bottom: 70px;
      left: 50%;
      transform: translateX(-50%);
      width: 300px;
      z-index: 9999;
    }

    /* allow scrolling when content is scaled */
    body {
      overflow: hidden;
    }

    #container {
      transform-origin: top center;
      transition: transform 0.2s ease;
    }
  `;
  document.head.appendChild(style);

  document.getElementById("container").insertAdjacentHTML(
    "afterend",
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

  const $container = $("#container");
  const $range = $("#zoomRange");

  function applyZoom(value) {
    const scale = value / 100;
    $container.css("transform", `scale(${scale})`);
    document.documentElement.style.setProperty("--zoom-scale", scale);
  }

  const initial = parseInt($range.val(), 10) || 100;
  applyZoom(initial);

  $range.on("input", function () {
    applyZoom(this.value);
  });
});
