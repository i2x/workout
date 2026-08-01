/**
 * Wrapper ของ localStorage — ทุกการอ่าน/เขียนข้อมูลผู้ใช้ผ่านไฟล์นี้ที่เดียว
 * ข้อมูลทั้งหมดเก็บใน key เดียว เพื่อให้ export/import เป็น JSON ก้อนเดียวได้ง่าย
 */

const KEY = 'workout-tracker:v1';
const VERSION = 1;

/** @returns {import('./types.js').AppData} */
function emptyData() {
  return {
    version: VERSION,
    sessions: [],
    settings: { theme: 'auto', sound: true, vibrate: true },
  };
}

/** @type {import('./types.js').AppData | null} */
let cache = null;

/**
 * อ่านข้อมูลทั้งหมด (มี cache ในหน่วยความจำ)
 * @returns {import('./types.js').AppData}
 */
export function load() {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      cache = emptyData();
      return cache;
    }
    const parsed = JSON.parse(raw);
    cache = migrate(parsed);
  } catch (err) {
    console.warn('[storage] อ่านข้อมูลไม่สำเร็จ ใช้ค่าเริ่มต้นแทน', err);
    cache = emptyData();
  }
  return cache;
}

/** เขียนข้อมูลทั้งหมดกลับลง localStorage */
export function save(data) {
  cache = data;
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch (err) {
    console.error('[storage] บันทึกไม่สำเร็จ (พื้นที่เต็ม?)', err);
  }
  return data;
}

/** แก้ข้อมูลแบบ in-place แล้วบันทึกทันที */
export function update(fn) {
  const data = load();
  fn(data);
  return save(data);
}

/** เผื่ออนาคตมีการเปลี่ยนโครงสร้างข้อมูล */
function migrate(data) {
  const base = emptyData();
  if (!data || typeof data !== 'object') return base;
  return {
    version: VERSION,
    sessions: Array.isArray(data.sessions) ? data.sessions : [],
    settings: { ...base.settings, ...(data.settings || {}) },
  };
}

/* ---------- Settings ---------- */

export function getSettings() {
  return load().settings;
}

export function setSetting(key, value) {
  return update((d) => {
    d.settings[key] = value;
  });
}

/* ---------- Sessions ---------- */

/** session ที่เล่นจบแล้วทั้งหมด เรียงจากใหม่ไปเก่า */
export function getSessions() {
  return load()
    .sessions.filter((s) => s.finishedAt)
    .sort((a, b) => b.finishedAt - a.finishedAt);
}

/** session ล่าสุดที่เล่นจบของวันนั้น (null ถ้ายังไม่เคยเล่น) */
export function getLastSession(dayId) {
  return getSessions().find((s) => s.dayId === dayId) || null;
}

/** map: dayId -> timestamp ที่เล่นจบล่าสุด */
export function getLastPlayedMap() {
  /** @type {Record<string, number>} */
  const map = {};
  for (const s of load().sessions) {
    if (!s.finishedAt) continue;
    if (!map[s.dayId] || s.finishedAt > map[s.dayId]) map[s.dayId] = s.finishedAt;
  }
  return map;
}

/** session ที่กำลังเล่นค้างอยู่ (ยังไม่กด "จบการเล่น") */
export function getActiveSession() {
  return load().sessions.find((s) => !s.finishedAt) || null;
}

/* ---------- Import / Export (ต่อ UI ใน Phase 5) ---------- */

export function exportJSON() {
  return JSON.stringify(load(), null, 2);
}

export function importJSON(json) {
  const parsed = JSON.parse(json);
  return save(migrate(parsed));
}

export function resetAll() {
  localStorage.removeItem(KEY);
  cache = null;
  return load();
}
