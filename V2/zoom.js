document.addEventListener("DOMContentLoaded", () => {
  if (!(document.fullscreenEnabled || document.webkitFullscreenEnabled)) return;

  const style = document.createElement("style");
  style.textContent = `
    .zoom-controller {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      width: 300px;
      z-index: 9999;
    }

    body {
      overflow: hidden;
    }

    #container {
      transform-origin: top center;
      transition: transform 0.2s ease;
    }
  `;
  document.head.appendChild(style);

  // insert controller as a sibling after #container so it isn't affected by #container's transform
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
  }

  const initial = $range.val() || 300;
  applyZoom(initial);

  $range.on("input", function () {
    applyZoom(this.value);
  });
});
