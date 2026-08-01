/**
 * Router + bootstrap
 * ใช้ hash routing (#/workout/day1) เพราะ GitHub Pages ไม่มี server rewrite
 * — ถ้าใช้ History API แล้ว refresh ที่ /history จะได้ 404
 */
import { renderHome } from './views/home.js';
import { renderWorkoutStub, renderSoon, renderNotFound } from './views/placeholder.js';
import { getSettings, setSetting } from './storage.js';
import { $, $$ } from './dom.js';

/* ---------- Theme ---------- */

const THEME_ORDER = ['auto', 'dark', 'light'];
const THEME_LABEL = { auto: 'อัตโนมัติ', dark: 'มืด', light: 'สว่าง' };
const THEME_ICON = { auto: '◐', dark: '●', light: '○' };

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const btn = $('#theme-toggle');
  if (btn) {
    btn.textContent = THEME_ICON[theme];
    btn.setAttribute('aria-label', `ธีม: ${THEME_LABEL[theme]} (แตะเพื่อเปลี่ยน)`);
    btn.title = `ธีม: ${THEME_LABEL[theme]}`;
  }
  // ให้แถบสถานะบนมือถือเข้ากับพื้นหลัง
  const meta = $('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute(
      'content',
      getComputedStyle(document.body).getPropertyValue('--bg').trim() || '#121110',
    );
  }
}

function cycleTheme() {
  const current = getSettings().theme;
  const next = THEME_ORDER[(THEME_ORDER.indexOf(current) + 1) % THEME_ORDER.length];
  setSetting('theme', next);
  applyTheme(next);
}

/* ---------- Routes ---------- */

const ROUTES = [
  { pattern: /^\/?$/, view: () => renderHome(), nav: 'home' },
  {
    pattern: /^\/workout\/([\w-]+)$/,
    view: (m) => renderWorkoutStub({ dayId: m[1] }),
    nav: 'home',
  },
  {
    pattern: /^\/history$/,
    view: () => renderSoon('ประวัติ', 'Phase 4 จะเพิ่มรายการ session ย้อนหลัง กราฟความก้าวหน้า สถิติ PR และแบดจ์ "พร้อมเพิ่มน้ำหนัก"'),
    nav: 'history',
  },
  {
    pattern: /^\/settings$/,
    view: () => renderSoon('ตั้งค่า', 'Phase 5 จะเพิ่ม export / import ไฟล์ JSON และปุ่มล้างข้อมูลทั้งหมด'),
    nav: 'settings',
  },
];

function currentPath() {
  const hash = location.hash.replace(/^#/, '');
  return hash || '/';
}

function router() {
  const path = currentPath();
  const outlet = $('#app');

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

  outlet.replaceChildren(node);
  $$('.tabbar a').forEach((a) => {
    a.setAttribute('aria-current', a.dataset.nav === nav ? 'page' : 'false');
  });
  window.scrollTo(0, 0);
}

/* ---------- Bootstrap ---------- */

function init() {
  applyTheme(getSettings().theme);
  $('#theme-toggle').addEventListener('click', cycleTheme);
  window.addEventListener('hashchange', router);
  router();
  document.body.classList.add('ready');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
