import {
  getSettings,
  setSetting,
  exportJSON,
  importJSON,
  resetAll,
  getSessions,
  storageSize,
} from '../storage.js';
import { html, toElement } from '../dom.js';
import { shortDate } from '../format.js';
import { applyTheme } from '../theme.js';

const THEMES = [
  { id: 'auto', label: 'อัตโนมัติ' },
  { id: 'dark', label: 'มืด' },
  { id: 'light', label: 'สว่าง' },
];

function download(filename, text) {
  const url = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function toggleRow(key, label, note, checked) {
  return html`
    <label class="srow srow--toggle">
      <span class="srow__text">
        <b>${label}</b>
        <small>${note}</small>
      </span>
      <input type="checkbox" data-toggle="${key}" ${checked ? 'checked' : ''} />
      <span class="switch" aria-hidden="true"></span>
    </label>
  `;
}

export function renderSettings() {
  const s = getSettings();
  const sessions = getSessions();
  const kb = (storageSize() / 1024).toFixed(1);
  const oldest = sessions.length ? sessions[sessions.length - 1].finishedAt : null;

  const view = toElement(html`
    <section class="view">
      <header class="page-head">
        <h1 class="page-head__title">SETTINGS</h1>
        <p class="page-head__sub">
          ${sessions.length} ครั้งที่บันทึก · ${kb} KB
          ${oldest ? ` · เริ่มบันทึก ${shortDate(oldest)}` : ''}
        </p>
      </header>

      <h2 class="section-title">การแสดงผล</h2>
      <div class="seg" role="group" aria-label="ธีม">
        ${THEMES.map(
          (t) => html`<button class="seg__btn" type="button" data-theme="${t.id}"
                        aria-pressed="${s.theme === t.id ? 'true' : 'false'}">${t.label}</button>`,
        )}
      </div>

      <h2 class="section-title">ตัวเตือนเมื่อหมดเวลาพัก</h2>
      ${toggleRow('sound', 'เสียงเตือน', 'บี๊บสั้น ๆ เมื่อหมดเวลาพัก', s.sound)}
      ${toggleRow('vibrate', 'สั่น', 'ใช้ได้บนมือถือที่รองรับ', s.vibrate)}

      <h2 class="section-title">ข้อมูลของคุณ</h2>
      <p class="note note--sm">
        ข้อมูลทั้งหมดเก็บอยู่ในเบราว์เซอร์เครื่องนี้เท่านั้น ไม่ได้ส่งขึ้นเซิร์ฟเวอร์
        <b>ถ้าล้างข้อมูลเบราว์เซอร์ ข้อมูลจะหายไปด้วย</b> — แนะนำให้ export เก็บไว้เป็นระยะ
      </p>
      <div class="srow srow--actions">
        <button class="btn btn--primary" type="button" data-act="export">↓ Export เป็นไฟล์ JSON</button>
        <button class="btn btn--ghost" type="button" data-act="import">↑ Import จากไฟล์</button>
        <input type="file" accept="application/json,.json" hidden data-file />
      </div>

      <h2 class="section-title">ล้างข้อมูล</h2>
      <div class="srow srow--actions">
        <button class="btn btn--danger" type="button" data-act="reset">ล้างข้อมูลทั้งหมด</button>
        <p class="srow__hint" data-reset-hint hidden>แตะอีกครั้งเพื่อยืนยัน (ยกเลิกอัตโนมัติใน 8 วินาที)</p>
      </div>

      <p class="foot">
        Workout Tracker · เก็บข้อมูลใน localStorage · ไม่มีบัญชี ไม่มีเซิร์ฟเวอร์<br />
        <a href="https://github.com/i2x/workout" target="_blank" rel="noopener noreferrer">ซอร์สโค้ดบน GitHub</a>
      </p>
    </section>
  `);

  let armed = 0;
  let armTimer = 0;
  const hint = view.querySelector('[data-reset-hint]');
  const file = view.querySelector('[data-file]');

  view.addEventListener('change', (ev) => {
    const toggle = ev.target.closest('[data-toggle]');
    if (toggle) {
      setSetting(toggle.dataset.toggle, toggle.checked);
      return;
    }
    if (ev.target === file && file.files?.[0]) {
      const f = file.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (!confirm(`นำเข้าไฟล์ "${f.name}" และเขียนทับข้อมูลปัจจุบันทั้งหมด?`)) return;
        try {
          importJSON(String(reader.result));
          alert('นำเข้าข้อมูลเรียบร้อย');
          view.replaceWith(renderSettings());
        } catch (err) {
          alert(`นำเข้าไม่สำเร็จ: ${err.message}`);
        }
      };
      reader.readAsText(f);
      file.value = '';
    }
  });

  view.addEventListener('click', (ev) => {
    const themeBtn = ev.target.closest('[data-theme]');
    if (themeBtn) {
      const next = themeBtn.dataset.theme;
      setSetting('theme', next);
      applyTheme(next);
      view.querySelectorAll('[data-theme]').forEach((b) =>
        b.setAttribute('aria-pressed', String(b.dataset.theme === next)),
      );
      return;
    }

    const btn = ev.target.closest('[data-act]');
    if (!btn) return;
    const act = btn.dataset.act;

    if (act === 'export') {
      const d = new Date();
      const stamp = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      download(`workout-backup-${stamp}.json`, exportJSON());
      return;
    }

    if (act === 'import') {
      file.click();
      return;
    }

    if (act === 'reset') {
      // ยืนยัน 2 ชั้น: แตะซ้ำ แล้วตามด้วยกล่องยืนยัน
      if (!armed) {
        armed = 1;
        hint.hidden = false;
        btn.textContent = 'แน่ใจนะ? แตะอีกครั้ง';
        clearTimeout(armTimer);
        armTimer = setTimeout(() => {
          armed = 0;
          hint.hidden = true;
          btn.textContent = 'ล้างข้อมูลทั้งหมด';
        }, 8000);
        return;
      }
      clearTimeout(armTimer);
      armed = 0;
      hint.hidden = true;
      btn.textContent = 'ล้างข้อมูลทั้งหมด';
      if (!confirm('ลบประวัติการเล่นทั้งหมดถาวร? กู้คืนไม่ได้ (ควร export เก็บไว้ก่อน)')) return;
      resetAll();
      applyTheme(getSettings().theme);
      alert('ล้างข้อมูลเรียบร้อย');
      view.replaceWith(renderSettings());
    }
  });

  view.__unmount = () => clearTimeout(armTimer);
  return view;
}
