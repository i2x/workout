/**
 * คำนวณสถิติจาก session ที่บันทึกไว้ — PR, ปริมาตร, ความก้าวหน้า, overload hint
 * แยกจาก storage.js เพราะที่นี่คือ "การตีความข้อมูล" ไม่ใช่ "การเก็บข้อมูล"
 */
import { getSessions, getLastSession } from './storage.js';
import { getDay } from './program.js';

const num = (v) => (typeof v === 'number' && isFinite(v) ? v : 0);

/**
 * ท่าที่จับเวลา (Plank) นับ "ปริมาตร" เป็นวินาทีรวม เพราะน้ำหนักมักเป็น 0
 * @param {import('./types.js').SetLog} set
 */
function setVolume(set, isTimed) {
  return isTimed ? num(set.reps) : num(set.weight) * num(set.reps);
}

/** สถิติรวมของ session หนึ่ง */
export function sessionStats(session) {
  const day = getDay(session.dayId);
  let sets = 0;
  let volume = 0;
  let reps = 0;
  for (const [exId, list] of Object.entries(session.entries || {})) {
    const ex = day?.exercises.find((e) => e.id === exId);
    for (const set of list) {
      if (!set?.done) continue;
      sets += 1;
      reps += num(set.reps);
      volume += setVolume(set, ex?.isTimed);
    }
  }
  const durationMin = session.finishedAt
    ? Math.max(1, Math.round((session.finishedAt - session.startedAt) / 60000))
    : null;
  return { day, sets, reps, volume, durationMin };
}

/**
 * ประวัติของท่าหนึ่ง เรียงเก่า → ใหม่
 * @returns {{at:number, sessionId:string, sets:{weight:number,reps:number}[], top:number, volume:number}[]}
 */
export function exerciseHistory(exerciseId, isTimed) {
  const out = [];
  for (const s of getSessions()) {
    const list = (s.entries || {})[exerciseId];
    if (!list) continue;
    const done = list.filter((set) => set?.done);
    if (!done.length) continue;
    const sets = done.map((set) => ({ weight: num(set.weight), reps: num(set.reps) }));
    out.push({
      at: s.finishedAt,
      sessionId: s.id,
      sets,
      top: Math.max(...sets.map((set) => (isTimed ? set.reps : set.weight))),
      volume: sets.reduce((sum, set) => sum + setVolume(set, isTimed), 0),
    });
  }
  return out.reverse();
}

/** สถิติดีที่สุดตลอดกาลของท่าหนึ่ง */
export function personalRecord(exerciseId, isTimed) {
  const history = exerciseHistory(exerciseId, isTimed);
  if (!history.length) return null;
  let best = null;
  let bestVolume = 0;
  for (const rec of history) {
    bestVolume = Math.max(bestVolume, rec.volume);
    for (const set of rec.sets) {
      const metric = isTimed ? set.reps : set.weight;
      const bestMetric = best ? (isTimed ? best.reps : best.weight) : -1;
      // น้ำหนักเท่ากัน ให้เซตที่ทำได้จำนวนครั้งมากกว่าเป็น PR
      if (metric > bestMetric || (metric === bestMetric && set.reps > best.reps)) {
        best = { ...set, at: rec.at };
      }
    }
  }
  return { set: best, volume: bestVolume, sessions: history.length };
}

/**
 * พร้อมเพิ่มน้ำหนักไหม — ครั้งล่าสุดทำครบทุกเซต และทุกเซตแตะเพดานช่วง reps
 * @param {import('./types.js').Exercise} ex
 */
export function readyToOverload(ex) {
  const history = exerciseHistory(ex.id, ex.isTimed);
  const last = history[history.length - 1];
  if (!last || last.sets.length < ex.sets) return false;
  return last.sets.every((set) => set.reps >= ex.repsMax);
}

/**
 * ค่าที่ทำไว้ครั้งก่อน ใช้ auto-fill และแสดงเป็นข้อความจาง ๆ
 * @returns {{weight:number,reps:number}[] | null}
 */
export function previousSets(exerciseId, excludeSessionId) {
  for (const s of getSessions()) {
    if (s.id === excludeSessionId) continue;
    const done = ((s.entries || {})[exerciseId] || []).filter((set) => set?.done);
    if (done.length) return done.map((set) => ({ weight: num(set.weight), reps: num(set.reps) }));
  }
  return null;
}

/* ---------- สรุปรายสัปดาห์ ---------- */

/** เที่ยงคืนวันจันทร์ของสัปดาห์ที่ ts อยู่ */
export function weekStart(ts = Date.now()) {
  const d = new Date(ts);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

/** สรุปสัปดาห์นี้ เทียบกับสัปดาห์ก่อน */
export function weekSummary(now = Date.now()) {
  const thisWeek = weekStart(now);
  const lastWeek = weekStart(thisWeek - 1);
  const acc = { count: 0, volume: 0 };
  const prev = { count: 0, volume: 0 };

  for (const s of getSessions()) {
    const bucket = s.finishedAt >= thisWeek ? acc : s.finishedAt >= lastWeek ? prev : null;
    if (!bucket) continue;
    bucket.count += 1;
    bucket.volume += sessionStats(s).volume;
  }

  const change = prev.volume > 0 ? Math.round(((acc.volume - prev.volume) / prev.volume) * 100) : null;
  return { ...acc, prev, change };
}

/** จำนวนวันที่ผ่านมาตั้งแต่เล่นวันนั้นล่าสุด (null = ยังไม่เคย) */
export function lastPlayed(dayId) {
  const s = getLastSession(dayId);
  return s ? s.finishedAt : null;
}

/** ใส่ comma ให้ตัวเลข */
export function fmtNum(n) {
  return Math.round(n).toLocaleString('en-US');
}

/** ตัดทศนิยมที่ไม่จำเป็นออก: 40 -> "40", 2.5 -> "2.5" */
export function fmtWeight(n) {
  const v = num(n);
  return Number.isInteger(v) ? String(v) : String(Math.round(v * 100) / 100);
}
