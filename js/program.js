/**
 * ตารางออกกำลังกาย 3 วัน (Push / Pull / Legs)
 * แก้ไฟล์นี้ไฟล์เดียวเพื่อเปลี่ยนตาราง — ส่วนอื่นของแอปอ่านจากที่นี่ทั้งหมด
 *
 * ใช้เครื่องกับเคเบิลเท่านั้น ไม่มีดัมเบล
 *   Day 3 เป็นเครื่องล้วน ชื่อตรงกับป้ายบนเครื่อง — Leg Press, Leg Extension, Leg Curl, Glute, Calf Raise
 *   Day 1/2 ส่วนที่ไม่มีเครื่องเฉพาะ ใช้เคเบิลแทน
 * nameTh ของท่าเคเบิลบอกวิธีตั้งเครื่องไว้ด้วย (รอกสูงเท่าไหร่ ใส่ด้ามอะไร)
 * ท่าที่ต้องใช้เครื่องนอกลิสต์ (Rear Delt, Preacher Curl ฯลฯ) อยู่ในตัวสำรอง เผื่อสาขามี
 *
 * เก็บเฉพาะท่าที่ "ไม่มีอะไรแทนได้" — ตัดท่าที่ซ้ำกับท่าอื่นในวันเดียวกันออก
 *   Chest Fly ตัดออกแล้ว เพราะ Chest Press คุมอกอยู่แล้ว
 *   Lateral Raise กับ Seated Row ห้ามตัด เป็นท่าเดียวที่คุมไหล่ข้างกับกลางหลัง
 *   ท่าที่ทำแล้ว "ไม่รู้สึกโดน" แก้ที่คำแนะนำใน nameTh ก่อน อย่าเพิ่งตัดท่าทิ้ง
 *
 * ลำดับท่าในแต่ละวันเรียงตามจุดที่ต้องไปยืน ไม่ใช่ตามความสำคัญของกล้ามเนื้อ
 * ท่าที่ใช้เสา/เครื่องเดียวกันวางติดกัน จะได้ตั้งครั้งเดียวเล่นรวด ไม่ต้องเดินกลับ
 * เวลาเพิ่มหรือสลับท่า ให้เช็คว่าไม่ได้แทรกเครื่องอื่นคั่นกลางสองท่าที่ใช้เสาเดียวกัน
 *
 * ทุกท่าใช้ช่วงเรพเดียวกันคือ 8–12 ตั้งใจให้เท่ากันหมด ไม่ใช่ลืมแยก
 * กติกาคือ double progression: ได้ 12 ครบทั้งสามเซตเมื่อไหร่ เซสชันถัดไปเพิ่มน้ำหนัก
 * ไม่ไล่เรพสูง ๆ ในท่าไอโซเลชัน เพราะวิธีเดินหน้าคือเพิ่มน้ำหนัก ไม่ใช่เพิ่มโวลุ่ม
 * repsMax คือตัวที่ทำให้แบดจ์ "พร้อมเพิ่มน้ำหนัก" ขึ้น แก้เลขนี้เท่ากับแก้กติกา
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
        sets: 3, repsMin: 8, repsMax: 12, restSec: 90,
        options: [
          { id: 'incline-chest-press', name: 'Incline Chest Press', nameTh: 'ดันอกเอียงด้วยเครื่อง — เบาะเอียง 30–45° เท่านั้น ชันกว่านี้กลายเป็นเล่นไหล่หน้า · จับแคบเท่าไหล่ · ดันให้รู้สึกที่อกใต้ไหปลาร้า · เครื่องไม่ว่างให้ไปตั้งเบาะเอียงใต้สมิธแมชชีน', gear: 'machine', link: MW },
          { id: 'smith-incline-bench', name: 'Smith Machine Incline Press', nameTh: 'ตั้งเบาะเอียง 30–45° ใต้สมิธแมชชีน — ตัวแทนอันดับแรกเมื่อเครื่องเอียงไม่ว่าง', gear: 'smith', link: MW },
          { id: 'machine-chest-press', name: 'Chest Press', nameTh: 'ดันอกด้วยเครื่อง (เบาะราบ) — ใช้เฉพาะเมื่อไม่มีตัวเอียงจริง ๆ เพราะเบาะราบเน้นอกกลาง–ล่าง ไม่ใช่อกบนที่เป็นเป้า', gear: 'machine', link: 'https://www.acefitness.org/resources/everyone/exercise-library/188/seated-chest-press/' },
          { id: 'smith-bench', name: 'Smith Machine Bench Press', nameTh: 'ดันอกบนสมิธแมชชีน เบาะราบ ถ้าสาขามี', gear: 'smith', link: MW },
        ],
      },
      {
        id: 'shoulder-press',
        part: { en: 'SHOULDER', th: 'ไหล่' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 90,
        options: [
          { id: 'machine-shoulder-press', name: 'Shoulder Press Machine', nameTh: 'ดันไหล่ด้วยเครื่อง — ปรับเบาะให้ด้ามอยู่ระดับหู', gear: 'machine', link: MW },
          { id: 'smith-shoulder-press', name: 'Smith Machine Shoulder Press', nameTh: 'นั่งใต้สมิธแมชชีน ดันบาร์ขึ้นเหนือหัว', gear: 'smith', link: MW },
          { id: 'cable-shoulder-press', name: 'Cable Shoulder Press', nameTh: 'รอกล่างสุดสองข้าง · ด้ามเดี่ยว · ยืนกลางเสา ดันขึ้นเหนือหัว', gear: 'cable', link: MW },
        ],
      },
      {
        id: 'lateral-raise',
        part: { en: 'SIDE DELT', th: 'ไหล่ข้าง' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 60,
        options: [
          { id: 'cable-lateral-raise', name: 'Cable Lateral Raise', nameTh: 'รอกล่างสุด · ด้ามเดี่ยว · ยืนข้างเสาทีละข้าง · เอาเบาไว้ ห้ามยักบ่า ยกแค่ระดับไหล่', gear: 'cable', link: MW },
          { id: 'machine-lateral-raise', name: 'Lateral Raise Machine', nameTh: 'กางไหล่ด้วยเครื่อง ถ้าสาขามี — รู้สึกง่ายกว่าเคเบิลเพราะเครื่องบังคับทางให้', gear: 'machine', link: MW },
        ],
      },
      {
        id: 'triceps-ext',
        part: { en: 'TRICEPS', th: 'ไตรเซป' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 60,
        options: [
          { id: 'cable-pushdown', name: 'Triceps Pushdown', nameTh: 'รอกบนสุด · ใส่บาร์ตรงหรือเชือก · ศอกแนบลำตัว กดลงจนแขนตรง', gear: 'cable', link: 'https://www.muscleandstrength.com/exercises/rope-tricep-extension.html' },
          { id: 'machine-triceps', name: 'Triceps Extension Machine', nameTh: 'เหยียดไตรเซปด้วยเครื่อง ถ้าสาขามี', gear: 'machine', link: MW },
        ],
      },
      {
        id: 'plank',
        part: { en: 'CORE', th: 'แกนกลางลำตัว' },
        sets: 3, repsMin: 30, repsMax: 30, restSec: 45,
        isTimed: true,
        options: [
          { id: 'plank', name: 'Plank', nameTh: 'แพลงก์ค้างบนเสื่อ — ไม่ต้องใช้อุปกรณ์', gear: 'body', link: MW },
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
        sets: 3, repsMin: 8, repsMax: 12, restSec: 90,
        options: [
          { id: 'lat-pulldown', name: 'Lat Pulldown', nameTh: 'ดึงบาร์ลงมาที่หน้าอก — ปรับแป้นล็อกต้นขาให้แน่น · กดสะบักลงก่อนแล้วค่อยงอศอก ไม่งั้นไบเซปกับบ่าทำงานแทนปีก · ปล่อยขึ้นช้า 3 วิ', gear: 'machine', link: 'https://musclewiki.com/exercise/machine-pulldown' },
        ],
      },
      {
        id: 'row-horizontal',
        part: { en: 'MID BACK', th: 'กลางหลัง' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 90,
        options: [
          { id: 'seated-cable-row', name: 'Seated Cable Row', nameTh: 'เบาะที่รอกล่าง · เท้ายันแป้น · ดึงด้ามเข้าหาท้อง', gear: 'cable', link: 'https://www.muscleandstrength.com/exercises/seated-row.html' },
          { id: 'machine-row', name: 'Seated Row Machine', nameTh: 'โรว์ด้วยเครื่อง ถ้าสาขามี', gear: 'machine', link: MW },
        ],
      },
      {
        id: 'biceps-curl',
        part: { en: 'BICEPS', th: 'ไบเซป' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 60,
        options: [
          { id: 'cable-curl', name: 'Cable Curl', nameTh: 'อยู่ที่รอกล่างเดิมจากท่าโรว์ · เปลี่ยนเป็นบาร์ตรง · ศอกแนบลำตัว ม้วนขึ้นหาไหล่', gear: 'cable', link: MW },
          { id: 'preacher-curl', name: 'Biceps Curl Machine', nameTh: 'ม้วนไบเซปด้วยเครื่อง ถ้าสาขามี', gear: 'machine', link: MW },
        ],
      },
      {
        id: 'rear-delt',
        part: { en: 'REAR DELT', th: 'ไหล่หลัง' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 60,
        options: [
          { id: 'reverse-pec-deck', name: 'Rear Delt Machine', nameTh: 'เครื่องเดียวกับ Pec Fly แค่นั่งกลับด้าน · หันอกชนเบาะ กางแขนออกไปข้างหลัง · เช็ค: ถ้ารู้สึกที่อก แปลว่านั่งผิดด้าน', gear: 'machine', link: MW },
          { id: 'cable-face-pull', name: 'Cable Face Pull', nameTh: 'ตัวสำรองตอนเครื่องไม่ว่าง · รอกสูงระดับหน้า · ใส่เชือก · ดึงเข้าหาหน้าผาก กางศอกออก', gear: 'cable', link: MW },
        ],
      },
      {
        id: 'knee-raise',
        part: { en: 'ABS', th: 'ท้องล่าง' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 60,
        options: [
          { id: 'hanging-leg-raise', name: 'Hanging Leg Raise', nameTh: 'ห้อยบาร์โหน · ยกขาเหยียดตรงขึ้นระดับสะโพก · ลงช้า ๆ ไม่แกว่งตัว', gear: 'body', link: MW },
          { id: 'hanging-knee-raise', name: 'Hanging Knee Raise', nameTh: 'ห้อยบาร์โหน · งอเข่ายกขึ้นหาอก — ขั้นก่อนเหยียดขาตรง', gear: 'body', link: MW },
          { id: 'captains-chair', name: "Captain's Chair", nameTh: 'เก้าอี้กัปตัน · วางแขนบนแป้น พิงหลัง ยกขาขึ้น — เบากว่าห้อยบาร์ ถ้าสาขามี', gear: 'machine', link: MW },
          { id: 'lying-leg-raise', name: 'Lying Leg Raise', nameTh: 'นอนหงายบนเสื่อ ยกขาขึ้น-ลง — ตัวสำรองวันที่ห้อยบาร์ไม่ไหว', gear: 'body', link: MW },
        ],
      },
    ],
  },

  {
    id: 'day3',
    title: 'Day 3 — Legs',
    subtitle: 'ขา / ก้น / น่อง',
    accent: 'legs',
    shortLabel: 'LEGS',
    exercises: [
      {
        id: 'squat-press',
        part: { en: 'QUAD + GLUTE', th: 'ขาหน้า + ก้น' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 120,
        options: [
          { id: 'leg-press', name: 'Leg Press', nameTh: 'ดันขาด้วยเครื่อง — วางเท้ากลางแป้น กว้างเท่าสะโพก', gear: 'machine', link: MW },
        ],
      },
      {
        id: 'quad-iso',
        part: { en: 'QUAD', th: 'ขาหน้า' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 75,
        options: [
          { id: 'leg-extension', name: 'Leg Extension', nameTh: 'เหยียดขาหน้าด้วยเครื่อง — ปรับแป้นให้อยู่เหนือข้อเท้า', gear: 'machine', link: MW },
        ],
      },
      {
        id: 'hip-hinge',
        part: { en: 'HAMSTRING', th: 'ขาหลัง' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 90,
        options: [
          { id: 'seated-leg-curl', name: 'Leg Curl', nameTh: 'งอขาหลังด้วยเครื่อง — ปรับแป้นให้อยู่เหนือส้นเท้า', gear: 'machine', link: MW },
        ],
      },
      {
        id: 'glute',
        part: { en: 'GLUTE', th: 'ก้น' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 60,
        options: [
          { id: 'glute-machine', name: 'Glute', nameTh: 'เครื่องเตะก้น — เท้าดันแป้น เตะไปข้างหลังทีละข้าง', gear: 'machine', link: MW },
        ],
      },
      {
        id: 'calf',
        part: { en: 'CALF', th: 'น่อง' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 60,
        options: [
          { id: 'machine-calf-raise', name: 'Calf Raise', nameTh: 'เขย่งน่องด้วยเครื่อง — ไม่มีเครื่องน่องก็ใช้ Leg Press วางปลายเท้าที่ขอบล่างของแป้น', gear: 'machine', link: MW },
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
