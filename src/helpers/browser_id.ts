const ID_STORAGE_KEY = "browser_mod-browser-id";
export function BrowserID() {
  if (document.querySelector("hc-main")) return "CAST";
  if (localStorage[ID_STORAGE_KEY]) return localStorage[ID_STORAGE_KEY];
  return "";
}
