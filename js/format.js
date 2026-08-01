/** ฟังก์ชันแปลงข้อมูลเป็นข้อความภาษาไทย ใช้ร่วมกันทุกหน้า */

const DAY_MS = 86400000;

/** ตัดเวลาออก เหลือเฉพาะวัน (ใช้เทียบ "กี่วันที่แล้ว" แบบวันปฏิทิน) */
function startOfDay(ts) {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

/** จำนวนวันปฏิทินที่ผ่านมา (0 = วันนี้) */
export function daysAgo(ts, now = Date.now()) {
  return Math.round((startOfDay(now) - startOfDay(ts)) / DAY_MS);
}

/** "วันนี้" / "เมื่อวาน" / "3 วันที่แล้ว" */
export function relativeDay(ts, now = Date.now()) {
  const n = daysAgo(ts, now);
  if (n <= 0) return 'วันนี้';
  if (n === 1) return 'เมื่อวาน';
  if (n < 7) return `${n} วันที่แล้ว`;
  if (n < 30) return `${Math.floor(n / 7)} สัปดาห์ที่แล้ว`;
  return `${Math.floor(n / 30)} เดือนที่แล้ว`;
}

const TH_MONTH = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

/** "2 ส.ค. 68" */
export function shortDate(ts) {
  const d = new Date(ts);
  const be = (d.getFullYear() + 543) % 100;
  return `${d.getDate()} ${TH_MONTH[d.getMonth()]} ${String(be).padStart(2, '0')}`;
}

/** "18:42" */
export function clockTime(ts) {
  const d = new Date(ts);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

/** วินาที -> "1:30" */
export function mmss(sec) {
  const s = Math.max(0, Math.round(sec));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}
