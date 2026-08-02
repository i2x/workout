/**
 * ตารางออกกำลังกาย 3 วัน (Push / Pull / Legs)
 * แก้ไฟล์นี้ไฟล์เดียวเพื่อเปลี่ยนตาราง — ส่วนอื่นของแอปอ่านจากที่นี่ทั้งหมด
 *
 * แนวคิด: หนึ่งช่องในตาราง = "รูปแบบการเคลื่อนไหว" (pattern) ไม่ใช่เครื่องใดเครื่องหนึ่ง
 * แต่ละช่องมี options ให้เลือกว่าจะทำด้วยอุปกรณ์อะไร — ยิมไหนไม่มีเครื่องนี้ก็สลับได้
 * โดยประวัติยังนับรวมเป็นช่องเดิม
 *
 * ตัวเลือกแรกของทุกช่องคืออุปกรณ์ที่หาได้แทบทุกยิม (ดัมเบล / เคเบิล / บอดี้เวท
 * หรือเครื่องพื้นฐานที่มีแทบทุกที่อย่าง Lat Pulldown, Leg Press)
 */

const MW = 'https://musclewiki.com/'; // fallback สำหรับท่าที่ไม่มีลิงก์เฉพาะ

/** ป้ายอุปกรณ์แบบสั้น ใช้แสดงบนชิปเลือกอุปกรณ์ */
export const GEAR = {
  db: 'ดัมเบล',
  bb: 'บาร์เบล',
  ez: 'บาร์ EZ',
  cable: 'เคเบิล',
  machine: 'เครื่อง',
  smith: 'สมิธ',
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
        pattern: 'ดันอกแนวราบ',
        sets: 3, repsMin: 10, repsMax: 12, restSec: 90,
        options: [
          { id: 'db-bench', name: 'Dumbbell Bench Press', nameTh: 'ดันอกด้วยดัมเบล', gear: 'db', link: 'https://musclewiki.com/dumbbells/male/chest/dumbbell-bench-press' },
          { id: 'bb-bench', name: 'Barbell Bench Press', nameTh: 'ดันอกด้วยบาร์เบล', gear: 'bb', link: MW },
          { id: 'smith-bench', name: 'Smith Machine Bench Press', nameTh: 'ดันอกบนสมิธแมชชีน', gear: 'smith', link: MW },
          { id: 'machine-chest-press', name: 'Chest Press Machine', nameTh: 'ดันอกด้วยเครื่อง', gear: 'machine', link: 'https://www.acefitness.org/resources/everyone/exercise-library/188/seated-chest-press/' },
        ],
      },
      {
        id: 'shoulder-press',
        pattern: 'ดันไหล่เหนือศีรษะ',
        sets: 3, repsMin: 10, repsMax: 12, restSec: 90,
        options: [
          { id: 'db-shoulder-press', name: 'Dumbbell Shoulder Press', nameTh: 'ดันไหล่ด้วยดัมเบล', gear: 'db', link: MW },
          { id: 'bb-overhead-press', name: 'Barbell Overhead Press', nameTh: 'ดันบาร์เหนือศีรษะ', gear: 'bb', link: MW },
          { id: 'smith-shoulder-press', name: 'Smith Machine Shoulder Press', nameTh: 'ดันไหล่บนสมิธแมชชีน', gear: 'smith', link: MW },
          { id: 'machine-shoulder-press', name: 'Shoulder Press Machine', nameTh: 'ดันไหล่ด้วยเครื่อง', gear: 'machine', link: MW },
        ],
      },
      {
        id: 'chest-fly',
        pattern: 'หุบแขนเข้าหากลางอก',
        sets: 3, repsMin: 12, repsMax: 15, restSec: 60,
        options: [
          { id: 'db-fly', name: 'Dumbbell Chest Fly', nameTh: 'กางอกด้วยดัมเบล', gear: 'db', link: MW },
          { id: 'cable-crossover', name: 'Cable Crossover', nameTh: 'ไขว้เคเบิลหน้าอก', gear: 'cable', link: MW },
          { id: 'pec-deck', name: 'Pec Deck (Butterfly)', nameTh: 'หนีบอกด้วยเครื่อง', gear: 'machine', link: MW },
        ],
      },
      {
        id: 'lateral-raise',
        pattern: 'กางไหล่ด้านข้าง',
        sets: 3, repsMin: 12, repsMax: 15, restSec: 45,
        options: [
          { id: 'db-lateral-raise', name: 'Dumbbell Lateral Raise', nameTh: 'กางไหล่ด้วยดัมเบล', gear: 'db', link: MW },
          { id: 'cable-lateral-raise', name: 'Cable Lateral Raise', nameTh: 'กางไหล่ด้วยเคเบิลข้างเดียว', gear: 'cable', link: MW },
          { id: 'machine-lateral-raise', name: 'Lateral Raise Machine', nameTh: 'กางไหล่ด้วยเครื่อง', gear: 'machine', link: MW },
        ],
      },
      {
        id: 'triceps-ext',
        pattern: 'เหยียดศอก (ไตรเซป)',
        sets: 3, repsMin: 12, repsMax: 15, restSec: 60,
        options: [
          { id: 'cable-pushdown', name: 'Cable Triceps Pushdown', nameTh: 'กดไตรเซปด้วยเคเบิล', gear: 'cable', link: 'https://www.muscleandstrength.com/exercises/rope-tricep-extension.html' },
          { id: 'db-overhead-ext', name: 'Dumbbell Overhead Extension', nameTh: 'เหยียดไตรเซปเหนือศีรษะ', gear: 'db', link: MW },
          { id: 'ez-skullcrusher', name: 'EZ Bar Skull Crusher', nameTh: 'สกัลครัชเชอร์', gear: 'ez', link: MW },
          { id: 'bench-dip', name: 'Bench Dip', nameTh: 'ดิปบนม้านั่ง', gear: 'body', link: MW },
        ],
      },
      {
        id: 'plank',
        pattern: 'เกร็งแกนกลางลำตัว',
        sets: 3, repsMin: 30, repsMax: 30, restSec: 45,
        isTimed: true,
        options: [
          { id: 'plank', name: 'Plank', nameTh: 'แพลงก์ค้าง', gear: 'body', link: MW },
          { id: 'side-plank', name: 'Side Plank', nameTh: 'แพลงก์ข้าง (นับรวมสองข้าง)', gear: 'body', link: MW },
          { id: 'dead-bug', name: 'Dead Bug', nameTh: 'เดดบั๊ก', gear: 'body', link: MW },
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
        pattern: 'ดึงลงแนวดิ่ง',
        sets: 3, repsMin: 10, repsMax: 12, restSec: 90,
        options: [
          { id: 'lat-pulldown', name: 'Lat Pulldown', nameTh: 'ดึงบาร์หน้าลงมา', gear: 'cable', link: 'https://musclewiki.com/exercise/machine-pulldown' },
          { id: 'assisted-pullup', name: 'Assisted Pull-up', nameTh: 'ดึงข้อแบบมีตัวช่วย', gear: 'machine', link: MW },
          { id: 'pullup', name: 'Pull-up', nameTh: 'ดึงข้อ', gear: 'body', link: MW },
        ],
      },
      {
        id: 'row-horizontal',
        pattern: 'ดึงเข้าลำตัวแนวนอน',
        sets: 3, repsMin: 10, repsMax: 12, restSec: 90,
        options: [
          { id: 'seated-cable-row', name: 'Seated Cable Row', nameTh: 'ดึงเคเบิลนั่งพาย', gear: 'cable', link: 'https://www.muscleandstrength.com/exercises/seated-row.html' },
          { id: 'bb-row', name: 'Barbell Bent-Over Row', nameTh: 'โรว์บาร์เบลก้มตัว', gear: 'bb', link: MW },
          { id: 'machine-row', name: 'Chest-Supported Row Machine', nameTh: 'โรว์แบบมีเบาะพยุงอก', gear: 'machine', link: MW },
        ],
      },
      {
        id: 'row-unilateral',
        pattern: 'ดึงข้างเดียว',
        sets: 3, repsMin: 12, repsMax: 15, restSec: 75,
        options: [
          { id: 'db-one-arm-row', name: 'One-Arm Dumbbell Row', nameTh: 'โรว์ดัมเบลข้างเดียว', gear: 'db', link: MW },
          { id: 'cable-single-row', name: 'Single-Arm Cable Row', nameTh: 'ดึงเคเบิลข้างเดียว', gear: 'cable', link: MW },
          { id: 'inverted-row', name: 'Inverted Row', nameTh: 'โรว์ตัวเองใต้บาร์', gear: 'body', link: MW },
        ],
      },
      {
        id: 'rear-delt',
        pattern: 'ดึงเปิดไหล่หลัง',
        sets: 3, repsMin: 15, repsMax: 15, restSec: 45,
        options: [
          { id: 'cable-face-pull', name: 'Cable Face Pull', nameTh: 'ดึงเคเบิลเข้าหน้า', gear: 'cable', link: MW },
          { id: 'db-rear-fly', name: 'Dumbbell Rear Delt Fly', nameTh: 'กางไหล่หลังด้วยดัมเบล', gear: 'db', link: MW },
          { id: 'reverse-pec-deck', name: 'Reverse Pec Deck', nameTh: 'กางไหล่หลังด้วยเครื่อง', gear: 'machine', link: MW },
        ],
      },
      {
        id: 'biceps-curl',
        pattern: 'ม้วนข้อศอก (ไบเซป)',
        sets: 3, repsMin: 12, repsMax: 15, restSec: 60,
        options: [
          { id: 'db-curl', name: 'Dumbbell Curl', nameTh: 'ม้วนไบเซปด้วยดัมเบล', gear: 'db', link: MW },
          { id: 'ez-curl', name: 'EZ Bar Curl', nameTh: 'ม้วนไบเซปด้วยบาร์ EZ', gear: 'ez', link: MW },
          { id: 'cable-curl', name: 'Cable Curl', nameTh: 'ม้วนไบเซปด้วยเคเบิล', gear: 'cable', link: MW },
          { id: 'preacher-curl', name: 'Preacher Curl Machine', nameTh: 'ม้วนไบเซปด้วยเครื่อง', gear: 'machine', link: MW },
        ],
      },
      {
        id: 'knee-raise',
        pattern: 'ยกเข่า/ขา (ท้องล่าง)',
        sets: 3, repsMin: 10, repsMax: 12, restSec: 60,
        options: [
          { id: 'hanging-knee-raise', name: 'Hanging Knee Raise', nameTh: 'ห้อยตัวยกเข่า', gear: 'body', link: MW },
          { id: 'captains-chair', name: "Captain's Chair Knee Raise", nameTh: 'ยกเข่าบนเก้าอี้กัปตัน', gear: 'machine', link: MW },
          { id: 'lying-leg-raise', name: 'Lying Leg Raise', nameTh: 'นอนยกขา', gear: 'body', link: MW },
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
        pattern: 'ย่อ/ดันขาแบบหนัก',
        sets: 3, repsMin: 10, repsMax: 12, restSec: 120,
        options: [
          { id: 'leg-press', name: 'Leg Press', nameTh: 'ดันขาด้วยเครื่อง', gear: 'machine', link: MW },
          { id: 'goblet-squat', name: 'Goblet Squat', nameTh: 'สควอทอุ้มดัมเบล', gear: 'db', link: MW },
          { id: 'bb-squat', name: 'Barbell Back Squat', nameTh: 'สควอทแบกบาร์', gear: 'bb', link: MW },
          { id: 'smith-squat', name: 'Smith Machine Squat', nameTh: 'สควอทบนสมิธแมชชีน', gear: 'smith', link: MW },
          { id: 'hack-squat', name: 'Hack Squat', nameTh: 'แฮ็คสควอท', gear: 'machine', link: MW },
        ],
      },
      {
        id: 'hip-hinge',
        pattern: 'พับสะโพก / ต้นขาหลัง',
        sets: 3, repsMin: 12, repsMax: 15, restSec: 90,
        options: [
          { id: 'db-rdl', name: 'Dumbbell Romanian Deadlift', nameTh: 'ก้มยกดัมเบลขาตึง', gear: 'db', link: MW },
          { id: 'bb-rdl', name: 'Barbell Romanian Deadlift', nameTh: 'ก้มยกบาร์เบลขาตึง', gear: 'bb', link: MW },
          { id: 'seated-leg-curl', name: 'Seated Leg Curl', nameTh: 'งอขาหลังแบบนั่ง', gear: 'machine', link: MW },
          { id: 'lying-leg-curl', name: 'Lying Leg Curl', nameTh: 'งอขาหลังแบบนอน', gear: 'machine', link: MW },
        ],
      },
      {
        id: 'quad-iso',
        pattern: 'เน้นต้นขาหน้า',
        sets: 3, repsMin: 12, repsMax: 15, restSec: 75,
        options: [
          { id: 'leg-extension', name: 'Leg Extension', nameTh: 'เหยียดขาหน้า', gear: 'machine', link: MW },
          { id: 'walking-lunge', name: 'Dumbbell Walking Lunge', nameTh: 'ลันจ์เดินถือดัมเบล', gear: 'db', link: MW },
          { id: 'bulgarian-split', name: 'Bulgarian Split Squat', nameTh: 'สควอทขาเดียวพาดม้านั่ง', gear: 'db', link: MW },
        ],
      },
      {
        id: 'glute',
        pattern: 'ดันสะโพก / ก้น',
        sets: 3, repsMin: 12, repsMax: 15, restSec: 60,
        options: [
          { id: 'hip-thrust', name: 'Hip Thrust', nameTh: 'ดันสะโพกพาดม้านั่ง', gear: 'bb', link: MW },
          { id: 'glute-bridge', name: 'Dumbbell Glute Bridge', nameTh: 'ยกสะโพกวางดัมเบล', gear: 'db', link: MW },
          { id: 'back-extension', name: 'Back Extension', nameTh: 'แอ่นหลังบนเบาะ 45°', gear: 'machine', link: MW },
        ],
      },
      {
        id: 'calf',
        pattern: 'เขย่งน่อง',
        sets: 3, repsMin: 15, repsMax: 20, restSec: 45,
        options: [
          { id: 'db-calf-raise', name: 'Dumbbell Standing Calf Raise', nameTh: 'เขย่งน่องถือดัมเบล', gear: 'db', link: MW },
          { id: 'machine-calf-raise', name: 'Calf Raise Machine', nameTh: 'เขย่งน่องด้วยเครื่อง', gear: 'machine', link: MW },
          { id: 'leg-press-calf', name: 'Leg Press Calf Raise', nameTh: 'เขย่งน่องบนเครื่องดันขา', gear: 'machine', link: MW },
          { id: 'smith-calf-raise', name: 'Smith Machine Calf Raise', nameTh: 'เขย่งน่องบนสมิธแมชชีน', gear: 'smith', link: MW },
        ],
      },
      {
        id: 'ab-crunch',
        pattern: 'งอลำตัว (ท้องบน)',
        sets: 3, repsMin: 12, repsMax: 15, restSec: 45,
        options: [
          { id: 'cable-crunch', name: 'Cable Crunch', nameTh: 'ครันช์ด้วยเคเบิล', gear: 'cable', link: MW },
          { id: 'weighted-crunch', name: 'Weighted Crunch', nameTh: 'ครันช์ถือน้ำหนัก', gear: 'db', link: MW },
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
 * ตัวเลือกอุปกรณ์ที่กำลังใช้ของท่านั้น
 * ถ้า optionId ไม่ตรงกับอะไรเลย (เช่นลบออกจากตารางไปแล้ว) ให้ตกกลับไปตัวแรก
 */
export function getOption(ex, optionId) {
  return ex.options.find((o) => o.id === optionId) || ex.options[0];
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
