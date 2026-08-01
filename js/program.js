/**
 * ตารางออกกำลังกาย 3 วัน (Push / Pull / Legs)
 * แก้ไขไฟล์นี้ไฟล์เดียวเพื่อเปลี่ยนตาราง — ส่วนอื่นของแอปอ่านจากที่นี่ทั้งหมด
 *
 * @typedef {import('./types.js')} _
 */

const MW = 'https://musclewiki.com/'; // fallback สำหรับท่าที่ไม่มีลิงก์เฉพาะ

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
        name: 'Chest Press Machine',
        nameTh: 'ดันอกด้วยเครื่อง',
        sets: 3, repsMin: 10, repsMax: 12, restSec: 90,
        link: 'https://www.acefitness.org/resources/everyone/exercise-library/188/seated-chest-press/',
      },
      {
        id: 'shoulder-press',
        name: 'Shoulder Press Machine',
        nameTh: 'ดันไหล่ด้วยเครื่อง',
        sets: 3, repsMin: 10, repsMax: 12, restSec: 90,
        link: MW,
      },
      {
        id: 'pec-deck',
        name: 'Pec Deck (Butterfly)',
        nameTh: 'หนีบอกด้วยเครื่อง',
        sets: 3, repsMin: 12, repsMax: 15, restSec: 60,
        link: MW,
      },
      {
        id: 'lateral-raise',
        name: 'Lateral Raise Machine',
        nameTh: 'กางไหล่ด้านข้าง',
        sets: 3, repsMin: 12, repsMax: 15, restSec: 45,
        alt: 'ใช้ Cable ข้างเดียวแทนได้',
        link: MW,
      },
      {
        id: 'triceps-pushdown',
        name: 'Cable Triceps Pushdown',
        nameTh: 'กดไตรเซปด้วยเคเบิล',
        sets: 3, repsMin: 12, repsMax: 15, restSec: 60,
        link: 'https://www.muscleandstrength.com/exercises/rope-tricep-extension.html',
      },
      {
        id: 'plank',
        name: 'Plank',
        nameTh: 'แพลงก์ค้าง',
        sets: 3, repsMin: 30, repsMax: 30, restSec: 45,
        isTimed: true,
        link: MW,
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
        name: 'Lat Pulldown',
        nameTh: 'ดึงบาร์หน้าลงมา',
        sets: 3, repsMin: 10, repsMax: 12, restSec: 90,
        link: 'https://musclewiki.com/exercise/machine-pulldown',
      },
      {
        id: 'chest-supported-row',
        name: 'Chest-Supported Row Machine',
        nameTh: 'โรว์แบบมีเบาะพยุงอก',
        sets: 3, repsMin: 10, repsMax: 12, restSec: 90,
        link: MW,
      },
      {
        id: 'seated-cable-row',
        name: 'Seated Cable Row',
        nameTh: 'ดึงเคเบิลนั่งพาย',
        sets: 3, repsMin: 12, repsMax: 15, restSec: 75,
        link: 'https://www.muscleandstrength.com/exercises/seated-row.html',
      },
      {
        id: 'face-pull',
        name: 'Cable Face Pull',
        nameTh: 'ดึงเคเบิลเข้าหน้า',
        sets: 3, repsMin: 15, repsMax: 15, restSec: 45,
        link: MW,
      },
      {
        id: 'cable-curl',
        name: 'Cable Curl',
        nameTh: 'ม้วนไบเซปด้วยเคเบิล',
        sets: 3, repsMin: 12, repsMax: 15, restSec: 60,
        alt: 'ใช้ Preacher Curl Machine แทนได้',
        link: MW,
      },
      {
        id: 'knee-raise',
        name: "Captain's Chair Knee Raise",
        nameTh: 'ยกเข่าบนเก้าอี้กัปตัน',
        sets: 3, repsMin: 10, repsMax: 12, restSec: 60,
        link: MW,
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
        id: 'leg-press',
        name: 'Leg Press',
        nameTh: 'ดันขาด้วยเครื่อง',
        sets: 3, repsMin: 10, repsMax: 12, restSec: 120,
        alt: 'ใช้ Hack Squat แทนได้',
        link: MW,
      },
      {
        id: 'seated-leg-curl',
        name: 'Seated Leg Curl',
        nameTh: 'งอขาหลังแบบนั่ง',
        sets: 3, repsMin: 12, repsMax: 15, restSec: 90,
        link: MW,
      },
      {
        id: 'leg-extension',
        name: 'Leg Extension',
        nameTh: 'เหยียดขาหน้า',
        sets: 3, repsMin: 12, repsMax: 15, restSec: 75,
        link: MW,
      },
      {
        id: 'back-extension',
        name: 'Back Extension',
        nameTh: 'แอ่นหลังบนเบาะ 45°',
        sets: 3, repsMin: 12, repsMax: 15, restSec: 60,
        link: MW,
      },
      {
        id: 'calf-raise',
        name: 'Calf Raise Machine',
        nameTh: 'เขย่งน่องด้วยเครื่อง',
        sets: 3, repsMin: 15, repsMax: 20, restSec: 45,
        link: MW,
      },
      {
        id: 'cable-crunch',
        name: 'Cable Crunch',
        nameTh: 'ครันช์ด้วยเคเบิล',
        sets: 3, repsMin: 12, repsMax: 15, restSec: 45,
        alt: 'ใช้ Ab Crunch Machine แทนได้',
        link: MW,
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
