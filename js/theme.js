/** จัดการธีม auto / dark / light — แยกไฟล์ไว้เพื่อไม่ให้ view ต้อง import app.js */
import { getSettings, setSetting } from './storage.js';

export const THEME_ORDER = ['auto', 'dark', 'light'];
const LABEL = { auto: 'อัตโนมัติ', dark: 'มืด', light: 'สว่าง' };
const ICON = { auto: '◐', dark: '●', light: '○' };

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;

  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.textContent = ICON[theme];
    btn.setAttribute('aria-label', `ธีม: ${LABEL[theme]} (แตะเพื่อเปลี่ยน)`);
    btn.title = `ธีม: ${LABEL[theme]}`;
  }

  // ให้แถบสถานะบนมือถือกลมกลืนกับพื้นหลัง
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    const bg = getComputedStyle(document.body).getPropertyValue('--bg').trim();
    if (bg) meta.setAttribute('content', bg);
  }
}

export function cycleTheme() {
  const current = getSettings().theme;
  const next = THEME_ORDER[(THEME_ORDER.indexOf(current) + 1) % THEME_ORDER.length];
  setSetting('theme', next);
  applyTheme(next);
  return next;
}

export function initTheme() {
  applyTheme(getSettings().theme);
  // ธีม auto ต้องขยับตามระบบด้วย
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (getSettings().theme === 'auto') applyTheme('auto');
  });
}
