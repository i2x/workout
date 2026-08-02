# Workout — ตารางออกกำลังกาย Push / Pull / Legs

**เว็บจริง → https://i2x.github.io/workout/**

เว็บแอป static สำหรับจดบันทึกการเล่นเวทในยิม ออกแบบให้ใช้มือเดียวบนมือถือ
ข้อมูลทั้งหมดเก็บใน `localStorage` ของเครื่อง ไม่มี backend ไม่มี login

**Tech stack:** HTML + CSS + JavaScript (ES modules) ล้วน — ไม่มี build step ไม่มี npm install
ไม่มีไลบรารีภายนอกเลยแม้แต่ตัวเดียว (กราฟวาดด้วย SVG เอง)

---

## ฟีเจอร์

**หน้าตาราง (Home)**
- การ์ด 3 วัน บอกจำนวนท่า / เซต / เวลาโดยประมาณ
- แสดงว่าเล่นวันนั้นล่าสุดเมื่อไร และไฮไลต์วันที่ควรเล่นต่อไป (วันที่ห่างมากที่สุด)
- ป้าย "เล่นค้างอยู่" ถ้ามี session ที่ยังไม่ได้กดจบ
- นับจำนวนท่าที่พร้อมเพิ่มน้ำหนักของแต่ละวัน + สรุปปริมาตรรวมสัปดาห์นี้เทียบสัปดาห์ก่อน

**ยืดหยุ่นกับอุปกรณ์ที่ยิมมี**
- หนึ่งช่องในตาราง = **หนึ่งรูปแบบการเคลื่อนไหว** ไม่ได้ผูกกับเครื่องใดเครื่องหนึ่ง
- แต่ละช่องมีอุปกรณ์ให้เลือก 3–5 แบบ (ดัมเบล / บาร์เบล / เคเบิล / สมิธ / เครื่อง / บอดี้เวท)
  กดปุ่ม "⇄ เปลี่ยนอุปกรณ์" สลับได้ทันทีหน้าเครื่อง แล้วแอปจำไว้ให้ครั้งถัดไป
- ตัวเลือกแรกของทุกช่องคืออุปกรณ์ที่หาได้แทบทุกยิม
- ประวัติ กราฟ และ PR ยังนับรวมเป็นช่องเดียวกัน และจดไว้ด้วยว่าครั้งนั้นใช้อุปกรณ์อะไร

**หน้า Workout**
- กรอกน้ำหนัก / จำนวนครั้งทีละเซต (`inputmode="decimal"` คีย์บอร์ดตัวเลขขึ้นเอง)
- **Auto-fill** ค่าจากครั้งก่อนให้อัตโนมัติ พร้อมข้อความ "ครั้งก่อน 40 kg × 12" ใต้ช่อง
- ติ๊กเซตเสร็จ → บันทึกทันที + เริ่มจับเวลาพักอัตโนมัติ
- Progress bar ค้างด้านบนบอกว่าทำไปกี่เซตและปริมาตรรวมเท่าไร
- ปุ่ม ▶ เปิดวิดีโอสอนท่าของอุปกรณ์ที่เลือกอยู่
- แบดจ์ "พร้อมเพิ่มน้ำหนัก" บนท่าที่ครั้งก่อนทำครบทุกเซตที่เพดานช่วงเรพ
- กันจอดับระหว่างเล่นด้วย Screen Wake Lock API

**Rest timer**
- แถบค้างล่างจอ นับถอยหลังตาม `restSec` ของท่านั้น
- ปุ่ม +15 / −15 / ข้าม
- หมดเวลาแล้วมีเสียงบี๊บ (Web Audio) และสั่น (`navigator.vibrate`)
- คำนวณจาก timestamp ปลายทาง ไม่ใช่การสะสมของ `setInterval` — สลับไปแอปอื่นแล้วกลับมาเวลายังตรง

**ประวัติ & Progressive overload**
- รายการ session ย้อนหลัง กดขยายดูรายละเอียดรายท่าได้
- หน้ารายละเอียดรายท่า: กราฟน้ำหนักสูงสุดและปริมาตรรวมตามเวลา, สถิติ PR, บันทึกย้อนหลัง
- คำแนะนำเมื่อพร้อมขยับน้ำหนัก

