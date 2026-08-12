/**
 * Wrapper ของ localStorage — ทุกการอ่าน/เขียนข้อมูลผู้ใช้ผ่านไฟล์นี้ที่เดียว
 * ข้อมูลทั้งหมดเก็บใน key เดียว เพื่อให้ export/import เป็น JSON ก้อนเดียวได้ง่าย
 */

const KEY = 'workout-tracker:v1';
const VERSION = 2;

/** session ที่ค้างเกินเวลานี้ ถือว่าลืมกดจบ */
const STALE_MS = 12 * 60 * 60 * 1000;

/**
 * ตารางเวอร์ชันแรกผูกกับ "เครื่อง" ตรง ๆ ต่อมาเปลี่ยนเป็น "รูปแบบการเคลื่อนไหว"
 * แผนที่นี้ย้ายประวัติเก่ามาไว้ในช่องใหม่ พร้อมจำว่าตอนนั้นใช้อุปกรณ์อะไร
 * @type {Record<string, [string, string]>}  oldId -> [newExerciseId, optionId]
 */
const LEGACY_IDS = {
  'chest-press': ['chest-press', 'machine-chest-press'],
  'shoulder-press': ['shoulder-press', 'machine-shoulder-press'],
  'pec-deck': ['chest-fly', 'pec-deck'],
  'lateral-raise': ['lateral-raise', 'machine-lateral-raise'],
  'triceps-pushdown': ['triceps-ext', 'cable-pushdown'],
  plank: ['plank', 'plank'],
  'lat-pulldown': ['lat-pulldown', 'lat-pulldown'],
  'chest-supported-row': ['row-horizontal', 'machine-row'],
  'seated-cable-row': ['row-horizontal', 'seated-cable-row'],
  'row-unilateral': ['row-horizontal', 'seated-cable-row'],
  'face-pull': ['rear-delt', 'cable-face-pull'],
  'cable-curl': ['biceps-curl', 'cable-curl'],
  'knee-raise': ['knee-raise', 'captains-chair'],
  'leg-press': ['squat-press', 'leg-press'],
  'seated-leg-curl': ['hip-hinge', 'seated-leg-curl'],
  'leg-extension': ['quad-iso', 'leg-extension'],
  'back-extension': ['glute', 'back-extension'],
  'calf-raise': ['calf', 'machine-calf-raise'],
  'cable-crunch': ['ab-crunch', 'cable-crunch'],
};

/** @returns {import('./types.js').AppData} */
function emptyData() {
  return {
    version: VERSION,
    sessions: [],
    settings: { theme: 'auto', sound: true, vibrate: true, equipment: {} },
  };
}

/** @type {import('./types.js').AppData | null} */
let cache = null;

/** ผู้ที่สนใจการเปลี่ยนแปลงข้อมูล (ใช้ให้หน้าอื่นรีเฟรชตัวเอง) */
const listeners = new Set();

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function notify() {
  listeners.forEach((fn) => fn());
}

/**
 * อ่านข้อมูลทั้งหมด (มี cache ในหน่วยความจำ)
 * @returns {import('./types.js').AppData}
 */
export function load() {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    cache = raw ? migrate(JSON.parse(raw)) : emptyData();
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
    alert('บันทึกข้อมูลไม่สำเร็จ — พื้นที่เก็บข้อมูลของเบราว์เซอร์อาจเต็ม');
  }
  notify();
  return data;
}

/** แก้ข้อมูลแบบ in-place แล้วบันทึกทันที */
export function update(fn) {
  const data = load();
  const result = fn(data);
  save(data);
  return result;
}

/** เผื่ออนาคตมีการเปลี่ยนโครงสร้างข้อมูล */
function migrate(data) {
  const base = emptyData();
  if (!data || typeof data !== 'object') return base;
  const sessions = Array.isArray(data.sessions) ? data.sessions : [];
  const equipment = { ...(data.settings?.equipment || {}) };
  // v2: เป้าคืออกบน — ถ้าค่าที่จำไว้เป็นตัวเบาะราบ ให้กลับไปตัวเอียง (ครั้งเดียว เลือกใหม่ทีหลังได้)
  if ((Number(data.version) || 1) < 2 && ['machine-chest-press', 'smith-bench'].includes(equipment['chest-press'])) {
    equipment['chest-press'] = 'incline-chest-press';
  }
  return {
    version: VERSION,
    sessions: sessions.filter((s) => s && s.dayId && s.startedAt).map((s) => {
      const entries = {};
      const variants = { ...(s.variants || {}) };
      for (const [exId, sets] of Object.entries(
        s.entries && typeof s.entries === 'object' ? s.entries : {},
      )) {
        const [newId, optionId] = LEGACY_IDS[exId] || [exId, null];
        // สองช่องเก่าอาจถูกยุบมาเป็นช่องเดียว — ต่อเซตเข้าด้วยกัน ไม่ใช่เขียนทับ
        entries[newId] = entries[newId] ? [...entries[newId], ...sets] : sets;
        if (optionId && !variants[newId]) variants[newId] = optionId;
      }
      return {
        id: String(s.id || uid()),
        dayId: String(s.dayId),
        startedAt: Number(s.startedAt),
        finishedAt: s.finishedAt ? Number(s.finishedAt) : null,
        entries,
        variants,
      };
    }),
    settings: { ...base.settings, ...(data.settings || {}), equipment },
  };
}

