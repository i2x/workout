import { getSessions, deleteSession } from '../storage.js';
import { sessionStats, weekSummary, fmtNum, fmtWeight } from '../stats.js';
import { relativeDay, shortDate, clockTime } from '../format.js';
import { PROGRAM } from '../program.js';
import { html, toElement } from '../dom.js';

function summaryCard() {
  const w = weekSummary();
  const trend =
    w.change == null ? null : w.change > 0 ? 'up' : w.change < 0 ? 'down' : 'flat';

  return html`
    <div class="wsum">
      <p class="wsum__head">สัปดาห์นี้</p>
      <div class="wsum__grid">
        <div>
          <span class="wsum__num">${w.count}</span>
          <span class="wsum__label">ครั้ง</span>
        </div>
        <div>
          <span class="wsum__num">${fmtNum(w.volume)}</span>
          <span class="wsum__label">ปริมาตรรวม (kg)</span>
        </div>
      </div>
      ${trend
        ? html`<p class="wsum__delta" data-trend="${trend}">
            ${w.change > 0 ? '▲' : w.change < 0 ? '▼' : '—'} ${Math.abs(w.change)}%
            เทียบสัปดาห์ก่อน (${fmtNum(w.prev.volume)} kg / ${w.prev.count} ครั้ง)
          </p>`
        : html`<p class="wsum__delta" data-trend="flat">สัปดาห์ก่อนยังไม่มีข้อมูลไว้เทียบ</p>`}
    </div>
  `;
}

function sessionRow(session) {
  const { day, sets, volume, durationMin } = sessionStats(session);
  const exercises = Object.entries(session.entries || {});

  return html`
    <li class="hitem" data-id="${session.id}" data-accent="${day?.accent || 'push'}">
      <details>
        <summary class="hitem__sum">
          <span class="hitem__date">
            <b>${shortDate(session.finishedAt)}</b>
            <small>${relativeDay(session.finishedAt)} · ${clockTime(session.finishedAt)}</small>
          </span>
          <span class="hitem__tag">${day?.shortLabel || '—'}</span>
          <span class="hitem__stats">
            <b>${sets}</b><small> เซต</small>
            ${volume ? html`<b> · ${fmtNum(volume)}</b><small> kg</small>` : ''}
            ${durationMin ? html`<small> · ${durationMin} น.</small>` : ''}
          </span>
        </summary>

        <div class="hitem__body">
          ${exercises.map(([exId, list]) => {
            const ex = day?.exercises.find((e) => e.id === exId);
            const done = list.filter((s) => s?.done);
            if (!done.length) return '';
            return html`
              <div class="hrow">
                <a class="hrow__name" href="#/exercise/${exId}">${ex?.name || exId}</a>
                <span class="hrow__sets">
                  ${done.map(
                    (s) => html`<span class="chip">
                      ${ex?.isTimed
                        ? `${fmtNum(s.reps)} วิ`
                        : `${fmtWeight(s.weight)}×${fmtNum(s.reps)}`}
                    </span>`,
                  )}
                </span>
              </div>
            `;
          })}
          <button class="btn btn--danger-ghost" type="button" data-act="del" data-id="${session.id}">
            ลบรายการนี้
          </button>
        </div>
      </details>
    </li>
  `;
}

export function renderHistory() {
  const sessions = getSessions();

  const view = toElement(html`
    <section class="view">
      <header class="page-head">
        <h1 class="page-head__title">HISTORY</h1>
        <p class="page-head__sub">บันทึกทั้งหมด ${sessions.length} ครั้ง</p>
      </header>

      ${summaryCard()}

      ${sessions.length
        ? html`<ul class="hlist">${sessions.map(sessionRow)}</ul>`
        : html`<p class="note">ยังไม่มีประวัติ — ไปที่หน้า <a href="#/">ตาราง</a> แล้วเริ่มเล่นได้เลย</p>`}

      <h2 class="section-title">ความก้าวหน้ารายท่า</h2>
      <ul class="exlinks">
        ${PROGRAM.map(
          (day) => html`
            <li data-accent="${day.accent}">
              <p class="exlinks__day">${day.shortLabel}</p>
              ${day.exercises.map(
                (ex) => html`<a class="exlinks__item" href="#/exercise/${ex.id}">${ex.name} <span>→</span></a>`,
              )}
            </li>
          `,
        )}
      </ul>
    </section>
  `);

  view.addEventListener('click', (ev) => {
    const btn = ev.target.closest('[data-act="del"]');
    if (!btn) return;
    if (!confirm('ลบบันทึกครั้งนี้? กู้คืนไม่ได้')) return;
    deleteSession(btn.dataset.id);
    view.replaceWith(renderHistory());
  });

  return view;
}