**ตั้งค่า**
- ธีม อัตโนมัติ / มืด / สว่าง
- เปิด-ปิดเสียงและการสั่น
- Export เป็นไฟล์ JSON, Import กลับ (ยืนยันก่อนเขียนทับ), ล้างข้อมูลทั้งหมด (ยืนยัน 2 ชั้น)

**PWA**
- ติดตั้งลงหน้าจอโฮมได้ และเปิดใช้ได้แม้ไม่มีเน็ต
- Service worker เป็นแบบ network-first สำหรับไฟล์แอป → deploy แล้วเห็นของใหม่ทันที
  ส่วนฟอนต์เป็น cache-first และตกกลับไปใช้ cache ทั้งหมดเมื่อออฟไลน์

---

## รันบนเครื่อง

ต้องเปิดผ่าน HTTP server (เปิดไฟล์ด้วย `file://` ตรง ๆ ไม่ได้ เพราะ ES modules ติด CORS)

```bash
npx serve -l 3000 .
```

แล้วเปิด http://localhost:3000

### ทดสอบแบบ subpath (แนะนำก่อน push)

GitHub Pages ของรีโปทั่วไปจะอยู่ใต้ `/<repo-name>/` การทดสอบผ่าน subpath ช่วยจับ path ที่เขียนแบบ absolute ตั้งแต่ก่อน deploy

```bash
mkdir -p /tmp/pages-test && ln -sfn "$PWD" /tmp/pages-test/workout && npx serve -l 3000 /tmp/pages-test
```

แล้วเปิด http://localhost:3000/workout/ ถ้าหน้าตาปกติแปลว่า path ถูกต้องทั้งหมด

> เวลาแก้ไฟล์แล้วไม่เห็นการเปลี่ยนแปลง ให้เช็ค service worker ก่อน —
> เปิด DevTools → Application → Service Workers → **Update on reload** หรือกด Unregister แล้วรีโหลด

---

## Deploy บน GitHub Pages

ตั้งค่าไว้แล้วที่รีโปนี้ — **push เข้า `main` แล้วเว็บอัปเดตเองภายใน ~1 นาที** ไม่ต้อง build ไม่ต้องมี workflow

ถ้าจะตั้งใหม่จากศูนย์:

1. push โค้ดขึ้น branch `main`
2. รีโปบน GitHub → **Settings** → **Pages**
3. **Source** เลือก **Deploy from a branch**
4. **Branch** เลือก `main` และโฟลเดอร์ `/ (root)` → **Save**

### เรื่อง base path (สำคัญ)

โปรเจกต์นี้ใช้ **relative path ทั้งหมด** (`./css/style.css`, `./js/app.js`, `./sw.js`) จึงทำงานได้ทั้ง

- `https://username.github.io/repo-name/` (รีโปทั่วไป)
- `https://username.github.io/` (รีโปชื่อ `username.github.io`)
- โฟลเดอร์ย่อยอะไรก็ได้

โดยไม่ต้องแก้ค่า config ใด ๆ

> **อย่าเปลี่ยนไปใช้ absolute path** เช่น `/css/style.css` เพราะจะพังทันทีเมื่อ deploy ใต้ subpath
> รวมถึง `start_url` / `scope` ใน `manifest.webmanifest` และ path ใน `sw.js` ด้วย

### เรื่อง routing

แอปใช้ **hash routing** (`#/workout/day1`) เพราะ GitHub Pages ไม่มี server rewrite
ถ้าใช้ History API แล้วผู้ใช้กด refresh ที่ `/history` จะได้ 404 ทันที

### ไฟล์ `.nojekyll`

มีไฟล์ `.nojekyll` เปล่า ๆ ที่ root เพื่อบอก GitHub Pages ว่าไม่ต้องประมวลผลด้วย Jekyll
(ไม่งั้นโฟลเดอร์/ไฟล์ที่ขึ้นต้นด้วย `_` จะถูกข้ามไป) — **ห้ามลบ**

