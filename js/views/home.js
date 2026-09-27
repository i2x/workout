import { PLACES, totalSets, estimateMinutes } from '../program.js';
import { getLastPlayedMap, getActiveSession, hasProgress, getSettings, setSetting } from '../storage.js';
import { weekSummary, readyToOverload, fmtNum } from '../stats.js';
import { relativeDay } from '../format.js';
import { html, toElement } from '../dom.js';

/**
 * วันที่ควรเล่นต่อไป = วันที่ไม่ได้เล่นมานานที่สุด
 * (วันที่ยังไม่เคยเล่นเลย มาก่อนเสมอ เรียงตามลำดับในตาราง)
 */
function pickNextDay(days, lastPlayed) {
  const never = days.find((d) => !lastPlayed[d.id]);
  if (never) return never.id;
  return days.reduce((oldest, d) =>
    lastPlayed[d.id] < lastPlayed[oldest.id] ? d : oldest,
  ).id;
}

function dayCard(day, index, lastPlayed, nextId, activeDayId) {
  const last = lastPlayed[day.id];
  const isNext = day.id === nextId;
  const isActive = day.id === activeDayId;
  const overloads = day.exercises.filter(readyToOverload).length;

  return html`
    <a class="card" data-accent="${day.accent}" href="#/workout/${day.id}"
       style="--i:${index}" aria-label="เริ่ม ${day.title}">
      <span class="card__ghost" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
      <div class="card__top">
        <span class="card__tag">${day.shortLabel}</span>
        ${isActive
          ? html`<span class="card__next card__next--active">● เล่นค้างอยู่</span>`
          : isNext
            ? html`<span class="card__next">ควรเล่นต่อไป</span>`
            : ''}
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
          ${overloads
            ? html` · <b class="up">▲ ${overloads} ท่า${day.home ? 'พร้อมขยับขั้น' : 'พร้อมเพิ่มน้ำหนัก'}</b>`
            : ''}
        </span>
        <span class="card__go" aria-hidden="true">${isActive ? 'เล่นต่อ →' : 'เริ่ม →'}</span>
      </div>
    </a>
  `;
}

export function renderHome() {
  const placeId = PLACES[getSettings().place] ? getSettings().place : 'gym';
  const place = PLACES[placeId];
  const lastPlayed = getLastPlayedMap();
  const nextId = pickNextDay(place.days, lastPlayed);
  const week = weekSummary(Date.now(), place.days);
  const active = getActiveSession();
  const activeDayId = active && hasProgress(active) ? active.dayId : null;

  const view = toElement(html`
    <section class="view view--home">
      <div class="seg seg--place" role="group" aria-label="เล่นที่ไหน">
        ${Object.entries(PLACES).map(
          ([id, p]) => html`<button class="seg__btn" type="button" data-place="${id}"
                        aria-pressed="${id === placeId ? 'true' : 'false'}">${p.label}</button>`,
        )}
      </div>

      <header class="hero">
        <p class="hero__eyebrow">โปรแกรม 3 วัน / สัปดาห์ · ${place.label}</p>
        <h1 class="hero__title">เลือกวันที่<br />จะเล่นวันนี้</h1>
        <div class="hero__stats">
          <p class="hero__stat">
            <span class="hero__stat-num">${week.count}</span>
            <span class="hero__stat-label">ครั้งในสัปดาห์นี้</span>
          </p>
          ${week.volume
            ? html`<p class="hero__stat">
                <span class="hero__stat-num">${fmtNum(week.volume)}</span>
                <span class="hero__stat-label">
                  kg รวม${week.change != null
                    ? html` <b data-trend="${week.change > 0 ? 'up' : week.change < 0 ? 'down' : 'flat'}">
                        ${week.change > 0 ? '▲' : week.change < 0 ? '▼' : '—'}${Math.abs(week.change)}%
                      </b>`
                    : ''}
                </span>
              </p>`
            : ''}
        </div>
      </header>

      <div class="cards">
        ${place.days.map((d, i) => dayCard(d, i, lastPlayed, nextId, activeDayId))}
      </div>

      <div class="note plan">
        <b>แผนทั้งสัปดาห์</b>
        <ul class="plan__list">
          ${place.plan.map(([title, detail]) => html`<li><b>${title}</b> — ${detail}</li>`)}
        </ul>
      </div>
    </section>
  `);

  view.addEventListener('click', (ev) => {
    const btn = ev.target.closest('[data-place]');
    if (!btn || btn.dataset.place === placeId) return;
    setSetting('place', btn.dataset.place);
    view.replaceWith(renderHome());
  });

  return view;
}