export function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
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

/* ---------- อุปกรณ์ที่เลือกไว้ของแต่ละท่า ---------- */

/** @returns {Record<string,string>} exerciseId -> optionId */
export function getEquipment() {
  return load().settings.equipment || {};
}

/** จำอุปกรณ์ที่เลือกไว้ ครั้งหน้าจะขึ้นตัวนี้ให้เลย */
export function setEquipment(exerciseId, optionId) {
  return update((d) => {
    d.settings.equipment ||= {};
    d.settings.equipment[exerciseId] = optionId;
  });
}

/* ---------- Sessions ---------- */

/** session ที่เล่นจบแล้วทั้งหมด เรียงจากใหม่ไปเก่า */
export function getSessions() {
  return load()
    .sessions.filter((s) => s.finishedAt)
    .sort((a, b) => b.finishedAt - a.finishedAt);
}

export function getSession(id) {
  return load().sessions.find((s) => s.id === id) || null;
}

/** session ล่าสุดที่เล่นจบของวันนั้น */
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

/** session ของวันนั้นที่ยังเล่นค้างอยู่ */
export function getActiveSession(dayId) {
  return load().sessions.find((s) => !s.finishedAt && (!dayId || s.dayId === dayId)) || null;
}

/** มีเซตที่ติ๊กเสร็จแล้วอย่างน้อย 1 เซตไหม */
export function hasProgress(session) {
  return Object.values(session.entries || {}).some((sets) =>
    sets.some((set) => set && set.done),
  );
}

/**
 * หา session ที่กำลังเล่นของวันนี้ ถ้าไม่มีก็สร้างใหม่
 * ถ้าเจอ session ค้างเก่าเกิน 12 ชม. จะปิดให้อัตโนมัติ (ถ้ามีข้อมูล) หรือทิ้ง (ถ้าว่าง)
 */
export function getOrCreateSession(dayId) {
  return update((d) => {
    const now = Date.now();

    for (const s of [...d.sessions]) {
      if (s.finishedAt) continue;
      const stale = now - s.startedAt > STALE_MS;
      if (!stale && s.dayId === dayId) return s;
      if (stale) {
        if (hasProgress(s)) s.finishedAt = s.startedAt + 60 * 60 * 1000;
        else d.sessions = d.sessions.filter((x) => x.id !== s.id);
      }
    }

    // เหลือ session ค้างของวันอื่นที่ยังไม่เก่า — ทิ้งถ้ายังไม่ได้ทำอะไร
    d.sessions = d.sessions.filter(
      (s) => s.finishedAt || s.dayId === dayId || hasProgress(s),
    );

    const fresh = { id: uid(), dayId, startedAt: now, finishedAt: null, entries: {}, variants: {} };
    d.sessions.push(fresh);
    return fresh;
  });
}

/** จำว่า session นี้ใช้อุปกรณ์อะไรกับท่านั้น (แสดงในประวัติ) */
export function setSessionVariant(sessionId, exerciseId, optionId) {
  return update((d) => {
    const s = d.sessions.find((x) => x.id === sessionId);
    if (!s) return;
    (s.variants ||= {})[exerciseId] = optionId;
  });
}

/** บันทึกค่าของเซตหนึ่ง */
export function saveSet(sessionId, exerciseId, index, patch) {
  return update((d) => {
    const s = d.sessions.find((x) => x.id === sessionId);
    if (!s) return null;
    const sets = (s.entries[exerciseId] ||= []);
    while (sets.length <= index) sets.push({ weight: null, reps: null, done: false });
    Object.assign(sets[index], patch);
    return sets[index];
  });
}

/** ปิด session — ลบเซตที่ไม่ได้ติ๊ก และทิ้งทั้ง session ถ้าไม่ได้ทำอะไรเลย */
export function finishSession(sessionId) {
  return update((d) => {
    const s = d.sessions.find((x) => x.id === sessionId);
    if (!s) return null;
    for (const [exId, sets] of Object.entries(s.entries)) {
      const kept = sets.filter((set) => set && set.done);
      if (kept.length) {
        s.entries[exId] = kept;
      } else {
        delete s.entries[exId];
        if (s.variants) delete s.variants[exId];
      }
    }
    if (!Object.keys(s.entries).length) {
      d.sessions = d.sessions.filter((x) => x.id !== sessionId);
      return null;
    }
    s.finishedAt = Date.now();
    return s;
  });
}

export function deleteSession(sessionId) {
  return update((d) => {
    d.sessions = d.sessions.filter((s) => s.id !== sessionId);
  });
}

/* ---------- Import / Export ---------- */

export function exportJSON() {
  return JSON.stringify(load(), null, 2);
}

export function importJSON(json) {
  const parsed = JSON.parse(json);
  if (!parsed || !Array.isArray(parsed.sessions)) {
    throw new Error('ไฟล์ไม่ถูกต้อง — ไม่พบรายการ sessions');
  }
  return save(migrate(parsed));
}

export function resetAll() {
  localStorage.removeItem(KEY);
  cache = null;
  notify();
  return load();
}

/** ขนาดข้อมูลโดยประมาณ (ไบต์) */
export function storageSize() {
  try {
    return new Blob([localStorage.getItem(KEY) || '']).size;
  } catch {
    return 0;
  }
}
