import { getDay, repsLabel, totalSets } from '../program.js';
import {
  getOrCreateSession,
  saveSet,
  finishSession,
  deleteSession,
  getSession,
} from '../storage.js';
import { previousSets, readyToOverload, fmtNum, fmtWeight } from '../stats.js';
import { html, toElement } from '../dom.js';
import * as timer from '../timer.js';
import { renderNotFound } from './placeholder.js';

/* ---------- Screen Wake Lock ---------- */

let wakeLock = null;

async function requestWakeLock() {
  if (!('wakeLock' in navigator)) return;
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    wakeLock.addEventListener('release', () => {
      wakeLock = null;
    });
  } catch {
    // ผู้ใช้ปฏิเสธหรือแบตต่ำ — ไม่ใช่เรื่องคอขาดบาดตาย
  }
}

function releaseWakeLock() {
  wakeLock?.release?.();
  wakeLock = null;
}

function onVisible() {
  if (document.visibilityState === 'visible' && !wakeLock) requestWakeLock();
}

/* ---------- Render ---------- */

const numOrNull = (v) => {
  const n = parseFloat(String(v).replace(',', '.'));
  return isFinite(n) ? n : null;
};

function setRow(ex, index, saved, prev) {
  const prevSet = prev ? prev[Math.min(index, prev.length - 1)] : null;
  const weight = saved?.weight ?? prevSet?.weight ?? null;
  const reps = saved?.reps ?? prevSet?.reps ?? null;
  const done = !!saved?.done;

  const hint = prevSet
    ? ex.isTimed
      ? `ครั้งก่อน ${fmtNum(prevSet.reps)} วิ`
      : `ครั้งก่อน ${fmtWeight(prevSet.weight)} kg × ${fmtNum(prevSet.reps)}`
    : 'ยังไม่มีสถิติเดิม';

  const field = (name, value, unit, placeholder) => html`
    <label class="field">
      <input
        class="field__input"
        type="text"
        inputmode="decimal"
        enterkeyhint="next"
        data-field="${name}"
        value="${value == null ? '' : fmtWeight(value)}"
        placeholder="${placeholder}"
        aria-label="${unit}"
      />
      <span class="field__unit">${unit}</span>
    </label>
  `;

  return html`
    <div class="set ${ex.isTimed ? 'set--timed' : ''} ${done ? 'is-done' : ''}" data-i="${index}">
      <span class="set__n">${index + 1}</span>
      ${ex.isTimed
        ? field('reps', reps, 'วินาที', String(ex.repsMax))
        : [field('weight', weight, 'kg', '—'), field('reps', reps, 'ครั้ง', String(ex.repsMax))]}
      <button
        class="check"
        type="button"
        data-act="toggle"
        aria-pressed="${done ? 'true' : 'false'}"
        aria-label="เซตที่ ${index + 1} เสร็จแล้ว"
      >
        ✓
      </button>
      <p class="set__prev">${hint}</p>
    </div>
  `;
}

function exerciseCard(ex, index, session) {
  const saved = (session.entries || {})[ex.id] || [];
  const prev = previousSets(ex.id, session.id);
  const overload = readyToOverload(ex);

  return html`
    <li class="ex" data-ex="${ex.id}" style="--i:${index}">
      <div class="ex__head">
        <span class="ex__idx">${String(index + 1).padStart(2, '0')}</span>
        <div class="ex__title">
          <a class="ex__name" href="#/exercise/${ex.id}">${ex.name}</a>
          <span class="ex__meta">${ex.sets} × ${repsLabel(ex)} · พัก ${ex.restSec} วิ</span>
        </div>
        ${ex.link
          ? html`<a class="ex__video" href="${ex.link}" target="_blank" rel="noopener noreferrer"
                    aria-label="ดูวิธีทำท่า ${ex.name}">▶</a>`
          : ''}
      </div>
      ${overload ? html`<span class="badge badge--overload">▲ พร้อมเพิ่มน้ำหนัก</span>` : ''}
      ${ex.nameTh || ex.alt
        ? html`<p class="ex__note">
            ${ex.nameTh || ''}${ex.alt ? html` · <em>${ex.alt}</em>` : ''}
          </p>`
        : ''}
      <div class="sets">
        ${Array.from({ length: ex.sets }, (_, i) => setRow(ex, i, saved[i], prev))}
      </div>
    </li>
  `;
}

