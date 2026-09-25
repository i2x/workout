/**
 * ตารางออกกำลังกาย 3 วัน (Push / Pull / Legs)
 * แก้ไฟล์นี้ไฟล์เดียวเพื่อเปลี่ยนตาราง — ส่วนอื่นของแอปอ่านจากที่นี่ทั้งหมด
 *
 * ใช้เครื่องกับเคเบิลเท่านั้น ไม่มีดัมเบล
 *   Day 3 — Smith Squat เป็นท่าหลัก (แทน Leg Press ก.ย. 2026 อยากลองของใหม่) ที่เหลือเป็นเครื่อง Leg Extension, Leg Curl, Calf Raise
 *   Day 1/2 ส่วนที่ไม่มีเครื่องเฉพาะ ใช้เคเบิลแทน
 * nameTh ของท่าเคเบิลบอกวิธีตั้งเครื่องไว้ด้วย (รอกสูงเท่าไหร่ ใส่ด้ามอะไร)
 * ท่าละตัวเดียว ไม่มีตัวสำรอง (ก.ย. 2026) — เจ้าของไม่เคยกดสลับ เอาออกให้ตารางชัด
 *   เครื่องไม่ว่างให้รอหรือสลับลำดับท่าในวันนั้น ไม่ต้องเปลี่ยนท่า
 *
 * เก็บเฉพาะท่าที่ "ไม่มีอะไรแทนได้" — ตัดท่าที่ซ้ำกับท่าอื่นในวันเดียวกันออก
 *   ตัดเพื่อทรง V (ก.ย. 2026): วันละ 4 ท่า ~24 นาที — เก็บเฉพาะท่าที่สร้างไหล่กว้าง ปีกกว้าง อกบน ไหล่หลัง
 *   Pushdown / Cable Curl / Glute ออกช่วงคัต เพราะไตร/ไบ/ก้นได้จากท่าดัน ท่าดึง และ Smith Squat อยู่แล้ว
 *   id เดิม (triceps-ext, biceps-curl, glute) อย่าเอาไปใช้กับท่าอื่น — ถ้าเอาท่ากลับมาให้ใช้ id เดิมประวัติจะต่อกัน
 *   ท้องไม่อยู่ในตาราง — เล่น Ab Roller ที่บ้านวันว่าง 3–4 วัน/สัปดาห์ (ตัด Plank กับ Leg Raise ออก ก.ย. 2026)
 *   ยิมไม่มีเครื่องดันอกเอียง — อกบนใช้ Low-to-High Cable Fly ไว้ก่อน Chest Press ตอนอกยังสด (ถ้าอยากใส่น้ำหนักมากขึ้นค่อยเปลี่ยนเป็น Smith Incline 30°)
 *   Pec Fly เคยตัดเพราะคิดว่า Chest Press คุมอกแล้ว — เอากลับมา (ก.ย. 2026) เพราะท่าดันไม่พามือเข้าชิดกลางอก
 *   เล่นแล้วรู้สึกแค่อกด้านข้าง ช่วงหดตัวด้านในไม่มีท่าไหนคุม
 *   อยู่ Day 2 ติดกับ Rear Delt เพราะเป็นเครื่องเดียวกัน — ท่าหน้า/หลังรวดเดียว แค่หมุนตัวนั่งกลับด้าน
 *   Lateral Raise กับ Seated Row ห้ามตัด เป็นท่าเดียวที่คุมไหล่ข้างกับกลางหลัง
 *   ท่าที่ทำแล้ว "ไม่รู้สึกโดน" แก้ที่คำแนะนำใน nameTh ก่อน อย่าเพิ่งตัดท่าทิ้ง
 *
 *   Lateral Raise ย้ายมาเป็นท่าที่ 2 ของ Push (ก.ย. 2026) — ตั้งค่าเสาเดียวกับ Fly และให้ไหล่ข้างเล่นตอนสดก่อน Shoulder Press เพราะเป็นกล้ามหลักของทรง V
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
    subtitle: 'อกบน / ไหล่ข้าง / อก / ไหล่',
    accent: 'push',
    shortLabel: 'PUSH',
    exercises: [
      {
        id: 'incline-press',
        part: { en: 'UPPER CHEST', th: 'อกบน' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 75,
        options: [
          { id: 'cable-low-high-fly', name: 'Low-to-High Cable Fly', nameTh: 'รอกสองข้างต่ำสุด · ด้ามเดี่ยว · ก้าวออกหน้าเสาครึ่งก้าว ศอกงอนิดเดียวค้างไว้ ดึงมือจากข้างสะโพกเฉียงขึ้นมาชนกันระดับคาง ให้รู้สึกที่อกใต้ไหปลาร้า บีบค้าง 1 วิ ปล่อยกลับช้า ๆ · ถ้ารู้สึกที่ไหล่หน้ามากกว่าอก ลดน้ำหนัก', gear: 'cable', link: MW },
        ],
      },
      {
        id: 'lateral-raise',
        part: { en: 'SIDE DELT', th: 'ไหล่ข้าง' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 60,
        options: [
          { id: 'cable-lateral-raise', name: 'Cable Lateral Raise', nameTh: 'ตั้งค่าเดียวกับ Fly ท่าก่อนหน้า (รอกล่างสุด · ด้ามเดี่ยว) เล่นต่อได้เลยไม่ต้องย้ายเสา · ยืนข้างเสาทีละข้าง · เอาเบาไว้ ห้ามยักบ่า ยกแค่ระดับไหล่', gear: 'cable', link: MW },
        ],
      },
      {
        id: 'chest-press',
        part: { en: 'CHEST', th: 'อก' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 90,
        options: [
          { id: 'machine-chest-press', name: 'Converging Chest Press', nameTh: 'เครื่อง Matrix Versa — ด้ามเข้าหากันเองตอนดัน · เบาะ (ปุ่มส้มใต้เบาะ) ให้ด้ามอยู่ระดับกลางอก · ปุ่มส้มบนหัวแขนเครื่องตั้งจุดเริ่ม ให้ด้ามอยู่เลยแนวอกไปข้างหลังนิดเดียว อกรู้สึกยืดแต่ไหล่ไม่เจ็บ · จับค่อนไปทางปลายด้ามด้านใน · ศอกต่ำกว่าไหล่ ทำมุม 45–60° กับลำตัว อย่ากางตั้งฉาก · หนีบสะบักแนบเบาะ อกยืด · ดันสุดแล้วบีบอกค้าง 1 วิ', gear: 'machine', link: 'https://www.acefitness.org/resources/everyone/exercise-library/188/seated-chest-press/' },
        ],
      },
      {
        id: 'shoulder-press',
        part: { en: 'SHOULDER', th: 'ไหล่' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 90,
        options: [
          { id: 'machine-shoulder-press', name: 'Shoulder Press Machine', nameTh: 'ดันไหล่ด้วยเครื่อง — ปรับเบาะให้ด้ามอยู่ระดับหู', gear: 'machine', link: MW },
        ],
      },
    ],
  },

  {
    id: 'day2',
    title: 'Day 2 — Pull',
    subtitle: 'ปีก / กลางหลัง / อก / ไหล่หลัง',
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
        ],
      },
      {
        id: 'chest-fly',
        part: { en: 'CHEST', th: 'อกด้านใน' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 60,
        options: [
          { id: 'pec-fly-machine', name: 'Pec Fly', nameTh: 'เครื่องเดียวกับ Rear Delt ท่าถัดไป — เล่นท่านี้ก่อน เสร็จแล้วหมุนตัวนั่งกลับด้านเล่นต่อได้เลยไม่ต้องย้ายเครื่อง · นั่งหันหลังชนเบาะ · ปรับเบาะให้ด้ามอยู่ระดับอก · ศอกงอนิดเดียวค้างไว้ · หนีบแขนเข้ามาจนมือเกือบชนกัน บีบค้าง 1 วิ แล้วปล่อยกลับช้า ๆ · เอาเบาไว้ ท่านี้วัดกันที่บีบได้สุด ไม่ใช่น้ำหนัก', gear: 'machine', link: MW },
        ],
      },
      {
        id: 'rear-delt',
        part: { en: 'REAR DELT', th: 'ไหล่หลัง' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 60,
        options: [
          { id: 'reverse-pec-deck', name: 'Rear Delt Machine', nameTh: 'เครื่องเดียวกับ Pec Fly แค่นั่งกลับด้าน · หันอกชนเบาะ กางแขนออกไปข้างหลัง · เช็ค: ถ้ารู้สึกที่อก แปลว่านั่งผิดด้าน', gear: 'machine', link: MW },
        ],
      },
    ],
  },

  {
    id: 'day3',
    title: 'Day 3 — Legs',
    subtitle: 'ขาหน้า / ขาหลัง / น่อง',
    accent: 'legs',
    shortLabel: 'LEGS',
    exercises: [
      {
        id: 'squat-press',
        part: { en: 'QUAD + GLUTE', th: 'ขาหน้า + ก้น' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 120,
        options: [
          { id: 'smith-squat', name: 'Smith Machine Squat', nameTh: 'เปลี่ยนจาก Leg Press (ก.ย. 2026) อยากลองของใหม่ · ตั้งบาร์ระดับไหล่ ตัวกันบาร์ (safety) ไว้ต่ำกว่าจุดต่ำสุดที่จะย่อนิดเดียว · บาร์พาดบ่าหลัง ไม่ใช่คอ · เท้ากว้างเท่าไหล่ ยื่นเท้าไปหน้าบาร์ครึ่งฝ่าเท้า (สมิธบังคับแนวตรง ถ้าเท้าอยู่ใต้บาร์เข่าจะทิ่มหน้า) · ปลดล็อก: บิดข้อมือหมุนบาร์ออก · ย่อช้า 2 วิ จนต้นขาขนานพื้น ดันส้นเท้าขึ้น · ล็อกคืน: บิดกลับเกี่ยวตะขอ · ครั้งแรกเริ่มจากบาร์เปล่า หาตำแหน่งเท้าให้ได้ก่อนใส่แผ่น', gear: 'smith', link: MW },
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
        id: 'calf',
        part: { en: 'CALF', th: 'น่อง' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 60,
        options: [
          { id: 'machine-calf-raise', name: 'Calf Raise', nameTh: 'เขย่งน่องด้วยเครื่อง — ไม่มีเครื่องน่องก็ยืนเขย่งใต้สมิธต่อจาก Squat ได้เลย', gear: 'machine', link: MW },
        ],
      },
    ],
  },
];

/**
 * แผนทั้งสัปดาห์ นอกเหนือจากท่าในยิม — แสดงเป็นโน้ตใต้การ์ดหน้าแรก จะได้ไม่ต้องจำ
 * [หัวข้อ, รายละเอียด]
 */
export const WEEKLY_PLAN = [
  ['ยิม 6 วัน', 'วันละ ~25 นาที ตามการ์ดด้านบน · 3 เซตใส่สุด'],
  ['Lateral Raise เซตเบา', '2 เซตในวัน Pull กับ Legs · เหลือแรง 2–3 ครั้ง · รวมไหล่ข้าง 10 เซต/สัปดาห์'],
  ['Ab Roller ที่บ้าน', '3–4 วัน/สัปดาห์ · 4 × 10–20 · ได้ 20 ครบทุกเซตให้กลิ้งไกลขึ้น'],
  ['เดิน 6 กม. ทุกวัน', 'ฝนตกใช้กระโดดเชือกแทน'],
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
