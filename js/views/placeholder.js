/**
 * หน้าที่ยังไม่ได้ทำในเฟสนี้ — จะถูกแทนที่ด้วยของจริงในเฟสถัดไป
 * (Workout = Phase 2, History = Phase 4, Settings = Phase 5)
 */
import { getDay, repsLabel, totalSets, estimateMinutes } from '../program.js';
import { html, toElement } from '../dom.js';

function preview(day) {
  return html`
    <ol class="preview">
      ${day.exercises.map(
        (ex, i) => html`
          <li class="preview__row" style="--i:${i}">
            <span class="preview__idx">${String(i + 1).padStart(2, '0')}</span>
            <span class="preview__body">
              <span class="preview__name">${ex.name}</span>
              <span class="preview__th">${ex.nameTh || ''}${ex.alt ? html` · <em>${ex.alt}</em>` : ''}</span>
            </span>
            <span class="preview__spec">
              <b>${ex.sets}×${repsLabel(ex)}</b>
              <small>พัก ${ex.restSec} วิ</small>
            </span>
          </li>
        `,
      )}
    </ol>
  `;
}

/** หน้า Workout ชั่วคราว — แสดงตารางแบบอ่านอย่างเดียวเพื่อตรวจข้อมูล */
export function renderWorkoutStub(params) {
  const day = getDay(params.dayId);
  if (!day) return renderNotFound();

  return toElement(html`
    <section class="view" data-accent="${day.accent}">
      <header class="page-head">
        <a class="back" href="#/">← ตาราง</a>
        <span class="page-head__tag">${day.shortLabel}</span>
        <h1 class="page-head__title">${day.title}</h1>
        <p class="page-head__sub">
          ${day.subtitle} · ${day.exercises.length} ท่า · ${totalSets(day)} เซต · ~${estimateMinutes(day)} นาที
        </p>
      </header>
      ${preview(day)}
      <p class="note">
        <b>Phase 2</b> จะเพิ่มช่องกรอกน้ำหนัก/ครั้ง, ติ๊กเซตเสร็จ, auto-fill จากครั้งก่อน
        และปุ่มจบการเล่น
      </p>
    </section>
  `);
}

export function renderSoon(title, note) {
  return toElement(html`
    <section class="view">
      <header class="page-head">
        <a class="back" href="#/">← ตาราง</a>
        <h1 class="page-head__title">${title}</h1>
      </header>
      <p class="note">${note}</p>
    </section>
  `);
}

export function renderNotFound() {
  return toElement(html`
    <section class="view">
      <header class="page-head">
        <h1 class="page-head__title">ไม่พบหน้านี้</h1>
      </header>
      <p class="note">ลิงก์อาจพิมพ์ผิด — <a href="#/">กลับหน้าตาราง</a></p>
    </section>
  `);
}
