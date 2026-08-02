/**
 * ตารางออกกำลังกาย 3 วัน (Push / Pull / Legs)
 * แก้ไฟล์นี้ไฟล์เดียวเพื่อเปลี่ยนตาราง — ส่วนอื่นของแอปอ่านจากที่นี่ทั้งหมด
 *
 * จัดตามอุปกรณ์ที่ยิมยืนยันว่ามี:
 *   เครื่องเฉพาะส่วน — Chest Press, Lat Pulldown, Leg Press, Leg Extension, Leg Curl
 *   เคเบิล 1 เสา + ดัมเบล + ม้านั่ง
 * ท่าที่ต้องใช้เครื่องนอกลิสต์นี้ (Pec Fly, Rear Delt, Preacher Curl ฯลฯ)
 * ถูกย้ายไปเป็นตัวสำรอง — เลือกได้ถ้าไปเจอว่าสาขามี
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
          { id: 'machine-chest-press', name: 'Chest Press', nameTh: 'ดันอกด้วยเครื่อง', gear: 'machine', link: 'https://www.acefitness.org/resources/everyone/exercise-library/188/seated-chest-press/' },
          { id: 'db-bench', name: 'Dumbbell Bench Press', nameTh: 'นอนม้านั่งราบ ดันดัมเบลขึ้น', gear: 'db', link: MW },
          { id: 'smith-bench', name: 'Smith Machine Bench Press', nameTh: 'ดันอกบนสมิธแมชชีน', gear: 'smith', link: MW },
        ],
      },
      {
        id: 'shoulder-press',
        part: { en: 'SHOULDER', th: 'ไหล่' },
        sets: 3, repsMin: 10, repsMax: 12, restSec: 90,
        options: [
          { id: 'db-shoulder-press', name: 'Dumbbell Shoulder Press', nameTh: 'นั่งพิงพนักตั้ง ดันดัมเบลขึ้นเหนือหัว', gear: 'db', link: MW },
          { id: 'machine-shoulder-press', name: 'Shoulder Press Machine', nameTh: 'ดันไหล่ด้วยเครื่อง ถ้าสาขามี', gear: 'machine', link: MW },
          { id: 'smith-shoulder-press', name: 'Smith Machine Shoulder Press', nameTh: 'ดันไหล่บนสมิธแมชชีน', gear: 'smith', link: MW },
        ],
      },
      {
        id: 'chest-fly',
        part: { en: 'CHEST', th: 'อกส่วนบน' },
        sets: 3, repsMin: 12, repsMax: 15, restSec: 60,
        options: [
          { id: 'incline-db-press', name: 'Incline Dumbbell Press', nameTh: 'ปรับเบาะเอียง 30° ดันดัมเบลขึ้น', gear: 'db', link: MW },
          { id: 'cable-crossover', name: 'Cable Chest Fly', nameTh: 'หนีบเคเบิลเข้าหากลางอก', gear: 'cable', link: MW },
          { id: 'pec-deck', name: 'Pec Fly Machine', nameTh: 'หนีบอกด้วยเครื่อง ถ้าสาขามี', gear: 'machine', link: MW },
        ],
      },
      {
        id: 'lateral-raise',
        part: { en: 'SIDE DELT', th: 'ไหล่ข้าง' },
        sets: 3, repsMin: 12, repsMax: 15, restSec: 45,
        options: [
          { id: 'db-lateral-raise', name: 'Dumbbell Lateral Raise', nameTh: 'ยืนถือดัมเบลเบา ๆ กางแขนออกข้างระดับไหล่', gear: 'db', link: MW },
          { id: 'cable-lateral-raise', name: 'Cable Lateral Raise', nameTh: 'กางไหล่ด้วยเคเบิล ทีละข้าง', gear: 'cable', link: MW },
        ],
      },
      {
        id: 'triceps-ext',
        part: { en: 'TRICEPS', th: 'ไตรเซป' },
        sets: 3, repsMin: 12, repsMax: 15, restSec: 60,
        options: [
          { id: 'cable-pushdown', name: 'Triceps Pushdown', nameTh: 'เกี่ยวบาร์ที่รอกบนสุด กดลงจนแขนตรง', gear: 'cable', link: 'https://www.muscleandstrength.com/exercises/rope-tricep-extension.html' },
          { id: 'bench-dip', name: 'Bench Dip', nameTh: 'มือยันขอบม้านั่ง ย่อตัวลง-ดันขึ้น', gear: 'body', link: MW },
          { id: 'db-overhead-ext', name: 'Dumbbell Overhead Extension', nameTh: 'ยกดัมเบลเหนือหัว งอศอกลงหลัง', gear: 'db', link: MW },
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
          { id: 'lat-pulldown', name: 'Lat Pulldown', nameTh: 'ดึงบาร์ลงมาที่หน้าอก', gear: 'machine', link: 'https://musclewiki.com/exercise/machine-pulldown' },
        ],
      },
      {
        id: 'row-horizontal',
        part: { en: 'MID BACK', th: 'กลางหลัง' },
        sets: 3, repsMin: 10, repsMax: 12, restSec: 90,
        options: [
          { id: 'seated-cable-row', name: 'Seated Cable Row', nameTh: 'นั่งที่รอกล่าง เท้ายันแป้น ดึงเข้าท้อง', gear: 'cable', link: 'https://www.muscleandstrength.com/exercises/seated-row.html' },
          { id: 'machine-row', name: 'Seated Row Machine', nameTh: 'โรว์ด้วยเครื่อง ถ้าสาขามี', gear: 'machine', link: MW },
          { id: 'db-one-arm-row', name: 'One-Arm Dumbbell Row', nameTh: 'เข่ายันม้านั่ง ดึงดัมเบลข้างเดียว', gear: 'db', link: MW },
        ],
      },
      {
        id: 'rear-delt',
        part: { en: 'REAR DELT', th: 'ไหล่หลัง' },
        sets: 3, repsMin: 12, repsMax: 15, restSec: 45,
        options: [
          { id: 'db-rear-fly', name: 'Seated Rear Delt Fly', nameTh: 'นั่งก้มตัวลงบนต้นขา กางดัมเบลออกข้าง', gear: 'db', link: MW },
          { id: 'cable-face-pull', name: 'Cable Face Pull', nameTh: 'ดึงเคเบิลเข้าหาหน้า', gear: 'cable', link: MW },
        ],
      },
      {
        id: 'biceps-curl',
        part: { en: 'BICEPS', th: 'ไบเซป' },
        sets: 3, repsMin: 12, repsMax: 15, restSec: 60,
        options: [
          { id: 'db-curl', name: 'Dumbbell Curl', nameTh: 'ยืนถือดัมเบล ม้วนขึ้นหาไหล่', gear: 'db', link: MW },
          { id: 'cable-curl', name: 'Cable Curl', nameTh: 'ม้วนไบเซปที่รอกล่าง', gear: 'cable', link: MW },
          { id: 'preacher-curl', name: 'Biceps Curl Machine', nameTh: 'ม้วนไบเซปด้วยเครื่อง ถ้าสาขามี', gear: 'machine', link: MW },
        ],
      },
      {
        id: 'knee-raise',
        part: { en: 'ABS', th: 'ท้องล่าง' },
        sets: 3, repsMin: 10, repsMax: 12, restSec: 60,
        options: [
          { id: 'lying-leg-raise', name: 'Lying Leg Raise', nameTh: 'นอนหงายยกขาขึ้น-ลง', gear: 'body', link: MW },
          { id: 'captains-chair', name: "Captain's Chair", nameTh: 'ยกเข่าบนเก้าอี้กัปตัน ถ้าสาขามี', gear: 'machine', link: MW },
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
          { id: 'goblet-squat', name: 'Goblet Squat', nameTh: 'อุ้มดัมเบลไว้หน้าอก ย่อลง-ยืนขึ้น', gear: 'db', link: MW },
          { id: 'smith-squat', name: 'Smith Machine Squat', nameTh: 'สควอทบนสมิธแมชชีน', gear: 'smith', link: MW },
        ],
      },
      {
        id: 'hip-hinge',
        part: { en: 'HAMSTRING', th: 'ขาหลัง' },
        sets: 3, repsMin: 12, repsMax: 15, restSec: 90,
        options: [
          { id: 'seated-leg-curl', name: 'Leg Curl', nameTh: 'งอขาหลังด้วยเครื่อง', gear: 'machine', link: MW },
          { id: 'db-rdl', name: 'Dumbbell Romanian Deadlift', nameTh: 'ถือดัมเบล ก้มตัวขาเกือบตึง', gear: 'db', link: MW },
        ],
      },
      {
        id: 'quad-iso',
        part: { en: 'QUAD', th: 'ขาหน้า' },
        sets: 3, repsMin: 12, repsMax: 15, restSec: 75,
        options: [
          { id: 'leg-extension', name: 'Leg Extension', nameTh: 'เหยียดขาหน้าด้วยเครื่อง', gear: 'machine', link: MW },
          { id: 'walking-lunge', name: 'Dumbbell Walking Lunge', nameTh: 'ถือดัมเบล เดินลันจ์', gear: 'db', link: MW },
        ],
      },
      {
        id: 'glute',
        part: { en: 'GLUTE', th: 'ก้น' },
        sets: 3, repsMin: 12, repsMax: 15, restSec: 60,
        options: [
          { id: 'glute-bridge', name: 'Dumbbell Glute Bridge', nameTh: 'นอนหงาย วางดัมเบลบนสะโพก ยกสะโพกขึ้น', gear: 'db', link: MW },
          { id: 'back-extension', name: 'Back Extension', nameTh: 'แอ่นหลังบนเบาะ 45° ถ้าสาขามี', gear: 'machine', link: MW },
        ],
      },
      {
        id: 'calf',
        part: { en: 'CALF', th: 'น่อง' },
        sets: 3, repsMin: 15, repsMax: 20, restSec: 45,
        options: [
          { id: 'db-calf-raise', name: 'Dumbbell Calf Raise', nameTh: 'ยืนถือดัมเบล เขย่งส้นขึ้นสุด', gear: 'db', link: MW },
          { id: 'leg-press-calf', name: 'Leg Press Calf Raise', nameTh: 'ใช้เครื่องดันขา ดันด้วยปลายเท้า', gear: 'machine', link: MW },
        ],
      },
      {
        id: 'ab-crunch',
        part: { en: 'ABS', th: 'ท้องบน' },
        sets: 3, repsMin: 12, repsMax: 15, restSec: 45,
        options: [
          { id: 'weighted-crunch', name: 'Weighted Crunch', nameTh: 'นอนหงายกอดดัมเบล ม้วนตัวขึ้น', gear: 'db', link: MW },
          { id: 'cable-crunch', name: 'Cable Crunch', nameTh: 'คุกเข่าหน้าเคเบิล ม้วนตัวลง', gear: 'cable', link: MW },
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
 * ท่าที่กำลังใช้อยู่
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
