async function loadScript(url) {
  try {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  } catch (e) {
    console.error(e);
  }
}

await loadScript("./js/shared/nav.js");
await loadScript("./js/shared/zoom.js");
await loadScript("./js/shared/fullscreen.js");
