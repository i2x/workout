/**
 * Rest timer
 * นับถอยหลังจาก timestamp ปลายทาง (ไม่สะสมค่าจาก setInterval)
 * ถ้าแท็บถูกพักไว้เบื้องหลังแล้วกลับมา เวลาที่เหลือจึงยังถูกต้องเสมอ
 */
import { getSettings } from './storage.js';
import { mmss } from './format.js';

const TICK_MS = 200;

const state = {
  endsAt: 0,
  duration: 0,
  label: '',
  running: false,
  intervalId: 0,
  alarmId: 0,
};

let bar = null;

function el() {
  if (!bar) bar = document.getElementById('rest-timer');
  return bar;
}

function remainingMs() {
  return Math.max(0, state.endsAt - Date.now());
}

/* ---------- เสียง + สั่น ---------- */

/** @type {AudioContext | null} */
let audioCtx = null;

/**
 * เตรียม AudioContext ตอนผู้ใช้แตะหน้าจอ
 * (เบราว์เซอร์ไม่ยอมให้เล่นเสียงถ้าไม่ได้เกิดจาก user gesture)
 */
export function primeAudio() {
  if (audioCtx) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return;
  }
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return;
  try {
    audioCtx = new Ctx();
  } catch {
    audioCtx = null;
  }
}

function beep() {
  if (!getSettings().sound || !audioCtx) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const now = audioCtx.currentTime;
  // สามพยางค์สั้น ๆ ให้ได้ยินชัดในยิมที่มีเสียงรบกวน
  [0, 0.18, 0.36].forEach((offset, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'square';
    osc.frequency.value = i === 2 ? 1180 : 880;
    gain.gain.setValueAtTime(0.0001, now + offset);
    gain.gain.exponentialRampToValueAtTime(0.22, now + offset + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.14);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(now + offset);
    osc.stop(now + offset + 0.16);
  });
}

function buzz() {
  if (!getSettings().vibrate) return;
  if (navigator.vibrate) navigator.vibrate([120, 70, 120, 70, 220]);
}

/* ---------- Render ---------- */

function render() {
  const node = el();
  if (!node) return;

  if (!state.running) {
    node.hidden = true;
    node.innerHTML = '';
    document.body.classList.remove('has-timer');
    return;
  }

  const left = remainingMs();
  const sec = left / 1000;
  const pct = state.duration ? (left / (state.duration * 1000)) * 100 : 0;
  const urgent = sec <= 10;

  node.hidden = false;
  document.body.classList.add('has-timer');
  node.classList.toggle('is-urgent', urgent);

  let time = node.querySelector('.rt__time');
  if (!time) {
    node.innerHTML = `
      <div class="rt__track"><span class="rt__fill"></span></div>
      <div class="rt__row">
        <button class="rt__btn" type="button" data-act="minus" aria-label="ลด 15 วินาที">−15</button>
        <div class="rt__center">
          <span class="rt__time" role="timer" aria-live="off">0:00</span>
          <span class="rt__label"></span>
        </div>
        <button class="rt__btn" type="button" data-act="plus" aria-label="เพิ่ม 15 วินาที">+15</button>
        <button class="rt__btn rt__btn--skip" type="button" data-act="skip">ข้าม</button>
      </div>`;
    time = node.querySelector('.rt__time');
    node.addEventListener('click', onClick);
  }

  time.textContent = mmss(sec);
  node.querySelector('.rt__label').textContent = state.label;
  node.querySelector('.rt__fill').style.width = `${pct}%`;
}

function onClick(ev) {
  const btn = ev.target.closest('[data-act]');
  if (!btn) return;
  const act = btn.dataset.act;
  if (act === 'skip') return stop();
  adjust(act === 'plus' ? 15 : -15);
}

/* ---------- API ---------- */

export function start(seconds, label = '') {
  primeAudio();
  clearTimers();
  state.duration = seconds;
  state.endsAt = Date.now() + seconds * 1000;
  state.label = label;
  state.running = true;
  state.intervalId = setInterval(tick, TICK_MS);
  // สำรองไว้เผื่อ interval ถูกเบราว์เซอร์หน่วงตอนอยู่เบื้องหลัง
  state.alarmId = setTimeout(finish, seconds * 1000 + 30);
  render();
}

export function adjust(deltaSec) {
  if (!state.running) return;
  state.endsAt += deltaSec * 1000;
  state.duration = Math.max(1, state.duration + deltaSec);
  if (remainingMs() <= 0) return finish();
  clearTimeout(state.alarmId);
  state.alarmId = setTimeout(finish, remainingMs() + 30);
  render();
}

export function stop() {
  clearTimers();
  state.running = false;
  render();
}

export function isRunning() {
  return state.running;
}

function clearTimers() {
  clearInterval(state.intervalId);
  clearTimeout(state.alarmId);
  state.intervalId = 0;
  state.alarmId = 0;
}

function tick() {
  if (remainingMs() <= 0) return finish();
  render();
}

function finish() {
  if (!state.running) return;
  clearTimers();
  state.running = false;
  render();
  beep();
  buzz();
}

// กลับมาที่แท็บแล้ววาดใหม่ทันที เผื่อ interval ถูกหน่วงไว้
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState !== 'visible' || !state.running) return;
  if (remainingMs() <= 0) finish();
  else render();
});
