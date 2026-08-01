import { PROGRAM, totalSets, estimateMinutes } from '../program.js';
import { getLastPlayedMap, getSessions } from '../storage.js';
import { relativeDay } from '../format.js';
import { html, toElement } from '../dom.js';

/**
 * วันที่ควรเล่นต่อไป = วันที่ไม่ได้เล่นมานานที่สุด
 * (วันที่ยังไม่เคยเล่นเลย มาก่อนเสมอ เรียงตามลำดับในตาราง)
 */
function pickNextDay(lastPlayed) {
  const never = PROGRAM.find((d) => !lastPlayed[d.id]);
  if (never) return never.id;
  return PROGRAM.reduce((oldest, d) =>
    lastPlayed[d.id] < lastPlayed[oldest.id] ? d : oldest,
  ).id;
}

/** จำนวน session ในสัปดาห์นี้ (นับจากวันจันทร์) */
function sessionsThisWeek() {
  const now = new Date();
  const dow = (now.getDay() + 6) % 7; // จันทร์ = 0
  const monday = new Date(now);
  monday.setDate(now.getDate() - dow);
  monday.setHours(0, 0, 0, 0);
  return getSessions().filter((s) => s.finishedAt >= monday.getTime()).length;
}

function dayCard(day, index, lastPlayed, nextId) {
  const last = lastPlayed[day.id];
  const isNext = day.id === nextId;
  return html`
    <a class="card" data-accent="${day.accent}" href="#/workout/${day.id}"
       style="--i:${index}" aria-label="เริ่ม ${day.title}">
      <span class="card__ghost" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
      <div class="card__top">
        <span class="card__tag">${day.shortLabel}</span>
        ${isNext ? html`<span class="card__next">ควรเล่นต่อไป</span>` : ''}
      </div>
      <h2 class="card__title">Day ${index + 1}</h2>
      <p class="card__sub">${day.subtitle}</p>
      <dl class="card__meta">
        <div><dt>ท่า</dt><dd>${day.exercises.length}</dd></div>
        <div><dt>เซต</dt><dd>${totalSets(day)}</dd></div>
        <div><dt>เวลา</dt><dd>~${estimateMinutes(day)}<small> น.</small></dd></div>
      </dl>
      <div class="card__foot">
        <span class="card__last">
          ${last ? html`เล่นล่าสุด <b>${relativeDay(last)}</b>` : 'ยังไม่เคยเล่น'}
        </span>
        <span class="card__go" aria-hidden="true">เริ่ม →</span>
      </div>
    </a>
  `;
}

export function renderHome() {
  const lastPlayed = getLastPlayedMap();
  const nextId = pickNextDay(lastPlayed);
  const week = sessionsThisWeek();

  return toElement(html`
    <section class="view view--home">
      <header class="hero">
        <p class="hero__eyebrow">โปรแกรม 3 วัน / สัปดาห์</p>
        <h1 class="hero__title">เลือกวันที่<br />จะเล่นวันนี้</h1>
        <p class="hero__stat">
          <span class="hero__stat-num">${week}</span>
          <span class="hero__stat-label">ครั้งในสัปดาห์นี้</span>
        </p>
      </header>

      <div class="cards">
        ${PROGRAM.map((d, i) => dayCard(d, i, lastPlayed, nextId))}
      </div>
    </section>
  `);
}
