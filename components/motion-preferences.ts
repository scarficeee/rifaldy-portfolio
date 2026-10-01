export function motionEnabled() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return localStorage.getItem("rr-motion") !== "off";
  } catch {
    return true;
  }
}

export function markInternalNavigation(path: string) {
  try {
    sessionStorage.setItem(
      "rr-next-page",
      JSON.stringify({ path, at: Date.now() }),
    );
  } catch {}
  document.documentElement.dataset.navigation = "pending";
}

// Runs before paint. The timeout is a fail-safe, never a minimum wait.
export const openingScript = `(function(){var r=document.documentElement;var reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;try{r.dataset.theme=localStorage.getItem('rr-theme')||'paper';r.dataset.motion=reduced?'off':localStorage.getItem('rr-motion')||'on'}catch(e){r.dataset.motion=reduced?'off':'on'}var internal=false;try{var next=JSON.parse(sessionStorage.getItem('rr-next-page')||'null');sessionStorage.removeItem('rr-next-page');var nav=performance.getEntriesByType('navigation')[0];internal=nav&&nav.type==='navigate'&&next&&next.path===location.pathname&&Date.now()-next.at<10000}catch(e){}r.dataset.loading=internal?'route':'entry';setTimeout(function(){r.dataset.loading='ready';r.dataset.navigation='ready'},3000)})()`;
