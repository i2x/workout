/**
 * ตารางออกกำลังกาย 3 วัน (Push / Pull / Legs)
 * แก้ไฟล์นี้ไฟล์เดียวเพื่อเปลี่ยนตาราง — ส่วนอื่นของแอปอ่านจากที่นี่ทั้งหมด
 *
 * ใช้เครื่องกับเคเบิลเท่านั้น ไม่มีดัมเบล
 *   Day 3 เป็นเครื่องล้วน ชื่อตรงกับป้ายบนเครื่อง — Leg Press, Leg Extension, Leg Curl
 *   Calf Raise ตัดออก (ก.ย. 2026) ไปทำที่บ้านแบบบอดี้เวทเหมือน Ab Roller — ตารางยิมเก็บเฉพาะท่าที่ต้องใช้เครื่อง/เคเบิล · id calf อย่าเอาไปใช้กับท่าอื่น
 *   + ท้องปิดท้ายวันขา: เครื่อง Abdominal (ต.ค. 2026) — แทนดันอกปิดวันขาเดิม ที่ทำให้อกโดน 24 เซต/สัปดาห์ (Push 12 + Fly 6 + Legs 6) ซ้ำเกิน
 *     id smith-bench-legs เลิกใช้ — อย่าเอาไปใช้กับท่าอื่น
 *   ไม่มีสมิธในตาราง (ต.ค. 2026) — setup นาน เสียเวลา · อกบนย้ายไป Matrix MultiPress (Incline)
 *   ดันอกราบใช้เครื่อง Chest Press เฉพาะ ไม่ใช้ MultiPress — เครื่องท่าเดียวโดนอกกว่า (เจ้าของบอก ต.ค. 2026)
 *   อย่าเสนอท่าสมิธกลับมา ถ้ามีเครื่องที่ทำแทนได้ให้ใช้เครื่อง
 *   Day 1/2 ส่วนที่ไม่มีเครื่องเฉพาะ ใช้เคเบิลแทน
 * nameTh ของท่าเคเบิลบอกวิธีตั้งเครื่องไว้ด้วย (รอกสูงเท่าไหร่ ใส่ด้ามอะไร)
 * ท่าละตัวเดียว ไม่มีตัวสำรอง (ก.ย. 2026) — เจ้าของไม่เคยกดสลับ เอาออกให้ตารางชัด
 *   เครื่องไม่ว่างให้รอหรือสลับลำดับท่าในวันนั้น ไม่ต้องเปลี่ยนท่า
 *
 * เก็บเฉพาะท่าที่ "ไม่มีอะไรแทนได้" — ตัดท่าที่ซ้ำกับท่าอื่นในวันเดียวกันออก
 *   ตัดเพื่อทรง V (ก.ย. 2026): Push/Pull วันละ 5 ท่า ~30 นาที · Legs 4 ท่า — เก็บเฉพาะท่าที่สร้างไหล่กว้าง ปีกกว้าง อกบน ไหล่หลัง
 *   Glute ออกช่วงคัต เพราะก้นได้จาก Leg Press อยู่แล้ว — id glute อย่าเอาไปใช้กับท่าอื่น
 *   Pushdown / Cable Curl เคยตัด แล้วเอากลับมา (ก.ย. 2026) ใช้ id เดิม triceps-ext / biceps-curl ประวัติต่อกัน
 *   Pushdown ปิดท้าย Push (ไตรอุ่นจากท่าดันแล้ว เสาเดียวกับ Lateral Raise) · Curl ต่อจาก Row ใน Pull (รอกล่างเดิม) — วันละ 5 ท่าเท่ากัน ไม่กองที่วันขา
 *   ท้องอยู่ในยิมแล้ว (ต.ค. 2026) — เดิม Ab Roller ที่บ้าน 3–4 วัน แต่แทบไม่ได้ทำ ยิมไปจริงทุกครั้ง · ใส่น้ำหนักได้ ใช้กติกา 12 ครบสามเซตเดียวกับท่าอื่น
 *   อกบนใช้ MultiPress ตำแหน่ง Incline (ต.ค. 2026 เจอเครื่อง — เดิม Smith Incline 30° ซึ่งเปลี่ยนมาจาก Low-to-High Cable Fly) ไว้ก่อน Chest Press ตอนอกยังสด
 *   Pec Fly เคยตัดเพราะคิดว่า Chest Press คุมอกแล้ว — เอากลับมา (ก.ย. 2026) เพราะท่าดันไม่พามือเข้าชิดกลางอก
 *   เล่นแล้วรู้สึกแค่อกด้านข้าง ช่วงหดตัวด้านในไม่มีท่าไหนคุม
 *   อยู่ Day 2 ติดกับ Rear Delt เพราะเป็นเครื่องเดียวกัน — ท่าหน้า/หลังรวดเดียว แค่หมุนตัวนั่งกลับด้าน
 *   Lateral Raise กับ Seated Row ห้ามตัด เป็นท่าเดียวที่คุมไหล่ข้างกับกลางหลัง
 *   ท่าที่ทำแล้ว "ไม่รู้สึกโดน" แก้ที่คำแนะนำใน nameTh ก่อน อย่าเพิ่งตัดท่าทิ้ง
 *
 *   Lateral Raise เป็นท่าแรกของ Push (ก.ย. 2026) — ไหล่ข้างคือกล้ามหลักของทรง V ให้เล่นตอนสด แล้วเดินไปโซนเครื่องรวดเดียว ไม่ต้องกลับมาเคเบิลอีก
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
  db: 'ดัมเบล',
  bb: 'บาร์เบล',
  body: 'บอดี้เวท',
};

/** @type {import('./types.js').Day[]} */
export const PROGRAM = [
  {
    id: 'day1',
    title: 'Day 1 — Push',
    subtitle: 'ไหล่ข้าง / อกบน / อก / ไหล่ / ไตรเซป',
    accent: 'push',
    shortLabel: 'PUSH',
    exercises: [
      {
        id: 'lateral-raise',
        part: { en: 'SIDE DELT', th: 'ไหล่ข้าง' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 60,
        options: [
          { id: 'cable-lateral-raise', name: 'Cable Lateral Raise', nameTh: 'ท่าแรกของวัน — ไหล่ข้างเล่นตอนสด แล้วค่อยไปโซนเครื่อง · รอกล่างสุด · ด้ามเดี่ยว · ยืนข้างเสาทีละข้าง · เอาเบาไว้ ห้ามยักบ่า ยกแค่ระดับไหล่', gear: 'cable', link: MW },
        ],
      },
      {
        id: 'incline-press',
        part: { en: 'UPPER CHEST', th: 'อกบน' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 90,
        options: [
          { id: 'multipress-incline', name: 'MultiPress — Incline Press', nameTh: 'เครื่อง Matrix MultiPress (ป้าย Chest / Incline / Shoulder Press) · ปรับพนักพิง (B) ไปตำแหน่ง Incline ตามรูปกลางป้าย · ปรับเบาะนั่ง (A) ให้ด้ามอยู่ระดับอกบนใต้ไหปลาร้า ไม่ใช่คาง — ถ้าด้ามอยู่สูงกว่าไหล่จะกลายเป็นดันไหล่ · หนีบสะบักแนบพนัก อกยืด · ศอก 45° ไม่กางตั้งฉาก · ดันขึ้นแล้วบีบอกค้าง 1 วิ ลงช้า 2 วิ ให้อกรู้สึกยืดแต่ไหล่ไม่เจ็บ · ครั้งแรกตั้งน้ำหนักใหม่ ตัวเลขสมิธเดิมเทียบไม่ได้', gear: 'machine', link: MW },
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
      {
        id: 'triceps-ext',
        part: { en: 'TRICEPS', th: 'ไตรเซป' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 60,
        options: [
          { id: 'cable-pushdown', name: 'Triceps Pushdown', nameTh: 'ท่าสุดท้าย เดินกลับมาเสาเคเบิลเดิมที่เล่น Lateral Raise · รอกบนสุด · ใส่บาร์หักมุม (V-bar) — ข้อมือตรงเป็นแนวเดียวกับท่อนแขน อย่าให้หักหลัง · ศอกแนบซี่โครงนิ่งสนิท ถ้าศอกไหลลงหรือถอยหลังคือปีกเข้ามาช่วยแล้ว · กดลงจนแขนตรง · ไม่มี V-bar ใช้บาร์ตรง', gear: 'cable', link: 'https://www.muscleandstrength.com/exercises/rope-tricep-extension.html' },
        ],
      },
    ],
  },

  {
    id: 'day2',
    title: 'Day 2 — Pull',
    subtitle: 'ปีก / กลางหลัง / ไบเซป / อก / ไหล่หลัง',
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
        id: 'biceps-curl',
        part: { en: 'BICEPS', th: 'ไบเซป' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 60,
        options: [
          { id: 'cable-curl', name: 'Cable Curl', nameTh: 'อยู่ที่รอกล่างเดิมจากท่าโรว์ ไม่ต้องย้ายเสา · เปลี่ยนเป็นบาร์ตรง จับหงายมือกว้างเท่าไหล่ · ถอยจากเสา 1 ก้าว ยืนชิดเสาแล้วช่วงล่างสุดจะไม่มีแรงต้าน เสียของ · ศอกแนบซี่โครง ห้ามเลื่อนไปข้างหน้า ไม่งั้นไหล่หน้าช่วยยก · ม้วนขึ้นหาไหล่', gear: 'cable', link: MW },
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
    subtitle: 'ขาหน้า / ขาหลัง / ท้อง',
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
        id: 'abs',
        part: { en: 'ABDOMINALS', th: 'ท้อง' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 60,
        options: [
          { id: 'abdominal-machine', name: 'Abdominal Crunch', nameTh: 'ท่าสุดท้ายของวันขา — เครื่อง Abdominal · ตั้งเบาะให้แกนหมุนอยู่ระดับสะดือ · ม้วนซี่โครงลงหาสะดือด้วยท้อง ไม่ใช่ดึงด้วยแขนหรือก้มคอ · หายใจออกสุดตอนม้วน บีบค้าง 1 วิ ขึ้นช้า 2 วิ · ถ้ารู้สึกที่สะโพก/ต้นขาแทนท้อง ลดน้ำหนักแล้วม้วนให้สั้นลง', gear: 'machine', link: MW },
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
  ['ยิม 6 วัน', 'วันละ 4–5 ท่า ~25–30 นาที ตามการ์ดด้านบน · 3 เซตใส่สุด · เก็บเฉพาะท่าที่ต้องใช้เครื่อง'],
  ['Lateral Raise เซตเบา', '2 เซตในวัน Pull กับ Legs · เหลือแรง 2–3 ครั้ง · รวมไหล่ข้าง 10 เซต/สัปดาห์'],
  ['เซตสนุก (ไม่บังคับ)', 'ท้ายวันไหนก็ได้ เครื่องอื่นอย่างละ 1 เซต รวมไม่เกิน 4 · เหลือแรง 2–3 ครั้ง ไม่ต้องจด · นอนไม่ถึง 6 ชม. ตัดก่อน'],
  ['เดิน — ตัวช่วยสำรอง', 'ยังไม่ต้องทำ · ใช้เมื่อรอบเอวหยุดลด 2 สัปดาห์และเช็กการนอนแล้ว: เดิน 20–30 นาทีหลังมื้อเย็น ก่อนจะลดอาหาร'],
];

/**
 * ชุดเล่นที่บ้าน (ก.ย. 2026 น้ำท่วม ไปยิมไม่ได้) — เลือกได้จากปุ่ม ยิม/บ้าน หน้าแรก
 * อุปกรณ์: ดัมเบล 15 × 2, 8 × 2 · บาร์โหน · dip · ม้าปรับระดับ · Ab Roller
 *
 * แทนท่ายิมแบบ 1:1 — กล้ามที่ท่ายิมคุม ที่บ้านก็มีท่าคุมกล้ามนั้นท่าเดียว ลำดับเดียวกัน
 * id ทุกตัวขึ้นต้น home- แยกจากยิม เพราะน้ำหนักดัมเบลเทียบกับตัวเลขบนเครื่องไม่ได้
 *   ประวัติยิมไม่ปน น้ำลดแล้วกลับไปใช้ชุดยิมต่อได้เลย · อย่าย้ายท่าบ้านไปใส่ options ของท่ายิม
 *
 * ดัมเบลมีแค่ 2 น้ำหนัก เพิ่มทีละ 2.5 kg ไม่ได้ — กติกา 12 ครบสามเซตเหมือนเดิม
 * แต่แบดจ์หมายถึง "ขยับขั้น" (HOME_STEPS) ไม่ใช่เพิ่มน้ำหนัก · ช่วงเรพยัง 8–12
 * Pull-up จดเฉพาะครั้งที่ขึ้นเต็มเอง ครั้งที่เท้าช่วยไม่จด — แบดจ์ขึ้น = หนีบดัมเบลที่เท้า
 * Push-up ขยับขั้นด้วยมุม (มือบนม้า → พื้น → เท้าบนม้า) แทนการเพิ่มน้ำหนัก
 *   id home-dips ถูกแทนด้วย home-pushup (ก.ย. 2026 ทำ Dips ไม่ได้) — อย่าเอา home-dips ไปใช้กับท่าอื่น
 * วันขาใช้ท่าสองเท้าติดพื้นเท่านั้น (ก.ย. 2026 ท่าขาเดียว/ต้องทรงตัวซับซ้อนเกิน)
 *   Squat ท่าเดียวแทนทั้ง Leg Press + Leg Extension — ไม่มีท่าขาหน้าแยก · RDL สองขาแทน Leg Curl
 *   id home-split-squat / home-quad / home-rdl เลิกใช้ — อย่าเอาไปใช้กับท่าอื่น
 * ปิดวันขาด้วย Ab Roller แทนเครื่อง Abdominal (ต.ค. 2026) · id home-db-bench เลิกใช้ — อย่าเอาไปใช้กับท่าอื่น
 */
export const HOME_STEPS = 'ลง 3 วิ → + ค้าง 1–2 วิ ตรงจุดยากสุด → 1½ เรพ → ดัมเบลหนักขึ้นหรือทำทีละข้าง';

/** @type {import('./types.js').Day[]} */
export const HOME_PROGRAM = [
  {
    id: 'home1',
    home: true,
    title: 'Home — Push',
    subtitle: 'ไหล่ข้าง / อกบน / อก / ไหล่ / ไตรเซป',
    accent: 'push',
    shortLabel: 'HOME PUSH',
    exercises: [
      {
        id: 'home-lateral-raise',
        part: { en: 'SIDE DELT', th: 'ไหล่ข้าง' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 60,
        options: [
          { id: 'db-lateral-raise', name: 'DB Lateral Raise', nameTh: 'ดัมเบล 8 · แทน Cable Lateral · ยืนตรง ยกแค่ระดับไหล่ ห้ามยักบ่า ห้ามเหวี่ยง · 8 kg ไม่ถึง 8 ครั้ง → ทำทีละแขน มืออีกข้างจับเสา dip', gear: 'db', link: MW },
        ],
      },
      {
        id: 'home-incline-press',
        part: { en: 'UPPER CHEST', th: 'อกบน' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 90,
        options: [
          { id: 'incline-db-press', name: 'Incline DB Press', nameTh: 'ดัมเบล 15 × 2 · แทน MultiPress Incline · ม้า 30° · ลงช้าจนดัมเบลอยู่ข้างอกบน ศอก 45° · ดันขึ้นให้ดัมเบลเข้าหากันนิด ๆ', gear: 'db', link: MW },
        ],
      },
      {
        id: 'home-pushup',
        part: { en: 'CHEST', th: 'อก' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 90,
        options: [
          { id: 'push-up', name: 'Push-up', nameTh: 'ตัวเอง · แทน Chest Press (เดิมเป็น Dips — ทำไม่ได้ เปลี่ยน ก.ย. 2026) · มือกว้างกว่าไหล่นิด ศอก 45° ไม่กางตั้งฉาก · ตัวตรงเป็นไม้กระดาน เกร็งท้อง ก้นไม่โด่งไม่ย้อย · ลงช้า 2 วิ จนอกเกือบแตะพื้น · ขั้น: มือวางบนม้า (ไม่ถึง 8 ที่พื้น) → พื้น → เท้าวางบนม้า → ลง 3 วิ ค้างล่าง 1 วิ · น้ำหนักใส่ 0', gear: 'body', link: MW },
        ],
      },
      {
        id: 'home-shoulder-press',
        part: { en: 'SHOULDER', th: 'ไหล่' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 90,
        options: [
          { id: 'seated-db-press', name: 'Seated DB Shoulder Press', nameTh: 'ดัมเบล 15 × 2 · แทน Shoulder Press · ม้าตั้ง ~80° ไม่ต้องตั้งฉากเป๊ะ · เริ่มที่ดัมเบลระดับหู ข้อมืออยู่เหนือศอก', gear: 'db', link: MW },
        ],
      },
      {
        id: 'home-triceps',
        part: { en: 'TRICEPS', th: 'ไตรเซป' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 60,
        options: [
          { id: 'db-overhead-ext', name: 'Overhead DB Extension', nameTh: 'ดัมเบล 15 ลูกเดียว ถือสองมือ · แทน Pushdown · นั่งม้าตั้งตรง ศอกชี้เพดานนิ่ง ไม่กางออก · ลดดัมเบลลงหลังหัวจนแขนหลังยืด แล้วเหยียดขึ้น', gear: 'db', link: MW },
        ],
      },
    ],
  },

  {
    id: 'home2',
    home: true,
    title: 'Home — Pull',
    subtitle: 'ปีก / กลางหลัง / ไบเซป / อก / ไหล่หลัง',
    accent: 'pull',
    shortLabel: 'HOME PULL',
    exercises: [
      {
        id: 'home-pullup',
        part: { en: 'LAT', th: 'ปีก' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 90,
        options: [
          { id: 'pull-up', name: 'Pull-up', nameTh: 'ตัวเอง · แทน Lat Pulldown · คว่ำมือกว้างกว่าไหล่นิด · กดสะบักลงก่อนแล้วค่อยงอศอก เหมือน pulldown · ไม่ถึง 8: ขึ้นเต็มให้หมดก่อน แล้ววางม้าใต้บาร์ เท้าแตะม้าช่วยต่อจนครบ 8–12 · จดเฉพาะครั้งเต็ม น้ำหนักใส่ 0 · เต็ม 12 ครบสามเซต → หนีบดัมเบล 8 ที่เท้า', gear: 'body', link: MW },
        ],
      },
      {
        id: 'home-row',
        part: { en: 'MID BACK', th: 'กลางหลัง' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 90,
        options: [
          { id: 'one-arm-db-row', name: 'One-arm DB Row', nameTh: 'ดัมเบล 15 · แทน Seated Row · มือกับเข่าข้างเดียวกันวางบนม้า หลังขนานพื้น · ดึงศอกไปหาสะโพก ไม่ใช่ขึ้นหาหู · ปล่อยลงจนหลังยืดสุด · ครบสองข้าง = 1 เซต จดเรพต่อข้าง', gear: 'db', link: MW },
        ],
      },
      {
        id: 'home-curl',
        part: { en: 'BICEPS', th: 'ไบเซป' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 60,
        options: [
          { id: 'incline-db-curl', name: 'Incline DB Curl', nameTh: 'ดัมเบล 8 × 2 · แทน Cable Curl · นั่งม้าเอน 45–60° แขนห้อยเลยลำตัวไปข้างหลัง ช่วงล่างยืดเหมือนเคเบิล · ศอกนิ่ง ม้วนขึ้นหาไหล่', gear: 'db', link: MW },
        ],
      },
      {
        id: 'home-fly',
        part: { en: 'CHEST', th: 'อกด้านใน' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 60,
        options: [
          { id: 'flat-db-fly', name: 'DB Fly', nameTh: 'เริ่มดัมเบล 8 → 15 · แทน Pec Fly · ม้าราบ ศอกงอนิดเดียวแล้วล็อก · ลงจนอกยืด · ขึ้นมาหยุดก่อนดัมเบลชนกัน (ชนแล้วแรงต้านหาย) บีบอกค้าง 1 วิ', gear: 'db', link: MW },
        ],
      },
      {
        id: 'home-rear-delt',
        part: { en: 'REAR DELT', th: 'ไหล่หลัง' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 60,
        options: [
          { id: 'chest-supported-rear-delt', name: 'Chest-supported Rear Delt Raise', nameTh: 'ดัมเบล 8 × 2 · แทน Rear Delt Machine · ม้า 30–45° นอนคว่ำ อกแนบเบาะ · กางแขนออกข้างตัว · รู้สึกกลางหลังมากกว่าไหล่หลัง = บีบสะบักมากไป ปล่อยสะบักไว้เฉย ๆ', gear: 'db', link: MW },
        ],
      },
    ],
  },

  {
    id: 'home3',
    home: true,
    title: 'Home — Legs',
    subtitle: 'ขาหน้า + ก้น / ขาหลัง / ท้อง',
    accent: 'legs',
    shortLabel: 'HOME LEGS',
    exercises: [
      {
        id: 'home-squat',
        part: { en: 'QUAD + GLUTE', th: 'ขาหน้า + ก้น' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 120,
        options: [
          { id: 'db-squat', name: 'DB Squat', nameTh: 'ดัมเบล 15 × 2 ถือห้อยข้างลำตัว · แทน Leg Press + Leg Extension · ยืนเท้ากว้างเท่าไหล่ ปลายเท้าแบะนิด · นั่งลงตรง ๆ เหมือนนั่งเก้าอี้ จนต้นขาขนานพื้น · ดันพื้นยืนขึ้น · สองเท้าติดพื้น ไม่ต้องทรงตัว', gear: 'db', link: MW },
        ],
      },
      {
        id: 'home-db-rdl',
        part: { en: 'HAMSTRING', th: 'ขาหลัง' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 90,
        options: [
          { id: 'db-rdl', name: 'DB Romanian Deadlift', nameTh: 'ดัมเบล 15 × 2 ถือหน้าต้นขา · แทน Leg Curl · ยืนสองเท้า เข่างอนิดเดียวแล้วล็อกไว้ · หลังตรง ดันก้นไปข้างหลัง ให้ดัมเบลไถลงตามขา จนหลังขาตึง (ประมาณหน้าแข้ง) · บีบก้นยืนขึ้น', gear: 'db', link: MW },
        ],
      },
      {
        id: 'home-abs',
        part: { en: 'ABDOMINALS', th: 'ท้อง' },
        sets: 3, repsMin: 8, repsMax: 12, restSec: 60,
        options: [
          { id: 'ab-roller', name: 'Ab Roller', nameTh: 'แทนเครื่อง Abdominal ปิดวันขา · คุกเข่า เกร็งท้อง หลังกลมนิด ๆ ไม่แอ่น · กลิ้งออกช้า ๆ จนสุดที่ยังคุมหลังได้ แล้วดึงกลับด้วยท้อง · ขั้น: กลิ้งครึ่งทาง → กลิ้งสุด → ค้างปลาย 1–2 วิ → ยืนกลิ้ง · น้ำหนักใส่ 0', gear: 'body', link: MW },
        ],
      },
    ],
  },
];

/** แผนสัปดาห์ของชุดบ้าน — ใช้แทน WEEKLY_PLAN ตอนเลือก "บ้าน" */
export const HOME_PLAN = [
  ['เวทที่บ้าน 6 วัน', 'ตี 4–5 เหมือนเดิม · วน Push/Pull/Legs สองรอบ พักอาทิตย์'],
  ['▲ ขยับขั้น', `ได้ 12 ครบสามเซต → เซสชันถัดไปขยับขั้น: ${HOME_STEPS}`],
  ['จดน้ำหนัก', 'ต่อดัมเบลหนึ่งลูก (15 ไม่ใช่ 30) · ท่าข้างเดียวจดเรพต่อข้าง · Pull-up/Push-up น้ำหนักใส่ 0 · Pull-up นับเฉพาะครั้งเต็ม'],
  ['คาร์ดิโอเย็น', 'กระโดดเชือกในบ้านแทนเดิน · ไม่มีที่ก็งด ไม่ต้องเพิ่มเซตชดเชย · อย่าเดินลุยน้ำท่วม'],
];

/** ชุดตารางตามสถานที่ — ปุ่ม ยิม/บ้าน หน้าแรกสลับระหว่างสองชุดนี้ */
export const PLACES = {
  gym: { label: 'ยิม', days: PROGRAM, plan: WEEKLY_PLAN },
  home: { label: 'บ้าน', days: HOME_PROGRAM, plan: HOME_PLAN },
};

const ALL_DAYS = [...PROGRAM, ...HOME_PROGRAM];

/** หา Day จาก id (ทั้งยิมและบ้าน) */
export function getDay(dayId) {
  return ALL_DAYS.find((d) => d.id === dayId) || null;
}

/** หา Exercise จาก id (ค้นข้ามทุกวัน ทั้งยิมและบ้าน) */
export function getExercise(exerciseId) {
  for (const day of ALL_DAYS) {
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
