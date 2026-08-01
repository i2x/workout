/**
 * Router + bootstrap
 * ใช้ hash routing (#/workout/day1) เพราะ GitHub Pages ไม่มี server rewrite
 * — ถ้าใช้ History API แล้ว refresh ที่ /history จะได้ 404
 */
import { renderHome } from './views/home.js';
import { renderWorkout } from './views/workout.js';
import { renderHistory } from './views/history.js';
import { renderExercise } from './views/exercise.js';
import { renderSettings } from './views/settings.js';
import { renderNotFound } from './views/placeholder.js';
import { initTheme, cycleTheme } from './theme.js';
import { $, $$ } from './dom.js';

const ROUTES = [
  { pattern: /^\/?$/, nav: 'home', view: () => renderHome() },
  { pattern: /^\/workout\/([\w-]+)$/, nav: 'home', view: (m) => renderWorkout({ dayId: m[1] }) },
  { pattern: /^\/history$/, nav: 'history', view: () => renderHistory() },
  { pattern: /^\/exercise\/([\w-]+)$/, nav: 'history', view: (m) => renderExercise({ exerciseId: m[1] }) },
  { pattern: /^\/settings$/, nav: 'settings', view: () => renderSettings() },
];

let current = null;

function router() {
  const path = location.hash.replace(/^#/, '') || '/';
  const outlet = $('#app');

  // ให้ view เดิมเก็บกวาดตัวเอง (wake lock, timer ที่ค้าง ฯลฯ)
  current?.__unmount?.();

  let node = null;
  let nav = null;
  for (const route of ROUTES) {
    const match = path.match(route.pattern);
    if (match) {
      node = route.view(match);
      nav = route.nav;
      break;
    }
  }
  if (!node) node = renderNotFound();

  current = node;
  outlet.replaceChildren(node);
  $$('.tabbar a').forEach((a) =>
    a.setAttribute('aria-current', a.dataset.nav === nav ? 'page' : 'false'),
  );
  window.scrollTo(0, 0);
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  if (!location.protocol.startsWith('http')) return;
  // path แบบ relative — scope จึงตรงกับ base path ของ GitHub Pages เสมอ
  navigator.serviceWorker.register('./sw.js').catch((err) => {
    console.warn('[sw] ลงทะเบียนไม่สำเร็จ', err);
  });
}

function init() {
  initTheme();
  $('#theme-toggle').addEventListener('click', cycleTheme);
  window.addEventListener('hashchange', router);
  router();
  registerServiceWorker();
  document.body.classList.add('ready');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
