// Cross-browser storage wrapper
const storage = (typeof browser !== 'undefined' ? browser : chrome).storage.local;

function getOrigin(url) {
  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
}

async function getCurrentTabOrigin() {
  return new Promise((resolve) => {
    (typeof browser !== 'undefined' ? browser : chrome).tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      resolve(getOrigin(tab.url));
    });
  });
}

async function getSettings() {
  return new Promise((resolve) => {
    storage.get(['siteMap', 'defaultEnabled'], (result = {}) => {
      resolve({
        siteMap: result.siteMap || {},
        defaultEnabled: typeof result.defaultEnabled === 'boolean' ? result.defaultEnabled : true,
      });
    });
  });
}

async function setSettings(settings) {
  return new Promise((resolve) => {
    storage.set(settings, resolve);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const originSpan = document.getElementById('origin');
  const siteToggle = document.getElementById('site-toggle');
  const defaultToggle = document.getElementById('default-toggle');
  const reloadWarning = document.getElementById('reload-warning');

  const origin = await getCurrentTabOrigin();
  originSpan.textContent = origin || 'Unknown';

  const { siteMap, defaultEnabled } = await getSettings();
  // Compute the original effective value for this site
  const originalEffective = origin && siteMap.hasOwnProperty(origin) ? siteMap[origin] : defaultEnabled;
  siteToggle.checked = origin && siteMap.hasOwnProperty(origin) ? siteMap[origin] : defaultEnabled;
  defaultToggle.checked = defaultEnabled;

  siteToggle.disabled = !origin;

  function getCurrentEffective() {
    // What would the effective value be if the toggles were set as they are now?
    if (origin && siteMap.hasOwnProperty(origin)) {
      return siteToggle.checked;
    } else {
      return defaultToggle.checked;
    }
  }

  function updateWarning() {
    const currentEffective = getCurrentEffective();
    if (currentEffective !== originalEffective) {
      reloadWarning.style.display = '';
    } else {
      reloadWarning.style.display = 'none';
    }
  }

  siteToggle.addEventListener('change', async () => {
    const newSiteMap = { ...siteMap };
    if (origin) {
      newSiteMap[origin] = siteToggle.checked;
      await setSettings({ siteMap: newSiteMap });
      siteMap[origin] = siteToggle.checked;
    }
    updateWarning();
  });

  defaultToggle.addEventListener('change', async () => {
    await setSettings({ defaultEnabled: defaultToggle.checked });
    updateWarning();
  });

  // Initial warning state
  updateWarning();
}); 