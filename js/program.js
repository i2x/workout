/**
 * ตารางออกกำลังกาย 3 วัน (Push / Pull / Legs)
 * แก้ไฟล์นี้ไฟล์เดียวเพื่อเปลี่ยนตาราง — ส่วนอื่นของแอปอ่านจากที่นี่ทั้งหมด
 *
 * ท่าหลักทุกท่าเป็น "เครื่องแยกตัว ท่าเดียวจบ" — นั่งลงแล้วทำได้เลย
 * ไม่ต้องปรับรอก ไม่ต้องเปลี่ยนด้ามจับ เหมาะกับคนเพิ่งเริ่ม
 * เคเบิลถูกย้ายไปเป็นตัวสำรองทั้งหมด เพราะเสาเดียวทำได้หลายท่าจนสับสน
 *
 * แต่ละท่ามีตัวสำรอง 1–2 อัน เผื่อเครื่องไม่ว่างหรือสาขานั้นไม่มี
 * (options[0] คือตัวหลักที่แอปขึ้นให้เป็นค่าเริ่มต้น)
 *
 * part = ชื่อกล้ามเนื้อแบบที่ป้ายบนเครื่องเขียน (CHEST / LAT / TRICEPS)
 * ใช้เดินหาเครื่องในยิมได้เลยโดยไม่ต้องอ่านชื่อท่า
 */

const MW = 'https://musclewiki.com/'; // fallback สำหรับท่าที่ไม่มีลิงก์เฉพาะ

/** ป้ายอุปกรณ์แบบสั้น */
export const GEAR = {
  machine: 'เครื่อง',
  cable: 'เคเบิล',
  smith: 'สมิธ',
  db: 'ดัมเบล',
  bb: 'บาร์เบล',
  body: 'บอดี้เวท',
};

