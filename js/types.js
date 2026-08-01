/**
 * ชนิดข้อมูลกลางของแอป — ใช้ JSDoc เพื่อให้ editor ช่วย autocomplete
 * โดยไม่ต้องมี build step (ไม่ต้องคอมไพล์ TypeScript)
 *
 * @typedef {Object} Exercise
 * @property {string} id
 * @property {string} name                ชื่อภาษาอังกฤษ (ตรงกับป้ายบนเครื่องในยิม)
 * @property {string} [nameTh]            ชื่อไทย / หมายเหตุ
 * @property {number} sets
 * @property {number} repsMin
 * @property {number} repsMax
 * @property {number} restSec             ถ้าเป็นช่วง ใช้ค่ากลาง
 * @property {boolean} [isTimed]          true = นับเป็นวินาที ไม่ใช่จำนวนครั้ง
 * @property {string} [link]              ลิงก์วิดีโอ/คู่มือสอนท่า
 * @property {string} [alt]               เครื่องทดแทนถ้ายิมไม่มี
 *
 * @typedef {Object} Day
 * @property {string} id
 * @property {string} title               เช่น "Day 1 — Push"
 * @property {string} subtitle            เช่น "อก / ไหล่ / ไตรเซป"
 * @property {string} accent              คีย์สีประจำวัน: push | pull | legs
 * @property {string} shortLabel          ป้ายสั้น ๆ เช่น "PUSH"
 * @property {Exercise[]} exercises
 *
 * ---- ข้อมูลที่ผู้ใช้บันทึก (เก็บใน localStorage) ----
 *
 * @typedef {Object} SetLog
 * @property {number|null} weight         น้ำหนัก (kg) — null = ยังไม่กรอก
 * @property {number|null} reps           จำนวนครั้ง หรือวินาทีถ้า isTimed
 * @property {boolean} done               ติ๊กว่าเซตนี้เสร็จแล้ว
 *
 * @typedef {Object} Session
 * @property {string} id
 * @property {string} dayId
 * @property {number} startedAt           epoch ms
 * @property {number|null} finishedAt     epoch ms — null = ยังเล่นค้างอยู่
 * @property {Record<string, SetLog[]>} entries   exerciseId -> เซตทั้งหมด
 *
 * @typedef {Object} Settings
 * @property {'auto'|'dark'|'light'} theme
 * @property {boolean} sound
 * @property {boolean} vibrate
 *
 * @typedef {Object} AppData
 * @property {number} version
 * @property {Session[]} sessions
 * @property {Settings} settings
 */

export {};
