/**
 * ตารางออกกำลังกาย 3 วัน (Push / Pull / Legs)
 * แก้ไฟล์นี้ไฟล์เดียวเพื่อเปลี่ยนตาราง — ส่วนอื่นของแอปอ่านจากที่นี่ทั้งหมด
 *
 * เน้นเครื่อง (machine / cable) เป็นหลัก เพราะควบคุมฟอร์มง่ายและปลอดภัยกว่า
 * โดยเลือกเฉพาะเครื่องที่ยิมทั่วไปมีแทบทุกที่ — เลี่ยงเครื่องเฉพาะทาง
 *
 * แต่ละท่ามีตัวสำรอง 1–2 อัน เผื่อเครื่องไม่ว่างหรือสาขานั้นไม่มี
 * (options[0] คือตัวหลักที่แอปขึ้นให้เป็นค่าเริ่มต้น)
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
        sets: 3, repsMin: 10, repsMax: 12, restSec: 90,
        options: [
          { id: 'machine-chest-press', name: 'Chest Press Machine', nameTh: 'ดันอกด้วยเครื่อง', gear: 'machine', link: 'https://www.acefitness.org/resources/everyone/exercise-library/188/seated-chest-press/' },
          { id: 'smith-bench', name: 'Smith Machine Bench Press', nameTh: 'ดันอกบนสมิธแมชชีน', gear: 'smith', link: MW },
          { id: 'db-bench', name: 'Dumbbell Bench Press', nameTh: 'ดันอกด้วยดัมเบล', gear: 'db', link: MW },
        ],
      },
      {
        id: 'shoulder-press',
        sets: 3, repsMin: 10, repsMax: 12, restSec: 90,
        options: [
          { id: 'machine-shoulder-press', name: 'Shoulder Press Machine', nameTh: 'ดันไหล่ด้วยเครื่อง', gear: 'machine', link: MW },
          { id: 'smith-shoulder-press', name: 'Smith Machine Shoulder Press', nameTh: 'ดันไหล่บนสมิธแมชชีน', gear: 'smith', link: MW },
          { id: 'db-shoulder-press', name: 'Dumbbell Shoulder Press', nameTh: 'ดันไหล่ด้วยดัมเบล', gear: 'db', link: MW },
        ],
      },
      {
        id: 'chest-fly',
        sets: 3, repsMin: 12, repsMax: 15, restSec: 60,
        options: [
          { id: 'cable-crossover', name: 'Cable Chest Fly', nameTh: 'หนีบอกด้วยเคเบิล', gear: 'cable', link: MW },
          { id: 'pec-deck', name: 'Pec Deck (Butterfly)', nameTh: 'หนีบอกด้วยเครื่อง', gear: 'machine', link: MW },
          { id: 'db-fly', name: 'Dumbbell Chest Fly', nameTh: 'กางอกด้วยดัมเบล', gear: 'db', link: MW },
        ],
      },
      {
        id: 'lateral-raise',
        sets: 3, repsMin: 12, repsMax: 15, restSec: 45,
        options: [
          { id: 'cable-lateral-raise', name: 'Cable Lateral Raise', nameTh: 'กางไหล่ด้วยเคเบิล (ทีละข้าง)', gear: 'cable', link: MW },
          { id: 'db-lateral-raise', name: 'Dumbbell Lateral Raise', nameTh: 'กางไหล่ด้วยดัมเบล', gear: 'db', link: MW },
          { id: 'machine-lateral-raise', name: 'Lateral Raise Machine', nameTh: 'กางไหล่ด้วยเครื่อง', gear: 'machine', link: MW },
        ],
      },
      {
        id: 'triceps-ext',
        sets: 3, repsMin: 12, repsMax: 15, restSec: 60,
        options: [
          { id: 'cable-pushdown', name: 'Cable Triceps Pushdown', nameTh: 'กดไตรเซปด้วยเคเบิล', gear: 'cable', link: 'https://www.muscleandstrength.com/exercises/rope-tricep-extension.html' },
          { id: 'db-overhead-ext', name: 'Dumbbell Overhead Extension', nameTh: 'เหยียดไตรเซปเหนือศีรษะ', gear: 'db', link: MW },
        ],
      },
      {
        id: 'plank',
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
        sets: 3, repsMin: 10, repsMax: 12, restSec: 90,
        options: [
          { id: 'lat-pulldown', name: 'Lat Pulldown', nameTh: 'ดึงบาร์หน้าลงมา', gear: 'cable', link: 'https://musclewiki.com/exercise/machine-pulldown' },
          { id: 'assisted-pullup', name: 'Assisted Pull-up Machine', nameTh: 'ดึงข้อแบบมีตัวช่วย', gear: 'machine', link: MW },
        ],
      },
      {
        id: 'row-horizontal',
        sets: 3, repsMin: 10, repsMax: 12, restSec: 90,
        options: [
          { id: 'seated-cable-row', name: 'Seated Cable Row', nameTh: 'ดึงเคเบิลนั่งพาย', gear: 'cable', link: 'https://www.muscleandstrength.com/exercises/seated-row.html' },
          { id: 'machine-row', name: 'Row Machine', nameTh: 'โรว์ด้วยเครื่อง', gear: 'machine', link: MW },
        ],
      },
      {
        id: 'row-unilateral',
        sets: 3, repsMin: 12, repsMax: 15, restSec: 75,
        options: [
          { id: 'cable-single-row', name: 'Single-Arm Cable Row', nameTh: 'ดึงเคเบิลทีละข้าง', gear: 'cable', link: MW },
          { id: 'db-one-arm-row', name: 'One-Arm Dumbbell Row', nameTh: 'โรว์ดัมเบลข้างเดียว', gear: 'db', link: MW },
        ],
      },
      {
        id: 'rear-delt',
        sets: 3, repsMin: 15, repsMax: 15, restSec: 45,
        options: [
          { id: 'cable-face-pull', name: 'Cable Face Pull', nameTh: 'ดึงเคเบิลเข้าหน้า', gear: 'cable', link: MW },
          { id: 'reverse-pec-deck', name: 'Reverse Pec Deck', nameTh: 'กางไหล่หลังด้วยเครื่อง', gear: 'machine', link: MW },
        ],
      },
      {
        id: 'biceps-curl',
        sets: 3, repsMin: 12, repsMax: 15, restSec: 60,
        options: [
          { id: 'cable-curl', name: 'Cable Curl', nameTh: 'ม้วนไบเซปด้วยเคเบิล', gear: 'cable', link: MW },
          { id: 'preacher-curl', name: 'Preacher Curl Machine', nameTh: 'ม้วนไบเซปด้วยเครื่อง', gear: 'machine', link: MW },
          { id: 'db-curl', name: 'Dumbbell Curl', nameTh: 'ม้วนไบเซปด้วยดัมเบล', gear: 'db', link: MW },
        ],
      },
      {
        id: 'knee-raise',
        sets: 3, repsMin: 10, repsMax: 12, restSec: 60,
        options: [
          { id: 'lying-leg-raise', name: 'Lying Leg Raise', nameTh: 'นอนยกขา', gear: 'body', link: MW },
          { id: 'captains-chair', name: "Captain's Chair Knee Raise", nameTh: 'ยกเข่าบนเก้าอี้กัปตัน', gear: 'machine', link: MW },
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
        sets: 3, repsMin: 10, repsMax: 12, restSec: 120,
        options: [
          { id: 'leg-press', name: 'Leg Press', nameTh: 'ดันขาด้วยเครื่อง', gear: 'machine', link: MW },
          { id: 'smith-squat', name: 'Smith Machine Squat', nameTh: 'สควอทบนสมิธแมชชีน', gear: 'smith', link: MW },
          { id: 'hack-squat', name: 'Hack Squat', nameTh: 'แฮ็คสควอท', gear: 'machine', link: MW },
        ],
      },
      {
        id: 'hip-hinge',
        sets: 3, repsMin: 12, repsMax: 15, restSec: 90,
        options: [
          { id: 'seated-leg-curl', name: 'Seated Leg Curl', nameTh: 'งอขาหลังแบบนั่ง', gear: 'machine', link: MW },
          { id: 'lying-leg-curl', name: 'Lying Leg Curl', nameTh: 'งอขาหลังแบบนอน', gear: 'machine', link: MW },
        ],
      },
      {
        id: 'quad-iso',
        sets: 3, repsMin: 12, repsMax: 15, restSec: 75,
        options: [
          { id: 'leg-extension', name: 'Leg Extension', nameTh: 'เหยียดขาหน้า', gear: 'machine', link: MW },
          { id: 'walking-lunge', name: 'Dumbbell Walking Lunge', nameTh: 'ลันจ์เดินถือดัมเบล', gear: 'db', link: MW },
        ],
      },
      {
        id: 'glute',
        sets: 3, repsMin: 12, repsMax: 15, restSec: 60,
        options: [
          { id: 'back-extension', name: 'Back Extension', nameTh: 'แอ่นหลังบนเบาะ 45°', gear: 'machine', link: MW },
          { id: 'glute-bridge', name: 'Dumbbell Glute Bridge', nameTh: 'ยกสะโพกวางดัมเบล', gear: 'db', link: MW },
        ],
      },
      {
        id: 'calf',
        sets: 3, repsMin: 15, repsMax: 20, restSec: 45,
        options: [
          { id: 'leg-press-calf', name: 'Leg Press Calf Raise', nameTh: 'เขย่งน่องบนเครื่องดันขา', gear: 'machine', link: MW },
          { id: 'machine-calf-raise', name: 'Calf Raise Machine', nameTh: 'เขย่งน่องด้วยเครื่อง', gear: 'machine', link: MW },
          { id: 'db-calf-raise', name: 'Dumbbell Calf Raise', nameTh: 'เขย่งน่องถือดัมเบล', gear: 'db', link: MW },
        ],
      },
      {
        id: 'ab-crunch',
        sets: 3, repsMin: 12, repsMax: 15, restSec: 45,
        options: [
          { id: 'cable-crunch', name: 'Cable Crunch', nameTh: 'ครันช์ด้วยเคเบิล', gear: 'cable', link: MW },
          { id: 'ab-crunch-machine', name: 'Ab Crunch Machine', nameTh: 'ครันช์ด้วยเครื่อง', gear: 'machine', link: MW },
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