---

## แก้ไขข้อมูลตาราง

แก้ไฟล์เดียวคือ [`js/program.js`](js/program.js) ส่วนอื่นของแอปอ่านจากที่นี่ทั้งหมด

หนึ่งช่องในตารางคือ "รูปแบบการเคลื่อนไหว" ที่มีอุปกรณ์ให้เลือกหลายแบบ

```js
{
  id: 'chest-press',            // กุญแจที่ประวัติผูกอยู่ — ห้ามเปลี่ยน
  pattern: 'ดันอกแนวราบ',        // ชื่อรูปแบบการเคลื่อนไหว (ใช้เป็นหัวข้อหน้ารายละเอียด)
  sets: 3,
  repsMin: 10,
  repsMax: 12,                  // ถ้าเป็นจำนวนคงที่ ใส่ค่าเท่ากับ repsMin
  restSec: 90,                  // ถ้าโปรแกรมบอกเป็นช่วง ให้ใส่ค่ากลาง
  isTimed: false,               // true = กรอกเป็นวินาที เช่น Plank
  options: [                    // ตัวแรก = ค่าเริ่มต้น ควรเป็นอุปกรณ์ที่หาได้แทบทุกยิม
    { id: 'db-bench',  name: 'Dumbbell Bench Press', nameTh: 'ดันอกด้วยดัมเบล', gear: 'db',      link: 'https://…' },
    { id: 'bb-bench',  name: 'Barbell Bench Press',  nameTh: 'ดันอกด้วยบาร์เบล', gear: 'bb',      link: 'https://…' },
    { id: 'machine-chest-press', name: 'Chest Press Machine', nameTh: 'ดันอกด้วยเครื่อง', gear: 'machine', link: 'https://…' },
  ],
}
```

`gear` รับค่า: `db` ดัมเบล · `bb` บาร์เบล · `ez` บาร์ EZ · `cable` เคเบิล · `machine` เครื่อง ·
`smith` สมิธ · `body` บอดี้เวท (แก้ป้ายภาษาไทยได้ที่ `GEAR` ในไฟล์เดียวกัน)

> ⚠️ **`id` ของช่องคือกุญแจที่ใช้ผูกประวัติ** เปลี่ยน `pattern` หรือแก้ `options` ได้ตามใจ
> แต่ถ้าเปลี่ยน `id` ประวัติเก่าของช่องนั้นจะกลายเป็นข้อมูลกำพร้า
>
> ถ้าจำเป็นต้องเปลี่ยนจริง ๆ ให้เพิ่มบรรทัดใน `LEGACY_IDS` ของ [`js/storage.js`](js/storage.js)
> เพื่อย้ายประวัติเก่ามาที่ `id` ใหม่ (ตอนเปลี่ยนจากตารางที่ผูกกับเครื่องมาเป็นแบบนี้ก็ใช้วิธีนี้)

`repsMax` มีผลกับแบดจ์ "พร้อมเพิ่มน้ำหนัก" โดยตรง — ถ้าครั้งล่าสุดทำครบทุกเซตที่ `repsMax` แบดจ์จะขึ้น

เพิ่ม/ลบช่องหรือเพิ่มวันที่ 4 ได้โดยแก้ array `PROGRAM` ตรง ๆ (`accent` รับค่า `push` / `pull` / `legs`
ถ้าเพิ่มโทนสีใหม่ ต้องเพิ่ม `[data-accent='…']` ใน `css/style.css` ด้วย)

**เพิ่มไฟล์ใหม่ใน `js/` อย่าลืมเพิ่มชื่อไฟล์ในลิสต์ `ASSETS` ของ [`sw.js`](sw.js) และขยับเลข `CACHE` ด้วย**
ไม่งั้นไฟล์นั้นจะไม่ถูก precache ตอนออฟไลน์

---

## โครงสร้างโปรเจกต์

