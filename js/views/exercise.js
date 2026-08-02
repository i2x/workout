import { getExercise, repsLabel, getOption, mainName, GEAR } from '../program.js';
import { getEquipment, setEquipment, getSessions } from '../storage.js';
import { exerciseHistory, personalRecord, readyToOverload, fmtNum, fmtWeight } from '../stats.js';
import { shortDate, relativeDay } from '../format.js';
import { lineChart } from '../chart.js';
import { html, toElement } from '../dom.js';
import { renderNotFound } from './placeholder.js';

/** อุปกรณ์ที่ใช้จริงในแต่ละครั้ง — เอาไว้โชว์ข้างบันทึกย้อนหลัง */
function variantMap(exerciseId) {
  const map = {};
  for (const s of getSessions()) {
    const v = (s.variants || {})[exerciseId];
    if (v) map[s.id] = v;
  }
  return map;
}

export function renderExercise(params) {
  const found = getExercise(params.exerciseId);
  if (!found) return renderNotFound();

  const { day, exercise: ex } = found;
  const history = exerciseHistory(ex.id, ex.isTimed);
  const pr = personalRecord(ex.id, ex.isTimed);
  const overload = readyToOverload(ex);
  const selected = getOption(ex, getEquipment()[ex.id]);
  const usedBy = variantMap(ex.id);

  const topUnit = ex.isTimed ? ' วิ' : ' kg';
  const topLabel = ex.isTimed ? 'เวลาที่ค้างได้นานสุด' : 'น้ำหนักสูงสุดต่อเซต';
  const volLabel = ex.isTimed ? 'เวลารวมต่อครั้ง' : 'ปริมาตรรวมต่อครั้ง (kg)';

  const view = toElement(html`
    <section class="view" data-accent="${day.accent}">
      <header class="page-head">
        <a class="back" href="#/history">← ประวัติ</a>
        <span class="page-head__tag">${day.shortLabel} · ${ex.part.en} — ${ex.part.th}</span>
        <h1 class="page-head__title">${mainName(ex)}</h1>
        <p class="page-head__sub">
          ${ex.options[0].nameTh ? `${ex.options[0].nameTh} · ` : ''}${ex.sets} × ${repsLabel(ex)} · พัก ${ex.restSec} วิ
        </p>
        <div class="page-head__actions">
          <a class="btn btn--ghost btn--sm" href="#/workout/${day.id}">ไปเล่น ${day.shortLabel}</a>
        </div>
      </header>

      ${overload
        ? html`<p class="callout callout--overload">
            <b>▲ พร้อมเพิ่มน้ำหนัก</b>
            ครั้งล่าสุดทำครบ ${ex.sets} เซตที่ ${ex.repsMax} ${ex.isTimed ? 'วินาที' : 'ครั้ง'} แล้ว
            ${ex.isTimed ? 'ลองเพิ่มเวลาอีก 10–15 วินาที' : 'ลองขยับน้ำหนักขึ้น 2.5–5 kg แล้วเริ่มที่ปลายล่างของช่วงเรพ'}
          </p>`
        : ''}

      ${ex.options.length > 1
        ? html`<h2 class="section-title">ถ้าเครื่องไม่ว่างหรือยิมไม่มี</h2>
            <p class="note note--sm">ใช้ตัวไหนก็ได้ ประวัติยังนับรวมเป็นท่าเดียวกัน</p>`
        : ''}
      <div class="swap swap--page">
        ${ex.options.map(
          (o) => html`
            <div class="swap__row">
              <button class="swap__opt" type="button" data-option="${o.id}"
                      aria-pressed="${o.id === selected.id ? 'true' : 'false'}">
                <span class="swap__name">${o.name}<small>${o.nameTh || ''}</small></span>
                <span class="swap__gear">${GEAR[o.gear] || o.gear}</span>
              </button>
              ${o.link
                ? html`<a class="swap__video" href="${o.link}" target="_blank" rel="noopener noreferrer"
                          aria-label="ดูวิธีทำท่า ${o.name}">▶</a>`
                : ''}
            </div>
          `,
        )}
      </div>

      ${pr
        ? html`
            <div class="pr">
              <div class="pr__item">
                <span class="pr__label">PR</span>
                <span class="pr__num">
                  ${ex.isTimed ? fmtNum(pr.set.reps) : fmtWeight(pr.set.weight)}<small>${topUnit}</small>
                </span>
                <span class="pr__sub">
                  ${ex.isTimed ? '' : `× ${fmtNum(pr.set.reps)} ครั้ง · `}${relativeDay(pr.set.at)}
                </span>
              </div>
              <div class="pr__item">
                <span class="pr__label">ปริมาตรดีสุด</span>
                <span class="pr__num">${fmtNum(pr.volume)}<small>${ex.isTimed ? ' วิ' : ' kg'}</small></span>
                <span class="pr__sub">จาก ${pr.sessions} ครั้งที่บันทึก</span>
              </div>
            </div>
          `
        : html`<p class="note">ยังไม่มีสถิติของท่านี้ — บันทึกครั้งแรกแล้วกราฟจะขึ้นที่นี่</p>`}

      ${history.length
        ? html`
            <h2 class="section-title">${topLabel}</h2>
            ${lineChart(
              history.map((r) => ({ x: r.at, y: r.top })),
              { unit: topUnit, formatter: ex.isTimed ? fmtNum : fmtWeight },
            )}

            <h2 class="section-title">${volLabel}</h2>
            ${lineChart(
              history.map((r) => ({ x: r.at, y: r.volume })),
              { unit: ex.isTimed ? ' วิ' : ' kg', formatter: fmtNum },
            )}

            <h2 class="section-title">บันทึกย้อนหลัง</h2>
            <ul class="reclist">
              ${[...history].reverse().map((r) => {
                const used = usedBy[r.sessionId];
                return html`
                  <li class="reclist__row">
                    <span class="reclist__date">
                      <b>${shortDate(r.at)}</b><small>${relativeDay(r.at)}</small>
                    </span>
                    <span class="reclist__sets">
                      ${used ? html`<span class="chip chip--gear">${getOption(ex, used).name}</span>` : ''}
                      ${r.sets.map(
                        (s) => html`<span class="chip">
                          ${ex.isTimed ? `${fmtNum(s.reps)} วิ` : `${fmtWeight(s.weight)}×${fmtNum(s.reps)}`}
                        </span>`,
                      )}
                    </span>
                  </li>
                `;
              })}
            </ul>
          `
        : ''}
    </section>
  `);

  view.addEventListener('click', (ev) => {
    const btn = ev.target.closest('[data-option]');
    if (!btn) return;
    setEquipment(ex.id, btn.dataset.option);
    view.querySelectorAll('[data-option]').forEach((b) =>
      b.setAttribute('aria-pressed', String(b.dataset.option === btn.dataset.option)),
    );
  });

  return view;
}
