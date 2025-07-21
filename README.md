# Leave

Leave is a browser extension that prevents input fields from submitting or sending when you press Enter, helping you avoid accidental form submissions or message sends.

## Features
- Prevents Enter key from submitting forms or sending messages on websites.
- Settings popup to enable or disable the extension per site (whitelist/blacklist).
- Default setting to control behavior on all sites not explicitly set.
- Settings are stored locally in Firefox and synced in Chrome.

## Tested
- [t3.chat](https://t3.chat/)
- [web.whatsapp.com](https://web.whatsapp.com/)

## Installation
1. Clone or download this repository.
2. Open your browser's extensions page:
   - **Chrome:** `chrome://extensions/`
   - **Firefox:** `about:addons`
3. Enable "Developer mode" or "Debug mode".
4. Click "Load unpacked" (Chrome) or "Load Temporary Add-on" (Firefox) and select the project folder.

## Usage
- Click the extension icon to open the settings popup.
- See the current site's origin and toggle "Enable on this site" to whitelist or blacklist the site.
- Adjust the "Enable by default" toggle to set the default behavior for all other sites.
- If you change a setting, reload the site for changes to take effect.

## Browser Compatibility
- Works in both Chrome and Firefox (Manifest V3).

---

Feel free to contribute or suggest improvements!