/** @type {import('./types.js').Day[]} */
export const PROGRAM = [
  {
    id: 'day1',
    title: 'Day 1 — Push',
    subtitle: 'อก / ไหล่ / ไตรเซป',
    accent: 'push',
    shortLabel: 'PUSH',
    exercises: [
      {
        id: 'chest-press',
        part: { en: 'CHEST', th: 'อก' },
        sets: 3, repsMin: 10, repsMax: 12, restSec: 90,
        options: [
          { id: 'machine-chest-press', name: 'Chest Press Machine', nameTh: 'ดันอกด้วยเครื่อง', gear: 'machine', link: 'https://www.acefitness.org/resources/everyone/exercise-library/188/seated-chest-press/' },
          { id: 'smith-bench', name: 'Smith Machine Bench Press', nameTh: 'ดันอกบนสมิธแมชชีน', gear: 'smith', link: MW },
          { id: 'db-bench', name: 'Dumbbell Bench Press', nameTh: 'ดันอกด้วยดัมเบล', gear: 'db', link: MW },
        ],
      },
      {
        id: 'shoulder-press',
        part: { en: 'SHOULDER', th: 'ไหล่' },
        sets: 3, repsMin: 10, repsMax: 12, restSec: 90,
        options: [
          { id: 'machine-shoulder-press', name: 'Shoulder Press Machine', nameTh: 'ดันไหล่ด้วยเครื่อง', gear: 'machine', link: MW },
          { id: 'smith-shoulder-press', name: 'Smith Machine Shoulder Press', nameTh: 'ดันไหล่บนสมิธแมชชีน', gear: 'smith', link: MW },
          { id: 'db-shoulder-press', name: 'Dumbbell Shoulder Press', nameTh: 'ดันไหล่ด้วยดัมเบล', gear: 'db', link: MW },
        ],
      },
      {
        id: 'chest-fly',
        part: { en: 'CHEST', th: 'อก (ด้านใน)' },
        sets: 3, repsMin: 12, repsMax: 15, restSec: 60,
        options: [
          { id: 'pec-deck', name: 'Pec Fly Machine (Pec Deck)', nameTh: 'หนีบอกด้วยเครื่อง', gear: 'machine', link: MW },
          { id: 'db-fly', name: 'Dumbbell Chest Fly', nameTh: 'กางอกด้วยดัมเบล', gear: 'db', link: MW },
          { id: 'cable-crossover', name: 'Chest Fly (Cable)', nameTh: 'หนีบอกด้วยเคเบิล', gear: 'cable', link: MW },
        ],
      },
      {
        id: 'lateral-raise',
        part: { en: 'SIDE DELT', th: 'ไหล่ข้าง' },
        sets: 3, repsMin: 12, repsMax: 15, restSec: 45,
        options: [
          { id: 'machine-lateral-raise', name: 'Lateral Raise Machine', nameTh: 'กางไหล่ด้วยเครื่อง', gear: 'machine', link: MW },
          { id: 'db-lateral-raise', name: 'Dumbbell Lateral Raise', nameTh: 'กางไหล่ด้วยดัมเบล', gear: 'db', link: MW },
        ],
      },
      {
        id: 'triceps-ext',
        part: { en: 'TRICEPS', th: 'ไตรเซป' },
        sets: 3, repsMin: 12, repsMax: 15, restSec: 60,
        options: [
          { id: 'machine-triceps', name: 'Triceps Extension Machine', nameTh: 'เหยียดไตรเซปด้วยเครื่อง', gear: 'machine', link: MW },
          { id: 'assisted-dip', name: 'Assisted Dip Machine', nameTh: 'ดิปแบบมีตัวช่วย', gear: 'machine', link: MW },
          { id: 'cable-pushdown', name: 'Triceps Pushdown (Cable)', nameTh: 'กดไตรเซปด้วยเคเบิล', gear: 'cable', link: 'https://www.muscleandstrength.com/exercises/rope-tricep-extension.html' },
        ],
      },
      {
        id: 'plank',
        part: { en: 'CORE', th: 'แกนกลางลำตัว' },
        sets: 3, repsMin: 30, repsMax: 30, restSec: 45,
        isTimed: true,
        options: [
          { id: 'plank', name: 'Plank', nameTh: 'แพลงก์ค้าง', gear: 'body', link: MW },
        ],
      },
    ],
  },

  {
    id: 'day2',
    title: 'Day 2 — Pull',
    subtitle: 'หลัง / ไบเซป',
    accent: 'pull',
    shortLabel: 'PULL',
    exercises: [
      {
        id: 'lat-pulldown',
        part: { en: 'LAT', th: 'ปีก' },
        sets: 3, repsMin: 10, repsMax: 12, restSec: 90,
        options: [
          { id: 'lat-pulldown', name: 'Lat Pulldown Machine', nameTh: 'ดึงบาร์หน้าลงมา', gear: 'machine', link: 'https://musclewiki.com/exercise/machine-pulldown' },
        ],
      },
      {
        id: 'row-horizontal',
        part: { en: 'MID BACK', th: 'กลางหลัง' },
        sets: 3, repsMin: 10, repsMax: 12, restSec: 90,
        options: [
          { id: 'seated-cable-row', name: 'Seated Row (Low Row Station)', nameTh: 'นั่งพายที่สถานีรอกล่าง — เบาะตายตัว ไม่ต้องปรับอะไร', gear: 'machine', link: 'https://www.muscleandstrength.com/exercises/seated-row.html' },
          { id: 'machine-row', name: 'Seated Row Machine (มีเบาะพยุงอก)', nameTh: 'โรว์ด้วยเครื่อง ถ้าสาขามี', gear: 'machine', link: MW },
        ],
      },
      {
        id: 'row-unilateral',
        part: { en: 'LAT', th: 'ปีก (ดึงตัวขึ้น)' },
        sets: 3, repsMin: 12, repsMax: 15, restSec: 75,
        options: [
          { id: 'assisted-pullup-row', name: 'Assisted Pull-Up Machine', nameTh: 'ดึงข้อแบบมีตัวช่วย (คุกเข่าบนแป้น)', gear: 'machine', link: MW },
          { id: 'lat-pulldown-close', name: 'Close-Grip Lat Pulldown', nameTh: 'ดึงบาร์แบบจับแคบ (เครื่องเดิม เปลี่ยนที่จับ)', gear: 'machine', link: MW },
          { id: 'db-one-arm-row', name: 'One-Arm Dumbbell Row', nameTh: 'โรว์ดัมเบลข้างเดียว (เข่ายันม้านั่ง)', gear: 'db', link: MW },
        ],
      },
      {
        id: 'rear-delt',
        part: { en: 'REAR DELT', th: 'ไหล่หลัง' },
        sets: 3, repsMin: 15, repsMax: 15, restSec: 45,
        options: [
          { id: 'db-rear-fly', name: 'Chest-Supported Rear Delt Fly', nameTh: 'นอนคว่ำบนเบาะเอียง กางดัมเบลออกข้าง', gear: 'db', link: MW },
          { id: 'reverse-pec-deck', name: 'Rear Delt Machine (Reverse Fly)', nameTh: 'กางไหล่หลังด้วยเครื่อง ถ้าสาขามี', gear: 'machine', link: MW },
          { id: 'cable-face-pull', name: 'Rear Delt Face Pull (Cable)', nameTh: 'ดึงเคเบิลเข้าหน้า', gear: 'cable', link: MW },
        ],
      },
      {
        id: 'biceps-curl',
        part: { en: 'BICEPS', th: 'ไบเซป' },
        sets: 3, repsMin: 12, repsMax: 15, restSec: 60,
        options: [
          { id: 'preacher-curl', name: 'Biceps Curl Machine (Preacher)', nameTh: 'ม้วนไบเซปด้วยเครื่อง', gear: 'machine', link: MW },
          { id: 'db-curl', name: 'Dumbbell Curl', nameTh: 'ม้วนไบเซปด้วยดัมเบล', gear: 'db', link: MW },
          { id: 'cable-curl', name: 'Biceps Curl (Cable)', nameTh: 'ม้วนไบเซปด้วยเคเบิล', gear: 'cable', link: MW },
        ],
      },
      {
        id: 'knee-raise',
        part: { en: 'ABS', th: 'ท้องล่าง' },
        sets: 3, repsMin: 10, repsMax: 12, restSec: 60,
        options: [
          { id: 'lying-leg-raise', name: 'Lying Leg Raise', nameTh: 'นอนยกขา', gear: 'body', link: MW },
          { id: 'captains-chair', name: "Captain's Chair (Ab Raise)", nameTh: 'ยกเข่าบนเก้าอี้กัปตัน', gear: 'machine', link: MW },
        ],
      },
    ],
  },

  {
    id: 'day3',
    title: 'Day 3 — Legs',
    subtitle: 'ขา / ก้น + ท้อง',
    accent: 'legs',
    shortLabel: 'LEGS',
    exercises: [
      {
        id: 'squat-press',
        part: { en: 'QUAD + GLUTE', th: 'ขาหน้า + ก้น' },
        sets: 3, repsMin: 10, repsMax: 12, restSec: 120,
        options: [
          { id: 'leg-press', name: 'Leg Press', nameTh: 'ดันขาด้วยเครื่อง', gear: 'machine', link: MW },
          { id: 'smith-squat', name: 'Smith Machine Squat', nameTh: 'สควอทบนสมิธแมชชีน', gear: 'smith', link: MW },
          { id: 'hack-squat', name: 'Hack Squat', nameTh: 'แฮ็คสควอท', gear: 'machine', link: MW },
        ],
      },
      {
        id: 'hip-hinge',
        part: { en: 'HAMSTRING', th: 'ขาหลัง' },
        sets: 3, repsMin: 12, repsMax: 15, restSec: 90,
        options: [
          { id: 'seated-leg-curl', name: 'Seated Leg Curl', nameTh: 'งอขาหลังแบบนั่ง', gear: 'machine', link: MW },
          { id: 'lying-leg-curl', name: 'Lying Leg Curl', nameTh: 'งอขาหลังแบบนอน', gear: 'machine', link: MW },
        ],
      },
      {
        id: 'quad-iso',
        part: { en: 'QUAD', th: 'ขาหน้า' },
        sets: 3, repsMin: 12, repsMax: 15, restSec: 75,
        options: [
          { id: 'leg-extension', name: 'Leg Extension', nameTh: 'เหยียดขาหน้า', gear: 'machine', link: MW },
          { id: 'walking-lunge', name: 'Dumbbell Walking Lunge', nameTh: 'ลันจ์เดินถือดัมเบล', gear: 'db', link: MW },
        ],
      },
      {
        id: 'glute',
        part: { en: 'GLUTE + LOWER BACK', th: 'ก้น + หลังล่าง' },
        sets: 3, repsMin: 12, repsMax: 15, restSec: 60,
        options: [
          { id: 'back-extension', name: 'Back Extension', nameTh: 'แอ่นหลังบนเบาะ 45°', gear: 'machine', link: MW },
          { id: 'glute-bridge', name: 'Dumbbell Glute Bridge', nameTh: 'ยกสะโพกวางดัมเบล', gear: 'db', link: MW },
        ],
      },
      {
        id: 'calf',
        part: { en: 'CALF', th: 'น่อง' },
        sets: 3, repsMin: 15, repsMax: 20, restSec: 45,
        options: [
          { id: 'machine-calf-raise', name: 'Calf Raise Machine', nameTh: 'เขย่งน่องด้วยเครื่อง', gear: 'machine', link: MW },
          { id: 'leg-press-calf', name: 'Calf Raise (บน Leg Press)', nameTh: 'เขย่งน่องบนเครื่องดันขา', gear: 'machine', link: MW },
          { id: 'db-calf-raise', name: 'Dumbbell Calf Raise', nameTh: 'เขย่งน่องถือดัมเบล', gear: 'db', link: MW },
        ],
      },
      {
        id: 'ab-crunch',
        part: { en: 'ABS', th: 'ท้องบน' },
        sets: 3, repsMin: 12, repsMax: 15, restSec: 45,
        options: [
          { id: 'ab-crunch-machine', name: 'Ab Crunch Machine', nameTh: 'ครันช์ด้วยเครื่อง', gear: 'machine', link: MW },
          { id: 'cable-crunch', name: 'Ab Crunch (Cable)', nameTh: 'ครันช์ด้วยเคเบิล', gear: 'cable', link: MW },
        ],
      },
    ],
  },
];