```
index.html              โครงหน้า + top bar + tab bar + ที่วางแถบจับเวลา
manifest.webmanifest    PWA manifest (path เป็น relative ทั้งหมด)
sw.js                   service worker — precache + offline
.nojekyll               ปิด Jekyll บน GitHub Pages
icons/                  ไอคอน PWA (SVG + PNG 192/512/maskable/apple-touch)
css/style.css           ธีมทั้งหมด (dark เป็นค่าเริ่มต้น, light = โทนคอนกรีต)
js/
  program.js            ★ ข้อมูลตาราง — แก้ไฟล์นี้เพื่อเปลี่ยนโปรแกรม
  types.js              JSDoc typedefs (ให้ editor ช่วย autocomplete โดยไม่ต้อง compile)
  storage.js            อ่าน/เขียน localStorage + import/export
  stats.js              คำนวณ PR, ปริมาตร, overload hint, สรุปสัปดาห์
  timer.js              rest timer (คำนวณจาก timestamp) + เสียง + สั่น
  chart.js              กราฟเส้น SVG ขนาดเล็ก
  format.js             แปลงวันที่/เวลาเป็นข้อความไทย
  dom.js                helper สร้าง DOM (html`` template + escape อัตโนมัติ)
  theme.js              ธีม auto / dark / light
  app.js                hash router + bootstrap
  views/
    home.js             หน้าเลือกวัน
    workout.js          หน้าเล่น + บันทึกเซต
    history.js          ประวัติ + สรุปสัปดาห์
    exercise.js         รายละเอียดรายท่า + กราฟ + PR
    settings.js         ธีม / เสียง / import / export / reset
    placeholder.js      หน้า 404
```

## ข้อมูลที่เก็บใน localStorage

key เดียวคือ `workout-tracker:v1` เก็บเป็น JSON ก้อนเดียว เพื่อให้ export/import ได้ง่าย

```jsonc
{
  "version": 1,
  "sessions": [
    {
      "id": "…",
      "dayId": "day1",
      "startedAt": 1754100000000,
      "finishedAt": 1754103600000,   // null = ยังเล่นค้างอยู่
      "entries": {
        "chest-press": [{ "weight": 40, "reps": 12, "done": true }]
      },
      "variants": { "chest-press": "db-bench" }   // อุปกรณ์ที่ใช้ครั้งนั้น
    }
  ],
  "settings": {
    "theme": "auto",
    "sound": true,
    "vibrate": true,
    "equipment": { "chest-press": "db-bench" }   // อุปกรณ์ที่เลือกไว้ล่าสุดของแต่ละช่อง
  }
}
```

- เซตที่ไม่ได้ติ๊ก `done` จะถูกตัดทิ้งตอนกด "จบการเล่น"
- session ที่ค้างเกิน 12 ชั่วโมงจะถูกปิดให้อัตโนมัติ (ถ้ามีข้อมูล) หรือทิ้งไป (ถ้าว่างเปล่า)
- ท่าที่ `isTimed` เก็บวินาทีไว้ในช่อง `reps`
- ข้อมูลจากตารางเวอร์ชันแรก (ที่ผูกกับเครื่อง) ถูกย้ายเข้าช่องใหม่อัตโนมัติตอนโหลด — ไม่ต้องทำอะไรเพิ่ม

---

## สถานะการพัฒนา

- [x] **Phase 1** — scaffold, ข้อมูลตาราง, หน้า Home
- [x] **Phase 2** — หน้า Workout: กรอกน้ำหนัก/ครั้ง, auto-fill, บันทึกลง localStorage
- [x] **Phase 3** — Rest timer (sticky bar, +15/−15/ข้าม, beep + สั่น, คำนวณจาก timestamp)
- [x] **Phase 4** — History, กราฟความก้าวหน้า, PR, แบดจ์ "พร้อมเพิ่มน้ำหนัก"
- [x] **Phase 5** — Import / Export / Reset
- [x] ฟีเจอร์เสริม — PWA + offline, Screen Wake Lock, สรุปสัปดาห์เทียบสัปดาห์ก่อน
- [x] เปลี่ยนตารางเป็นแบบ "รูปแบบการเคลื่อนไหว + เลือกอุปกรณ์ได้" ให้ใช้ได้กับทุกยิม
