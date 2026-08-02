import { getDay, repsLabel, totalSets, getOption, GEAR } from '../program.js';
import {
  getOrCreateSession,
  saveSet,
  finishSession,
  deleteSession,
  getSession,
  getEquipment,
  setEquipment,
  setSessionVariant,
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

/** ตัวสำรอง เผื่อเครื่องไม่ว่างหรือสาขานั้นไม่มี — ประวัติยังนับรวมเป็นท่าเดียวกัน */
function swapPanel(ex, selectedId) {
  return html`
    <div class="swap" hidden>
      ${ex.options.map(
        (o) => html`
          <button class="swap__opt" type="button" data-act="pick" data-option="${o.id}"
                  aria-pressed="${o.id === selectedId ? 'true' : 'false'}">
            <span class="swap__name">${o.name}<small>${o.nameTh || ''}</small></span>
            <span class="swap__gear">${GEAR[o.gear] || o.gear}</span>
          </button>
        `,
      )}
    </div>
  `;
}

function exerciseCard(ex, index, session, selectedId) {
  const saved = (session.entries || {})[ex.id] || [];
  const prev = previousSets(ex.id, session.id);
  const overload = readyToOverload(ex);
  const opt = getOption(ex, selectedId);

  return html`
    <li class="ex" data-ex="${ex.id}" style="--i:${index}">
      <div class="ex__head">
        <span class="ex__idx">${String(index + 1).padStart(2, '0')}</span>
        <div class="ex__title">
          <span class="ex__part">${ex.part.en}<small>${ex.part.th}</small></span>
          <a class="ex__name" href="#/exercise/${ex.id}">${opt.name}</a>
          <span class="ex__meta">${ex.sets} × ${repsLabel(ex)} · พัก ${ex.restSec} วิ</span>
        </div>
        <a class="ex__video" href="${opt.link || '#'}" target="_blank" rel="noopener noreferrer"
           aria-label="ดูวิธีทำท่า ${opt.name}">▶</a>
      </div>

      <div class="ex__sub">
        <span class="swap__badge">${GEAR[opt.gear] || opt.gear}</span>
        <span class="ex__note">${opt.nameTh || ''}</span>
        ${ex.options.length > 1
          ? html`<button class="swap__btn" type="button" data-act="swap" aria-expanded="false">
              ⇄ ใช้ตัวอื่นแทน
            </button>`
          : ''}
        ${overload ? html`<span class="badge badge--overload">▲ พร้อมเพิ่มน้ำหนัก</span>` : ''}
      </div>

      ${ex.options.length > 1 ? swapPanel(ex, opt.id) : ''}

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
  const equipment = { ...getEquipment(), ...(session.variants || {}) };

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
        ${day.exercises.map((ex, i) => exerciseCard(ex, i, session, equipment[ex.id]))}
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

  /** เปลี่ยนอุปกรณ์แล้วอัปเดตชื่อ/ลิงก์/ป้ายในการ์ดนั้น โดยไม่วาดใหม่ทั้งหน้า */
  function applyOption(card, ex, optionId) {
    const opt = getOption(ex, optionId);
    equipment[ex.id] = opt.id;
    setEquipment(ex.id, opt.id);
    setSessionVariant(session.id, ex.id, opt.id);

    card.querySelector('.ex__name').textContent = opt.name;
    card.querySelector('.ex__video').href = opt.link || '#';
    card.querySelector('.swap__badge').textContent = GEAR[opt.gear] || opt.gear;
    card.querySelector('.ex__note').textContent = opt.nameTh || '';
    card.querySelectorAll('[data-option]').forEach((b) =>
      b.setAttribute('aria-pressed', String(b.dataset.option === opt.id)),
    );
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
    const act = btn.dataset.act;
    const card = btn.closest('.ex');
    const ex = card ? day.exercises.find((e) => e.id === card.dataset.ex) : null;

    if (act === 'swap') {
      const panel = card.querySelector('.swap');
      const open = panel.hidden;
      panel.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
      return;
    }

    if (act === 'pick') {
      applyOption(card, ex, btn.dataset.option);
      card.querySelector('.swap').hidden = true;
      card.querySelector('[data-act="swap"]').setAttribute('aria-expanded', 'false');
      return;
    }

    if (act === 'toggle') {
      const row = btn.closest('.set');
      const done = btn.getAttribute('aria-pressed') !== 'true';

      const opt = getOption(ex, equipment[ex.id]);
      timer.primeAudio(); // ใช้จังหวะที่ผู้ใช้แตะจอเพื่อปลดล็อกเสียง
      saveSet(session.id, ex.id, Number(row.dataset.i), { ...readSet(row), done });
      // บันทึกอุปกรณ์ที่ใช้ไว้ด้วย แม้ผู้ใช้จะไม่ได้กดเปลี่ยนเอง
      if (done) setSessionVariant(session.id, ex.id, opt.id);
      btn.setAttribute('aria-pressed', String(done));
      row.classList.toggle('is-done', done);
      refreshProgress();

      if (done) timer.start(ex.restSec, `พักหลัง ${opt.name}`);
      else if (timer.isRunning()) timer.stop();
      return;
    }

    if (act === 'finish') {
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

    if (act === 'discard') {
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