export function renderWorkout(params) {
  const day = getDay(params.dayId);
  if (!day) return renderNotFound();

  const session = getOrCreateSession(day.id);
  const goal = totalSets(day);

  const view = toElement(html`
    <section class="view view--workout" data-accent="${day.accent}">
      <header class="page-head">
        <a class="back" href="#/">← ตาราง</a>
        <span class="page-head__tag">${day.shortLabel}</span>
        <h1 class="page-head__title">${day.title}</h1>
        <p class="page-head__sub">${day.subtitle}</p>
      </header>

      <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="${goal}" aria-valuenow="0">
        <div class="progress__track"><span class="progress__fill"></span></div>
        <div class="progress__label"></div>
      </div>

      <ol class="ex-list">
        ${day.exercises.map((ex, i) => exerciseCard(ex, i, session))}
      </ol>

      <div class="finish">
        <button class="btn btn--primary" type="button" data-act="finish">จบการเล่น</button>
        <button class="btn btn--ghost" type="button" data-act="discard">ทิ้งการเล่นนี้</button>
      </div>
    </section>
  `);

  /* ---------- สถานะ + การอัปเดตบางส่วน ---------- */

  const fill = view.querySelector('.progress__fill');
  const label = view.querySelector('.progress__label');
  const bar = view.querySelector('.progress');

  function refreshProgress() {
    const s = getSession(session.id);
    let done = 0;
    let volume = 0;
    for (const ex of day.exercises) {
      for (const set of (s?.entries || {})[ex.id] || []) {
        if (!set?.done) continue;
        done += 1;
        volume += ex.isTimed ? 0 : (set.weight || 0) * (set.reps || 0);
      }
    }
    const pct = Math.round((done / goal) * 100);
    fill.style.width = `${pct}%`;
    bar.setAttribute('aria-valuenow', String(done));
    label.innerHTML = '';
    label.append(
      Object.assign(document.createElement('b'), { textContent: `${done} / ${goal} เซต` }),
      document.createTextNode(volume ? ` · ปริมาตร ${fmtNum(volume)} kg` : ''),
    );
    view.classList.toggle('is-complete', done === goal);
  }

  function readSet(row) {
    const get = (name) => {
      const input = row.querySelector(`[data-field="${name}"]`);
      return input ? numOrNull(input.value) : null;
    };
    return { weight: get('weight'), reps: get('reps') };
  }

  /* ---------- Events ---------- */

  let saveTimer = 0;
  view.addEventListener('input', (ev) => {
    const input = ev.target.closest('[data-field]');
    if (!input) return;
    const row = input.closest('.set');
    const exId = row.closest('.ex').dataset.ex;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      saveSet(session.id, exId, Number(row.dataset.i), readSet(row));
      refreshProgress();
    }, 350);
  });

  view.addEventListener('click', (ev) => {
    const btn = ev.target.closest('[data-act]');
    if (!btn) return;

    if (btn.dataset.act === 'toggle') {
      const row = btn.closest('.set');
      const exCard = row.closest('.ex');
      const ex = day.exercises.find((e) => e.id === exCard.dataset.ex);
      const done = btn.getAttribute('aria-pressed') !== 'true';

      timer.primeAudio(); // ใช้จังหวะที่ผู้ใช้แตะจอเพื่อปลดล็อกเสียง
      saveSet(session.id, ex.id, Number(row.dataset.i), { ...readSet(row), done });
      btn.setAttribute('aria-pressed', String(done));
      row.classList.toggle('is-done', done);
      refreshProgress();

      if (done) timer.start(ex.restSec, `พักหลัง ${ex.name}`);
      else if (timer.isRunning()) timer.stop();
      return;
    }

    if (btn.dataset.act === 'finish') {
      const saved = finishSession(session.id);
      timer.stop();
      if (!saved) {
        alert('ยังไม่ได้ติ๊กเซตไหนเลย — การเล่นครั้งนี้จึงไม่ถูกบันทึก');
        location.hash = '#/';
      } else {
        location.hash = '#/history';
      }
      return;
    }

    if (btn.dataset.act === 'discard') {
      if (!confirm('ทิ้งการเล่นครั้งนี้ทั้งหมด? ข้อมูลที่กรอกไว้จะหายไป')) return;
      deleteSession(session.id);
      timer.stop();
      location.hash = '#/';
    }
  });

  refreshProgress();

  /* ---------- Lifecycle ---------- */

  requestWakeLock();
  document.addEventListener('visibilitychange', onVisible);

  view.__unmount = () => {
    clearTimeout(saveTimer);
    document.removeEventListener('visibilitychange', onVisible);
    releaseWakeLock();
  };

  return view;
}