/** หา Day จาก id */
export function getDay(dayId) {
  return PROGRAM.find((d) => d.id === dayId) || null;
}

/** หา Exercise จาก id (ค้นข้ามทุกวัน) */
export function getExercise(exerciseId) {
  for (const day of PROGRAM) {
    const ex = day.exercises.find((e) => e.id === exerciseId);
    if (ex) return { day, exercise: ex };
  }
  return null;
}

/**
 * เครื่องที่กำลังใช้ของท่านั้น
 * ถ้า optionId ไม่ตรงกับอะไรเลย (เช่นลบออกจากตารางไปแล้ว) ให้ตกกลับไปตัวหลัก
 */
export function getOption(ex, optionId) {
  return ex.options.find((o) => o.id === optionId) || ex.options[0];
}

/** ชื่อท่าหลัก ใช้ตอนไม่รู้ว่าผู้ใช้เลือกอะไรไว้ */
export function mainName(ex) {
  return ex.options[0].name;
}

/** จำนวนเซตรวมของวันนั้น */
export function totalSets(day) {
  return day.exercises.reduce((sum, ex) => sum + ex.sets, 0);
}

/**
 * เวลาโดยประมาณของวันนั้น (นาที)
 * ประมาณจาก: เวลาทำเซต ~40 วิ + เวลาพักตาม restSec
 */
export function estimateMinutes(day) {
  const sec = day.exercises.reduce(
    (sum, ex) => sum + ex.sets * (40 + ex.restSec),
    0,
  );
  return Math.round(sec / 60 / 5) * 5; // ปัดเป็นช่วง 5 นาที
}

/** ข้อความช่วงเรพ เช่น "10–12" หรือ "30 วิ" */
export function repsLabel(ex) {
  const range = ex.repsMin === ex.repsMax ? `${ex.repsMin}` : `${ex.repsMin}–${ex.repsMax}`;
  return ex.isTimed ? `${range} วิ` : range;
}
