const storage = (typeof browser !== 'undefined' ? browser : chrome).storage.local;

function getSettings() {
  return new Promise((resolve) => {
    storage.get(["siteMap", "defaultEnabled"], (result = {}) => {
      resolve({
        siteMap: result.siteMap || {},
        defaultEnabled: typeof result.defaultEnabled === 'boolean' ? result.defaultEnabled : true,
      });
    });
  });
}

(async function () {
  const origin = window.location.origin;
  const { siteMap, defaultEnabled } = await getSettings();
  const enabled = origin && siteMap.hasOwnProperty(origin) ? siteMap[origin] : defaultEnabled;
  if (!enabled) return;

  document.addEventListener(
    "keydown",
    (ev) => {
      if (ev.key === "Enter") {
        ev.stopPropagation();
      }
    },
    { capture: true },
  );
})();
